import React, { useEffect, useState } from 'react';
import { Trophy, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-communicationsoliderror to-error-60';
      case 'epic': return 'from-error-50 to-warning-50';
      case 'rare': return 'from-warning-50 to-primarysolid-50';
      default: return 'from-success-50 to-info-50';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-communicationsoliderror';
      case 'epic': return 'border-error-50';
      case 'rare': return 'border-warning-50';
      default: return 'border-success-50';
    }
  };

  if (!achievement) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 transition-all duration-300 transform
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className={`
        bg-white-100 rounded-2xl border-2 ${getRarityBorder(achievement.rarity)} 
        shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] 
        w-80 overflow-hidden
      `}>
        {/* Header with gradient */}
        <div className={`
          bg-gradient-to-r ${getRarityColor(achievement.rarity)} p-4 relative
        `}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white-100 rounded-full flex items-center justify-center border-2 border-black-100">
              <span className="text-2xl">{achievement.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="text-white-100" size={16} />
                <span className="text-text-12-med font-text-12-med text-white-100 uppercase tracking-wide">
                  Achievement Unlocked
                </span>
              </div>
              <h3 className="text-title-14 font-title-14-black text-white-100">
                {achievement.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-1 text-white-100 hover:bg-white-20"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Sparkle effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-white-100 opacity-60 animate-pulse"
                size={8}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-text-14-reg font-text-14-reg text-black-70 mb-3">
            {achievement.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className={`
              px-2 py-1 rounded-lg border text-caption-10-med font-caption-10-med text-white-100
              ${getRarityColor(achievement.rarity)} ${getRarityBorder(achievement.rarity)}
            `}>
              {achievement.rarity.toUpperCase()}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="text-caption-11-med font-caption-11-med"
            >
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};