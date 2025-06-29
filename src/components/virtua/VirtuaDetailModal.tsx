import React, { useEffect, useState } from 'react';
import { X, Zap, TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Virtua, Quest, supabase } from '@/lib/supabase';
import { format, subDays } from 'date-fns';

interface VirtuaDetailModalProps {
  virtua: Virtua;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface VirtuaStats {
  totalQuests: number;
  completedQuests: number;
  totalTasks: number;
  completedTasks: number;
  weeklyXP: number;
  streak: number;
}

export const VirtuaDetailModal: React.FC<VirtuaDetailModalProps> = ({
  virtua,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [stats, setStats] = useState<VirtuaStats>({
    totalQuests: 0,
    completedQuests: 0,
    totalTasks: 0,
    completedTasks: 0,
    weeklyXP: 0,
    streak: 0,
  });
  const [recentQuests, setRecentQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && virtua) {
      loadVirtuaStats();
    }
  }, [isOpen, virtua]);

  const loadVirtuaStats = async () => {
    try {
      setLoading(true);

      // Load quests for this virtua
      const { data: quests } = await supabase
        .from('quests')
        .select('*')
        .eq('virtua_id', virtua.id)
        .order('created_at', { ascending: false });

      // Load tasks for this virtua's quests
      const questIds = quests?.map(q => q.id) || [];
      const { data: tasks } = questIds.length > 0 ? await supabase
        .from('tasks')
        .select('*')
        .in('quest_id', questIds) : { data: [] };

      // Calculate stats
      const completedQuests = quests?.filter(q => q.status === 'completed').length || 0;
      const completedTasks = tasks?.filter(t => t.completed).length || 0;
      
      // Calculate weekly XP (simplified - would need proper tracking in production)
      const weeklyXP = Math.floor(virtua.xp * 0.1); // Rough estimate

      setStats({
        totalQuests: quests?.length || 0,
        completedQuests,
        totalTasks: tasks?.length || 0,
        completedTasks,
        weeklyXP,
        streak: Math.floor(virtua.level * 2), // Simplified streak calculation
      });

      setRecentQuests(quests?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error loading virtua stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEvolutionStage = (level: number) => {
    if (level >= 50) return { name: 'Master', color: 'bg-communicationsoliderror' };
    if (level >= 25) return { name: 'Expert', color: 'bg-error-50' };
    if (level >= 15) return { name: 'Advanced', color: 'bg-warning-50' };
    if (level >= 10) return { name: 'Skilled', color: 'bg-info-50' };
    if (level >= 5) return { name: 'Trained', color: 'bg-success-50' };
    return { name: 'Novice', color: 'bg-primarysolid-50' };
  };

  const xpToNextLevel = (virtua.level * 100) - (virtua.xp % (virtua.level * 100));
  const progressPercent = ((virtua.xp % (virtua.level * 100)) / (virtua.level * 100)) * 100;
  const evolution = getEvolutionStage(virtua.level);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondarysolid-50 rounded-2xl flex items-center justify-center border-2 border-black-100">
              <Zap className="text-white-100" size={32} />
            </div>
            <div>
              <h2 className="text-title-24 font-title-24-black text-black-100">
                {virtua.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-text-14-reg font-text-14-reg text-black-60">
                  {virtua.domain} Domain
                </span>
                <div className={`px-2 py-1 ${evolution.color} rounded-lg border border-black-100`}>
                  <span className="text-caption-10-med font-caption-10-med text-white-100">
                    {evolution.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Level & XP Progress */}
          <div className="p-4 bg-primarysolid-10 rounded-2xl border-2 border-black-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-title-16 font-title-16-black text-black-100">
                Level {virtua.level}
              </h3>
              <span className="text-text-14-reg font-text-14-reg text-black-60">
                {virtua.xp.toLocaleString()} XP
              </span>
            </div>
            
            <div className="w-full bg-black-20 rounded-full h-3 border border-black-100 mb-2">
              <div 
                className="bg-primarysolid-60 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-caption-11-reg font-caption-11-reg text-black-60">
              <span>{xpToNextLevel} XP to next level</span>
              <span>Next: Level {virtua.level + 1}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white-100 rounded-xl border-2 border-black-100 text-center">
              <div className="w-8 h-8 bg-success-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="text-white-100" size={16} />
              </div>
              <p className="text-title-14 font-title-14-black text-black-100">
                {stats.completedQuests}/{stats.totalQuests}
              </p>
              <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                Quests
              </p>
            </div>

            <div className="p-4 bg-white-100 rounded-xl border-2 border-black-100 text-center">
              <div className="w-8 h-8 bg-info-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Calendar className="text-white-100" size={16} />
              </div>
              <p className="text-title-14 font-title-14-black text-black-100">
                {stats.completedTasks}/{stats.totalTasks}
              </p>
              <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                Tasks
              </p>
            </div>

            <div className="p-4 bg-white-100 rounded-xl border-2 border-black-100 text-center">
              <div className="w-8 h-8 bg-warning-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="text-white-100" size={16} />
              </div>
              <p className="text-title-14 font-title-14-black text-black-100">
                +{stats.weeklyXP}
              </p>
              <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                This Week
              </p>
            </div>

            <div className="p-4 bg-white-100 rounded-xl border-2 border-black-100 text-center">
              <div className="w-8 h-8 bg-error-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="text-white-100" size={16} />
              </div>
              <p className="text-title-14 font-title-14-black text-black-100">
                {stats.streak}
              </p>
              <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                Day Streak
              </p>
            </div>
          </div>

          {/* Traits */}
          <div>
            <h3 className="text-title-16 font-title-16-black text-black-100 mb-3">
              Personality Traits
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-secondarysolid-10 rounded-xl border border-black-100">
                <h4 className="text-text-12-med font-text-12-med text-black-100 mb-1">
                  Personality
                </h4>
                <p className="text-text-14-reg font-text-14-reg text-black-70">
                  {virtua.traits?.personality || 'Developing...'}
                </p>
              </div>
              <div className="p-3 bg-secondarysolid-10 rounded-xl border border-black-100">
                <h4 className="text-text-12-med font-text-12-med text-black-100 mb-1">
                  Preferences
                </h4>
                <p className="text-text-14-reg font-text-14-reg text-black-70">
                  {virtua.traits?.preferences || 'Learning...'}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Quests */}
          <div>
            <h3 className="text-title-16 font-title-16-black text-black-100 mb-3">
              Recent Quests
            </h3>
            {recentQuests.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-text-14-reg font-text-14-reg text-black-60">
                  No quests assigned to this Virtua yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="flex items-center justify-between p-3 bg-white-100 rounded-xl border border-black-100"
                  >
                    <div>
                      <h4 className="text-text-14-med font-text-14-med text-black-100">
                        {quest.title}
                      </h4>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                        {quest.completion_rate}% complete
                      </p>
                    </div>
                    <div className={`
                      px-2 py-1 rounded-lg border text-caption-10-med font-caption-10-med
                      ${quest.status === 'completed' 
                        ? 'bg-success-20 text-success-70 border-success-50'
                        : quest.status === 'active'
                        ? 'bg-primarysolid-20 text-primarysolid-70 border-primarysolid-50'
                        : 'bg-warning-20 text-warning-70 border-warning-50'
                      }
                    `}>
                      {quest.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};