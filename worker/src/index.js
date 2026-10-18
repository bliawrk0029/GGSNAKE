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
const DAY = 86400000;
const dayNo = t => Math.floor(t / DAY);
const weekNo = t => Math.floor((dayNo(t) + 3) / 7);          // 1970-01-01 was a Thursday → weeks start Monday
const weekStart = t => (weekNo(t) * 7 - 3) * DAY;
const holdMs = env => Number(env.REF_HOLD_HOURS ?? 24) * 3600000;
const refCfg = env => ({
    minGames: Number(env.REF_MIN_GAMES || 5),
    minDays: Number(env.REF_MIN_DAYS || 2),
    loyalDay: Number(env.REF_LOYAL_DAY || 7),
    dailyCap: Number(env.REF_DAILY_CAP || 15),
    ownerMinGames: Number(env.REF_OWNER_MIN_GAMES || 5)
});
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

// Friend points board: sum of held-over, non-revoked events of non-banned, active owners
function refBoardSql(env, extra = "") {
    return `SELECT e.beneficiary AS id, u.first_name, SUM(e.pts2) AS p2, MAX(e.at) AS last
        FROM ref_events e JOIN users u ON u.id = e.beneficiary
        WHERE e.status = 0 AND e.at <= ? AND e.at >= ? AND u.banned = 0 AND u.games >= ${refCfg(env).ownerMinGames} ${extra}
        GROUP BY e.beneficiary`;
}

async function refPoints(env, id, from) {
    const r = await env.DB.prepare(
        "SELECT COALESCE(SUM(pts2), 0) AS p2, MAX(at) AS last FROM ref_events WHERE beneficiary = ? AND status = 0 AND at <= ? AND at >= ?"
    ).bind(id, now() - holdMs(env), from || 0).first();
    const pend = await env.DB.prepare(
        "SELECT COALESCE(SUM(pts2), 0) AS p2 FROM ref_events WHERE beneficiary = ? AND ((status = 0 AND at > ?) OR status = 1)"
    ).bind(id, now() - holdMs(env)).first();
    return { p2: r.p2, last: r.last || 0, pending2: pend.p2 };
}

async function refRank(env, u, from) {
    const mine = await refPoints(env, u.id, from);
    if (!mine.p2 || u.banned || u.games < refCfg(env).ownerMinGames) return null;
    const r = await env.DB.prepare(
        `SELECT COUNT(*) AS c FROM (${refBoardSql(env)}) b WHERE b.p2 > ? OR (b.p2 = ? AND b.last < ?)`
    ).bind(now() - holdMs(env), from || 0, mine.p2, mine.p2, mine.last).first();
    return r.c + 1;
}

function contestInfo(env) {
    return {
        endsAt: env.CONTEST_END || null,
        over: contestOver(env),
        // Prize pool stays hidden (0) until the giveaway is announced: GIVEAWAY = "1"
        pool: env.GIVEAWAY === "1" ? Number(env.PRIZE_POOL || 0) : 0,
        currency: env.PRIZE_CURRENCY || "USDT",
        prizesScore: intList(env.PRIZES_SCORE),
        prizesRef: intList(env.PRIZES_REF),
        ref: Object.assign(refCfg(env), { holdHours: Number(env.REF_HOLD_HOURS ?? 24) })
    };
}

function refLink(env, id) {
    return `https://t.me/${env.BOT_USERNAME}/${env.APP_SHORT_NAME || "play"}?startapp=ref_${id}`;
}

