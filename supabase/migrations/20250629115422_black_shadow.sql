/*
  # Create Habit Chains System

  1. New Tables
    - `chains` - Main habit chain definitions
    - `chain_steps` - Individual steps within chains  
    - `chain_completions` - Records of completed steps
    - `task_dependencies` - Task dependency relationships

  2. Security
    - Enable RLS on all new tables
    - Add policies for user data isolation
    - Ensure users can only access their own chains and completions

  3. Functions & Triggers
    - Auto-advance chain progress when tasks complete
    - Update task dependency status automatically
    - Maintain updated_at timestamps
*/

-- Create trigger function for updating updated_at column if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create chains table
CREATE TABLE IF NOT EXISTS chains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  category text DEFAULT 'general',
  target_frequency integer DEFAULT 1,
  frequency_period text DEFAULT 'daily',
  chain_length integer DEFAULT 7,
  current_streak integer DEFAULT 0,
  best_streak integer DEFAULT 0,
  is_active boolean DEFAULT true,
  auto_advance boolean DEFAULT true,
  reward_xp integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chain_steps table
CREATE TABLE IF NOT EXISTS chain_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chain_id uuid NOT NULL REFERENCES chains(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  title text NOT NULL,
  description text,
  estimated_duration integer,
  required_context text,
  prerequisites jsonb DEFAULT '[]'::jsonb,
  validation_criteria jsonb DEFAULT '{}'::jsonb,
  xp_reward integer DEFAULT 10,
  is_milestone boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create chain_completions table
CREATE TABLE IF NOT EXISTS chain_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chain_id uuid NOT NULL REFERENCES chains(id) ON DELETE CASCADE,
  step_id uuid NOT NULL REFERENCES chain_steps(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  completion_time integer,
  quality_rating integer CHECK (quality_rating >= 1 AND quality_rating <= 5),
  notes text,
  streak_position integer,
  created_at timestamptz DEFAULT now()
);

-- Create task_dependencies table
CREATE TABLE IF NOT EXISTS task_dependencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  depends_on_task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  dependency_type text DEFAULT 'blocks',
  delay_hours integer DEFAULT 0,
  is_strict boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(task_id, depends_on_task_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chains_user_id ON chains(user_id);
CREATE INDEX IF NOT EXISTS idx_chains_active ON chains(is_active);

CREATE INDEX IF NOT EXISTS idx_chain_steps_chain_id ON chain_steps(chain_id);
CREATE INDEX IF NOT EXISTS idx_chain_steps_number ON chain_steps(chain_id, step_number);

CREATE INDEX IF NOT EXISTS idx_chain_completions_user_id ON chain_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_chain_completions_chain_id ON chain_completions(chain_id);

CREATE INDEX IF NOT EXISTS idx_task_dependencies_task_id ON task_dependencies(task_id);
CREATE INDEX IF NOT EXISTS idx_task_dependencies_depends_on ON task_dependencies(depends_on_task_id);

-- Enable RLS
ALTER TABLE chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_dependencies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies with existence checks
DO $$
BEGIN
  -- Chains policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chains' AND policyname = 'Users can manage own chains'
  ) THEN
    CREATE POLICY "Users can manage own chains"
      ON chains
      FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Chain steps policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chain_steps' AND policyname = 'Users can manage steps of own chains'
  ) THEN
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
  END IF;

  -- Chain completions policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chain_completions' AND policyname = 'Users can manage own chain completions'
  ) THEN
    CREATE POLICY "Users can manage own chain completions"
      ON chain_completions
      FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Task dependencies policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'task_dependencies' AND policyname = 'Users can manage dependencies of own tasks'
  ) THEN
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
  END IF;
END $$;

-- Create triggers for updated_at with existence check
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_chains_updated_at'
  ) THEN
    CREATE TRIGGER update_chains_updated_at
      BEFORE UPDATE ON chains
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create function for advancing habit chains
CREATE OR REPLACE FUNCTION advance_habit_chain()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if task was just completed and has a chain_id
  IF NEW.completed = true AND OLD.completed = false AND NEW.chain_id IS NOT NULL THEN
    -- Update chain streak
    UPDATE chains 
    SET current_streak = current_streak + 1,
        best_streak = GREATEST(best_streak, current_streak + 1),
        updated_at = now()
    WHERE id = NEW.chain_id;
    
    -- Record completion
    INSERT INTO chain_completions (user_id, chain_id, step_id, completed_at, streak_position)
    SELECT NEW.user_id, NEW.chain_id, NEW.chain_step_id, now(), 
           (SELECT current_streak FROM chains WHERE id = NEW.chain_id)
    WHERE NEW.chain_step_id IS NOT NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function for updating task dependency status
CREATE OR REPLACE FUNCTION update_task_dependency_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update dependency status for tasks that depend on this completed task
  IF NEW.completed = true AND OLD.completed = false THEN
    UPDATE tasks 
    SET dependency_status = CASE 
      WHEN NOT EXISTS (
        SELECT 1 FROM task_dependencies td
        JOIN tasks dt ON dt.id = td.depends_on_task_id
        WHERE td.task_id = tasks.id AND dt.completed = false
      ) THEN 'ready'
      ELSE 'blocked'
    END
    WHERE id IN (
      SELECT td.task_id 
      FROM task_dependencies td 
      WHERE td.depends_on_task_id = NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for chain advancement and dependency updates with existence checks
DO $$
BEGIN
  -- Drop existing triggers if they exist
  DROP TRIGGER IF EXISTS advance_chain_on_task_completion ON tasks;
  DROP TRIGGER IF EXISTS update_dependency_status_on_completion ON tasks;
  
  -- Create new triggers
  CREATE TRIGGER advance_chain_on_task_completion
    AFTER UPDATE OF completed ON tasks
    FOR EACH ROW
    WHEN (NEW.chain_id IS NOT NULL)
    EXECUTE FUNCTION advance_habit_chain();

  CREATE TRIGGER update_dependency_status_on_completion
    AFTER UPDATE OF completed ON tasks
    FOR EACH ROW
    WHEN (OLD.completed IS DISTINCT FROM NEW.completed)
    EXECUTE FUNCTION update_task_dependency_status();
END $$;