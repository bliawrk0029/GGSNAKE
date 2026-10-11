// Database schema — applied automatically on first request (idempotent).
export const SCHEMA = `
-- GGSNAKE database schema

CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY,          -- Telegram user id
    first_name    TEXT    NOT NULL DEFAULT '',
    username      TEXT,
    lang          TEXT,
    is_premium    INTEGER NOT NULL DEFAULT 0,
    created_at    INTEGER NOT NULL,
    last_seen     INTEGER NOT NULL,
    best          INTEGER NOT NULL DEFAULT 0,
    best_at       INTEGER,
    games         INTEGER NOT NULL DEFAULT 0,
    total_score   INTEGER NOT NULL DEFAULT 0,
    referrer_id   INTEGER,
    ref_total     INTEGER NOT NULL DEFAULT 0,   -- everyone who joined via link
    ref_active    INTEGER NOT NULL DEFAULT 0,   -- invited users who really played
    ref_active_at INTEGER,
    activated     INTEGER NOT NULL DEFAULT 0,   -- this user already counted for referrer
    banned        INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_users_best ON users (banned, best DESC, best_at ASC);
CREATE INDEX IF NOT EXISTS idx_users_refs ON users (banned, ref_active DESC, ref_active_at ASC);
CREATE INDEX IF NOT EXISTS idx_users_referrer ON users (referrer_id);

CREATE TABLE IF NOT EXISTS sessions (
    id          TEXT    PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    seed        INTEGER NOT NULL,
    started_at  INTEGER NOT NULL,
    finished    INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions (user_id, started_at DESC);

-- Personal-best runs are kept with full replay data so winners can be reviewed
CREATE TABLE IF NOT EXISTS runs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    session_id  TEXT    NOT NULL,
    seed        INTEGER NOT NULL,
    score       INTEGER NOT NULL,
    ticks       INTEGER NOT NULL,
    duration_ms INTEGER NOT NULL,
    turns       TEXT    NOT NULL,
    created_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_runs_user ON runs (user_id, score DESC);
`;
