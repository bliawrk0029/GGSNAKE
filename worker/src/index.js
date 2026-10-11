/*
 * GGSNAKE API — Cloudflare Worker + D1
 *
 * Security model
 *  - Every player request carries Telegram initData; we verify its HMAC
 *    signature with the bot token, so identities cannot be faked.
 *  - Scores are never trusted from the client. The server hands out a
 *    random seed, the client sends back the list of turns, and the server
 *    replays the whole game with the shared engine to compute the score.
 *  - Runs faster than the game's own speed are rejected.
 *  - Rate limits on game starts; payload size limits; parameterised SQL.
 *  - Admin endpoints require ADMIN_KEY; the bot webhook requires the
 *    Telegram secret token header.
 */
import "../../engine.js";
import { SCHEMA } from "./schema.js";

const E = globalThis.GGEngine;
const enc = new TextEncoder();

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function cors(env, req) {
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
    const h = {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Init-Data",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
    };
    if (allowed.includes(origin)) h["Access-Control-Allow-Origin"] = origin;
    return h;
}

function json(data, status, headers) {
    return new Response(JSON.stringify(data), {
        status: status || 200,
        headers: Object.assign({
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff"
        }, headers || {})
    });
}

class HttpError extends Error {
    constructor(status, code) { super(code); this.status = status; this.code = code; }
}

function safeEqual(a, b) {
    if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
    let r = 0;
    for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return r === 0;
}

async function hmac(keyBytes, msg) {
    const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}

const hex = bytes => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");

function randomHex(n) {
    const b = new Uint8Array(n);
    crypto.getRandomValues(b);
    return hex(b);
}

function randomSeed() {
    const b = new Uint32Array(1);
    crypto.getRandomValues(b);
    return (b[0] % 2147483646) + 1;
}

const now = () => Date.now();
const contestEnd = env => Date.parse(env.CONTEST_END || "2100-01-01T00:00:00Z");
const contestOver = env => now() > contestEnd(env);
const intList = s => String(s || "").split(",").map(x => Number(x.trim())).filter(x => x > 0);

function displayName(u) {
    const name = (u.first_name || "").trim().slice(0, 24);
    return name || "Гравець";
}

/* ------------------------------------------------------------------ */
/* Telegram initData verification                                      */
/* ------------------------------------------------------------------ */

async function verifyInitData(initData, botToken, maxAgeSec) {
    if (!initData || initData.length > 4096 || !botToken) return null;
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    if (!hash) return null;

    const secret = await hmac(enc.encode("WebAppData"), botToken);
    const build = exclude => [...params.entries()]
        .filter(([k]) => !exclude.includes(k))
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => `${k}=${v}`)
        .join("\n");

    let ok = safeEqual(hex(await hmac(secret, build(["hash"]))), hash);
    if (!ok && params.has("signature")) {
        ok = safeEqual(hex(await hmac(secret, build(["hash", "signature"]))), hash);
    }
    if (!ok) return null;

    const authDate = Number(params.get("auth_date"));
    if (!authDate || now() / 1000 - authDate > maxAgeSec) return null;

    let user;
    try { user = JSON.parse(params.get("user") || "null"); } catch { return null; }
    if (!user || !Number.isSafeInteger(user.id)) return null;

    return { user, startParam: params.get("start_param") || "" };
}

async function auth(req, env) {
    const data = await verifyInitData(
        req.headers.get("X-Init-Data") || "",
        env.BOT_TOKEN,
        Number(env.INITDATA_MAX_AGE || 86400)
    );
    if (!data) throw new HttpError(401, "unauthorized");
    return data;
}

/* ------------------------------------------------------------------ */
/* Users & referrals                                                   */
/* ------------------------------------------------------------------ */

