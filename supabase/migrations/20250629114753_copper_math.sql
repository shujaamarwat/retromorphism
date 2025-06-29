/*
  # Habit Chains & Dependencies System

  1. New Tables
    - `chains` - Habit chain definitions
    - `chain_steps` - Individual steps in a habit chain
    - `chain_completions` - Track chain completion progress
    - `task_dependencies` - Enhanced task dependency tracking

  2. Enhanced Tables
    - Update `tasks` table with chain-related fields
    - Add dependency validation triggers

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Create chains table for habit chain definitions
CREATE TABLE IF NOT EXISTS chains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  category text DEFAULT 'general',
  target_frequency integer DEFAULT 1, -- How often per period
  frequency_period text DEFAULT 'daily', -- daily, weekly, monthly
  chain_length integer DEFAULT 7, -- Number of steps in chain
  current_streak integer DEFAULT 0,
  best_streak integer DEFAULT 0,
  is_active boolean DEFAULT true,
  auto_advance boolean DEFAULT true, -- Auto-advance to next step
  reward_xp integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chain_steps table for individual steps in chains
CREATE TABLE IF NOT EXISTS chain_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chain_id uuid NOT NULL REFERENCES chains(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  title text NOT NULL,
  description text,
  estimated_duration integer, -- in minutes
  required_context text, -- @home, @work, etc.
  prerequisites jsonb DEFAULT '[]'::jsonb, -- Array of required conditions
  validation_criteria jsonb DEFAULT '{}'::jsonb, -- How to validate completion
  xp_reward integer DEFAULT 10,
  is_milestone boolean DEFAULT false, -- Special milestone steps
  created_at timestamptz DEFAULT now()
);

-- Create chain_completions table to track progress
CREATE TABLE IF NOT EXISTS chain_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chain_id uuid NOT NULL REFERENCES chains(id) ON DELETE CASCADE,
  step_id uuid NOT NULL REFERENCES chain_steps(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  completion_time integer, -- actual time taken in minutes
  quality_rating integer CHECK (quality_rating >= 1 AND quality_rating <= 5),
  notes text,
  streak_position integer, -- Position in current streak
  created_at timestamptz DEFAULT now()
);

-- Create enhanced task_dependencies table
CREATE TABLE IF NOT EXISTS task_dependencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  depends_on_task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  dependency_type text DEFAULT 'blocks', -- blocks, enables, suggests
  delay_hours integer DEFAULT 0, -- Minimum hours between tasks
  is_strict boolean DEFAULT true, -- Must be completed vs suggested
  created_at timestamptz DEFAULT now(),
  UNIQUE(task_id, depends_on_task_id)
);

-- Add chain-related fields to tasks table
DO $$
BEGIN
  -- Add chain_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'chain_id'
  ) THEN
    ALTER TABLE tasks ADD COLUMN chain_id uuid REFERENCES chains(id) ON DELETE SET NULL;
  END IF;

  -- Add chain_step_id if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'chain_step_id'
  ) THEN
    ALTER TABLE tasks ADD COLUMN chain_step_id uuid REFERENCES chain_steps(id) ON DELETE SET NULL;
  END IF;

  -- Add dependency_status if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'dependency_status'
  ) THEN
    ALTER TABLE tasks ADD COLUMN dependency_status text DEFAULT 'ready'; -- ready, blocked, waiting
  END IF;

  -- Add auto_generated if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'auto_generated'
  ) THEN
    ALTER TABLE tasks ADD COLUMN auto_generated boolean DEFAULT false;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chains_user_id ON chains(user_id);
CREATE INDEX IF NOT EXISTS idx_chains_active ON chains(is_active);
CREATE INDEX IF NOT EXISTS idx_chain_steps_chain_id ON chain_steps(chain_id);
CREATE INDEX IF NOT EXISTS idx_chain_steps_number ON chain_steps(chain_id, step_number);
CREATE INDEX IF NOT EXISTS idx_chain_completions_user_id ON chain_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_chain_completions_chain_id ON chain_completions(chain_id);
CREATE INDEX IF NOT EXISTS idx_task_dependencies_task_id ON task_dependencies(task_id);
CREATE INDEX IF NOT EXISTS idx_task_dependencies_depends_on ON task_dependencies(depends_on_task_id);
CREATE INDEX IF NOT EXISTS idx_tasks_chain_id ON tasks(chain_id);
CREATE INDEX IF NOT EXISTS idx_tasks_dependency_status ON tasks(dependency_status);

-- Enable RLS
ALTER TABLE chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_dependencies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for chains
CREATE POLICY "Users can manage own chains"
  ON chains
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for chain_steps
CREATE POLICY "Users can manage steps of own chains"
  ON chain_steps
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chains
      WHERE chains.id = chain_steps.chain_id
      AND chains.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chains
      WHERE chains.id = chain_steps.chain_id
      AND chains.user_id = auth.uid()
    )
  );

-- Create RLS policies for chain_completions
CREATE POLICY "Users can manage own chain completions"
  ON chain_completions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for task_dependencies
CREATE POLICY "Users can manage dependencies of own tasks"
  ON task_dependencies
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_dependencies.task_id
      AND tasks.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tasks
      WHERE tasks.id = task_dependencies.task_id
      AND tasks.user_id = auth.uid()
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_chains_updated_at
  BEFORE UPDATE ON chains
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update task dependency status
CREATE OR REPLACE FUNCTION update_task_dependency_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update dependency status for tasks that depend on the completed task
  UPDATE tasks
  SET dependency_status = CASE
    WHEN EXISTS (
      SELECT 1 FROM task_dependencies td
      JOIN tasks dep_task ON dep_task.id = td.depends_on_task_id
      WHERE td.task_id = tasks.id
      AND td.is_strict = true
      AND dep_task.completed = false
    ) THEN 'blocked'
    ELSE 'ready'
  END
  WHERE id IN (
    SELECT td.task_id
    FROM task_dependencies td
    WHERE td.depends_on_task_id = NEW.id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update dependency status when tasks are completed
CREATE TRIGGER update_dependency_status_on_completion
  AFTER UPDATE OF completed ON tasks
  FOR EACH ROW
  WHEN (OLD.completed IS DISTINCT FROM NEW.completed)
  EXECUTE FUNCTION update_task_dependency_status();

-- Function to advance habit chains
CREATE OR REPLACE FUNCTION advance_habit_chain()
RETURNS TRIGGER AS $$
DECLARE
  chain_record chains%ROWTYPE;
  next_step chain_steps%ROWTYPE;
  current_step_number integer;
BEGIN
  -- Only process if task is part of a chain and was just completed
  IF NEW.chain_id IS NOT NULL AND NEW.completed = true AND OLD.completed = false THEN
    -- Get chain information
    SELECT * INTO chain_record FROM chains WHERE id = NEW.chain_id;
    
    IF chain_record.auto_advance THEN
      -- Get current step number
      SELECT step_number INTO current_step_number
      FROM chain_steps
      WHERE id = NEW.chain_step_id;
      
      -- Find next step
      SELECT * INTO next_step
      FROM chain_steps
      WHERE chain_id = NEW.chain_id
      AND step_number = current_step_number + 1;
      
      -- If next step exists, create task for it
      IF next_step.id IS NOT NULL THEN
        INSERT INTO tasks (
          user_id,
          chain_id,
          chain_step_id,
          title,
          description,
          difficulty,
          xp_reward,
          estimated_duration,
          context,
          auto_generated,
          due_date
        ) VALUES (
          NEW.user_id,
          NEW.chain_id,
          next_step.id,
          next_step.title,
          next_step.description,
          CASE 
            WHEN next_step.is_milestone THEN 4
            ELSE 2
          END,
          next_step.xp_reward,
          next_step.estimated_duration,
          next_step.required_context,
          true,
          CASE 
            WHEN chain_record.frequency_period = 'daily' THEN NOW() + INTERVAL '1 day'
            WHEN chain_record.frequency_period = 'weekly' THEN NOW() + INTERVAL '1 week'
            ELSE NOW() + INTERVAL '1 day'
          END
        );
      ELSE
        -- Chain completed, update streak
        UPDATE chains
        SET 
          current_streak = current_streak + 1,
          best_streak = GREATEST(best_streak, current_streak + 1)
        WHERE id = NEW.chain_id;
      END IF;
    END IF;
    
    -- Record chain completion
    INSERT INTO chain_completions (
      user_id,
      chain_id,
      step_id,
      completion_time,
      streak_position
    ) VALUES (
      NEW.user_id,
      NEW.chain_id,
      NEW.chain_step_id,
      NEW.actual_duration,
      chain_record.current_streak + 1
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for chain advancement
CREATE TRIGGER advance_chain_on_task_completion
  AFTER UPDATE OF completed ON tasks
  FOR EACH ROW
  WHEN (NEW.chain_id IS NOT NULL)
  EXECUTE FUNCTION advance_habit_chain();

-- Insert sample habit chains
INSERT INTO chains (user_id, name, description, category, chain_length, reward_xp) 
SELECT 
  auth.uid(),
  'Morning Routine',
  'Start your day with energy and focus',
  'wellness',
  5,
  100
WHERE auth.uid() IS NOT NULL;

INSERT INTO chains (user_id, name, description, category, chain_length, reward_xp)
SELECT 
  auth.uid(),
  'Learning Path',
  'Daily learning and skill development',
  'education',
  7,
  150
WHERE auth.uid() IS NOT NULL;

-- Insert sample chain steps for Morning Routine
INSERT INTO chain_steps (chain_id, step_number, title, description, estimated_duration, xp_reward, is_milestone)
SELECT 
  c.id,
  1,
  'Wake up early',
  'Get up at your planned time',
  5,
  10,
  false
FROM chains c
WHERE c.name = 'Morning Routine' AND c.user_id = auth.uid();

INSERT INTO chain_steps (chain_id, step_number, title, description, estimated_duration, xp_reward, is_milestone)
SELECT 
  c.id,
  2,
  'Drink water',
  'Hydrate with a full glass of water',
  2,
  10,
  false
FROM chains c
WHERE c.name = 'Morning Routine' AND c.user_id = auth.uid();

INSERT INTO chain_steps (chain_id, step_number, title, description, estimated_duration, xp_reward, is_milestone)
SELECT 
  c.id,
  3,
  'Exercise',
  'Do 10 minutes of physical activity',
  10,
  20,
  true
FROM chains c
WHERE c.name = 'Morning Routine' AND c.user_id = auth.uid();

INSERT INTO chain_steps (chain_id, step_number, title, description, estimated_duration, xp_reward, is_milestone)
SELECT 
  c.id,
  4,
  'Meditation',
  'Practice mindfulness for 5 minutes',
  5,
  15,
  false
FROM chains c
WHERE c.name = 'Morning Routine' AND c.user_id = auth.uid();

INSERT INTO chain_steps (chain_id, step_number, title, description, estimated_duration, xp_reward, is_milestone)
SELECT 
  c.id,
  5,
  'Plan the day',
  'Review and prioritize your tasks',
  10,
  15,
  true
FROM chains c
WHERE c.name = 'Morning Routine' AND c.user_id = auth.uid();