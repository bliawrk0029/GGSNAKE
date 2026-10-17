// End-to-end test of the API with an in-memory SQLite standing in for D1.
// Run: node worker/test/e2e.mjs
import { DatabaseSync } from "node:sqlite";
import { createHmac } from "node:crypto";
import worker from "../src/index.js";

const E = globalThis.GGEngine;
let clock = Date.parse("2026-10-20T10:00:00Z");
Date.now = () => clock;
const advance = ms => { clock += ms; };

/* ---- D1 shim ---- */
function d1(sqlite) {
    const stmt = (sql, args = []) => ({
        bind: (...a) => stmt(sql, a),
        first: async () => sqlite.prepare(sql).get(...args) ?? null,
        all: async () => ({ results: sqlite.prepare(sql).all(...args) }),
        run: async () => { const r = sqlite.prepare(sql).run(...args); return { meta: { changes: Number(r.changes) } }; },
        _exec: () => sqlite.prepare(sql).run(...args)
    });
    return { prepare: sql => stmt(sql), batch: async list => { sqlite.exec("BEGIN"); try { list.forEach(s => s._exec()); sqlite.exec("COMMIT"); } catch (e) { sqlite.exec("ROLLBACK"); throw e; } return []; } };
}
const sqlite = new DatabaseSync(":memory:");

const BOT_TOKEN = "123456:TEST_TOKEN_abc";
const env = {
    DB: d1(sqlite), BOT_TOKEN, ADMIN_KEY: "admin-key-1234567890", WEBHOOK_SECRET: "hook-secret",
    ALLOWED_ORIGIN: "https://bliawrk0029.github.io", BOT_USERNAME: "ggsnake_game_bot", APP_SHORT_NAME: "play",
    APP_URL: "https://bliawrk0029.github.io/GGSNAKE/", CONTEST_END: "2026-11-30T18:00:00Z",
    PRIZE_POOL: "1000", PRIZES_SCORE: "300,150,75,40,35", PRIZES_REF: "200,100,50,25,25",
    REF_MIN_GAMES: "5", REF_MIN_DAYS: "2", REF_LOYAL_DAY: "7", REF_HOLD_HOURS: "24", REF_DAILY_CAP: "15", REF_OWNER_MIN_GAMES: "5"
};

function initData(user, startParam, token = BOT_TOKEN) {
    const p = { auth_date: String(Math.floor(clock / 1000)), user: JSON.stringify(user), query_id: "AAA" };
    if (startParam) p.start_param = startParam;
    const dcs = Object.keys(p).sort().map(k => `${k}=${p[k]}`).join("\n");
    const secret = createHmac("sha256", "WebAppData").update(token).digest();
    p.hash = createHmac("sha256", secret).update(dcs).digest("hex");
    return new URLSearchParams(p).toString();
}

async function call(method, path, { id, body, start, raw } = {}) {
    const headers = { Origin: "https://bliawrk0029.github.io", "Content-Type": "application/json" };
    if (raw) headers["X-Init-Data"] = raw;
    else if (id) headers["X-Init-Data"] = initData({ id, first_name: "User" + id, username: "u" + id }, start);
    const res = await worker.fetch(new Request("https://api.test" + path, { method, headers, body: body ? JSON.stringify(body) : undefined }), env);
    return { status: res.status, data: await res.json().catch(() => null), headers: res.headers };
}

// Greedy bot that plays through the shared engine and records turns like the client does
function botPlay(seed, maxScore = 300) {
    const g = E.create({ seed }); const rec = []; let ms = 0;
    const V = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] }, O = { U: "D", D: "U", L: "R", R: "L" };
    while (g.alive) {
        const h = g.snake[0], f = g.food;
        const safe = d => { const x = h.x + V[d][0], y = h.y + V[d][1]; return x >= 0 && y >= 0 && x < 20 && y < 24 && !g.isWall(x, y) && !g.snake.slice(0, -1).some(p => p.x === x && p.y === y); };
        let want;
        if (g.score >= maxScore || g.ticks > 3000) want = ["U", "D", "L", "R"].find(d => d !== O[g.dir] && !safe(d)) || g.dir; // crash on purpose
        else { const o = []; if (f.x > h.x) o.push("R"); if (f.x < h.x) o.push("L"); if (f.y > h.y) o.push("D"); if (f.y < h.y) o.push("U");
            want = o.find(d => safe(d) && d !== O[g.dir]) || ["U", "D", "L", "R"].find(d => safe(d) && d !== O[g.dir]); }
        ms += g.interval(); const t = g.ticks; const ev = g.step(want); if (ev.turned) rec.push(t + ":" + want);
    }
    return { score: g.score, turns: rec.join(","), ms };
}

let pass = 0, fail = 0;
const check = (name, cond, extra) => { if (cond) { pass++; console.log("  ✓", name); } else { fail++; console.log("  ✗", name, extra ?? ""); } };