async function upsertUser(env, tg, startParam) {
    const db = env.DB;
    const t = now();
    const existing = await db.prepare("SELECT * FROM users WHERE id = ?").bind(tg.id).first();

    if (existing) {
        await db.prepare(
            "UPDATE users SET first_name = ?, username = ?, lang = ?, is_premium = ?, last_seen = ? WHERE id = ?"
        ).bind(
            String(tg.first_name || "").slice(0, 64), tg.username ? String(tg.username).slice(0, 64) : null,
            tg.language_code ? String(tg.language_code).slice(0, 8) : null, tg.is_premium ? 1 : 0, t, tg.id
        ).run();
        return Object.assign(existing, { first_name: tg.first_name || existing.first_name });
    }

    // New player: attach referrer if the link was valid
    let referrer = null;
    const m = /^ref_(\d{1,15})$/.exec(startParam || "");
    if (m && !contestOver(env)) {
        const rid = Number(m[1]);
        if (rid !== tg.id) {
            const r = await db.prepare("SELECT id FROM users WHERE id = ? AND banned = 0").bind(rid).first();
            if (r) referrer = rid;
        }
    }

    const stmts = [
        db.prepare(
            "INSERT OR IGNORE INTO users (id, first_name, username, lang, is_premium, created_at, last_seen, referrer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).bind(
            tg.id, String(tg.first_name || "").slice(0, 64), tg.username ? String(tg.username).slice(0, 64) : null,
            tg.language_code ? String(tg.language_code).slice(0, 8) : null, tg.is_premium ? 1 : 0, t, t, referrer
        )
    ];
    if (referrer) {
        stmts.push(db.prepare("UPDATE users SET ref_total = ref_total + 1 WHERE id = ?").bind(referrer));
    }
    await db.batch(stmts);
    return db.prepare("SELECT * FROM users WHERE id = ?").bind(tg.id).first();
}

async function scoreRank(env, u) {
    if (!u.best) return null;
    const r = await env.DB.prepare(
        "SELECT COUNT(*) AS c FROM users WHERE banned = 0 AND (best > ? OR (best = ? AND best_at < ?))"
    ).bind(u.best, u.best, u.best_at || 0).first();
    return r.c + 1;
}

async function refRank(env, u) {
    if (!u.ref_active) return null;
    const r = await env.DB.prepare(
        "SELECT COUNT(*) AS c FROM users WHERE banned = 0 AND (ref_active > ? OR (ref_active = ? AND ref_active_at < ?))"
    ).bind(u.ref_active, u.ref_active, u.ref_active_at || 0).first();
    return r.c + 1;
}

function contestInfo(env) {
    return {
        endsAt: env.CONTEST_END || null,
        over: contestOver(env),
        pool: Number(env.PRIZE_POOL || 0),
        currency: env.PRIZE_CURRENCY || "USDT",
        prizesScore: intList(env.PRIZES_SCORE),
        prizesRef: intList(env.PRIZES_REF),
        refMinGames: Number(env.REF_MIN_GAMES || 3),
        refMinScore: Number(env.REF_MIN_SCORE || 50)
    };
}

function refLink(env, id) {
    return `https://t.me/${env.BOT_USERNAME}/${env.APP_SHORT_NAME || "play"}?startapp=ref_${id}`;
}

async function profile(env, u) {
    return {
        name: displayName(u),
        best: u.best,
        games: u.games,
        totalScore: u.total_score,
        refTotal: u.ref_total,
        refActive: u.ref_active,
        scoreRank: await scoreRank(env, u),
        refRank: await refRank(env, u),
        refLink: refLink(env, u.id),
        banned: !!u.banned
    };
}

/* ------------------------------------------------------------------ */
/* API handlers                                                        */
/* ------------------------------------------------------------------ */

async function apiMe(req, env) {
    const { user, startParam } = await auth(req, env);
    const u = await upsertUser(env, user, startParam);
    return { me: await profile(env, u), contest: contestInfo(env) };
}

async function apiStart(req, env) {
    const { user } = await auth(req, env);
    const db = env.DB;
    const u = await db.prepare("SELECT id, banned FROM users WHERE id = ?").bind(user.id).first();
    if (!u) throw new HttpError(409, "call_me_first");
    if (u.banned) throw new HttpError(403, "banned");

    const t = now();
    const last = await db.prepare(
        "SELECT started_at FROM sessions WHERE user_id = ? ORDER BY started_at DESC LIMIT 1"
    ).bind(user.id).first();
    if (last && t - last.started_at < 1500) throw new HttpError(429, "slow_down");

    const day = await db.prepare(
        "SELECT COUNT(*) AS c FROM sessions WHERE user_id = ? AND started_at > ?"
    ).bind(user.id, t - 86400000).first();
    if (day.c >= Number(env.MAX_GAMES_PER_DAY || 500)) throw new HttpError(429, "daily_limit");

    const id = randomHex(16);
    const seed = randomSeed();
    await db.batch([
        db.prepare("DELETE FROM sessions WHERE user_id = ? AND started_at < ?").bind(user.id, t - 2 * 86400000),
        db.prepare("INSERT INTO sessions (id, user_id, seed, started_at) VALUES (?, ?, ?, ?)").bind(id, user.id, seed, t)
    ]);
    return { sessionId: id, seed, cols: E.COLS, rows: E.ROWS };
}