async function profile(env, u) {
    const pts = await refPoints(env, u.id, 0);
    return {
        refPoints: pts.p2 / 2,
        refPending: pts.pending2 / 2,
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
    const today = dayNo(t);
    const newDay = u.last_play_day !== today;
    const stmts = [
        db.prepare("UPDATE users SET games = games + 1, total_score = total_score + ?, last_seen = ?, days_played = days_played + ?, last_play_day = ? WHERE id = ?")
            .bind(r.score, t, newDay ? 1 : 0, today, user.id)
    ];
    if (newBest) {
        stmts.push(db.prepare("UPDATE users SET best = ?, best_at = ? WHERE id = ?").bind(r.score, t, user.id));
        stmts.push(db.prepare(
            "INSERT INTO runs (user_id, session_id, seed, score, ticks, duration_ms, turns, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).bind(user.id, sid, s.seed, r.score, r.ticks, duration, turns, t));
    }
    if (!over && r.score > 0) {
        for (const period of ["d" + today, "w" + weekNo(t)]) {
            stmts.push(db.prepare(
                `INSERT INTO period_best (user_id, period, best, best_at) VALUES (?, ?, ?, ?)
                 ON CONFLICT (user_id, period) DO UPDATE SET best = excluded.best, best_at = excluded.best_at WHERE excluded.best > period_best.best`
            ).bind(user.id, period, r.score, t));
        }
    }
    await db.batch(stmts);

    // Friend points: the invited friend must really play, and keep playing
    if (!over && u.referrer_id) await referralProgress(env, u, t, u.games + 1, u.days_played + (newDay ? 1 : 0), today);

    const fresh = await db.prepare("SELECT * FROM users WHERE id = ?").bind(user.id).first();
    return {
        score: r.score,
        length: r.length,
        newBest,
        contestOver: over,
        me: await profile(env, fresh)
    };
}

async function addRefEvent(env, beneficiary, friendId, kind, pts2, t) {
    const db = env.DB;
    const owner = await db.prepare("SELECT id, banned FROM users WHERE id = ?").bind(beneficiary).first();
    if (!owner || owner.banned) return;
    // Too many new friends in 24h → keep the points, but only after a manual check
    let status = 0;
    if (kind === "counted") {
        const c = await db.prepare(
            "SELECT COUNT(*) AS c FROM ref_events WHERE beneficiary = ? AND kind = 'counted' AND at > ?"
        ).bind(beneficiary, t - DAY).first();
        if (c.c >= refCfg(env).dailyCap) status = 1;
    }
    await db.prepare(
        "INSERT OR IGNORE INTO ref_events (beneficiary, friend_id, kind, pts2, at, status) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(beneficiary, friendId, kind, pts2, t, status).run();
}

async function referralProgress(env, u, t, games, days, today) {
    const db = env.DB;
    const cfg = refCfg(env);
    if (!u.activated && games >= cfg.minGames && days >= cfg.minDays) {
        const a = await db.prepare("UPDATE users SET activated = 1 WHERE id = ? AND activated = 0").bind(u.id).run();
        if (a.meta && a.meta.changes === 1) {
            await db.prepare("UPDATE users SET ref_active = ref_active + 1, ref_active_at = ? WHERE id = ?").bind(t, u.referrer_id).run();
            await addRefEvent(env, u.referrer_id, u.id, "counted", 2, t);
            // Second level: whoever invited the referrer gets half a point
            const up = await db.prepare("SELECT referrer_id FROM users WHERE id = ?").bind(u.referrer_id).first();
            if (up && up.referrer_id && up.referrer_id !== u.id) await addRefEvent(env, up.referrer_id, u.id, "l2", 1, t);
        }
        return;
    }
    if (u.activated && !u.loyal && today >= dayNo(u.created_at) + cfg.loyalDay - 1) {
        const a = await db.prepare("UPDATE users SET loyal = 1 WHERE id = ? AND loyal = 0").bind(u.id).run();
        if (a.meta && a.meta.changes === 1) await addRefEvent(env, u.referrer_id, u.id, "loyal", 2, t);
    }
}

async function apiFriends(req, env) {
    const { user } = await auth(req, env);
    const db = env.DB;
    const u = await db.prepare("SELECT * FROM users WHERE id = ?").bind(user.id).first();
    if (!u) throw new HttpError(409, "call_me_first");
    const cfg = refCfg(env);
    const hold = now() - holdMs(env);
    const { results } = await db.prepare(
        "SELECT id, first_name, games, days_played, best, activated, loyal, created_at, banned FROM users WHERE referrer_id = ? ORDER BY activated DESC, games DESC LIMIT 100"
    ).bind(u.id).all();
    const ev = (await db.prepare("SELECT friend_id, kind, pts2, at, status FROM ref_events WHERE beneficiary = ?").bind(u.id).all()).results;
    const byFriend = {};
    for (const e of ev) (byFriend[e.friend_id] = byFriend[e.friend_id] || []).push(e);
    const friends = results.map(f => {
        const list = byFriend[f.id] || [];
        const points = list.filter(e => e.status === 0 && e.at <= hold).reduce((a, e) => a + e.pts2, 0) / 2;
        const pending = list.filter(e => e.status === 1 || (e.status === 0 && e.at > hold)).reduce((a, e) => a + e.pts2, 0) / 2;
        const state = f.banned || list.some(e => e.status === 2) ? "revoked"
            : list.some(e => e.status === 1) ? "review"
            : f.loyal ? "loyal" : f.activated ? "counted" : f.games > 0 ? "playing" : "joined";
        return {
            name: displayName(f), state, points, pending,
            games: Math.min(f.games, cfg.minGames), days: Math.min(f.days_played, cfg.minDays),
            dayIndex: dayNo(now()) - dayNo(f.created_at) + 1, best: f.best
        };
    });
    // Second-level points are listed as one line
    const l2 = ev.filter(e => e.kind === "l2");
    const pts = await refPoints(env, u.id, 0);
    return {
        points: pts.p2 / 2, pending: pts.pending2 / 2, rank: await refRank(env, u, 0),
        joined: u.ref_total, counted: u.ref_active,
        l2: { count: l2.length, points: l2.filter(e => e.status === 0 && e.at <= hold).reduce((a, e) => a + e.pts2, 0) / 2 },
        friends, rules: cfg, link: refLink(env, u.id), contest: contestInfo(env)
    };
}

async function apiLeaderboard(req, env, url) {
    const board = url.searchParams.get("board") === "ref" ? "ref" : "score";
    const per = ["day", "week"].includes(url.searchParams.get("period")) ? url.searchParams.get("period") : "season";
    let meId = null;
    if (req.headers.get("X-Init-Data")) {
        try { meId = (await auth(req, env)).user.id; } catch { meId = null; }
    }
    const db = env.DB;
    const t = now();
    let rows, me = null, total;

    if (board === "ref") {
        const from = per === "day" ? dayNo(t) * DAY : per === "week" ? weekStart(t) : 0;
        const { results } = await db.prepare(`${refBoardSql(env)} ORDER BY p2 DESC, last ASC LIMIT 100`).bind(t - holdMs(env), from).all();
        rows = results.map((u, i) => ({ rank: i + 1, name: displayName(u), value: u.p2 / 2, me: u.id === meId }));
        total = (await db.prepare(`SELECT COUNT(*) AS c FROM (${refBoardSql(env)})`).bind(t - holdMs(env), from).first()).c;
        if (meId && !rows.some(r => r.me)) {
            const u = await db.prepare("SELECT * FROM users WHERE id = ?").bind(meId).first();
            if (u) {
                const p = await refPoints(env, u.id, from);
                me = { rank: await refRank(env, u, from), name: displayName(u), value: p.p2 / 2, me: true };
            }
        }
    } else if (per === "season") {
        const { results } = await db.prepare(
            "SELECT id, first_name, best AS value FROM users WHERE banned = 0 AND best > 0 ORDER BY best DESC, best_at ASC LIMIT 100"
        ).all();
        rows = results.map((u, i) => ({ rank: i + 1, name: displayName(u), value: u.value, me: u.id === meId }));
        total = (await db.prepare("SELECT COUNT(*) AS c FROM users WHERE banned = 0 AND best > 0").first()).c;
        if (meId && !rows.some(r => r.me)) {
            const u = await db.prepare("SELECT * FROM users WHERE id = ?").bind(meId).first();
            if (u) me = { rank: await scoreRank(env, u), name: displayName(u), value: u.best, me: true };
        }
    } else {
        const period = per === "day" ? "d" + dayNo(t) : "w" + weekNo(t);
        const { results } = await db.prepare(
            "SELECT p.user_id AS id, u.first_name, p.best AS value FROM period_best p JOIN users u ON u.id = p.user_id WHERE p.period = ? AND u.banned = 0 ORDER BY p.best DESC, p.best_at ASC LIMIT 100"
        ).bind(period).all();
        rows = results.map((u, i) => ({ rank: i + 1, name: displayName(u), value: u.value, me: u.id === meId }));
        total = (await db.prepare("SELECT COUNT(*) AS c FROM period_best p JOIN users u ON u.id = p.user_id WHERE p.period = ? AND u.banned = 0").bind(period).first()).c;
        if (meId && !rows.some(r => r.me)) {
            const mine = await db.prepare("SELECT best, best_at FROM period_best WHERE user_id = ? AND period = ?").bind(meId, period).first();
            const u = await db.prepare("SELECT first_name FROM users WHERE id = ?").bind(meId).first();
            if (u) {
                let rank = null;
                if (mine) rank = (await db.prepare(
                    "SELECT COUNT(*) AS c FROM period_best p JOIN users u ON u.id = p.user_id WHERE p.period = ? AND u.banned = 0 AND (p.best > ? OR (p.best = ? AND p.best_at < ?))"
                ).bind(period, mine.best, mine.best, mine.best_at).first()).c + 1;
                me = { rank, name: displayName(u), value: mine ? mine.best : 0, me: true };
            }
        }
    }
    const players = await db.prepare("SELECT COUNT(*) AS c FROM users").first();
    const resetsAt = per === "day" ? (dayNo(t) + 1) * DAY : per === "week" ? weekStart(t) + 7 * DAY : null;
    return { board, period: per, rows, me, total, players: players.c, resetsAt, contest: contestInfo(env) };
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

const BOT_TEXT = {
    uk: {
        start: (c) => "🐍 <b>GGSNAKE</b> — та сама класична змійка з кнопкового телефона, тепер у Telegram.\n\n" +
            "• 30 рівнів із лабіринтами, бонус-жучки, 8-бітні звуки\n• Чесний рейтинг: кожну гру перевіряє сервер\n" +
            (c.pool ? `\n🏆 <b>Сезон 1 — $${c.pool} ${c.currency}</b>\nРекорди: ${c.prizesScore.join(" · ")}\nДрузі: ${c.prizesRef.join(" · ")}\n` : "") +
            "\nТисни «Грати» 👇",
        play: "🎮 Грати", channel: "📢 Канал", rules: "📜 Правила",
        rulesText: "📜 «Чесна гра і безпека» та політика конфіденційності — у грі: Профіль → ⚙.\n\n🔒 Ми ніколи не просимо оплату, паролі, коди чи seed-фрази. Офіційний бот — лише @{bot}.",
        help: "Потрібна допомога? Напишіть {contact}.\n\nКоманди:\n/start — грати\n/rules — правила і безпека\n/help — допомога"
    },
    ru: {
        start: (c) => "🐍 <b>GGSNAKE</b> — та самая классическая змейка с кнопочного телефона, теперь в Telegram.\n\n" +
            "• 30 уровней с лабиринтами, бонус-жуки, 8-битные звуки\n• Честный рейтинг: каждую игру проверяет сервер\n" +
            (c.pool ? `\n🏆 <b>Сезон 1 — $${c.pool} ${c.currency}</b>\nРекорды: ${c.prizesScore.join(" · ")}\nДрузья: ${c.prizesRef.join(" · ")}\n` : "") +
            "\nЖми «Играть» 👇",
        play: "🎮 Играть", channel: "📢 Канал", rules: "📜 Правила",
        rulesText: "📜 «Честная игра и безопасность» и политика конфиденциальности — в игре: Профиль → ⚙.\n\n🔒 Мы никогда не просим оплату, пароли, коды или seed-фразы. Официальный бот — только @{bot}.",
        help: "Нужна помощь? Напишите {contact}.\n\nКоманды:\n/start — играть\n/rules — правила и безопасность\n/help — помощь"
    },
    en: {
        start: (c) => "🐍 <b>GGSNAKE</b> — the classic snake from your old button phone, now in Telegram.\n\n" +
            "• 30 levels with mazes, bonus bugs, 8-bit sounds\n• Fair leaderboard: the server verifies every game\n" +
            (c.pool ? `\n🏆 <b>Season 1 — $${c.pool} ${c.currency}</b>\nHigh scores: ${c.prizesScore.join(" · ")}\nFriends: ${c.prizesRef.join(" · ")}\n` : "") +
            "\nTap “Play” 👇",
        play: "🎮 Play", channel: "📢 Channel", rules: "📜 Rules",
        rulesText: "📜 “Fair play & security” and the privacy policy are in the game: Profile → ⚙.\n\n🔒 We never ask for payment, passwords, codes or seed phrases. The only official bot is @{bot}.",
        help: "Need help? Message {contact}.\n\nCommands:\n/start — play\n/rules — rules & security\n/help — help"
    }
};
const botLang = code => { code = String(code || "").slice(0, 2); return code === "uk" || code === "ru" ? code : code === "be" ? "ru" : "en"; };

async function botWebhook(req, env) {
    const secret = req.headers.get("X-Telegram-Bot-Api-Secret-Token") || "";
    if (!env.WEBHOOK_SECRET || !safeEqual(secret, env.WEBHOOK_SECRET)) return new Response("forbidden", { status: 403 });

    let update;
    try { update = await req.json(); } catch { return new Response("ok"); }
    const msg = update && update.message;
    if (!msg || !msg.chat || typeof msg.text !== "string") return new Response("ok");

    const T = BOT_TEXT[botLang(msg.from && msg.from.language_code)];
    const text = msg.text.trim();
    const c = contestInfo(env);
    const sub = s => s.split("{bot}").join(env.BOT_USERNAME || "").split("{contact}").join(env.SUPPORT_CONTACT || "@" + (env.BOT_USERNAME || ""));
    const links = start => {
        const row = [{ text: T.play, url: appLink(env, start) }];
        const kb = [row];
        if (env.CHANNEL_USERNAME) kb.push([{ text: T.channel, url: `https://t.me/${env.CHANNEL_USERNAME}` }]);
        return { inline_keyboard: kb };
    };
    if (text.startsWith("/start")) {
        const payload = text.split(/\s+/)[1] || "";
        const start = /^ref_\d{1,15}$/.test(payload) ? payload : "";
        const caption = T.start(c);
        if (env.WELCOME_IMAGE) {
            await tgCall(env, "sendPhoto", { chat_id: msg.chat.id, photo: env.WELCOME_IMAGE, caption, parse_mode: "HTML", reply_markup: links(start) });
        } else {
            await tgCall(env, "sendMessage", { chat_id: msg.chat.id, text: caption, parse_mode: "HTML", reply_markup: links(start) });
        }
    } else if (text.startsWith("/rules")) {
        await tgCall(env, "sendMessage", { chat_id: msg.chat.id, text: sub(T.rulesText), reply_markup: links("") });
    } else if (text.startsWith("/help")) {
        await tgCall(env, "sendMessage", { chat_id: msg.chat.id, text: sub(T.help) });
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
                    { command: "start", description: "Play GGSNAKE" },
                    { command: "rules", description: "Rules & security" },
                    { command: "help", description: "Help & support" }
                ]
            }),
            commandsUk: await tgCall(env, "setMyCommands", {
                language_code: "uk",
                commands: [
                    { command: "start", description: "Грати в GGSNAKE" },
                    { command: "rules", description: "Правила і безпека" },
                    { command: "help", description: "Допомога і підтримка" }
                ]
            }),
            commandsRu: await tgCall(env, "setMyCommands", {
                language_code: "ru",
                commands: [
                    { command: "start", description: "Играть в GGSNAKE" },
                    { command: "rules", description: "Правила и безопасность" },
                    { command: "help", description: "Помощь и поддержка" }
                ]
            })
        };
    }

    if (path === "/admin/winners") {
        const c = contestInfo(env);
        const score = await db.prepare(
            "SELECT id, first_name, username, best, best_at, games FROM users WHERE banned = 0 AND best > 0 ORDER BY best DESC, best_at ASC LIMIT ?"
        ).bind(Math.max(10, c.prizesScore.length)).all();
        const ref = await db.prepare(`${refBoardSql(env)} ORDER BY p2 DESC, last ASC LIMIT ?`)
            .bind(now() - holdMs(env), 0, Math.max(10, c.prizesRef.length)).all();
        ref.results.forEach(r => { r.points = r.p2 / 2; delete r.p2; });
        const review = await db.prepare(
            "SELECT e.id, e.beneficiary, e.friend_id, e.kind, e.at, u.first_name, u.games, u.best FROM ref_events e JOIN users u ON u.id = e.friend_id WHERE e.status = 1 ORDER BY e.at LIMIT 200"
        ).all();
        return {
            contest: c,
            score: score.results.map((u, i) => Object.assign(u, { place: i + 1, prize: c.prizesScore[i] || 0 })),
            ref: ref.results.map((u, i) => Object.assign(u, { place: i + 1, prize: c.prizesRef[i] || 0 })),
            review: review.results
        };
    }

    if (path === "/admin/review" && req.method === "POST") {
        // approve=1 counts the held event, approve=0 revokes it
        const id = Number(url.searchParams.get("event"));
        const ok = url.searchParams.get("approve") === "1";
        await db.prepare("UPDATE ref_events SET status = ? WHERE id = ? AND status = 1").bind(ok ? 0 : 2, id).run();
        return { ok: true, id, approved: ok };
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
        // ...and all points earned through them are revoked (or restored on unban)
        stmts.push(db.prepare("UPDATE ref_events SET status = ? WHERE friend_id = ? AND status = ?")
            .bind(banned ? 2 : 0, id, banned ? 0 : 2));
        await db.batch(stmts);
        return { ok: true, id, banned };
    }

    if (path === "/admin/reset-season" && req.method === "POST") {
        if (url.searchParams.get("confirm") !== "yes") throw new HttpError(400, "add confirm=yes");
        await db.batch([
            db.prepare("UPDATE users SET best = 0, best_at = NULL, ref_active = 0, ref_active_at = NULL, ref_total = 0, activated = 0, loyal = 0, days_played = 0, last_play_day = 0, referrer_id = NULL, games = 0, total_score = 0"),
            db.prepare("DELETE FROM ref_events"),
            db.prepare("DELETE FROM period_best"),
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
                case "POST /api/friends": data = await apiFriends(req, env); break;
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
