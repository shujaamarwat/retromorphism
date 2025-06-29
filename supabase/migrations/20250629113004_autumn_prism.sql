/*
  # Create missing database tables for MindForge application

  1. New Tables
    - `virtuas` - AI companions for different life domains
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `domain` (text)
      - `level` (integer, default 1)
      - `xp` (integer, default 0)
      - `evolution_stage` (integer, default 1)
      - `avatar_url` (text, optional)
      - `traits` (jsonb, default {})
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `quests` - Goal-oriented collections of tasks
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `virtua_id` (uuid, optional foreign key to virtuas)
      - `title` (text)
      - `description` (text, optional)
      - `status` (enum: active, completed, paused)
      - `priority` (integer, default 1)
      - `due_date` (timestamptz, optional)
      - `completion_rate` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `tasks` - Individual actionable items
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `quest_id` (uuid, optional foreign key to quests)
      - `title` (text)
      - `description` (text, optional)
      - `completed` (boolean, default false)
      - `difficulty` (integer, default 1)
      - `priority` (integer, default 1)
      - `xp_reward` (integer, default 10)
      - `due_date` (timestamptz, optional)
      - `scheduled_at` (timestamptz, optional)
      - `dependencies` (text array, default {})
      - `tags` (text array, default {})
      - `context` (text, optional)
      - `estimated_duration` (integer, optional)
      - `actual_duration` (integer, optional)
      - `completed_at` (timestamptz, optional)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `runes` - Achievement system items
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `criteria` (jsonb)
      - `rarity` (enum: common, rare, epic, legendary)
      - `xp_bonus` (integer, default 0)
      - `created_at` (timestamptz)

    - `user_runes` - User's earned runes
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `rune_id` (uuid, foreign key to runes)
      - `earned_at` (timestamptz)

    - `streak_logs` - Daily streak tracking
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `date` (date)
      - `tasks_completed` (integer, default 0)
      - `total_tasks` (integer, default 0)
      - `xp_earned` (integer, default 0)
      - `streak_maintained` (boolean, default false)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add foreign key constraints for data integrity

  3. Indexes
    - Add performance indexes for common queries
*/

-- Create custom types
DO $$ BEGIN
    CREATE TYPE quest_status AS ENUM ('active', 'completed', 'paused');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE rune_rarity AS ENUM ('common', 'rare', 'epic', 'legendary');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create virtuas table
CREATE TABLE IF NOT EXISTS virtuas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  domain text NOT NULL,
  level integer DEFAULT 1,
  xp integer DEFAULT 0,
  evolution_stage integer DEFAULT 1,
  avatar_url text,
  traits jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quests table
CREATE TABLE IF NOT EXISTS quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  virtua_id uuid REFERENCES virtuas(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  status quest_status DEFAULT 'active',
  priority integer DEFAULT 1,
  due_date timestamptz,
  completion_rate integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quest_id uuid REFERENCES quests(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  difficulty integer DEFAULT 1,
  priority integer DEFAULT 1,
  xp_reward integer DEFAULT 10,
  due_date timestamptz,
  scheduled_at timestamptz,
  dependencies text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  context text,
  estimated_duration integer,
  actual_duration integer,
  completed_at timestamptz,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create runes table
CREATE TABLE IF NOT EXISTS runes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  criteria jsonb NOT NULL,
  rarity rune_rarity DEFAULT 'common',
  xp_bonus integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_runes table
CREATE TABLE IF NOT EXISTS user_runes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rune_id uuid NOT NULL REFERENCES runes(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, rune_id)
);

-- Create streak_logs table
CREATE TABLE IF NOT EXISTS streak_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  tasks_completed integer DEFAULT 0,
  total_tasks integer DEFAULT 0,
  xp_earned integer DEFAULT 0,
  streak_maintained boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE virtuas ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE runes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_runes ENABLE ROW LEVEL SECURITY;
ALTER TABLE streak_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for virtuas
CREATE POLICY "Users can read own virtuas"
  ON virtuas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own virtuas"
  ON virtuas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own virtuas"
  ON virtuas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own virtuas"
  ON virtuas
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for quests
CREATE POLICY "Users can read own quests"
  ON quests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quests"
  ON quests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quests"
  ON quests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own quests"
  ON quests
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for tasks
CREATE POLICY "Users can read own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for runes (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read runes"
  ON runes
  FOR SELECT
  TO authenticated
  USING (true);

-- Create RLS policies for user_runes
CREATE POLICY "Users can read own runes"
  ON user_runes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own runes"
  ON user_runes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own runes"
  ON user_runes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create RLS policies for streak_logs
CREATE POLICY "Users can read own streak logs"
  ON streak_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak logs"
  ON streak_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak logs"
  ON streak_logs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_virtuas_user_id ON virtuas(user_id);
CREATE INDEX IF NOT EXISTS idx_quests_user_id ON quests(user_id);
CREATE INDEX IF NOT EXISTS idx_quests_virtua_id ON quests(virtua_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_quest_id ON tasks(quest_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_user_runes_user_id ON user_runes(user_id);
CREATE INDEX IF NOT EXISTS idx_streak_logs_user_id ON streak_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_streak_logs_date ON streak_logs(date);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_virtuas_updated_at'
  ) THEN
    CREATE TRIGGER update_virtuas_updated_at
      BEFORE UPDATE ON virtuas
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_quests_updated_at'
  ) THEN
    CREATE TRIGGER update_quests_updated_at
      BEFORE UPDATE ON quests
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_tasks_updated_at'
  ) THEN
    CREATE TRIGGER update_tasks_updated_at
      BEFORE UPDATE ON tasks
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;