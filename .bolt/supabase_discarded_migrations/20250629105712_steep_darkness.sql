/*
  # MindForge Database Schema

  1. New Tables
    - `users` - User profiles and preferences
    - `virtuas` - Domain-specific creatures that users train
    - `quests` - Collections of related tasks
    - `tasks` - Individual actionable items
    - `recurrences` - Recurring task patterns
    - `chains` - Habit chains linking tasks
    - `runes` - Achievement badges/rewards
    - `user_runes` - User's earned runes
    - `streak_log` - Daily completion tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  total_xp integer DEFAULT 0,
  level integer DEFAULT 1,
  streak_count integer DEFAULT 0,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Virtuas table (domain-specific creatures)
CREATE TABLE IF NOT EXISTS virtuas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  domain text NOT NULL, -- Focus, Fitness, Learning, etc.
  level integer DEFAULT 1,
  xp integer DEFAULT 0,
  evolution_stage integer DEFAULT 1,
  avatar_url text,
  traits jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quests table (collections of related tasks)
CREATE TABLE IF NOT EXISTS quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  virtua_id uuid REFERENCES virtuas(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  priority integer DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  due_date timestamptz,
  completion_rate numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table (individual actionable items)
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  quest_id uuid REFERENCES quests(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  difficulty integer DEFAULT 2 CHECK (difficulty BETWEEN 1 AND 5),
  priority integer DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  xp_reward integer DEFAULT 10,
  due_date timestamptz,
  scheduled_at timestamptz,
  dependencies uuid[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  context text, -- @home, @work, @computer, etc.
  estimated_duration integer, -- minutes
  actual_duration integer, -- minutes
  completed_at timestamptz,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Recurrences table (recurring task patterns)
CREATE TABLE IF NOT EXISTS recurrences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  pattern text NOT NULL, -- daily, weekly, monthly, custom
  interval_value integer DEFAULT 1,
  days_of_week integer[] DEFAULT '{}', -- 0=Sunday, 1=Monday, etc.
  end_date timestamptz,
  next_due timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Chains table (habit chains)
CREATE TABLE IF NOT EXISTS chains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  task_ids uuid[] NOT NULL,
  current_step integer DEFAULT 0,
  completed_cycles integer DEFAULT 0,
  streak_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Runes table (achievement badges)
CREATE TABLE IF NOT EXISTS runes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  criteria jsonb NOT NULL, -- conditions for earning
  rarity text DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  xp_bonus integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- User runes table (earned achievements)
CREATE TABLE IF NOT EXISTS user_runes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rune_id uuid REFERENCES runes(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, rune_id)
);

-- Streak log table (daily completion tracking)
CREATE TABLE IF NOT EXISTS streak_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  tasks_completed integer DEFAULT 0,
  total_tasks integer DEFAULT 0,
  xp_earned integer DEFAULT 0,
  streak_maintained boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtuas ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurrences ENABLE ROW LEVEL SECURITY;
ALTER TABLE chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE runes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_runes ENABLE ROW LEVEL SECURITY;
ALTER TABLE streak_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for virtuas
CREATE POLICY "Users can manage own virtuas"
  ON virtuas FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for quests
CREATE POLICY "Users can manage own quests"
  ON quests FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for tasks
CREATE POLICY "Users can manage own tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for recurrences
CREATE POLICY "Users can manage own recurrences"
  ON recurrences FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM tasks 
    WHERE tasks.id = recurrences.task_id 
    AND tasks.user_id = auth.uid()
  ));

-- RLS Policies for chains
CREATE POLICY "Users can manage own chains"
  ON chains FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for runes (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read runes"
  ON runes FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_runes
CREATE POLICY "Users can manage own earned runes"
  ON user_runes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for streak_log
CREATE POLICY "Users can manage own streak log"
  ON streak_log FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date, completed);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_quest_id ON tasks(quest_id);
CREATE INDEX IF NOT EXISTS idx_virtuas_user_id ON virtuas(user_id);
CREATE INDEX IF NOT EXISTS idx_quests_user_id ON quests(user_id);
CREATE INDEX IF NOT EXISTS idx_streak_log_user_date ON streak_log(user_id, date);

-- GIN index for array operations
CREATE INDEX IF NOT EXISTS idx_tasks_dependencies ON tasks USING GIN(dependencies);
CREATE INDEX IF NOT EXISTS idx_tasks_tags ON tasks USING GIN(tags);

-- Insert default runes
INSERT INTO runes (name, description, icon, criteria, rarity, xp_bonus) VALUES
('First Steps', 'Complete your first task', '🎯', '{"tasks_completed": 1}', 'common', 10),
('Streak Starter', 'Maintain a 3-day streak', '🔥', '{"streak_days": 3}', 'common', 25),
('Week Warrior', 'Complete tasks for 7 consecutive days', '⚔️', '{"streak_days": 7}', 'rare', 50),
('Quest Master', 'Complete your first quest', '👑', '{"quests_completed": 1}', 'rare', 75),
('XP Hunter', 'Earn 1000 total XP', '💎', '{"total_xp": 1000}', 'epic', 100),
('Virtua Trainer', 'Level up a Virtua to level 5', '🐉', '{"virtua_level": 5}', 'epic', 150),
('Legendary Focus', 'Maintain a 30-day streak', '🌟', '{"streak_days": 30}', 'legendary', 500);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_virtuas_updated_at BEFORE UPDATE ON virtuas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quests_updated_at BEFORE UPDATE ON quests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chains_updated_at BEFORE UPDATE ON chains FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();