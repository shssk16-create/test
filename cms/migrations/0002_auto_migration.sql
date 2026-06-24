CREATE TABLE certificates (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  is_deleted INTEGER DEFAULT 0,
  published_version INTEGER DEFAULT 1,
  draft_version INTEGER DEFAULT 1,
  name TEXT,
  issuer TEXT,
  date TEXT,
  credential_url TEXT,
  image TEXT
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  is_deleted INTEGER DEFAULT 0,
  published_version INTEGER DEFAULT 1,
  draft_version INTEGER DEFAULT 1,
  title TEXT,
  subtitle TEXT,
  accentColor TEXT,
  thumbIcon TEXT,
  problem TEXT,
  decision TEXT,
  result TEXT,
  year TEXT,
  featured INTEGER,
  logo TEXT,
  link TEXT
);