import React from 'react';
import { Virtua } from '@/lib/supabase';
import { Zap, TrendingUp, Award } from 'lucide-react';

interface VirtuaCardProps {
  virtua: Virtua;
  isSelected?: boolean;
  onClick?: () => void;
  showProgress?: boolean;
}

export const VirtuaCard: React.FC<VirtuaCardProps> = ({ 
  virtua, 
  isSelected = false, 
  onClick,
  showProgress = false
}) => {
  const xpToNextLevel = (virtua.level * 100) - (virtua.xp % (virtua.level * 100));
  const progressPercent = ((virtua.xp % (virtua.level * 100)) / (virtua.level * 100)) * 100;

  const getEvolutionStage = (level: number) => {
    if (level >= 50) return { name: 'Master', color: 'bg-communicationsoliderror' };
    if (level >= 25) return { name: 'Expert', color: 'bg-error-50' };
    if (level >= 15) return { name: 'Advanced', color: 'bg-warning-50' };
    if (level >= 10) return { name: 'Skilled', color: 'bg-info-50' };
    if (level >= 5) return { name: 'Trained', color: 'bg-success-50' };
    return { name: 'Novice', color: 'bg-primarysolid-50' };
  };

  const evolution = getEvolutionStage(virtua.level);

  return (
    <div
      onClick={onClick}
      className={`
        p-6 rounded-2xl border-2 border-black-100 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'bg-primarysolid-50 shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] transform -translate-y-1' 
          : 'bg-white-100 hover:bg-primarysolid-10 shadow-[-2px_4px_0px_#001428] hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:transform hover:-translate-y-1'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-secondarysolid-50 rounded-full flex items-center justify-center border-2 border-black-100">
            <Zap className="text-white-100" size={24} />
          </div>
          <div>
            <h3 className="text-title-16 font-title-16-black text-black-100">
              {virtua.name}
            </h3>
            <p className="text-caption-11-reg font-caption-11-reg text-black-60">
              {virtua.domain}
            </p>
          </div>
        </div>
        
        <div className={`px-2 py-1 ${evolution.color} rounded-lg border border-black-100`}>
          <span className="text-caption-10-med font-caption-10-med text-white-100">
            {evolution.name}
          </span>
        </div>
      </div>

      {/* Level & XP */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-text-14-med font-text-14-med text-black-70">
            Level {virtua.level}
          </span>
          <span className="text-text-12-reg font-text-12-reg text-black-60">
            {virtua.xp.toLocaleString()} XP
          </span>
        </div>
        
        {/* XP Progress Bar */}
        {showProgress && (
          <>
            <div className="w-full bg-black-20 rounded-full h-2 border border-black-100">
              <div 
                className="bg-primarysolid-60 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <div className="flex items-center gap-1 text-caption-10-reg font-caption-10-reg text-black-60">
              <TrendingUp size={10} />
              {xpToNextLevel} XP to next level
            </div>
          </>
        )}

        {/* Traits Preview */}
        {virtua.traits && (
          <div className="pt-2 border-t border-black-20">
            <div className="flex items-center gap-2 text-caption-11-reg font-caption-11-reg text-black-60">
              <Award size={12} />
              <span>{virtua.traits.personality || 'Developing'}</span>
              <span>•</span>
              <span>{virtua.traits.preferences || 'Learning'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};