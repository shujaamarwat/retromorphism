import React, { useState, useMemo } from 'react';
import { Plus, Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import { CreateTaskModal } from './CreateTaskModal';
import { Task } from '@/lib/supabase';
import { isToday, isThisWeek, isPast, startOfDay } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskCreate: (taskData: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;
  questId?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskUpdate,
  onTaskCreate,
  onTaskDelete,
  questId
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filters, setFilters] = useState({
    status: 'all' as 'all' | 'pending' | 'completed',
    priority: 'all' as 'all' | '1' | '2' | '3' | '4' | '5',
    difficulty: 'all' as 'all' | '1' | '2' | '3' | '4' | '5',
    dueDate: 'all' as 'all' | 'today' | 'week' | 'overdue',
    tags: [] as string[]
  });

  // Get all available tags
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    tasks.forEach(task => {
      task.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [tasks]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!task.title.toLowerCase().includes(query) &&
            !task.description?.toLowerCase().includes(query) &&
            !task.tags.some(tag => tag.toLowerCase().includes(query))) {
          return false;
        }
      }

      // Status filter
      if (filters.status === 'pending' && task.completed) return false;
      if (filters.status === 'completed' && !task.completed) return false;

      // Priority filter
      if (filters.priority !== 'all' && task.priority.toString() !== filters.priority) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && task.difficulty.toString() !== filters.difficulty) {
        return false;
      }

      // Due date filter
      if (filters.dueDate !== 'all' && task.due_date) {
        const dueDate = new Date(task.due_date);
        const now = new Date();
        
        switch (filters.dueDate) {
          case 'today':
            if (!isToday(dueDate)) return false;
            break;
          case 'week':
            if (!isThisWeek(dueDate)) return false;
            break;
          case 'overdue':
            if (!isPast(dueDate) || isToday(dueDate)) return false;
            break;
        }
      }

      // Tags filter
      if (filters.tags.length > 0) {
        if (!filters.tags.some(tag => task.tags.includes(tag))) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, searchQuery, filters]);

  // Sort tasks by priority and due date
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Sort by priority (higher first)
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }

      // Sort by due date (sooner first)
      if (a.due_date && b.due_date) {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }
      if (a.due_date) return -1;
      if (b.due_date) return 1;

      // Sort by creation date (newer first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [filteredTasks]);

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    onTaskUpdate(taskId, {
      completed: !task.completed,
      completed_at: !task.completed ? new Date().toISOString() : null
    });
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-title-20 font-title-20-black text-black-100">
            Tasks
          </h2>
          <p className="text-text-14-reg font-text-14-reg text-black-60">
            {completedCount} of {totalCount} completed
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus size={16} />
          Add Task
        </Button>
      </div>

      {/* Search and Controls */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-60" size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                     text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                     focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
          />
        </div>
        
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
        </Button>

        <div className="flex gap-1 border-2 border-black-100 rounded-xl p-1">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="p-2"
          >
            <List size={16} />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="p-2"
          >
            <Grid size={16} />
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100">
          <TaskFilters
            filters={filters}
            onFilterChange={setFilters}
            availableTags={availableTags}
          />
        </div>
      )}

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primarysolid-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="text-primarysolid-60" size={24} />
          </div>
          <h3 className="text-title-18 font-title-18-black text-black-100 mb-2">
            {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
          </h3>
          <p className="text-text-14-reg font-text-14-reg text-black-60 mb-6">
            {tasks.length === 0 
              ? 'Create your first task to get started!'
              : 'Try adjusting your search or filters to find tasks.'
            }
          </p>
          {tasks.length === 0 && (
            <Button onClick={() => setShowCreateModal(true)} className="gap-2">
              <Plus size={16} />
              Create First Task
            </Button>
          )}
        </div>
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
          }
        `}>
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={onTaskCreate}
        questId={questId}
      />
    </div>
  );
};