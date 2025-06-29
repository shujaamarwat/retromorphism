import React from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';
import { ProgressRing } from './ProgressRing';

interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  type: 'tasks' | 'xp' | 'streak' | 'level';
  reward: string;
  completed: boolean;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestones }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'tasks': return Target;
      case 'xp': return Zap;
      case 'streak': return Star;
      case 'level': return Trophy;
      default: return Target;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'tasks': return '#22C55E';
      case 'xp': return '#FFDD00';
      case 'streak': return '#F59E0B';
      case 'level': return '#0082FF';
      default: return '#22C55E';
    }
  };

  return (
    <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
      <h3 className="text-title-18 font-title-18-black text-black-100 mb-6">
        Milestone Progress
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {milestones.map((milestone) => {
          const Icon = getIcon(milestone.type);
          const progress = Math.min((milestone.current / milestone.target) * 100, 100);
          const color = getColor(milestone.type);

          return (
            <div
              key={milestone.id}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200
                ${milestone.completed 
                  ? 'bg-success-10 border-success-50 shadow-[-2px_4px_0px_#22C55E]'
                  : 'bg-white-100 border-black-100 hover:shadow-[-2px_4px_0px_#001428]'
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
                <ProgressRing
                  progress={progress}
                  size={80}
                  strokeWidth={6}
                  color={color}
                >
                  <div className="flex flex-col items-center">
                    <Icon size={20} style={{ color }} />
                    <span className="text-caption-10-med font-caption-10-med text-black-100 mt-1">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </ProgressRing>

                <h4 className="text-text-14-med font-text-14-med text-black-100 mt-3 mb-1">
                  {milestone.title}
                </h4>
                
                <p className="text-caption-11-reg font-caption-11-reg text-black-60 mb-2">
                  {milestone.description}
                </p>

                <div className="text-center mb-3">
                  <span className="text-title-14 font-title-14-black text-black-100">
                    {milestone.current.toLocaleString()}
                  </span>
                  <span className="text-caption-11-reg font-caption-11-reg text-black-60">
                    /{milestone.target.toLocaleString()}
                  </span>
                </div>

                {milestone.completed ? (
                  <div className="px-3 py-1 bg-success-50 text-white-100 rounded-lg border border-black-100">
                    <span className="text-caption-11-med font-caption-11-med">
                      ✓ Completed
                    </span>
                  </div>
                ) : (
                  <div className="px-3 py-1 bg-primarysolid-10 rounded-lg border border-black-100">
                    <span className="text-caption-11-med font-caption-11-med text-black-100">
                      🎁 {milestone.reward}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};