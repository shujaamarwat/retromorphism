import React, { useEffect, useState } from 'react';
import { Plus, Target, Calendar, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestCard } from '@/components/quest/QuestCard';
import { CreateQuestModal } from '@/components/quest/CreateQuestModal';
import { useStore } from '@/lib/store';
import { supabase, Quest } from '@/lib/supabase';

export const Quests: React.FC = () => {
  const { user, quests, setQuests, virtuas } = useStore();
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'paused'>('all');

  useEffect(() => {
    loadQuests();
  }, [user]);

  const loadQuests = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quests')
        .select(`
          *,
          virtuas (
            id,
            name,
            domain
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuests(data || []);
    } catch (error) {
      console.error('Error loading quests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuest = async (questData: Partial<Quest>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('quests')
        .insert({
          ...questData,
          user_id: user.id,
        })
        .select(`
          *,
          virtuas (
            id,
            name,
            domain
          )
        `)
        .single();

      if (error) throw error;
      
      setQuests([data, ...quests]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating quest:', error);
    }
  };

  const filteredQuests = quests.filter(quest => {
    if (filter === 'all') return true;
    return quest.status === filter;
  });

  const activeQuests = quests.filter(q => q.status === 'active').length;
  const completedQuests = quests.filter(q => q.status === 'completed').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading your quests...
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
            Your Quests
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
            Transform your goals into epic adventures
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus size={16} />
          New Quest
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Target className="text-black-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {activeQuests}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Active Quests
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
              <Target className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {completedQuests}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Completed
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondarysolid-50 rounded-xl flex items-center justify-center">
              <Users className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {virtuas.length}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Virtuas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-black-60" />
        <div className="flex gap-2">
          {(['all', 'active', 'completed', 'paused'] as const).map((status) => (
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

      {/* Quest List */}
      {filteredQuests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primarysolid-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="text-primarysolid-60" size={24} />
          </div>
          <h3 className="text-title-18 font-title-18-black text-black-100 mb-2">
            {filter === 'all' ? 'No quests yet' : `No ${filter} quests`}
          </h3>
          <p className="text-text-14-reg font-text-14-reg text-black-60 mb-6">
            {filter === 'all' 
              ? 'Create your first quest to start your adventure!'
              : `You don't have any ${filter} quests at the moment.`
            }
          </p>
          {filter === 'all' && (
            <Button onClick={() => setShowCreateModal(true)} className="gap-2">
              <Plus size={16} />
              Create Your First Quest
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onStatusChange={loadQuests}
            />
          ))}
        </div>
      )}

      {/* Create Quest Modal */}
      <CreateQuestModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateQuest}
        virtuas={virtuas}
      />
    </div>
  );
};