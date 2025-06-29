import React from 'react';
import { Clock, Calendar, TrendingUp, Target } from 'lucide-react';

interface ProductivityInsightsProps {
  insights: {
    bestDay: string;
    bestTime: string;
    averageTasksPerDay: number;
    completionRate: number;
  };
}

export const ProductivityInsights: React.FC<ProductivityInsightsProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'day': return Calendar;
      case 'time': return Clock;
      case 'average': return TrendingUp;
      case 'rate': return Target;
      default: return TrendingUp;
    }
  };

  const insightItems = [
    {
      type: 'day',
      title: 'Most Productive Day',
      value: insights.bestDay,
      description: 'You complete the most tasks on this day',
      color: 'bg-primarysolid-50'
    },
    {
      type: 'time',
      title: 'Peak Performance Time',
      value: insights.bestTime,
      description: 'Your most productive time of day',
      color: 'bg-secondarysolid-50'
    },
    {
      type: 'average',
      title: 'Daily Average',
      value: `${insights.averageTasksPerDay} tasks`,
      description: 'Average tasks completed per day',
      color: 'bg-success-50'
    },
    {
      type: 'rate',
      title: 'Success Rate',
      value: `${insights.completionRate}%`,
      description: 'Percentage of tasks you complete',
      color: 'bg-warning-50'
    }
  ];

  return (
    <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
      <h3 className="text-title-18 font-title-18-black text-black-100 mb-4">
        Productivity Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightItems.map((item) => {
          const Icon = getInsightIcon(item.type);
          
          return (
            <div
              key={item.type}
              className="p-4 bg-primarysolid-10 rounded-xl border border-black-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white-100" size={16} />
                </div>
                <h4 className="text-text-12-med font-text-12-med text-black-100">
                  {item.title}
                </h4>
              </div>
              
              <p className="text-title-16 font-title-16-black text-black-100 mb-1">
                {item.value}
              </p>
              
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Additional Tips */}
      <div className="mt-6 p-4 bg-secondarysolid-10 rounded-xl border border-black-100">
        <h4 className="text-text-14-med font-text-14-med text-black-100 mb-2">
          💡 Productivity Tips
        </h4>
        <ul className="space-y-1 text-caption-11-reg font-caption-11-reg text-black-60">
          <li>• Schedule important tasks during your peak performance time ({insights.bestTime})</li>
          <li>• Plan more challenging work on {insights.bestDay}s when you're most productive</li>
          <li>• Aim to maintain your {insights.completionRate}% completion rate or improve it</li>
          <li>• Try to increase your daily average of {insights.averageTasksPerDay} tasks gradually</li>
        </ul>
      </div>
    </div>
  );
};