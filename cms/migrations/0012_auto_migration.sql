CREATE TABLE media (
  id TEXT PRIMARY KEY,
  owner TEXT DEFAULT 'salmeen',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  is_deleted INTEGER DEFAULT 0,
  published_version INTEGER DEFAULT 1,
  draft_version INTEGER DEFAULT 1,
  key TEXT,
  name TEXT,
  size TEXT,
  mime_type TEXT,
  url TEXT
);