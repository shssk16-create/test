CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  is_deleted INTEGER DEFAULT 0,
  published_version INTEGER DEFAULT 1,
  draft_version INTEGER DEFAULT 1,
  title TEXT,
  slug TEXT,
  body TEXT,
  cover_image TEXT,
  published_at TEXT,
  status TEXT
);