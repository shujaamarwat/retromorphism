import React, { useEffect, useState } from 'react';
import { X, Link, TrendingUp, Calendar, Award, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chain, ChainStep, ChainCompletion, supabase } from '@/lib/supabase';
import { format } from 'date-fns';

interface ChainDetailModalProps {
  chain: Chain;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const ChainDetailModal: React.FC<ChainDetailModalProps> = ({
  chain,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [steps, setSteps] = useState<ChainStep[]>([]);
  const [completions, setCompletions] = useState<ChainCompletion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && chain) {
      loadChainDetails();
    }
  }, [isOpen, chain]);

  const loadChainDetails = async () => {
    try {
      setLoading(true);

      // Load chain steps
      const { data: stepsData } = await supabase
        .from('chain_steps')
        .select('*')
        .eq('chain_id', chain.id)
        .order('step_number');

      // Load recent completions
      const { data: completionsData } = await supabase
        .from('chain_completions')
        .select('*')
        .eq('chain_id', chain.id)
        .order('completed_at', { ascending: false })
        .limit(10);

      setSteps(stepsData || []);
      setCompletions(completionsData || []);
    } catch (error) {
      console.error('Error loading chain details:', error);
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = (chain.current_streak / chain.chain_length) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primarysolid-50 rounded-2xl flex items-center justify-center border-2 border-black-100">
              <Link className="text-black-100" size={32} />
            </div>
            <div>
              <h2 className="text-title-24 font-title-24-black text-black-100">
                {chain.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-text-14-reg font-text-14-reg text-black-60 capitalize">
                  {chain.category} • {chain.frequency_period}
                </span>
                <div className={`
                  px-2 py-1 rounded-lg border text-caption-10-med font-caption-10-med
                  ${chain.is_active 
                    ? 'bg-success-20 text-success-70 border-success-50'
                    : 'bg-warning-20 text-warning-70 border-warning-50'
                  }
                `}>
                  {chain.is_active ? 'Active' : 'Paused'}
                </div>
              </div>
            </div>
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
          {/* Description */}
          {chain.description && (
            <div>
              <p className="text-text-16-reg font-text-16-reg text-black-70">
                {chain.description}
              </p>
            </div>
          )}

          {/* Progress Overview */}
          <div className="p-4 bg-primarysolid-10 rounded-2xl border-2 border-black-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-title-16 font-title-16-black text-black-100">
                Current Progress
              </h3>
              <span className="text-text-14-reg font-text-14-reg text-black-60">
                {chain.current_streak}/{chain.chain_length} steps
              </span>
            </div>
            
            <div className="w-full bg-black-20 rounded-full h-3 border border-black-100 mb-3">
              <div 
                className="bg-success-60 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp size={14} className="text-success-60" />
                  <span className="text-title-14 font-title-14-black text-black-100">
                    {chain.current_streak}
                  </span>
                </div>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                  Current Streak
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Award size={14} className="text-warning-60" />
                  <span className="text-title-14 font-title-14-black text-black-100">
                    {chain.best_streak}
                  </span>
                </div>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                  Best Streak
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Award size={14} className="text-primarysolid-60" />
                  <span className="text-title-14 font-title-14-black text-black-100">
                    {chain.reward_xp}
                  </span>
                </div>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                  Completion XP
                </p>
              </div>
            </div>
          </div>

          {/* Chain Steps */}
          <div>
            <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
              Chain Steps
            </h3>
            {loading ? (
              <div className="text-center py-6">
                <p className="text-text-14-reg font-text-14-reg text-black-60">
                  Loading steps...
                </p>
              </div>
            ) : steps.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-text-14-reg font-text-14-reg text-black-60">
                  No steps defined for this chain
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const isCompleted = index < chain.current_streak;
                  const isCurrent = index === chain.current_streak;
                  
                  return (
                    <div
                      key={step.id}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-200
                        ${isCompleted 
                          ? 'bg-success-10 border-success-50'
                          : isCurrent
                          ? 'bg-primarysolid-20 border-primarysolid-50 shadow-[-2px_4px_0px_#001428]'
                          : 'bg-white-100 border-black-100'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-8 h-8 rounded-full border-2 flex items-center justify-center
                          ${isCompleted 
                            ? 'bg-success-50 border-success-60'
                            : isCurrent
                            ? 'bg-primarysolid-50 border-primarysolid-60'
                            : 'bg-white-100 border-black-100'
                          }
                        `}>
                          {isCompleted ? (
                            <CheckCircle className="text-white-100" size={16} />
                          ) : (
                            <span className="text-text-12-med font-text-12-med text-black-100">
                              {step.step_number}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-text-14-med font-text-14-med text-black-100">
                              {step.title}
                            </h4>
                            {step.is_milestone && (
                              <div className="px-2 py-1 bg-warning-50 rounded-lg border border-black-100">
                                <span className="text-caption-10-med font-caption-10-med text-white-100">
                                  Milestone
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {step.description && (
                            <p className="text-caption-11-reg font-caption-11-reg text-black-60 mb-2">
                              {step.description}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 text-caption-10-reg font-caption-10-reg text-black-60">
                            {step.estimated_duration && (
                              <span>⏱️ {step.estimated_duration}min</span>
                            )}
                            {step.required_context && (
                              <span>📍 {step.required_context}</span>
                            )}
                            <span>+{step.xp_reward} XP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Completions */}
          {completions.length > 0 && (
            <div>
              <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
                Recent Completions
              </h3>
              <div className="space-y-2">
                {completions.slice(0, 5).map((completion) => (
                  <div
                    key={completion.id}
                    className="flex items-center justify-between p-3 bg-white-100 rounded-xl border border-black-100"
                  >
                    <div>
                      <p className="text-text-12-med font-text-12-med text-black-100">
                        Step {completion.streak_position}
                      </p>
                      <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                        {format(new Date(completion.completed_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    {completion.completion_time && (
                      <span className="text-caption-11-reg font-caption-11-reg text-black-60">
                        {completion.completion_time}min
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};