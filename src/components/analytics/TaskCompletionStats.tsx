import React from 'react';
import { CheckCircle, Circle, TrendingUp, Calendar } from 'lucide-react';

interface TaskCompletionStatsProps {
  completed: number;
  total: number;
  insights: {
    bestDay: string;
    bestTime: string;
    averageTasksPerDay: number;
    completionRate: number;
  };
}

export const TaskCompletionStats: React.FC<TaskCompletionStatsProps> = ({ 
  completed, 
  total, 
  insights 
}) => {
  const completionRate = total > 0 ? (completed / total) * 100 : 0;
  const remaining = total - completed;

  return (
    <div className="space-y-4">
      {/* Completion Overview */}
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-3">
          {/* Background circle */}
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#22C55E"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${completionRate * 2.51} 251`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-title-16 font-title-16-black text-black-100">
              {Math.round(completionRate)}%
            </span>
          </div>
        </div>
        
        <p className="text-text-14-med font-text-14-med text-black-100">
          {completed} of {total} tasks completed
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-success-10 rounded-xl border border-success-50">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="text-success-60" size={14} />
            <span className="text-caption-11-med font-caption-11-med text-black-100">
              Completed
            </span>
          </div>
          <p className="text-title-14 font-title-14-black text-black-100">
            {completed}
          </p>
        </div>

        <div className="p-3 bg-black-10 rounded-xl border border-black-30">
          <div className="flex items-center gap-2 mb-1">
            <Circle className="text-black-60" size={14} />
            <span className="text-caption-11-med font-caption-11-med text-black-100">
              Remaining
            </span>
          </div>
          <p className="text-title-14 font-title-14-black text-black-100">
            {remaining}
          </p>
        </div>

        <div className="p-3 bg-primarysolid-10 rounded-xl border border-primarysolid-50">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="text-primarysolid-60" size={14} />
            <span className="text-caption-11-med font-caption-11-med text-black-100">
              Daily Avg
            </span>
          </div>
          <p className="text-title-14 font-title-14-black text-black-100">
            {insights.averageTasksPerDay}
          </p>
        </div>

        <div className="p-3 bg-secondarysolid-10 rounded-xl border border-secondarysolid-50">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="text-secondarysolid-60" size={14} />
            <span className="text-caption-11-med font-caption-11-med text-black-100">
              Best Day
            </span>
          </div>
          <p className="text-title-14 font-title-14-black text-black-100">
            {insights.bestDay}
          </p>
        </div>
      </div>

      {/* Progress Message */}
      <div className="p-3 bg-info-10 rounded-xl border border-info-50">
        <p className="text-caption-11-reg font-caption-11-reg text-black-60 text-center">
          {completionRate >= 80 
            ? "🎉 Excellent progress! You're crushing your goals!"
            : completionRate >= 60
            ? "👍 Good work! Keep up the momentum!"
            : completionRate >= 40
            ? "📈 Making progress! Stay focused!"
            : "🚀 Just getting started! You've got this!"
          }
        </p>
      </div>
    </div>
  );
};