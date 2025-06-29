import React from 'react';
import { X, Zap, Trophy, Star, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  xpGained: number;
  rewards?: string[];
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  newLevel,
  xpGained,
  rewards = []
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-md overflow-hidden">
        {/* Celebration Header */}
        <div className="relative bg-gradient-to-r from-primarysolid-50 to-warning-50 p-6 text-center">
          <div className="absolute inset-0 bg-primarysolid-50 opacity-90"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black-100">
              <Trophy className="text-primarysolid-60" size={32} />
            </div>
            <h2 className="text-title-24 font-title-24-black text-black-100 mb-2">
              Level Up!
            </h2>
            <p className="text-text-16-reg font-text-16-reg text-black-70">
              Congratulations! You've reached Level {newLevel}
            </p>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-warning-50 rounded-full animate-bounce"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* XP Gained */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="text-primarysolid-60" size={20} />
              <span className="text-title-20 font-title-20-black text-primarysolid-60">
                +{xpGained} XP
              </span>
            </div>
            <p className="text-caption-11-reg font-caption-11-reg text-black-60">
              Experience gained
            </p>
          </div>

          {/* Level Progress */}
          <div className="p-4 bg-primarysolid-10 rounded-xl border border-black-100">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-title-16 font-title-16-black text-black-100">
                  Level {newLevel - 1}
                </span>
              </div>
              <ArrowUp className="text-success-60" size={20} />
              <div className="flex items-center gap-2">
                <span className="text-title-16 font-title-16-black text-primarysolid-60">
                  Level {newLevel}
                </span>
                <Star className="text-warning-60" size={16} />
              </div>
            </div>
            
            <div className="w-full bg-black-20 rounded-full h-3 border border-black-100">
              <div className="bg-primarysolid-60 h-full rounded-full w-full animate-pulse" />
            </div>
          </div>

          {/* Rewards */}
          {rewards.length > 0 && (
            <div>
              <h3 className="text-title-14 font-title-14-black text-black-100 mb-3 text-center">
                🎁 New Rewards Unlocked!
              </h3>
              <div className="space-y-2">
                {rewards.map((reward, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-success-10 rounded-xl border border-success-50"
                  >
                    <div className="w-6 h-6 bg-success-50 rounded-full flex items-center justify-center">
                      <Star className="text-white-100" size={12} />
                    </div>
                    <span className="text-text-14-reg font-text-14-reg text-black-100">
                      {reward}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Motivational Message */}
          <div className="text-center p-4 bg-secondarysolid-10 rounded-xl border border-black-100">
            <p className="text-text-14-reg font-text-14-reg text-black-70">
              "Every level up is a step closer to mastering your goals. Keep pushing forward!"
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full gap-2"
          >
            <Trophy size={16} />
            Continue Your Journey
          </Button>
        </div>

        {/* Close X */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-black-100 hover:bg-black-20"
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};