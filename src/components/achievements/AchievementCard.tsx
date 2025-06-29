import React, { useState } from 'react';
import { Trophy, Share2, Lock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareModal } from '@/components/social/ShareModal';
import { Rune } from '@/lib/supabase';

interface AchievementCardProps {
  rune: Rune & { earned?: boolean; earned_at?: string };
  onClick?: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ rune, onClick }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-communicationsoliderror';
      case 'epic': return 'bg-error-50';
      case 'rare': return 'bg-warning-50';
      default: return 'bg-success-50';
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

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rune.earned) {
      setShowShareModal(true);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`
          p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
          ${rune.earned
            ? `bg-white-100 ${getRarityBorder(rune.rarity)} shadow-[-2px_4px_0px_#001428] hover:shadow-[0_6px_0_#001428,0_8px_12px_rgba(0,20,40,0.3)] hover:transform hover:-translate-y-1`
            : 'bg-black-10 border-black-30 opacity-60'
          }
        `}
      >
        {/* Rune Icon */}
        <div className="flex items-center justify-center mb-3">
          <div className={`
            w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl relative
            ${rune.earned 
              ? `${getRarityColor(rune.rarity)} border-black-100` 
              : 'bg-black-20 border-black-40'
            }
          `}>
            {rune.earned ? (
              <>
                <span className="text-white-100">{rune.icon}</span>
                {/* Sparkle effect for legendary */}
                {rune.rarity === 'legendary' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="absolute text-white-100 opacity-60 animate-pulse"
                        size={8}
                        style={{
                          left: `${10 + i * 20}%`,
                          top: `${10 + (i % 2) * 60}%`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Lock className="text-black-60" size={24} />
            )}
          </div>
        </div>

        {/* Rune Info */}
        <div className="text-center">
          <h3 className={`
            text-title-14 font-title-14-black mb-1
            ${rune.earned ? 'text-black-100' : 'text-black-60'}
          `}>
            {rune.name}
          </h3>
          
          <p className={`
            text-caption-11-reg font-caption-11-reg mb-3
            ${rune.earned ? 'text-black-60' : 'text-black-40'}
          `}>
            {rune.description}
          </p>

          {/* Rarity & XP */}
          <div className="flex items-center justify-between mb-3">
            <div className={`
              px-2 py-1 rounded-lg border text-caption-10-med font-caption-10-med
              ${rune.earned 
                ? `${getRarityColor(rune.rarity)} border-black-100 text-white-100`
                : 'bg-black-20 border-black-40 text-black-60'
              }
            `}>
              {rune.rarity}
            </div>
            
            {rune.xp_bonus > 0 && (
              <div className={`
                flex items-center gap-1 text-caption-10-med font-caption-10-med
                ${rune.earned ? 'text-primarysolid-60' : 'text-black-40'}
              `}>
                <Trophy size={10} />
                +{rune.xp_bonus}%
              </div>
            )}
          </div>

          {/* Actions */}
          {rune.earned && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex-1 gap-2"
              >
                <Share2 size={12} />
                Share
              </Button>
            </div>
          )}

          {/* Earned Date */}
          {rune.earned && rune.earned_at && (
            <div className="mt-3 pt-3 border-t border-black-20">
              <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                Earned {new Date(rune.earned_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        achievement={{
          title: rune.name,
          description: rune.description,
          icon: rune.icon,
          rarity: rune.rarity
        }}
        type="achievement"
      />
    </>
  );
};