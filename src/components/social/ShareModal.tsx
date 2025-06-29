import React, { useState } from 'react';
import { X, Share2, Copy, Twitter, Facebook, Link2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement?: {
    title: string;
    description: string;
    icon: string;
    rarity: string;
  };
  progress?: {
    level: number;
    xp: number;
    streak: number;
  };
  type: 'achievement' | 'progress' | 'milestone';
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  achievement,
  progress,
  type
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateShareText = () => {
    if (type === 'achievement' && achievement) {
      return `🏆 Just unlocked "${achievement.title}" in MindForge! ${achievement.description} #ProductivityGaming #MindForge`;
    } else if (type === 'progress' && progress) {
      return `🚀 Level ${progress.level} achieved in MindForge! ${progress.xp} XP earned with a ${progress.streak}-day streak! #ProductivityGaming #MindForge`;
    }
    return `🎯 Making great progress in MindForge! Join me in gamifying productivity! #MindForge`;
  };

  const shareUrl = window.location.origin;
  const shareText = generateShareText();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleDownloadImage = () => {
    // This would generate and download a shareable image
    console.log('Download image functionality would be implemented here');
  };

  return (
    <div className="fixed inset-0 bg-black-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Share2 className="text-black-100" size={16} />
            </div>
            <h2 className="text-title-18 font-title-18-black text-black-100">
              Share Your Success
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="p-4 bg-primarysolid-10 rounded-xl border-2 border-black-100">
            {type === 'achievement' && achievement && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning-50 rounded-full flex items-center justify-center border-2 border-black-100">
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                <div>
                  <h3 className="text-title-14 font-title-14-black text-black-100">
                    {achievement.title}
                  </h3>
                  <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                    {achievement.description}
                  </p>
                </div>
              </div>
            )}
            
            {type === 'progress' && progress && (
              <div className="text-center">
                <h3 className="text-title-16 font-title-16-black text-black-100 mb-2">
                  Level {progress.level} Achieved!
                </h3>
                <div className="flex justify-center gap-4">
                  <div>
                    <p className="text-title-14 font-title-14-black text-primarysolid-60">
                      {progress.xp}
                    </p>
                    <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                      Total XP
                    </p>
                  </div>
                  <div>
                    <p className="text-title-14 font-title-14-black text-success-60">
                      {progress.streak}
                    </p>
                    <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                      Day Streak
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Share Text */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Share Message
            </label>
            <textarea
              value={shareText}
              readOnly
              rows={3}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-14-reg font-text-14-reg text-black-100
                       focus:outline-none resize-none"
            />
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <h4 className="text-text-14-med font-text-14-med text-black-100">
              Share Options
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleTwitterShare}
                className="gap-2 justify-start"
              >
                <Twitter size={16} className="text-info-60" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                onClick={handleFacebookShare}
                className="gap-2 justify-start"
              >
                <Facebook size={16} className="text-secondarysolid-60" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="gap-2 justify-start"
              >
                <Copy size={16} className={copied ? "text-success-60" : "text-black-60"} />
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleDownloadImage}
                className="gap-2 justify-start"
              >
                <Download size={16} className="text-warning-60" />
                Download
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};