async function apiFinish(req, env) {
    const { user } = await auth(req, env);
    const db = env.DB;

    const raw = await req.text();
    if (raw.length > 400000) throw new HttpError(413, "too_large");
    let body;
    try { body = JSON.parse(raw); } catch { throw new HttpError(400, "bad_json"); }
    const sid = typeof body.sessionId === "string" && /^[0-9a-f]{32}$/.test(body.sessionId) ? body.sessionId : null;
    const turns = typeof body.turns === "string" ? body.turns : "";
    if (!sid) throw new HttpError(400, "bad_session");

    const s = await db.prepare("SELECT * FROM sessions WHERE id = ? AND user_id = ?").bind(sid, user.id).first();
    if (!s) throw new HttpError(404, "no_session");

    // Mark finished atomically — a session can only be submitted once
    const upd = await db.prepare("UPDATE sessions SET finished = 1 WHERE id = ? AND finished = 0").bind(sid).run();
    if (!upd.meta || upd.meta.changes !== 1) throw new HttpError(409, "already_finished");

    const t = now();
    const duration = t - s.started_at;
    if (duration > 6 * 3600000) throw new HttpError(410, "expired");

    const r = E.replay(s.seed, turns, 200000);
    if (!r.ok) throw new HttpError(422, "invalid_run");
    // Allow 10% timer jitter, but no faster than the game itself runs
    if (duration < r.minDurationMs * 0.9 - 300) throw new HttpError(422, "too_fast");

    const u = await db.prepare("SELECT * FROM users WHERE id = ?").bind(user.id).first();
    if (!u || u.banned) throw new HttpError(403, "banned");

    const over = contestOver(env);
    const newBest = !over && r.score > u.best;
    const stmts = [
        db.prepare("UPDATE users SET games = games + 1, total_score = total_score + ?, last_seen = ? WHERE id = ?")
            .bind(r.score, t, user.id)
    ];
    if (newBest) {
        stmts.push(db.prepare("UPDATE users SET best = ?, best_at = ? WHERE id = ?").bind(r.score, t, user.id));
        stmts.push(db.prepare(
            "INSERT INTO runs (user_id, session_id, seed, score, ticks, duration_ms, turns, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).bind(user.id, sid, s.seed, r.score, r.ticks, duration, turns, t));
    }
    await db.batch(stmts);

    // Referral activation: the invited friend must actually play
    const games = u.games + 1;
    const best = Math.max(u.best, newBest ? r.score : 0);
    if (!over && u.referrer_id && !u.activated &&
        games >= Number(env.REF_MIN_GAMES || 3) && best >= Number(env.REF_MIN_SCORE || 50)) {
        const a = await db.prepare("UPDATE users SET activated = 1 WHERE id = ? AND activated = 0").bind(user.id).run();
        if (a.meta && a.meta.changes === 1) {
            await db.prepare(
                "UPDATE users SET ref_active = ref_active + 1, ref_active_at = ? WHERE id = ? AND banned = 0"
            ).bind(t, u.referrer_id).run();
        }
    }

    const fresh = await db.prepare("SELECT * FROM users WHERE id = ?").bind(user.id).first();
    return {
        score: r.score,
        length: r.length,
        newBest,
        contestOver: over,
        me: await profile(env, fresh)
    };
}

async function apiLeaderboard(req, env, url) {
    const board = url.searchParams.get("board") === "ref" ? "ref" : "score";
    let meId = null;
    if (req.headers.get("X-Init-Data")) {
        try { meId = (await auth(req, env)).user.id; } catch { meId = null; }
    }

    const sql = board === "ref"
        ? "SELECT id, first_name, ref_active AS value FROM users WHERE banned = 0 AND ref_active > 0 ORDER BY ref_active DESC, ref_active_at ASC LIMIT 100"
        : "SELECT id, first_name, best AS value FROM users WHERE banned = 0 AND best > 0 ORDER BY best DESC, best_at ASC LIMIT 100";
    const { results } = await env.DB.prepare(sql).all();

    const rows = results.map((u, i) => ({ rank: i + 1, name: displayName(u), value: u.value, me: u.id === meId }));

    let me = null;
    if (meId && !rows.some(r => r.me)) {
        const u = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(meId).first();
        if (u) {
            const rank = board === "ref" ? await refRank(env, u) : await scoreRank(env, u);
            me = { rank, name: displayName(u), value: board === "ref" ? u.ref_active : u.best, me: true };
        }
    }
    const total = await env.DB.prepare(
        board === "ref" ? "SELECT COUNT(*) AS c FROM users WHERE banned = 0 AND ref_active > 0"
                        : "SELECT COUNT(*) AS c FROM users WHERE banned = 0 AND best > 0"
    ).first();
    const players = await env.DB.prepare("SELECT COUNT(*) AS c FROM users").first();

    return { board, rows, me, total: total.c, players: players.c, contest: contestInfo(env) };
}

/* ------------------------------------------------------------------ */
/* Telegram bot                                                        */
/* ------------------------------------------------------------------ */

async function tgCall(env, method, payload) {
    const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    return r.json();
}

function appLink(env, startParam) {
    const base = `https://t.me/${env.BOT_USERNAME}/${env.APP_SHORT_NAME || "play"}`;
    return startParam ? `${base}?startapp=${encodeURIComponent(startParam)}` : base;
}

async function botWebhook(req, env) {
    const secret = req.headers.get("X-Telegram-Bot-Api-Secret-Token") || "";
    if (!env.WEBHOOK_SECRET || !safeEqual(secret, env.WEBHOOK_SECRET)) return new Response("forbidden", { status: 403 });

    let update;
    try { update = await req.json(); } catch { return new Response("ok"); }
    const msg = update && update.message;
    if (!msg || !msg.chat || typeof msg.text !== "string") return new Response("ok");

    const text = msg.text.trim();
    const c = contestInfo(env);
    if (text.startsWith("/start")) {
        const payload = text.split(/\s+/)[1] || "";
        const start = /^ref_\d{1,15}$/.test(payload) ? payload : "";
        await tgCall(env, "sendMessage", {
            chat_id: msg.chat.id,
            text:
                "🐍 GGSNAKE — класична змійка прямо в Telegram.\n\n" +
                (c.pool ? `🏆 Розіграш ${c.pool} ${c.currency}: найкращі рекорди та найактивніші запрошувачі.\n\n` : "") +
                "Тисни «Грати» 👇",
            reply_markup: { inline_keyboard: [[{ text: "🎮 Грати", url: appLink(env, start) }]] }
        });
    } else if (text.startsWith("/rules")) {
        await tgCall(env, "sendMessage", {
            chat_id: msg.chat.id,
            text: "Правила розіграшу — у грі: вкладка «Рейтинг» → «Правила».",
            reply_markup: { inline_keyboard: [[{ text: "📜 Відкрити", url: appLink(env, "") }]] }
        });
    }
    return new Response("ok");
}

/* ------------------------------------------------------------------ */
/* Admin                                                               */
/* ------------------------------------------------------------------ */

function requireAdmin(url, env) {
    const key = url.searchParams.get("key") || "";
    if (!env.ADMIN_KEY || env.ADMIN_KEY.length < 16 || !safeEqual(key, env.ADMIN_KEY)) {
        throw new HttpError(403, "forbidden");
    }
}

async function admin(req, env, url) {
    requireAdmin(url, env);
    const db = env.DB;
    const path = url.pathname;

    if (path === "/admin/setup") {
        const origin = url.origin;
        return {
            webhook: await tgCall(env, "setWebhook", {
                url: `${origin}/tg/webhook`,
                secret_token: env.WEBHOOK_SECRET,
                allowed_updates: ["message"],
                drop_pending_updates: true
            }),
            menu: await tgCall(env, "setChatMenuButton", {
                menu_button: { type: "web_app", text: "Грати", web_app: { url: env.APP_URL } }
            }),
            commands: await tgCall(env, "setMyCommands", {
                commands: [
                    { command: "start", description: "Грати в GGSNAKE" },
                    { command: "rules", description: "Правила розіграшу" }
                ]
            })
        };
    }

    if (path === "/admin/winners") {
        const c = contestInfo(env);
        const score = await db.prepare(
            "SELECT id, first_name, username, best, best_at, games FROM users WHERE banned = 0 AND best > 0 ORDER BY best DESC, best_at ASC LIMIT ?"
        ).bind(Math.max(10, c.prizesScore.length)).all();
        const ref = await db.prepare(
            "SELECT id, first_name, username, ref_active, ref_total, ref_active_at FROM users WHERE banned = 0 AND ref_active > 0 ORDER BY ref_active DESC, ref_active_at ASC LIMIT ?"
        ).bind(Math.max(10, c.prizesRef.length)).all();
        return {
            contest: c,
            score: score.results.map((u, i) => Object.assign(u, { place: i + 1, prize: c.prizesScore[i] || 0 })),
            ref: ref.results.map((u, i) => Object.assign(u, { place: i + 1, prize: c.prizesRef[i] || 0 }))
        };
    }

    if (path === "/admin/user") {
        const id = Number(url.searchParams.get("id"));
        const u = await db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
        const runs = await db.prepare(
            "SELECT id, score, ticks, duration_ms, created_at FROM runs WHERE user_id = ? ORDER BY score DESC LIMIT 5"
        ).bind(id).all();
        const invited = await db.prepare(
            "SELECT id, first_name, username, games, best, activated, created_at FROM users WHERE referrer_id = ? ORDER BY created_at DESC LIMIT 200"
        ).bind(id).all();
        return { user: u, runs: runs.results, invited: invited.results };
    }

    if (path === "/admin/run") {
        const id = Number(url.searchParams.get("id"));
        const run = await db.prepare("SELECT * FROM runs WHERE id = ?").bind(id).first();
        if (!run) throw new HttpError(404, "no_run");
        return { run, verify: E.replay(run.seed, run.turns, 200000) };
    }

    if (path === "/admin/ban" && req.method === "POST") {
        const id = Number(url.searchParams.get("id"));
        const banned = url.searchParams.get("banned") === "0" ? 0 : 1;
        const u = await db.prepare("SELECT referrer_id, activated, banned FROM users WHERE id = ?").bind(id).first();
        if (!u) throw new HttpError(404, "no_user");
        const stmts = [db.prepare("UPDATE users SET banned = ? WHERE id = ?").bind(banned, id)];
        // A banned invitee no longer counts for whoever invited them
        if (u.referrer_id && u.activated && u.banned !== banned) {
            stmts.push(db.prepare("UPDATE users SET ref_active = MAX(0, ref_active + ?) WHERE id = ?")
                .bind(banned ? -1 : 1, u.referrer_id));
        }
        await db.batch(stmts);
        return { ok: true, id, banned };
    }

    if (path === "/admin/reset-season" && req.method === "POST") {
        if (url.searchParams.get("confirm") !== "yes") throw new HttpError(400, "add confirm=yes");
        await db.batch([
            db.prepare("UPDATE users SET best = 0, best_at = NULL, ref_active = 0, ref_active_at = NULL, ref_total = 0, activated = 0, referrer_id = NULL, games = 0, total_score = 0"),
            db.prepare("DELETE FROM runs"),
            db.prepare("DELETE FROM sessions")
        ]);
        return { ok: true };
    }

    if (path === "/admin/stats") {
        const q = sql => db.prepare(sql).first();
        const day = now() - 86400000;
        return {
            players: (await q("SELECT COUNT(*) AS c FROM users")).c,
            new24h: (await db.prepare("SELECT COUNT(*) AS c FROM users WHERE created_at > ?").bind(day).first()).c,
            active24h: (await db.prepare("SELECT COUNT(*) AS c FROM users WHERE last_seen > ?").bind(day).first()).c,
            games: (await q("SELECT COALESCE(SUM(games),0) AS c FROM users")).c,
            referred: (await q("SELECT COUNT(*) AS c FROM users WHERE referrer_id IS NOT NULL")).c,
            activatedRefs: (await q("SELECT COUNT(*) AS c FROM users WHERE activated = 1")).c
        };
    }

    throw new HttpError(404, "not_found");
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

let schemaReady = null;
function ensureSchema(env) {
    if (!schemaReady) {
        const stmts = SCHEMA.split(";")
            .map(s => s.replace(/--.*$/gm, "").trim())
            .filter(Boolean)
            .map(s => env.DB.prepare(s));
        schemaReady = env.DB.batch(stmts).catch(e => { schemaReady = null; throw e; });
    }
    return schemaReady;
}

export default {
    async fetch(req, env) {
        const url = new URL(req.url);
        const ch = cors(env, req);

        if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: ch });

        try {
            await ensureSchema(env);
            if (url.pathname === "/tg/webhook" && req.method === "POST") return await botWebhook(req, env);
            if (url.pathname.startsWith("/admin/")) return json(await admin(req, env, url));

            let data;
            switch (`${req.method} ${url.pathname}`) {
                case "GET /api/health": data = { ok: true }; break;
                case "POST /api/me": data = await apiMe(req, env); break;
                case "POST /api/session/start": data = await apiStart(req, env); break;
                case "POST /api/session/finish": data = await apiFinish(req, env); break;
                case "GET /api/leaderboard": data = await apiLeaderboard(req, env, url); break;
                default: throw new HttpError(404, "not_found");
            }
            return json(data, 200, ch);
        } catch (e) {
            if (e instanceof HttpError) return json({ error: e.code }, e.status, ch);
            console.error(e && e.stack || e);
            return json({ error: "server_error" }, 500, ch);
        }
    }
};
