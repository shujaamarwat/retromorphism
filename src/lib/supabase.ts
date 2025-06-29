import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  display_name?: string;
  avatar_url?: string;
  total_xp: number;
  level: number;
  streak_count: number;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Virtua {
  id: string;
  user_id: string;
  name: string;
  domain: string;
  level: number;
  xp: number;
  evolution_stage: number;
  avatar_url?: string;
  traits: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Quest {
  id: string;
  user_id: string;
  virtua_id?: string;
  title: string;
  description?: string;
  status: 'active' | 'completed' | 'paused';
  priority: number;
  due_date?: string;
  completion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  quest_id?: string;
  title: string;
  description?: string;
  completed: boolean;
  difficulty: number;
  priority: number;
  xp_reward: number;
  due_date?: string;
  scheduled_at?: string;
  dependencies: string[];
  tags: string[];
  context?: string;
  estimated_duration?: number;
  actual_duration?: number;
  completed_at?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Rune {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: Record<string, any>;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xp_bonus: number;
  created_at: string;
}

export interface UserRune {
  id: string;
  user_id: string;
  rune_id: string;
  earned_at: string;
  rune?: Rune;
}

export interface StreakLog {
  id: string;
  user_id: string;
  date: string;
  tasks_completed: number;
  total_tasks: number;
  xp_earned: number;
  streak_maintained: boolean;
  created_at: string;
}