import React, { useState } from 'react';
import { Quest } from '@/lib/supabase';
import { Target, Calendar, Zap, MoreHorizontal, Play, Pause, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface QuestCardProps {
  quest: Quest & {
    virtuas?: {
      id: string;
      name: string;
      domain: string;
    };
  };
  onStatusChange?: () => void;
}

const statusColors = {
  active: 'bg-primarysolid-20 text-primarysolid-70 border-primarysolid-50',
  completed: 'bg-success-20 text-success-70 border-success-50',
  paused: 'bg-warning-20 text-warning-70 border-warning-50',
};

const statusIcons = {
  active: Play,
  completed: CheckCircle,
  paused: Pause,
};

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const StatusIcon = statusIcons[quest.status];

  const handleStatusChange = async (newStatus: Quest['status']) => {
    if (loading) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('quests')
        .update({ status: newStatus })
        .eq('id', quest.id);

      if (error) throw error;
      onStatusChange?.();
    } catch (error) {
      console.error('Error updating quest status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/quest/${quest.id}`);
  };

  return (
    <div 
      className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 cursor-pointer transition-all duration-200
                 hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-title-16 font-title-16-black text-black-100 mb-1 line-clamp-2">
            {quest.title}
          </h3>
          {quest.description && (
            <p className="text-text-14-reg font-text-14-reg text-black-60 line-clamp-2">
              {quest.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-2">
          <div className={`
            px-2 py-1 rounded-lg border text-caption-10-med font-caption-10-med
            ${statusColors[quest.status]}
          `}>
            <StatusIcon size={10} className="inline mr-1" />
            {quest.status}
          </div>
        </div>
      </div>

      {/* Virtua */}
      {quest.virtuas && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-secondarysolid-50 rounded-full flex items-center justify-center">
            <Zap className="text-white-100" size={12} />
          </div>
          <span className="text-caption-11-med font-caption-11-med text-black-70">
            {quest.virtuas.name} • {quest.virtuas.domain}
          </span>
        </div>
      )}

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-caption-11-reg font-caption-11-reg text-black-60">
            Progress
          </span>
          <span className="text-caption-11-med font-caption-11-med text-black-70">
            {quest.completion_rate}%
          </span>
        </div>
        <div className="w-full bg-black-20 rounded-full h-2 border border-black-100">
          <div 
            className="bg-primarysolid-60 h-full rounded-full transition-all duration-300"
            style={{ width: `${quest.completion_rate}%` }}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {quest.due_date && (
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-black-60" />
              <span className="text-caption-10-reg font-caption-10-reg text-black-60">
                {format(new Date(quest.due_date), 'MMM d')}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Target size={12} className="text-black-60" />
            <span className="text-caption-10-reg font-caption-10-reg text-black-60">
              P{quest.priority}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {quest.status === 'active' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStatusChange('paused')}
              disabled={loading}
              className="p-1 h-auto"
            >
              <Pause size={12} />
            </Button>
          )}
          {quest.status === 'paused' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStatusChange('active')}
              disabled={loading}
              className="p-1 h-auto"
            >
              <Play size={12} />
            </Button>
          )}
          {quest.status !== 'completed' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStatusChange('completed')}
              disabled={loading}
              className="p-1 h-auto"
            >
              <CheckCircle size={12} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};