import React from 'react';
import { Flame, Calendar, Award } from 'lucide-react';

interface StreakDisplayProps {
  currentStreak: number;
  bestStreak?: number;
  lastActivity?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
  currentStreak,
  bestStreak,
  lastActivity,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'w-6 h-6',
      iconSize: 16,
      title: 'text-text-12-med font-text-12-med',
      value: 'text-title-14 font-title-14-black',
      subtitle: 'text-caption-10-reg font-caption-10-reg'
    },
    md: {
      container: 'p-4',
      icon: 'w-8 h-8',
      iconSize: 20,
      title: 'text-text-14-med font-text-14-med',
      value: 'text-title-16 font-title-16-black',
      subtitle: 'text-caption-11-reg font-caption-11-reg'
    },
    lg: {
      container: 'p-6',
      icon: 'w-10 h-10',
      iconSize: 24,
      title: 'text-text-16-med font-text-16-med',
      value: 'text-title-20 font-title-20-black',
      subtitle: 'text-text-12-reg font-text-12-reg'
    }
  };

  const classes = sizeClasses[size];

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'bg-communicationsoliderror';
    if (streak >= 14) return 'bg-error-50';
    if (streak >= 7) return 'bg-warning-50';
    if (streak >= 3) return 'bg-success-50';
    return 'bg-primarysolid-50';
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return 'Start your streak today!';
    if (streak === 1) return 'Great start! Keep it up!';
    if (streak < 7) return 'Building momentum!';
    if (streak < 14) return 'You\'re on fire! 🔥';
    if (streak < 30) return 'Incredible dedication!';
    return 'Legendary streak! 🏆';
  };

  return (
    <div className={`bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428] ${classes.container}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`${classes.icon} ${getStreakColor(currentStreak)} rounded-xl flex items-center justify-center`}>
          <Flame className="text-white-100" size={classes.iconSize} />
        </div>
        <div className="flex-1">
          <p className={`${classes.title} text-black-100`}>
            Current Streak
          </p>
          <p className={`${classes.value} text-black-100`}>
            {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className={`${classes.subtitle} text-black-60`}>
          {getStreakMessage(currentStreak)}
        </p>

        {bestStreak !== undefined && bestStreak > currentStreak && (
          <div className="flex items-center gap-2 p-2 bg-warning-10 rounded-lg border border-warning-50">
            <Award size={12} className="text-warning-60" />
            <span className={`${classes.subtitle} text-warning-70`}>
              Best: {bestStreak} days
            </span>
          </div>
        )}

        {lastActivity && (
          <div className="flex items-center gap-2">
            <Calendar size={10} className="text-black-60" />
            <span className={`${classes.subtitle} text-black-60`}>
              Last activity: {new Date(lastActivity).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};