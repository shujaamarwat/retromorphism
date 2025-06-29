import React from 'react';
import { Virtua } from '@/lib/supabase';
import { Zap, TrendingUp } from 'lucide-react';

interface VirtuaCardProps {
  virtua: Virtua;
  isSelected?: boolean;
  onClick?: () => void;
}

export const VirtuaCard: React.FC<VirtuaCardProps> = ({ 
  virtua, 
  isSelected = false, 
  onClick 
}) => {
  const xpToNextLevel = (virtua.level * 100) - (virtua.xp % (virtua.level * 100));
  const progressPercent = ((virtua.xp % (virtua.level * 100)) / (virtua.level * 100)) * 100;

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-2xl border-2 border-black-100 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'bg-primarysolid-50 shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] transform -translate-y-1' 
          : 'bg-white-100 hover:bg-primarysolid-10 shadow-[-2px_4px_0px_#001428] hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:transform hover:-translate-y-1'
        }
      `}
    >
      {/* Avatar */}
      <div className="flex items-center gap-3 mb-3">
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

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-text-12-med font-text-12-med text-black-70">
            Level {virtua.level}
          </span>
          <span className="text-text-12-reg font-text-12-reg text-black-60">
            {virtua.xp} XP
          </span>
        </div>
        
        {/* XP Progress Bar */}
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
      </div>
    </div>
  );
};