/*
  # Create Sample Runes for Achievement System

  1. New Data
    - Sample runes with different rarities and criteria
    - Achievement runes for common milestones
    - XP bonus runes for progression rewards

  2. Security
    - Maintains existing RLS policies
    - No changes to security model
*/

-- Insert sample runes for the achievement system
INSERT INTO runes (name, description, icon, criteria, rarity, xp_bonus) VALUES
-- Common Runes (Basic Achievements)
('First Steps', 'Complete your first task', '🌱', '{"type": "task_completion", "count": 1}', 'common', 5),
('Getting Started', 'Complete 5 tasks', '⭐', '{"type": "task_completion", "count": 5}', 'common', 5),
('Daily Warrior', 'Complete tasks for 3 consecutive days', '🗡️', '{"type": "daily_streak", "days": 3}', 'common', 10),
('Quest Beginner', 'Create your first quest', '📋', '{"type": "quest_creation", "count": 1}', 'common', 5),
('Virtua Trainer', 'Level up a Virtua to level 5', '🎯', '{"type": "virtua_level", "level": 5}', 'common', 10),

-- Rare Runes (Intermediate Achievements)
('Task Master', 'Complete 50 tasks', '🏆', '{"type": "task_completion", "count": 50}', 'rare', 15),
('Week Warrior', 'Maintain a 7-day streak', '🔥', '{"type": "daily_streak", "days": 7}', 'rare', 20),
('Quest Collector', 'Complete 10 quests', '📚', '{"type": "quest_completion", "count": 10}', 'rare', 15),
('Domain Expert', 'Reach level 10 in any domain', '🎓', '{"type": "virtua_level", "level": 10}', 'rare', 25),
('XP Hunter', 'Earn 1000 total XP', '💎', '{"type": "total_xp", "amount": 1000}', 'rare', 20),

-- Epic Runes (Advanced Achievements)
('Centurion', 'Complete 100 tasks', '⚔️', '{"type": "task_completion", "count": 100}', 'epic', 30),
('Streak Legend', 'Maintain a 30-day streak', '🌟', '{"type": "daily_streak", "days": 30}', 'epic', 40),
('Quest Champion', 'Complete 25 quests', '👑', '{"type": "quest_completion", "count": 25}', 'epic', 35),
('Master Trainer', 'Have 3 Virtuas at level 15+', '🧙', '{"type": "multiple_virtua_level", "count": 3, "level": 15}', 'epic', 50),
('XP Millionaire', 'Earn 10,000 total XP', '💰', '{"type": "total_xp", "amount": 10000}', 'epic', 40),

-- Legendary Runes (Ultimate Achievements)
('Task Overlord', 'Complete 500 tasks', '🌌', '{"type": "task_completion", "count": 500}', 'legendary', 75),
('Eternal Flame', 'Maintain a 100-day streak', '🔥', '{"type": "daily_streak", "days": 100}', 'legendary', 100),
('Quest Deity', 'Complete 100 quests', '⚡', '{"type": "quest_completion", "count": 100}', 'legendary', 80),
('Grandmaster', 'Reach level 50 in any domain', '🏔️', '{"type": "virtua_level", "level": 50}', 'legendary', 100),
('XP Transcendent', 'Earn 100,000 total XP', '🌠', '{"type": "total_xp", "amount": 100000}', 'legendary', 150);