import React, { useEffect, useState } from 'react';
import { Plus, Link, TrendingUp, Target, Calendar, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChainCard } from '@/components/chains/ChainCard';
import { CreateChainModal } from '@/components/chains/CreateChainModal';
import { ChainDetailModal } from '@/components/chains/ChainDetailModal';
import { useStore } from '@/lib/store';
import { supabase, Chain } from '@/lib/supabase';

export const HabitChains: React.FC = () => {
  const { user } = useStore();
  const [chains, setChains] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

  useEffect(() => {
    loadChains();
  }, [user]);

  const loadChains = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chains')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChains(data || []);
    } catch (error) {
      console.error('Error loading chains:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChain = async (chainData: Partial<Chain>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chains')
        .insert({
          ...chainData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setChains([data, ...chains]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating chain:', error);
    }
  };

  const handleToggleChainStatus = async (chainId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('chains')
        .update({ is_active: !isActive })
        .eq('id', chainId);

      if (error) throw error;
      
      setChains(chains.map(chain => 
        chain.id === chainId 
          ? { ...chain, is_active: !isActive }
          : chain
      ));
    } catch (error) {
      console.error('Error updating chain status:', error);
    }
  };

  const handleResetChain = async (chainId: string) => {
    try {
      const { error } = await supabase
        .from('chains')
        .update({ current_streak: 0 })
        .eq('id', chainId);

      if (error) throw error;
      
      setChains(chains.map(chain => 
        chain.id === chainId 
          ? { ...chain, current_streak: 0 }
          : chain
      ));
    } catch (error) {
      console.error('Error resetting chain:', error);
    }
  };

  const filteredChains = chains.filter(chain => {
    if (filter === 'active') return chain.is_active;
    if (filter === 'paused') return !chain.is_active;
    return true;
  });

  const activeChains = chains.filter(c => c.is_active).length;
  const totalStreak = chains.reduce((sum, c) => sum + c.current_streak, 0);
  const bestStreak = Math.max(...chains.map(c => c.best_streak), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading habit chains...
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
            Habit Chains
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
            Build powerful habits through connected sequences of actions
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus size={16} />
          New Chain
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Link className="text-black-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {activeChains}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Active Chains
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {totalStreak}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Total Streak Days
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error-50 rounded-xl flex items-center justify-center">
              <Target className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {bestStreak}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Best Streak
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-black-60" />
        <div className="flex gap-2">
          {(['all', 'active', 'paused'] as const).map((status) => (
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

      {/* Chain List */}
      {filteredChains.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primarysolid-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Link className="text-primarysolid-60" size={24} />
          </div>
          <h3 className="text-title-18 font-title-18-black text-black-100 mb-2">
            {filter === 'all' ? 'No habit chains yet' : `No ${filter} chains`}
          </h3>
          <p className="text-text-14-reg font-text-14-reg text-black-60 mb-6">
            {filter === 'all' 
              ? 'Create your first habit chain to start building powerful routines!'
              : `You don't have any ${filter} chains at the moment.`
            }
          </p>
          {filter === 'all' && (
            <Button onClick={() => setShowCreateModal(true)} className="gap-2">
              <Plus size={16} />
              Create Your First Chain
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChains.map((chain) => (
            <ChainCard
              key={chain.id}
              chain={chain}
              onClick={() => setSelectedChain(chain)}
              onToggleStatus={() => handleToggleChainStatus(chain.id, chain.is_active)}
              onReset={() => handleResetChain(chain.id)}
            />
          ))}
        </div>
      )}

      {/* Create Chain Modal */}
      <CreateChainModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateChain}
      />

      {/* Chain Detail Modal */}
      {selectedChain && (
        <ChainDetailModal
          chain={selectedChain}
          isOpen={!!selectedChain}
          onClose={() => setSelectedChain(null)}
          onUpdate={loadChains}
        />
      )}
    </div>
  );
};