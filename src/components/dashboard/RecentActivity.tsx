import React from 'react';
import { CheckCircle, Trophy, Zap, Target, Clock } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';

interface Activity {
  id: string;
  type: 'task_completed' | 'quest_completed' | 'level_up' | 'achievement' | 'virtua_evolved';
  title: string;
  description: string;
  timestamp: string;
  xp?: number;
}

interface RecentActivityProps {
  activities?: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities = [] }) => {
  // Mock data for demonstration
  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'task_completed',
      title: 'Morning Routine',
      description: 'Completed daily morning routine',
      timestamp: new Date().toISOString(),
      xp: 25
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Early Bird',
      description: 'Completed 5 morning tasks in a row',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '3',
      type: 'level_up',
      title: 'Level Up!',
      description: 'Focus Virtua reached Level 3',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      xp: 100
    },
    {
      id: '4',
      type: 'quest_completed',
      title: 'Weekly Planning',
      description: 'Completed weekly planning quest',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      xp: 150
    }
  ];

  const displayActivities = activities.length > 0 ? activities : mockActivities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return <CheckCircle className="text-success-60" size={16} />;
      case 'quest_completed': return <Target className="text-primarysolid-60" size={16} />;
      case 'level_up': return <Zap className="text-secondarysolid-60" size={16} />;
      case 'achievement': return <Trophy className="text-warning-60" size={16} />;
      case 'virtua_evolved': return <Zap className="text-info-60" size={16} />;
      default: return <Clock className="text-black-60" size={16} />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'task_completed': return 'bg-success-10 border-success-50';
      case 'quest_completed': return 'bg-primarysolid-10 border-primarysolid-50';
      case 'level_up': return 'bg-secondarysolid-10 border-secondarysolid-50';
      case 'achievement': return 'bg-warning-10 border-warning-50';
      case 'virtua_evolved': return 'bg-info-10 border-info-50';
      default: return 'bg-white-100 border-black-100';
    }
  };

  const getTimeDisplay = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
    <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
      <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
        Recent Activity
      </h3>
      
      {displayActivities.length === 0 ? (
        <div className="text-center py-6">
          <Clock className="text-black-40 mx-auto mb-2" size={24} />
          <p className="text-text-14-reg font-text-14-reg text-black-60">
            No recent activity
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayActivities.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className={`
                p-3 rounded-xl border transition-all duration-200
                ${getActivityColor(activity.type)}
                hover:shadow-[-1px_2px_0px_#001428] hover:transform hover:-translate-y-0.5
              `}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-text-12-med font-text-12-med text-black-100">
                        {activity.title}
                      </h4>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                        {activity.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-caption-10-reg font-caption-10-reg text-black-60">
                        {getTimeDisplay(activity.timestamp)}
                      </span>
                      {activity.xp && (
                        <div className="flex items-center gap-1 mt-1">
                          <Zap size={10} className="text-primarysolid-60" />
                          <span className="text-caption-10-med font-caption-10-med text-primarysolid-60">
                            +{activity.xp}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};