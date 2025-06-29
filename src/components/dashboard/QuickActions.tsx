import React from 'react';
import { Plus, Target, Zap, Link, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: CheckSquare,
      label: 'Add Task',
      description: 'Create a new task',
      color: 'bg-success-50',
      onClick: () => navigate('/tasks')
    },
    {
      icon: Target,
      label: 'New Quest',
      description: 'Start an epic journey',
      color: 'bg-primarysolid-50',
      onClick: () => navigate('/quests')
    },
    {
      icon: Zap,
      label: 'Create Virtua',
      description: 'Train a new companion',
      color: 'bg-secondarysolid-50',
      onClick: () => navigate('/virtuas')
    },
    {
      icon: Link,
      label: 'Build Chain',
      description: 'Form a habit chain',
      color: 'bg-warning-50',
      onClick: () => navigate('/chains')
    }
  ];

  return (
    <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
      <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              onClick={action.onClick}
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primarysolid-10 transition-all duration-200"
            >
              <div className={`w-8 h-8 ${action.color} rounded-xl flex items-center justify-center`}>
                <Icon className="text-white-100" size={16} />
              </div>
              <div className="text-center">
                <p className="text-text-12-med font-text-12-med text-black-100">
                  {action.label}
                </p>
                <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                  {action.description}
                </p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};