import React, { useEffect, useState } from 'react';
import { Award, Trophy, Star, Lock, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';
import { supabase, Rune, UserRune } from '@/lib/supabase';

interface RuneWithEarned extends Rune {
  earned?: boolean;
  earned_at?: string;
}

export const Achievements: React.FC = () => {
  const { user } = useStore();
  const [runes, setRunes] = useState<RuneWithEarned[]>([]);
  const [userRunes, setUserRunes] = useState<UserRune[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');

  useEffect(() => {
    loadAchievements();
  }, [user]);

  const loadAchievements = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load all available runes
      const { data: runesData, error: runesError } = await supabase
        .from('runes')
        .select('*')
        .order('rarity', { ascending: true })
        .order('name');

      if (runesError) throw runesError;

      // Load user's earned runes
      const { data: userRunesData, error: userRunesError } = await supabase
        .from('user_runes')
        .select(`
          *,
          runes (*)
        `)
        .eq('user_id', user.id);

      if (userRunesError) throw userRunesError;

      // Merge data
      const earnedRuneIds = new Set(userRunesData?.map(ur => ur.rune_id) || []);
      const runesWithEarned = runesData?.map(rune => ({
        ...rune,
        earned: earnedRuneIds.has(rune.id),
        earned_at: userRunesData?.find(ur => ur.rune_id === rune.id)?.earned_at
      })) || [];

      setRunes(runesWithEarned);
      setUserRunes(userRunesData || []);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRunes = runes.filter(rune => {
    if (filter === 'earned') return rune.earned;
    if (filter === 'locked') return !rune.earned;
    return true;
  });

  const earnedCount = runes.filter(r => r.earned).length;
  const totalCount = runes.length;
  const completionRate = totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-communicationsoliderror';
      case 'epic': return 'bg-error-50';
      case 'rare': return 'bg-warning-50';
      default: return 'bg-success-50';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-communicationsoliderror';
      case 'epic': return 'border-error-50';
      case 'rare': return 'border-warning-50';
      default: return 'border-success-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading achievements...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-32 font-display-32-black text-black-100">
            Achievements
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
            Collect runes by completing challenges and milestones
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
              <Trophy className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {earnedCount}/{totalCount}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Runes Collected
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Star className="text-black-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {completionRate}%
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Completion Rate
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondarysolid-50 rounded-xl flex items-center justify-center">
              <Zap className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                +{runes.filter(r => r.earned).reduce((sum, r) => sum + r.xp_bonus, 0)}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                XP Bonus
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Award size={16} className="text-black-60" />
        <div className="flex gap-2">
          {(['all', 'earned', 'locked'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-3 py-1 rounded-lg border-2 text-caption-11-med font-caption-11-med transition-all duration-200
                ${filter === status
                  ? 'bg-primarysolid-50 border-black-100 text-black-100 shadow-[-2px_4px_0px_#001428]'
                  : 'bg-white-100 border-black-100 text-black-60 hover:bg-primarysolid-10'
                }
              `}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Rune Collection */}
      {filteredRunes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primarysolid-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="text-primarysolid-60" size={24} />
          </div>
          <h3 className="text-title-18 font-title-18-black text-black-100 mb-2">
            {filter === 'earned' ? 'No runes earned yet' : 'No runes available'}
          </h3>
          <p className="text-text-14-reg font-text-14-reg text-black-60">
            {filter === 'earned' 
              ? 'Complete tasks and quests to earn your first runes!'
              : 'Check back later for new achievements to unlock.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRunes.map((rune) => (
            <div
              key={rune.id}
              className={`
                p-4 rounded-2xl border-2 transition-all duration-200
                ${rune.earned
                  ? `bg-white-100 ${getRarityBorder(rune.rarity)} shadow-[-2px_4px_0px_#001428] hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:transform hover:-translate-y-1`
                  : 'bg-black-10 border-black-30 opacity-60'
                }
              `}
            >
              {/* Rune Icon */}
              <div className="flex items-center justify-center mb-3">
                <div className={`
                  w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl
                  ${rune.earned 
                    ? `${getRarityColor(rune.rarity)} border-black-100` 
                    : 'bg-black-20 border-black-40'
                  }
                `}>
                  {rune.earned ? (
                    <span className="text-white-100">{rune.icon}</span>
                  ) : (
                    <Lock className="text-black-60" size={24} />
                  )}
                </div>
              </div>

              {/* Rune Info */}
              <div className="text-center">
                <h3 className={`
                  text-title-14 font-title-14-black mb-1
                  ${rune.earned ? 'text-black-100' : 'text-black-60'}
                `}>
                  {rune.name}
                </h3>
                
                <p className={`
                  text-caption-11-reg font-caption-11-reg mb-2
                  ${rune.earned ? 'text-black-60' : 'text-black-40'}
                `}>
                  {rune.description}
                </p>

                {/* Rarity & XP */}
                <div className="flex items-center justify-between">
                  <div className={`
                    px-2 py-1 rounded-lg border text-caption-10-med font-caption-10-med
                    ${rune.earned 
                      ? `${getRarityColor(rune.rarity)} border-black-100 text-white-100`
                      : 'bg-black-20 border-black-40 text-black-60'
                    }
                  `}>
                    {rune.rarity}
                  </div>
                  
                  {rune.xp_bonus > 0 && (
                    <div className={`
                      flex items-center gap-1 text-caption-10-med font-caption-10-med
                      ${rune.earned ? 'text-primarysolid-60' : 'text-black-40'}
                    `}>
                      <Zap size={10} />
                      +{rune.xp_bonus}%
                    </div>
                  )}
                </div>

                {/* Earned Date */}
                {rune.earned && rune.earned_at && (
                  <div className="mt-2 pt-2 border-t border-black-20">
                    <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                      Earned {new Date(rune.earned_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};