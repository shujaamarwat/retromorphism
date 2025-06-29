import React, { useEffect, useState } from 'react';
import { VirtuaCard } from '@/components/virtua/VirtuaCard';
import { TaskCard } from '@/components/task/TaskCard';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, Target, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';
import { supabase, Task, Virtua } from '@/lib/supabase';
import { format, startOfDay, endOfDay } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { 
    user, 
    virtuas, 
    setVirtuas, 
    selectedVirtua, 
    setSelectedVirtua,
    tasks,
    setTasks,
    updateTask
  } = useStore();

  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load virtuas
      const { data: virtuasData } = await supabase
        .from('virtuas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at');

      if (virtuasData) {
        setVirtuas(virtuasData);
        if (virtuasData.length > 0 && !selectedVirtua) {
          setSelectedVirtua(virtuasData[0]);
        }
      }

      // Load today's tasks
      const today = new Date();
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('due_date', startOfDay(today).toISOString())
        .lte('due_date', endOfDay(today).toISOString())
        .order('priority', { ascending: false })
        .order('created_at');

      if (tasksData) {
        setTasks(tasksData);
        setTodayTasks(tasksData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTaskComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ 
          completed: !task.completed,
          completed_at: !task.completed ? new Date().toISOString() : null
        })
        .eq('id', taskId);

      if (error) throw error;

      updateTask(taskId, { 
        completed: !task.completed,
        completed_at: !task.completed ? new Date().toISOString() : null
      });

      // TODO: Award XP and update virtua
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const completedTasks = todayTasks.filter(t => t.completed).length;
  const totalTasks = todayTasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-32 font-display-32-black text-black-100">
            Welcome back!
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
              <Target className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {completedTasks}/{totalTasks}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Tasks Today
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-black-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {Math.round(completionRate)}%
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Completion Rate
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondarysolid-50 rounded-xl flex items-center justify-center">
              <Zap className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {user?.total_xp || 0}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Total XP
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Virtuas Section */}
      <div>
        <h2 className="text-title-20 font-title-20-black text-black-100 mb-4">
          Your Virtuas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {virtuas.map((virtua) => (
            <VirtuaCard
              key={virtua.id}
              virtua={virtua}
              isSelected={selectedVirtua?.id === virtua.id}
              onClick={() => setSelectedVirtua(virtua)}
            />
          ))}
        </div>
      </div>

      {/* Today's Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title-20 font-title-20-black text-black-100">
            Today's Tasks
          </h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        {todayTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-16-reg font-text-16-reg text-black-60">
              No tasks scheduled for today. Create your first task to get started!
            </p>
            <Button className="mt-4 gap-2">
              <Plus size={16} />
              Add Task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleTaskComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};