async function playRanked(id, maxScore) {
    advance(2000);
    const s = await call("POST", "/api/session/start", { id });
    const run = botPlay(s.data.seed, maxScore);
    advance(run.ms + 50);
    const f = await call("POST", "/api/session/finish", { id, body: { sessionId: s.data.sessionId, turns: run.turns } });
    return { s, run, f };
}

console.log("Auth");
check("no initData → 401", (await call("POST", "/api/me")).status === 401);
check("forged initData → 401", (await call("POST", "/api/me", { raw: initData({ id: 1, first_name: "x" }, "", "999:WRONG") })).status === 401);
const old = initData({ id: 1, first_name: "x" }); advance(2 * 86400000);
check("expired initData → 401", (await call("POST", "/api/me", { raw: old })).status === 401);
const me = await call("POST", "/api/me", { id: 100 });
check("valid initData → profile", me.status === 200 && me.data.me.name === "User100", me.data);
check("CORS header for allowed origin", me.headers.get("Access-Control-Allow-Origin") === "https://bliawrk0029.github.io");
check("ref link format", me.data.me.refLink === "https://t.me/ggsnake_game_bot/play?startapp=ref_100");

console.log("Referrals");
const b = await call("POST", "/api/me", { id: 200, start: "ref_100" });
await call("POST", "/api/me", { id: 200, start: "ref_999" }); // second open must not change referrer
const self = await call("POST", "/api/me", { id: 300, start: "ref_300" });
check("self-referral ignored", sqlite.prepare("SELECT referrer_id FROM users WHERE id=300").get().referrer_id === null);
check("referrer recorded once", sqlite.prepare("SELECT referrer_id FROM users WHERE id=200").get().referrer_id === 100
    && sqlite.prepare("SELECT ref_total FROM users WHERE id=100").get().ref_total === 1);

console.log("Game + anti-cheat");
const g1 = await playRanked(100);
check("honest run accepted, score matches replay", g1.f.status === 200 && g1.f.data.score === g1.run.score && g1.f.data.newBest, g1.f.data);
const again = await call("POST", "/api/session/finish", { id: 100, body: { sessionId: g1.s.data.sessionId, turns: g1.run.turns } });
check("same session twice → 409", again.status === 409);

advance(2000);
let s = await call("POST", "/api/session/start", { id: 100 });
let run = botPlay(s.data.seed); advance(Math.floor(run.ms * 0.5));
let f = await call("POST", "/api/session/finish", { id: 100, body: { sessionId: s.data.sessionId, turns: run.turns } });
check("too fast run → 422 too_fast", f.status === 422 && f.data.error === "too_fast", f.data);

advance(2000);
s = await call("POST", "/api/session/start", { id: 100 });
run = botPlay(12345); advance(run.ms + 100); // turns from a different seed
f = await call("POST", "/api/session/finish", { id: 100, body: { sessionId: s.data.sessionId, turns: run.turns } });
check("turns from another seed never give claimed score", f.status !== 200 || f.data.score !== run.score || run.score === 0, f.data);

advance(2000);
s = await call("POST", "/api/session/start", { id: 100 });
f = await call("POST", "/api/session/finish", { id: 100, body: { sessionId: s.data.sessionId, turns: "0:U,0:D" } });
check("malformed turns → 422", f.status === 422);

advance(2000);
s = await call("POST", "/api/session/start", { id: 100 });
const s2 = await call("POST", "/api/session/start", { id: 100 });
check("rapid starts rate limited → 429", s2.status === 429);
const steal = await call("POST", "/api/session/finish", { id: 200, body: { sessionId: s.data.sessionId, turns: "" } });
check("cannot finish another user's session → 404", steal.status === 404);
const big = await call("POST", "/api/session/finish", { id: 100, body: { sessionId: s.data.sessionId, turns: "1:U,".repeat(120000) } });
check("oversized payload → 413", big.status === 413);

console.log("Friend points");
const pts = id => sqlite.prepare("SELECT COALESCE(SUM(pts2),0) AS p FROM ref_events WHERE beneficiary=? AND status=0").get(id).p / 2;
for (let i = 0; i < 5; i++) await playRanked(100, 40);            // inviter is an active player
for (let i = 0; i < 5; i++) await playRanked(200, 20);
check("5 games on one day → not counted yet", pts(100) === 0);
advance(86400000);
await playRanked(200, 20);
check("5 games on 2 days → +1 point (event)", pts(100) === 1);
let fr = await call("POST", "/api/friends", { id: 100 });
check("point is on hold for 24h", fr.data.points === 0 && fr.data.pending === 1 && fr.data.friends[0].state === "counted", fr.data);
let lbr = await call("GET", "/api/leaderboard?board=ref", { id: 100 });
check("held point not on the board yet", lbr.data.rows.length === 0);
advance(25 * 3600000);
fr = await call("POST", "/api/friends", { id: 100 });
check("after 24h the point counts", fr.data.points === 1 && fr.data.rank === 1, fr.data);
await playRanked(200, 20);
check("counted only once", pts(100) === 1);

