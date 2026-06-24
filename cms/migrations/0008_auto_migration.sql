CREATE TABLE heroes (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  is_deleted INTEGER DEFAULT 0,
  published_version INTEGER DEFAULT 1,
  draft_version INTEGER DEFAULT 1,
  name_ar TEXT,
  name_en TEXT,
  title_ar TEXT,
  title_en TEXT,
  subtitle_ar TEXT,
  subtitle_en TEXT,
  whatsapp_number TEXT
);

CREATE TABLE logos (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  is_deleted INTEGER DEFAULT 0,
  published_version INTEGER DEFAULT 1,
  draft_version INTEGER DEFAULT 1,
  name TEXT,
  imageUrl TEXT,
  sort_order TEXT
);