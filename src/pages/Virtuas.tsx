import React, { useEffect, useState } from 'react';
import { Plus, Zap, TrendingUp, Award, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VirtuaCard } from '@/components/virtua/VirtuaCard';
import { CreateVirtuaModal } from '@/components/virtua/CreateVirtuaModal';
import { VirtuaDetailModal } from '@/components/virtua/VirtuaDetailModal';
import { useStore } from '@/lib/store';
import { supabase, Virtua } from '@/lib/supabase';

export const Virtuas: React.FC = () => {
  const { user, virtuas, setVirtuas } = useStore();
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVirtua, setSelectedVirtua] = useState<Virtua | null>(null);
  const [filter, setFilter] = useState<'all' | 'focus' | 'fitness' | 'learning' | 'custom'>('all');

  useEffect(() => {
    loadVirtuas();
  }, [user]);

  const loadVirtuas = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('virtuas')
        .select('*')
        .eq('user_id', user.id)
        .order('level', { ascending: false })
        .order('xp', { ascending: false });

      if (error) throw error;
      setVirtuas(data || []);
    } catch (error) {
      console.error('Error loading virtuas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVirtua = async (virtuaData: Partial<Virtua>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('virtuas')
        .insert({
          ...virtuaData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setVirtuas([...virtuas, data]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating virtua:', error);
    }
  };

  const filteredVirtuas = virtuas.filter(virtua => {
    if (filter === 'all') return true;
    if (filter === 'custom') return !['Focus', 'Fitness', 'Learning'].includes(virtua.domain);
    return virtua.domain.toLowerCase() === filter;
  });

  const totalXP = virtuas.reduce((sum, v) => sum + v.xp, 0);
  const avgLevel = virtuas.length > 0 ? Math.round(virtuas.reduce((sum, v) => sum + v.level, 0) / virtuas.length) : 0;
  const maxLevel = Math.max(...virtuas.map(v => v.level), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading your Virtuas...
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
            Your Virtuas
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
            Train your digital companions through quest completion
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus size={16} />
          New Virtua
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Zap className="text-black-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {totalXP.toLocaleString()}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Total XP Earned
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondarysolid-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {avgLevel}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Average Level
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
              <Award className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {maxLevel}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Highest Level
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-black-60" />
        <div className="flex gap-2">
          {(['all', 'focus', 'fitness', 'learning', 'custom'] as const).map((domain) => (
            <Button
              key={domain}
              variant={filter === domain ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(domain)}
              className="capitalize"
            >
              {domain}
            </Button>
          ))}
        </div>
      </div>

      {/* Virtua Grid */}
      {filteredVirtuas.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primarysolid-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="text-primarysolid-60" size={24} />
          </div>
          <h3 className="text-title-18 font-title-18-black text-black-100 mb-2">
            {filter === 'all' ? 'No Virtuas yet' : `No ${filter} Virtuas`}
          </h3>
          <p className="text-text-14-reg font-text-14-reg text-black-60 mb-6">
            {filter === 'all' 
              ? 'Create your first Virtua to start your journey!'
              : `You don't have any ${filter} Virtuas at the moment.`
            }
          </p>
          {filter === 'all' && (
            <Button onClick={() => setShowCreateModal(true)} className="gap-2">
              <Plus size={16} />
              Create Your First Virtua
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVirtuas.map((virtua) => (
            <VirtuaCard
              key={virtua.id}
              virtua={virtua}
              onClick={() => setSelectedVirtua(virtua)}
              showProgress={true}
            />
          ))}
        </div>
      )}

      {/* Create Virtua Modal */}
      <CreateVirtuaModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateVirtua}
      />

      {/* Virtua Detail Modal */}
      {selectedVirtua && (
        <VirtuaDetailModal
          virtua={selectedVirtua}
          isOpen={!!selectedVirtua}
          onClose={() => setSelectedVirtua(null)}
          onUpdate={loadVirtuas}
        />
      )}
    </div>
  );
};