import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Quests } from '@/pages/Quests';
import { QuestDetail } from '@/pages/QuestDetail';
import { Virtuas } from '@/pages/Virtuas';
import { Achievements } from '@/pages/Achievements';
import { Analytics } from '@/pages/Analytics';
import { HabitChains } from '@/pages/HabitChains';
import { Tasks } from '@/pages/Tasks';
import { Settings } from '@/pages/Settings';
import { Login } from '@/pages/Login';
import { Landing } from '@/pages/Landing';
import { LevelUpModal } from '@/components/gamification/LevelUpModal';
import { AchievementToast } from '@/components/gamification/AchievementToast';
import { useStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

function App() {
  const { user, setUser } = useStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState({ newLevel: 1, xpGained: 0 });
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser]);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Mock function to trigger level up (would be called when XP increases)
  const triggerLevelUp = (newLevel: number, xpGained: number) => {
    setLevelUpData({ newLevel, xpGained });
    setShowLevelUp(true);
  };

  // Mock function to trigger achievement (would be called when conditions are met)
  const triggerAchievement = (achievementData: any) => {
    setAchievement(achievementData);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        {user ? (
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="quests" element={<Quests />} />
            <Route path="quest/:id" element={<QuestDetail />} />
            <Route path="virtuas" element={<Virtuas />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="chains" element={<HabitChains />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="/app/*" element={<Navigate to="/login" replace />} />
        )}
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to={user ? "/app/dashboard" : "/"} replace />} />
      </Routes>

      {/* Gamification Modals */}
      {user && (
        <>
          <LevelUpModal
            isOpen={showLevelUp}
            onClose={() => setShowLevelUp(false)}
            newLevel={levelUpData.newLevel}
            xpGained={levelUpData.xpGained}
            rewards={['New Virtua customization options', 'Bonus XP multiplier for 24 hours']}
          />

          <AchievementToast
            achievement={achievement}
            onClose={() => setAchievement(null)}
          />
        </>
      )}
    </Router>
  );
};

export default App;