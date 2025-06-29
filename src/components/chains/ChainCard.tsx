import React from 'react';
import { Chain } from '@/lib/supabase';
import { Link, TrendingUp, Calendar, Play, Pause, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChainCardProps {
  chain: Chain;
  onClick?: () => void;
  onToggleStatus?: () => void;
  onReset?: () => void;
}

const categoryColors = {
  wellness: 'bg-success-50',
  fitness: 'bg-error-50',
  education: 'bg-secondarysolid-50',
  productivity: 'bg-primarysolid-50',
  creativity: 'bg-warning-50',
  social: 'bg-info-50',
  general: 'bg-black-70',
};

const frequencyLabels = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
};

export const ChainCard: React.FC<ChainCardProps> = ({ 
  chain, 
  onClick,
  onToggleStatus,
  onReset
}) => {
  const categoryColor = categoryColors[chain.category as keyof typeof categoryColors] || categoryColors.general;
  const progressPercent = (chain.current_streak / chain.chain_length) * 100;

  return (
    <div 
      className={`
        p-4 rounded-2xl border-2 border-black-100 cursor-pointer transition-all duration-200
        ${chain.is_active
          ? 'bg-white-100 hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:transform hover:-translate-y-1'
          : 'bg-black-10 opacity-75'
        }
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-6 h-6 ${categoryColor} rounded-lg flex items-center justify-center`}>
              <Link className="text-white-100" size={12} />
            </div>
            <h3 className="text-title-14 font-title-14-black text-black-100 truncate">
              {chain.name}
            </h3>
          </div>
          {chain.description && (
            <p className="text-caption-11-reg font-caption-11-reg text-black-60 line-clamp-2">
              {chain.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleStatus}
            className="p-1 h-auto"
          >
            {chain.is_active ? <Pause size={12} /> : <Play size={12} />}
          </Button>
          {chain.current_streak > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="p-1 h-auto"
            >
              <RotateCcw size={12} />
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-caption-11-reg font-caption-11-reg text-black-60">
            Progress
          </span>
          <span className="text-caption-11-med font-caption-11-med text-black-70">
            {chain.current_streak}/{chain.chain_length}
          </span>
        </div>
        <div className="w-full bg-black-20 rounded-full h-2 border border-black-100">
          <div 
            className="bg-success-60 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp size={10} className="text-success-60" />
            <span className="text-caption-10-med font-caption-10-med text-black-100">
              {chain.current_streak}
            </span>
          </div>
          <p className="text-caption-10-reg font-caption-10-reg text-black-60">
            Current
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award size={10} className="text-warning-60" />
            <span className="text-caption-10-med font-caption-10-med text-black-100">
              {chain.best_streak}
            </span>
          </div>
          <p className="text-caption-10-reg font-caption-10-reg text-black-60">
            Best
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Calendar size={10} className="text-secondarysolid-60" />
            <span className="text-caption-10-med font-caption-10-med text-black-100">
              {frequencyLabels[chain.frequency_period]}
            </span>
          </div>
          <p className="text-caption-10-reg font-caption-10-reg text-black-60">
            Frequency
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-black-20">
        <div className="flex items-center gap-1">
          <span className="text-caption-10-reg font-caption-10-reg text-black-60">
            {chain.category}
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-primarysolid-60">
          <Award size={10} />
          <span className="text-caption-10-med font-caption-10-med">
            +{chain.reward_xp} XP
          </span>
        </div>
      </div>
    </div>
  );
};