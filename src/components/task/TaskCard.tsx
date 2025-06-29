import React from 'react';
import { Task } from '@/lib/supabase';
import { CheckCircle2, Circle, Clock, Flag, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const difficultyColors = {
  1: 'bg-success-20 text-success-70',
  2: 'bg-info-20 text-info-70', 
  3: 'bg-warning-20 text-warning-70',
  4: 'bg-error-20 text-error-70',
  5: 'bg-communicationsoliderror text-white-100'
};

const priorityColors = {
  1: 'text-black-40',
  2: 'text-black-60',
  3: 'text-warning-60',
  4: 'text-error-60',
  5: 'text-communicationsoliderror'
};

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onToggleComplete,
  onEdit,
  onDelete 
}) => {
  const handleToggleComplete = () => {
    onToggleComplete?.(task.id);
  };

  return (
    <div className={`
      p-4 rounded-2xl border-2 border-black-100 transition-all duration-200
      ${task.completed 
        ? 'bg-success-10 opacity-75' 
        : 'bg-white-100 hover:shadow-[-2px_4px_0px_#001428]'
      }
    `}>
      <div className="flex items-start gap-3">
        {/* Completion checkbox */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleComplete}
          className="p-0 h-auto hover:bg-transparent"
        >
          {task.completed ? (
            <CheckCircle2 className="text-success-60" size={20} />
          ) : (
            <Circle className="text-black-40 hover:text-success-60" size={20} />
          )}
        </Button>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`
              text-text-16-med font-text-16-med leading-tight
              ${task.completed ? 'line-through text-black-60' : 'text-black-100'}
            `}>
              {task.title}
            </h3>
            
            {/* XP reward */}
            <div className="flex items-center gap-1 px-2 py-1 bg-primarysolid-20 rounded-lg border border-black-100">
              <span className="text-caption-10-med font-caption-10-med text-black-100">
                +{task.xp_reward} XP
              </span>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-text-14-reg font-text-14-reg text-black-60 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Meta information */}
          <div className="flex items-center gap-4 mt-3">
            {/* Difficulty */}
            <div className={`
              px-2 py-1 rounded-lg text-caption-10-med font-caption-10-med border
              ${difficultyColors[task.difficulty as keyof typeof difficultyColors]}
            `}>
              Difficulty {task.difficulty}
            </div>

            {/* Priority */}
            <div className="flex items-center gap-1">
              <Flag 
                size={12} 
                className={priorityColors[task.priority as keyof typeof priorityColors]}
              />
              <span className="text-caption-10-reg font-caption-10-reg text-black-60">
                P{task.priority}
              </span>
            </div>

            {/* Due date */}
            {task.due_date && (
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-black-60" />
                <span className="text-caption-10-reg font-caption-10-reg text-black-60">
                  {format(new Date(task.due_date), 'MMM d')}
                </span>
              </div>
            )}

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag size={12} className="text-black-60" />
                <span className="text-caption-10-reg font-caption-10-reg text-black-60">
                  {task.tags.slice(0, 2).join(', ')}
                  {task.tags.length > 2 && ` +${task.tags.length - 2}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};