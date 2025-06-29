import React from 'react';
import { TrendingUp, Clock, Target, Zap, Calendar, Award } from 'lucide-react';

interface AdvancedInsightsProps {
  data: {
    productivityScore: number;
    focusTime: number;
    peakHours: string[];
    completionTrend: number;
    weeklyGoalProgress: number;
    burnoutRisk: 'low' | 'medium' | 'high';
    recommendations: string[];
  };
}

export const AdvancedInsights: React.FC<AdvancedInsightsProps> = ({ data }) => {
  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-error-50 text-white-100';
      case 'medium': return 'bg-warning-50 text-black-100';
      default: return 'bg-success-50 text-white-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-60';
    if (score >= 60) return 'text-warning-60';
    return 'text-error-60';
  };

  return (
    <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
      <h3 className="text-title-18 font-title-18-black text-black-100 mb-6">
        Advanced Insights
      </h3>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-primarysolid-10 rounded-xl border border-black-100">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-primarysolid-60" size={20} />
            <h4 className="text-text-14-med font-text-14-med text-black-100">
              Productivity Score
            </h4>
          </div>
          <p className={`text-title-24 font-title-24-black ${getScoreColor(data.productivityScore)}`}>
            {data.productivityScore}/100
          </p>
          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
            Based on completion rate and consistency
          </p>
        </div>

        <div className="p-4 bg-secondarysolid-10 rounded-xl border border-black-100">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-secondarysolid-60" size={20} />
            <h4 className="text-text-14-med font-text-14-med text-black-100">
              Focus Time
            </h4>
          </div>
          <p className="text-title-24 font-title-24-black text-black-100">
            {Math.round(data.focusTime)}h
          </p>
          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
            Average daily focused work
          </p>
        </div>

        <div className="p-4 bg-success-10 rounded-xl border border-black-100">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-success-60" size={20} />
            <h4 className="text-text-14-med font-text-14-med text-black-100">
              Weekly Goal
            </h4>
          </div>
          <p className="text-title-24 font-title-24-black text-black-100">
            {data.weeklyGoalProgress}%
          </p>
          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
            Progress towards weekly target
          </p>
        </div>
      </div>

      {/* Peak Performance */}
      <div className="mb-6">
        <h4 className="text-title-14 font-title-14-black text-black-100 mb-3">
          Peak Performance Hours
        </h4>
        <div className="flex gap-2 flex-wrap">
          {data.peakHours.map((hour) => (
            <div
              key={hour}
              className="px-3 py-1 bg-warning-50 text-white-100 rounded-lg border border-black-100"
            >
              <span className="text-caption-11-med font-caption-11-med">
                {hour}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Burnout Risk */}
      <div className="mb-6">
        <h4 className="text-title-14 font-title-14-black text-black-100 mb-3">
          Burnout Risk Assessment
        </h4>
        <div className={`p-3 rounded-xl border border-black-100 ${getBurnoutColor(data.burnoutRisk)}`}>
          <div className="flex items-center gap-2">
            <Zap size={16} />
            <span className="text-text-14-med font-text-14-med capitalize">
              {data.burnoutRisk} Risk
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="text-title-14 font-title-14-black text-black-100 mb-3">
          💡 Personalized Recommendations
        </h4>
        <div className="space-y-2">
          {data.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-info-10 rounded-xl border border-info-50"
            >
              <Award size={16} className="text-info-60 mt-0.5 flex-shrink-0" />
              <p className="text-text-14-reg font-text-14-reg text-black-70">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};