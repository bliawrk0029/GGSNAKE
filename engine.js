/*
 * GGSNAKE game engine — shared by the browser and the server.
 * Deterministic: the same seed + the same list of turns always gives
 * the same game, so the server can replay a run and verify the score.
 *
 * Classic snake with Snake II-style progression:
 *  - every APPLES_PER_LEVEL apples the level goes up: new maze, faster speed,
 *    the snake starts again from the left with its original length
 *  - a rare bonus "golden" food appears for a short time
 *  - quick apples in a row give a small combo bonus
 */
(function (root) {
    "use strict";

    var VERSION = 3;
    var COLS = 20;
    var ROWS = 24;
    var NAMED_LEVELS = 30;        // after level 30 the game goes on at max speed with new mazes
    var BONUS_EVERY = 4;          // a bonus appears after every 4th apple of a level
    var BONUS_TTL = 30;           // ticks the bonus stays on the field
    var COMBO_WINDOW = 15;        // ticks between apples to count as a combo
    var DIRS = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };
    var OPP = { U: "D", D: "U", L: "R", R: "L" };

    // Hand-made mazes as wall rectangles [x, y, w, h]. Rows 11-13 near the start are always free.
    var MAZES = [
        [],
        [[3, 5, 14, 1], [3, 18, 14, 1]],
        [[2, 2, 5, 1], [2, 2, 1, 5], [13, 2, 5, 1], [17, 2, 1, 5],
         [2, 21, 5, 1], [2, 17, 1, 5], [13, 21, 5, 1], [17, 17, 1, 5]],
        [[6, 2, 1, 7], [13, 2, 1, 7], [6, 15, 1, 7], [13, 15, 1, 7]],
        [[5, 4, 10, 1], [5, 19, 10, 1], [5, 4, 1, 5], [14, 4, 1, 5], [5, 15, 1, 5], [14, 15, 1, 5]],
        [[0, 6, 8, 1], [12, 6, 8, 1], [0, 17, 8, 1], [12, 17, 8, 1], [9, 0, 2, 4], [9, 20, 2, 4]],
        [[3, 0, 1, 8], [7, 0, 1, 8], [11, 0, 1, 8], [15, 0, 1, 8], [5, 16, 1, 8], [9, 16, 1, 8], [13, 16, 1, 8], [17, 16, 1, 8]],
        [[3, 3, 14, 1], [3, 20, 14, 1], [3, 3, 1, 7], [16, 3, 1, 7], [3, 14, 1, 7], [16, 14, 1, 7], [8, 7, 4, 1], [8, 16, 4, 1]],
        [[2, 4, 10, 1], [8, 8, 10, 1], [2, 16, 10, 1], [8, 19, 10, 1], [16, 12, 1, 5]],
        [[3, 3, 2, 2], [8, 3, 2, 2], [13, 3, 2, 2], [17, 7, 2, 2], [3, 7, 2, 2], [8, 7, 2, 2], [13, 7, 2, 2],
         [3, 16, 2, 2], [8, 16, 2, 2], [13, 16, 2, 2], [17, 16, 2, 2], [3, 20, 2, 2], [8, 20, 2, 2], [13, 20, 2, 2], [17, 20, 2, 2], [15, 11, 2, 3]],
        [[1, 1, 18, 1], [18, 1, 1, 9], [4, 4, 12, 1], [4, 4, 1, 5], [1, 22, 18, 1], [1, 14, 1, 9], [4, 19, 12, 1], [15, 15, 1, 5]],
        [[9, 0, 2, 9], [9, 15, 2, 9], [14, 10, 6, 1], [14, 14, 6, 1], [3, 5, 4, 1], [3, 18, 4, 1]]
    ];

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

    // Difficulty curve: faster every level, more apples to clear, longer start
    function intervalFor(level) { return Math.max(48, Math.round(150 * Math.pow(0.955, level - 1))); }
    function applesFor(level) { return Math.min(25, 8 + level); }
    function startLength(level) { return Math.min(7, 3 + Math.floor((level - 1) / 2)); }
    function applePoints(level) { return 5 + level * 5; }

    function inStartLane(x, y) { return y >= 10 && y <= 14 && x <= 12; }

    // Levels 1-12 are hand-made. From level 13 a hand-made maze is mirrored and
    // extra blocks are added (the same for every player), checked for reachability.
    function mazeCells(level, cols, rows) {
        var base = level <= MAZES.length ? MAZES[level - 1] : MAZES[1 + (level - MAZES.length - 1) % (MAZES.length - 1)];
        var flipX = level > MAZES.length && (level % 2 === 0);
        var flipY = level > MAZES.length && (level % 3 === 0);
        var set = {}, cells = [];
        function add(x, y) {
            if (x < 0 || y < 0 || x >= cols || y >= rows) return;
            if (flipX) x = cols - 1 - x;
            if (flipY) y = rows - 1 - y;
            if (inStartLane(x, y) || set[x + "," + y]) return;
            set[x + "," + y] = 1; cells.push({ x: x, y: y });
        }
        for (var i = 0; i < base.length; i++) {
            var r = base[i];
            for (var x = r[0]; x < r[0] + r[2]; x++)
                for (var y = r[1]; y < r[1] + r[3]; y++) add(x, y);
        }
        if (level > MAZES.length) {
            var rand = rng(level * 7919 + 13);
            var extra = Math.min(24, (level - MAZES.length) * 2);
            for (var k = 0; k < extra; k++) {
                var bx = Math.floor(rand() * cols), by = Math.floor(rand() * rows);
                var before = cells.length;
                add(bx, by);
                if (cells.length > before && !connected(set, cols, rows)) {
                    var c = cells.pop(); delete set[c.x + "," + c.y];
                }
            }
        }
        return cells;
    }

    // Every free cell must be reachable from the start
    function connected(set, cols, rows) {
        var start = "6," + Math.floor(rows / 2), seen = {}, q = [start], n = 0, free = 0;
        for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) if (!set[x + "," + y]) free++;
        seen[start] = 1;
        while (q.length) {
            var c = q.pop().split(","), cx = +c[0], cy = +c[1]; n++;
            var nb = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
            for (var i = 0; i < 4; i++) {
                var k = nb[i][0] + "," + nb[i][1];
                if (nb[i][0] < 0 || nb[i][1] < 0 || nb[i][0] >= cols || nb[i][1] >= rows || set[k] || seen[k]) continue;
                seen[k] = 1; q.push(k);
            }
        }
        return n === free;
    }

    function create(opts) {
        var cols = (opts && opts.cols) || COLS;
        var rows = (opts && opts.rows) || ROWS;
        var wrap = !!(opts && opts.mode === "wrap");
        var rand = rng((opts && opts.seed) || 1);

        var g = {
            cols: cols, rows: rows, wrap: wrap,
            snake: [], dir: "R", food: null, bonus: null, walls: [],
            score: 0, eaten: 0, levelEaten: 0, stage: 1,
            ticks: 0, lastAppleTick: -1000, combo: 0,
            alive: true, won: false
        };
        var wallSet = {};

        function key(x, y) { return x + "," + y; }

        function startLevel() {
            var y = Math.floor(rows / 2), L = startLength(g.stage);
            g.snake = [];
            for (var s = 0; s < L; s++) g.snake.push({ x: 6 - s, y: y });
            g.dir = "R";
            g.walls = mazeCells(g.stage, cols, rows);
            wallSet = {};
            for (var i = 0; i < g.walls.length; i++) wallSet[key(g.walls[i].x, g.walls[i].y)] = 1;
            g.bonus = null;
            g.levelEaten = 0;
            g.lastAppleTick = -1000;
            g.combo = 0;
            g.food = placeFree();
        }

        function placeFree() {
            var occ = {};
            for (var i = 0; i < g.snake.length; i++) occ[key(g.snake[i].x, g.snake[i].y)] = 1;
            if (g.food) occ[key(g.food.x, g.food.y)] = 1;
            if (g.bonus) occ[key(g.bonus.x, g.bonus.y)] = 1;
            var empty = [];
            for (var yy = 0; yy < rows; yy++)
                for (var xx = 0; xx < cols; xx++)
                    if (!occ[key(xx, yy)] && !wallSet[key(xx, yy)]) empty.push({ x: xx, y: yy });
            if (!empty.length) return null;
            return empty[Math.floor(rand() * empty.length)];
        }

        g.isWall = function (x, y) { return !!wallSet[key(x, y)]; };

        // Advance one tick. `turn` is "U"|"D"|"L"|"R" or falsy.
        g.step = function (turn) {
            var ev = { ate: false, bonus: false, combo: false, levelUp: false, dead: false, won: false, turned: false, points: 0 };
            if (!g.alive) return ev;

            if (turn && DIRS[turn] && turn !== g.dir && turn !== OPP[g.dir]) {
                g.dir = turn;
                ev.turned = true;
            }

            var d = DIRS[g.dir];
            var head = { x: g.snake[0].x + d[0], y: g.snake[0].y + d[1] };
            g.ticks++;

            if (g.bonus) {
                g.bonus.ttl--;
                if (g.bonus.ttl <= 0) g.bonus = null;
            }

            if (wrap) {
                head.x = (head.x + cols) % cols;
                head.y = (head.y + rows) % rows;
            } else if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) {
                g.alive = false; ev.dead = true; return ev;
            }
            if (wallSet[key(head.x, head.y)]) { g.alive = false; ev.dead = true; return ev; }

            var ate = g.food && head.x === g.food.x && head.y === g.food.y;
            var len = ate ? g.snake.length : g.snake.length - 1;
            for (var i = 0; i < len; i++) {
                if (g.snake[i].x === head.x && g.snake[i].y === head.y) {
                    g.alive = false; ev.dead = true; return ev;
                }
            }

            g.snake.unshift(head);

            if (g.bonus && head.x === g.bonus.x && head.y === g.bonus.y) {
                var bp = 50 + g.bonus.ttl * 2;
                g.score += bp; ev.points += bp; ev.bonus = true;
                g.bonus = null;
            }

            if (ate) {
                var pts = applePoints(g.stage);
                if (g.ticks - g.lastAppleTick <= COMBO_WINDOW) { g.combo++; pts += 5 * Math.min(g.combo, 5); ev.combo = true; }
                else g.combo = 0;
                g.lastAppleTick = g.ticks;
                g.score += pts; ev.points += pts;
                g.eaten++; g.levelEaten++;
                ev.ate = true;

                if (g.levelEaten >= applesFor(g.stage)) {
                    var bonusLv = 50 * g.stage;
                    g.score += bonusLv; ev.points += bonusLv;
                    g.stage++;
                    ev.levelUp = true;
                    startLevel();
                    return ev;
                }
                g.food = placeFree();
                if (!g.food) { g.alive = false; g.won = true; ev.won = true; return ev; }
                if (g.levelEaten % BONUS_EVERY === 0 && !g.bonus) {
                    var b = placeFree();
                    if (b) g.bonus = { x: b.x, y: b.y, ttl: BONUS_TTL };
                }
            } else {
                g.snake.pop();
            }
            return ev;
        };

        g.level = function () { return g.stage; };
        g.interval = function () { return intervalFor(g.stage); };
        g.applesLeft = function () { return applesFor(g.stage) - g.levelEaten; };

        startLevel();
        return g;
    }

    /*
     * Replay a recorded run. `turns` is "tick:DIR,tick:DIR,..." where tick is the
     * 0-based step index at which the turn was applied.
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
            ok: true, score: g.score, ticks: g.ticks, eaten: g.eaten,
            length: g.snake.length, level: g.stage, won: g.won, minDurationMs: minMs
        };
    }

    root.GGEngine = {
        VERSION: VERSION, COLS: COLS, ROWS: ROWS, NAMED_LEVELS: NAMED_LEVELS,
        MAZES: MAZES.length, mazeCells: mazeCells, connected: connected,
        create: create, replay: replay, intervalFor: intervalFor, applesFor: applesFor
    };
})(typeof globalThis !== "undefined" ? globalThis : this);
