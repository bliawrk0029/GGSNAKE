/*
 * GGSNAKE game engine — shared by the browser and the server.
 * Deterministic: the same seed + the same list of turns always gives
 * the same game, so the server can replay a run and verify the score.
 */
(function (root) {
    "use strict";

    var COLS = 20;
    var ROWS = 24;
    var DIRS = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };
    var OPP = { U: "D", D: "U", L: "R", R: "L" };

    // Small fast seeded RNG (mulberry32)
    function rng(seed) {
        var a = seed >>> 0;
        return function () {
            a = (a + 0x6D2B79F5) >>> 0;
            var t = a;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function levelFor(score) { return Math.min(9, 1 + Math.floor(score / 50)); }
    function intervalFor(score) { return Math.max(60, 150 - (levelFor(score) - 1) * 11); }

    function create(opts) {
        var cols = (opts && opts.cols) || COLS;
        var rows = (opts && opts.rows) || ROWS;
        var wrap = !!(opts && opts.mode === "wrap");
        var rand = rng((opts && opts.seed) || 1);
        var y = Math.floor(rows / 2);

        var g = {
            cols: cols, rows: rows, wrap: wrap,
            snake: [{ x: 6, y: y }, { x: 5, y: y }, { x: 4, y: y }],
            dir: "R",
            food: null,
            score: 0,
            eaten: 0,
            ticks: 0,
            alive: true,
            won: false
        };

        function placeFood() {
            var occ = {};
            for (var i = 0; i < g.snake.length; i++) occ[g.snake[i].x + "," + g.snake[i].y] = 1;
            var empty = [];
            for (var yy = 0; yy < rows; yy++)
                for (var xx = 0; xx < cols; xx++)
                    if (!occ[xx + "," + yy]) empty.push({ x: xx, y: yy });
            if (!empty.length) { g.food = null; return false; }
            g.food = empty[Math.floor(rand() * empty.length)];
            return true;
        }

        // Advance one tick. `turn` is "U"|"D"|"L"|"R" or falsy.
        // Returns { ate, dead, won, turned }.
        g.step = function (turn) {
            var ev = { ate: false, dead: false, won: false, turned: false };
            if (!g.alive) return ev;

            if (turn && DIRS[turn] && turn !== g.dir && turn !== OPP[g.dir]) {
                g.dir = turn;
                ev.turned = true;
            }

            var d = DIRS[g.dir];
            var head = { x: g.snake[0].x + d[0], y: g.snake[0].y + d[1] };
            g.ticks++;

            if (wrap) {
                head.x = (head.x + cols) % cols;
                head.y = (head.y + rows) % rows;
            } else if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) {
                g.alive = false; ev.dead = true; return ev;
            }

            var ate = g.food && head.x === g.food.x && head.y === g.food.y;
            var len = ate ? g.snake.length : g.snake.length - 1;
            for (var i = 0; i < len; i++) {
                if (g.snake[i].x === head.x && g.snake[i].y === head.y) {
                    g.alive = false; ev.dead = true; return ev;
                }
            }

            g.snake.unshift(head);
            if (ate) {
                g.score += 10;
                g.eaten++;
                ev.ate = true;
                if (!placeFood()) { g.alive = false; g.won = true; ev.won = true; }
            } else {
                g.snake.pop();
            }
            return ev;
        };

        g.level = function () { return levelFor(g.score); };
        g.interval = function () { return intervalFor(g.score); };

        placeFood();
        return g;
    }

    /*
     * Replay a recorded run. `turns` is a string "tick:DIR,tick:DIR,..."
     * where tick is the 0-based step index at which the turn was applied.
     * Returns { ok, score, ticks, eaten, length, won, minDurationMs, error }.
     */
    function replay(seed, turns, maxTicks) {
        maxTicks = maxTicks || 200000;
        var list = [];
        if (turns) {
            var parts = String(turns).split(",");
            var last = -1;
            for (var i = 0; i < parts.length; i++) {
                var p = parts[i].split(":");
                var t = parseInt(p[0], 10);
                if (p.length !== 2 || !(t >= 0) || String(t) !== p[0] || !DIRS[p[1]] || t <= last) {
                    return { ok: false, error: "bad_turns" };
                }
                list.push([t, p[1]]);
                last = t;
            }
        }

        var g = create({ seed: seed, mode: "classic" });
        var k = 0, minMs = 0;
        while (g.alive && g.ticks < maxTicks) {
            var turn = null;
            if (k < list.length && list[k][0] === g.ticks) { turn = list[k][1]; k++; }
            minMs += g.interval();
            g.step(turn);
        }
        if (g.alive) return { ok: false, error: "too_long" };
        if (k !== list.length) return { ok: false, error: "turns_after_end" };

        return {
            ok: true,
            score: g.score,
            ticks: g.ticks,
            eaten: g.eaten,
            length: g.snake.length,
            won: g.won,
            minDurationMs: minMs
        };
    }

    var api = {
        COLS: COLS, ROWS: ROWS,
        create: create, replay: replay,
        levelFor: levelFor, intervalFor: intervalFor
    };

    root.GGEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
