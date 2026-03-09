-- Prompt Engineering Science Platform
-- PostgreSQL Schema

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Templates (static — loaded from markdown files, seeded at startup)
CREATE TABLE IF NOT EXISTS templates (
  id           VARCHAR(60) PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  description  TEXT,
  category     VARCHAR(60),
  domain       VARCHAR(60),
  content      JSONB,          -- full parsed template content
  brackets     TEXT[],         -- extracted [BRACKET] placeholders
  examples     JSONB,
  pro_tips     TEXT[],
  quality_score INTEGER,       -- pre-computed average effectiveness score
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE,
  github_id     VARCHAR(100) UNIQUE,
  name          VARCHAR(255),
  avatar_url    TEXT,
  subscription  VARCHAR(50) DEFAULT 'free',
  preferences   JSONB DEFAULT '{}',
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Saved user prompts
CREATE TABLE IF NOT EXISTS user_prompts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  template_id   VARCHAR(60) REFERENCES templates(id),
  name          VARCHAR(255),
  prompt_text   TEXT NOT NULL,
  quality_score INTEGER,       -- 0–30
  tags          TEXT[],
  rating        VARCHAR(20),   -- yes / no / okay
  is_public     BOOLEAN DEFAULT false,
  usage_count   INTEGER DEFAULT 0,
  last_used_at  TIMESTAMP,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

-- Analytics events (anonymous-first)
CREATE TABLE IF NOT EXISTS analytics_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type   VARCHAR(100) NOT NULL,
  template_id  VARCHAR(60),
  user_id      UUID,           -- NULL for anonymous
  session_id   VARCHAR(100),
  quality_score INTEGER,
  metadata     JSONB DEFAULT '{}',
  ip_address   VARCHAR(45),
  created_at   TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_prompts_user_id      ON user_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_prompts_template_id  ON user_prompts(template_id);
CREATE INDEX IF NOT EXISTS idx_user_prompts_created_at   ON user_prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type      ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at      ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_session         ON analytics_events(session_id);
