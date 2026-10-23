# GGSNAKE

Classic snake as a Telegram Mini App — global leaderboard, referrals and a prize contest.

| Part | Where |
|---|---|
| Game (static) | `index.html` + `engine.js` → GitHub Pages: https://bliawrk0029.github.io/GGSNAKE/ |
| API | `worker/` → Cloudflare Workers + D1 |
| Bot | @ggsnake_game_bot, Mini App short name `play` |

## How scores are protected
1. The client asks the API for a session; the server returns a random seed.
2. The game is deterministic (`engine.js`): same seed + same turns = same game.
3. On game over the client sends only the list of turns. The server replays the game and computes the score itself.
4. A run that finishes faster than the game's own speed is rejected. One submission per session.
5. Every request is signed by Telegram (`initData` HMAC with the bot token).
6. Admin endpoints: key only in a header, 32+ chars; the webhook needs a 32+ char secret.

## Test
```
node worker/test/e2e.mjs
```

## Admin
Admin endpoints accept the key **only** in the `X-Admin-Key` header (never in the URL), and only if it is 32+ characters. They send no CORS headers, so no web page can call them.

On Windows use the helper — it asks for the key and never saves it:
```
.\tools\admin.ps1 stats | winners | setup | user ID | run ID | ban ID | unban ID | reset-season
```
