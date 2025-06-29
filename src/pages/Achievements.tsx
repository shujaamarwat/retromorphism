import React, { useEffect, useState } from 'react';
import { Award, Trophy, Star, Lock, Zap, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import { ShareModal } from '@/components/social/ShareModal';
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
  const [showShareModal, setShowShareModal] = useState(false);

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

  const handleShareProgress = () => {
    setShowShareModal(true);
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
        
        <Button
          onClick={handleShareProgress}
          className="gap-2"
        >
          <Share2 size={16} />
          Share Progress
        </Button>
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
                +{runes.filter(r => r.earned).reduce((sum, r) => sum + r.xp_bonus, 0)}%
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
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
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
            <AchievementCard
              key={rune.id}
              rune={rune}
            />
          ))}
        </div>
      )}

      {/* Share Progress Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        progress={{
          level: user?.level || 1,
          xp: user?.total_xp || 0,
          streak: user?.streak_count || 0
        }}
        type="progress"
      />
    </div>
  );
};