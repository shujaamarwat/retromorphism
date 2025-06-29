import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

interface XPDisplayProps {
  currentXP: number;
  level: number;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const XPDisplay: React.FC<XPDisplayProps> = ({
  currentXP,
  level,
  showProgress = false,
  size = 'md'
}) => {
  const xpForCurrentLevel = level * 100;
  const xpForNextLevel = (level + 1) * 100;
  const xpInCurrentLevel = currentXP % xpForCurrentLevel;
  const xpNeededForNext = xpForNextLevel - currentXP;
  const progressPercent = (xpInCurrentLevel / xpForCurrentLevel) * 100;

  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'w-6 h-6',
      iconSize: 16,
      title: 'text-text-12-med font-text-12-med',
      value: 'text-title-14 font-title-14-black',
      subtitle: 'text-caption-10-reg font-caption-10-reg',
      progress: 'h-2'
    },
    md: {
      container: 'p-4',
      icon: 'w-8 h-8',
      iconSize: 20,
      title: 'text-text-14-med font-text-14-med',
      value: 'text-title-16 font-title-16-black',
      subtitle: 'text-caption-11-reg font-caption-11-reg',
      progress: 'h-3'
    },
    lg: {
      container: 'p-6',
      icon: 'w-10 h-10',
      iconSize: 24,
      title: 'text-text-16-med font-text-16-med',
      value: 'text-title-20 font-title-20-black',
      subtitle: 'text-text-12-reg font-text-12-reg',
      progress: 'h-4'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428] ${classes.container}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`${classes.icon} bg-primarysolid-50 rounded-xl flex items-center justify-center`}>
          <Zap className="text-black-100" size={classes.iconSize} />
        </div>
        <div className="flex-1">
          <p className={`${classes.title} text-black-100`}>
            Level {level}
          </p>
          <p className={`${classes.value} text-black-100`}>
            {currentXP.toLocaleString()} XP
          </p>
        </div>
      </div>

      {showProgress && (
        <div className="space-y-2">
          <div className={`w-full bg-black-20 rounded-full ${classes.progress} border border-black-100`}>
            <div 
              className="bg-primarysolid-60 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`${classes.subtitle} text-black-60`}>
              {xpInCurrentLevel.toLocaleString()} / {xpForCurrentLevel.toLocaleString()}
            </span>
            <div className="flex items-center gap-1">
              <TrendingUp size={10} className="text-success-60" />
              <span className={`${classes.subtitle} text-success-60`}>
                {xpNeededForNext.toLocaleString()} to next
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};