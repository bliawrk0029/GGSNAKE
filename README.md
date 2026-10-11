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

## Test
```
node worker/test/e2e.mjs
```

## Admin (replace KEY with ADMIN_KEY)
- `GET  /admin/setup?key=KEY` — set bot webhook, menu button, commands
- `GET  /admin/stats?key=KEY` — players, games, referrals
- `GET  /admin/winners?key=KEY` — current prize places
- `GET  /admin/user?key=KEY&id=TG_ID` — player, best runs, invited friends
- `GET  /admin/run?key=KEY&id=RUN_ID` — stored run + server re-verification
- `POST /admin/ban?key=KEY&id=TG_ID` (`&banned=0` to unban)
- `POST /admin/reset-season?key=KEY&confirm=yes` — wipe scores before launch