await call("POST", "/api/me", { id: 400, start: "ref_200" });     // friend of a friend
for (let i = 0; i < 5; i++) await playRanked(400, 20);
advance(86400000); await playRanked(400, 20);
check("friend's friend counted → referrer +1, grand-referrer +0.5", pts(200) === 1 && pts(100) === 1.5, [pts(200), pts(100)]);

advance(4 * 86400000); await playRanked(200, 20);                // day 8 since 200 joined
check("friend back on day 7+ → loyal +1", pts(100) === 2.5, pts(100));
advance(25 * 3600000);
lbr = await call("GET", "/api/leaderboard?board=ref", { id: 100 });
check("ref board in points, me marked", lbr.data.rows[0].me && lbr.data.rows[0].value === 2.5, lbr.data.rows);
await call("POST", "/api/me", { id: 600 });                      // inviter who never plays
await call("POST", "/api/me", { id: 601, start: "ref_600" });
for (let i = 0; i < 5; i++) await playRanked(601, 20);
advance(86400000); await playRanked(601, 20); advance(25 * 3600000);
lbr = await call("GET", "/api/leaderboard?board=ref", { id: 100 });
check("inviter with <5 own games not on prize board", pts(600) === 1 && !lbr.data.rows.some(r => r.name === "User600"), lbr.data.rows);
const lbw = await call("GET", "/api/leaderboard?board=ref&period=day", { id: 100 });
check("ref board per day only counts today's held points", lbw.data.rows.length === 0, lbw.data.rows);

env.REF_DAILY_CAP = "1";
for (let i = 0; i < 5; i++) await playRanked(300, 20);
for (const id of [501, 502]) { await call("POST", "/api/me", { id, start: "ref_300" }); for (let i = 0; i < 5; i++) await playRanked(id, 20); }
advance(86400000); for (const id of [501, 502]) await playRanked(id, 20);
const st = sqlite.prepare("SELECT status FROM ref_events WHERE beneficiary=300 ORDER BY id").all().map(r => r.status);
check("over daily cap → manual review", st.join() === "0,1", st);
fr = await call("POST", "/api/friends", { id: 300 });
check("friend in review shown as review", fr.data.friends.some(f => f.state === "review"), fr.data.friends);
env.REF_DAILY_CAP = "15";

console.log("Leaderboards");
await call("POST", "/api/me", { id: 700 });
const lb = await call("GET", "/api/leaderboard?board=score", { id: 700 });
check("score board sorted", lb.data.rows.length >= 2 && lb.data.rows[0].value >= lb.data.rows[1].value, lb.data.rows);
check("no telegram ids leaked", !JSON.stringify(lb.data).includes('"id"'));
check("me row returned when not ranked", lb.data.me && lb.data.me.me === true);
const lbd = await call("GET", "/api/leaderboard?board=score&period=day", { id: 200 });
check("day board has only today's games", lbd.status === 200 && lbd.data.period === "day" && lbd.data.resetsAt > Date.now(), lbd.data);
const lbwk = await call("GET", "/api/leaderboard?board=score&period=week", { id: 100 });
check("week board sorted", lbwk.data.rows.every((r, i, a) => !i || a[i - 1].value >= r.value));

console.log("Bot + admin");
const hookBad = await worker.fetch(new Request("https://api.test/tg/webhook", { method: "POST", body: "{}" }), env);
check("webhook without secret → 403", hookBad.status === 403);
check("admin without key → 403", (await call("GET", "/admin/winners")).status === 403);
const w = await call("GET", "/admin/winners?key=admin-key-1234567890");
check("winners list with prizes", w.status === 200 && w.data.score[0].prize === 300 && w.data.ref[0].prize === 200, w.data);
const ban = await call("POST", "/admin/ban?key=admin-key-1234567890&id=200");
check("ban revokes points earned through that friend", ban.status === 200 && pts(100) === 0.5, pts(100));
const lb2 = await call("GET", "/api/leaderboard?board=score");
check("banned user hidden from board", !lb2.data.rows.some(r => r.name === "User200"));
const runId = sqlite.prepare("SELECT id FROM runs ORDER BY score DESC LIMIT 1").get().id;
const rv = await call("GET", "/admin/run?key=admin-key-1234567890&id=" + runId);
check("stored run re-verifies", rv.data.verify.ok && rv.data.verify.score === rv.data.run.score);

console.log("Contest over");
clock = Date.parse("2026-12-01T00:00:00Z");
const late = await playRanked(100);
check("after end: game accepted but best frozen", late.f.status === 200 && late.f.data.contestOver === true && late.f.data.newBest === false);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
