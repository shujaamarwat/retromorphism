import React from 'react';
import { Filter, Calendar, Flag, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskFiltersProps {
  filters: {
    status: 'all' | 'pending' | 'completed';
    priority: 'all' | '1' | '2' | '3' | '4' | '5';
    difficulty: 'all' | '1' | '2' | '3' | '4' | '5';
    dueDate: 'all' | 'today' | 'week' | 'overdue';
    tags: string[];
  };
  onFilterChange: (filters: any) => void;
  availableTags: string[];
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFilterChange,
  availableTags
}) => {
  const updateFilter = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilter('tags', newTags);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-black-60" />
        <span className="text-text-14-med font-text-14-med text-black-100">
          Filters
        </span>
      </div>

      {/* Status Filter */}
      <div>
        <h4 className="text-text-12-med font-text-12-med text-black-100 mb-2">
          Status
        </h4>
        <div className="flex gap-2">
          {(['all', 'pending', 'completed'] as const).map((status) => (
            <Button
              key={status}
              variant={filters.status === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('status', status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <h4 className="text-text-12-med font-text-12-med text-black-100 mb-2 flex items-center gap-1">
          <Flag size={12} />
          Priority
        </h4>
        <div className="flex gap-2">
          <Button
            variant={filters.priority === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateFilter('priority', 'all')}
          >
            All
          </Button>
          {[1, 2, 3, 4, 5].map((priority) => (
            <Button
              key={priority}
              variant={filters.priority === priority.toString() ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('priority', priority.toString())}
            >
              P{priority}
            </Button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div>
        <h4 className="text-text-12-med font-text-12-med text-black-100 mb-2">
          Difficulty
        </h4>
        <div className="flex gap-2">
          <Button
            variant={filters.difficulty === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateFilter('difficulty', 'all')}
          >
            All
          </Button>
          {[1, 2, 3, 4, 5].map((difficulty) => (
            <Button
              key={difficulty}
              variant={filters.difficulty === difficulty.toString() ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('difficulty', difficulty.toString())}
            >
              D{difficulty}
            </Button>
          ))}
        </div>
      </div>

      {/* Due Date Filter */}
      <div>
        <h4 className="text-text-12-med font-text-12-med text-black-100 mb-2 flex items-center gap-1">
          <Calendar size={12} />
          Due Date
        </h4>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'today', 'week', 'overdue'] as const).map((period) => (
            <Button
              key={period}
              variant={filters.dueDate === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('dueDate', period)}
              className="capitalize"
            >
              {period === 'week' ? 'This Week' : period}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      {availableTags.length > 0 && (
        <div>
          <h4 className="text-text-12-med font-text-12-med text-black-100 mb-2 flex items-center gap-1">
            <Tag size={12} />
            Tags
          </h4>
          <div className="flex gap-2 flex-wrap">
            {availableTags.map((tag) => (
              <Button
                key={tag}
                variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleTag(tag)}
                className="text-caption-11-med font-caption-11-med"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFilterChange({
          status: 'all',
          priority: 'all',
          difficulty: 'all',
          dueDate: 'all',
          tags: []
        })}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );
};