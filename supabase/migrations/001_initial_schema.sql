-- ============================================================
-- Life RPG — Initial Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE quest_category AS ENUM (
  'study', 'coding', 'fitness', 'reading',
  'creativity', 'social', 'habit', 'other'
);

CREATE TYPE quest_difficulty AS ENUM ('easy', 'medium', 'hard', 'legendary');

CREATE TYPE quest_status AS ENUM ('active', 'completed', 'failed');

CREATE TYPE item_type AS ENUM ('theme', 'badge', 'title', 'avatar_frame');

CREATE TYPE item_rarity AS ENUM ('common', 'rare', 'epic', 'legendary');

CREATE TYPE avatar_class AS ENUM ('warrior', 'mage', 'rogue', 'ranger');

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================

CREATE TABLE profiles (
  id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username          TEXT UNIQUE NOT NULL,
  avatar_class      avatar_class NOT NULL DEFAULT 'warrior',
  level             INT NOT NULL DEFAULT 1,
  xp                INT NOT NULL DEFAULT 0,
  gold              INT NOT NULL DEFAULT 0,
  streak_count      INT NOT NULL DEFAULT 0,
  last_quest_date   DATE,
  equipped_theme    TEXT NOT NULL DEFAULT 'default',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CHARACTER ATTRIBUTES
-- ============================================================

CREATE TABLE character_attributes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  strength      INT NOT NULL DEFAULT 1,
  intelligence  INT NOT NULL DEFAULT 1,
  agility       INT NOT NULL DEFAULT 1,
  endurance     INT NOT NULL DEFAULT 1,
  charisma      INT NOT NULL DEFAULT 1,
  creativity    INT NOT NULL DEFAULT 1,
  wisdom        INT NOT NULL DEFAULT 1,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================================
-- QUESTS
-- ============================================================

CREATE TABLE quests (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  category      quest_category NOT NULL DEFAULT 'other',
  difficulty    quest_difficulty NOT NULL DEFAULT 'medium',
  xp_reward     INT NOT NULL,
  gold_reward   INT NOT NULL,
  status        quest_status NOT NULL DEFAULT 'active',
  due_date      DATE,
  completed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SHOP ITEMS
-- ============================================================

CREATE TABLE shop_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  description   TEXT,
  type          item_type NOT NULL,
  cost          INT NOT NULL,
  icon          TEXT NOT NULL DEFAULT '🎁',
  rarity        item_rarity NOT NULL DEFAULT 'common',
  metadata      JSONB NOT NULL DEFAULT '{}'
);

-- ============================================================
-- USER INVENTORY
-- ============================================================

CREATE TABLE user_inventory (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_id       UUID NOT NULL REFERENCES shop_items(id) ON DELETE CASCADE,
  purchased_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_equipped   BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(user_id, item_id)
);

-- ============================================================
-- BADGES
-- ============================================================

CREATE TABLE badges (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  description      TEXT,
  icon             TEXT NOT NULL DEFAULT '🏆',
  condition_type   TEXT NOT NULL,
  condition_value  INT NOT NULL
);

-- ============================================================
-- USER BADGES
-- ============================================================

CREATE TABLE user_badges (
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id   UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );

  INSERT INTO character_attributes (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER quests_updated_at
  BEFORE UPDATE ON quests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER character_attributes_updated_at
  BEFORE UPDATE ON character_attributes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Character attributes: users can read/update their own
CREATE POLICY "char_attrs_select_own" ON character_attributes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "char_attrs_update_own" ON character_attributes FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Quests: users can CRUD their own
CREATE POLICY "quests_select_own" ON quests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "quests_insert_own" ON quests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "quests_update_own" ON quests FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "quests_delete_own" ON quests FOR DELETE USING (auth.uid() = user_id);

-- Shop items: read-only for all authenticated users
CREATE POLICY "shop_items_select_auth" ON shop_items FOR SELECT USING (auth.role() = 'authenticated');

-- User inventory: users can read/insert their own
CREATE POLICY "inventory_select_own" ON user_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "inventory_insert_own" ON user_inventory FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "inventory_update_own" ON user_inventory FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Badges: read-only for all authenticated users
CREATE POLICY "badges_select_auth" ON badges FOR SELECT USING (auth.role() = 'authenticated');

-- User badges: users can read their own
CREATE POLICY "user_badges_select_own" ON user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_badges_insert_own" ON user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_quests_user_id ON quests(user_id);
CREATE INDEX idx_quests_status ON quests(user_id, status);
CREATE INDEX idx_user_inventory_user ON user_inventory(user_id);
CREATE INDEX idx_user_badges_user ON user_badges(user_id);
