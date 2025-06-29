import React, { useEffect, useState } from 'react';
import { VirtuaCard } from '@/components/virtua/VirtuaCard';
import { TaskCard } from '@/components/task/TaskCard';
import { XPDisplay } from '@/components/gamification/XPDisplay';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, Target, Zap, ArrowRight, Calendar } from 'lucide-react';
import { useStore } from '@/lib/store';
import { supabase, Task, Virtua } from '@/lib/supabase';
import { format, startOfDay, endOfDay, isToday, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
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
      const { data: todayTasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .or(`due_date.gte.${startOfDay(today).toISOString()},due_date.lte.${endOfDay(today).toISOString()},due_date.is.null`)
        .eq('completed', false)
        .order('priority', { ascending: false })
        .order('created_at')
        .limit(5);

      // Load upcoming tasks (next 7 days, excluding today)
      const nextWeek = addDays(today, 7);
      const { data: upcomingTasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('due_date', endOfDay(today).toISOString())
        .lte('due_date', nextWeek.toISOString())
        .eq('completed', false)
        .order('due_date')
        .limit(5);

      if (todayTasksData) {
        setTodayTasks(todayTasksData);
      }

      if (upcomingTasksData) {
        setUpcomingTasks(upcomingTasksData);
      }

      // Load all tasks for stats
      const { data: allTasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      if (allTasksData) {
        setTasks(allTasksData);
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

      // Remove from today's tasks if completed
      if (!task.completed) {
        setTodayTasks(todayTasks.filter(t => t.id !== taskId));
      }

      // TODO: Award XP and update virtua
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const todayCompletedTasks = tasks.filter(t => 
    t.completed && t.completed_at && isToday(new Date(t.completed_at))
  ).length;
  const totalTodayTasks = todayTasks.length + todayCompletedTasks;
  const completionRate = totalTodayTasks > 0 ? (todayCompletedTasks / totalTodayTasks) * 100 : 0;

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
            Welcome back, {user?.display_name || 'Adventurer'}!
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1 flex items-center gap-2">
            <Calendar size={16} />
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/tasks')}>
          <Plus size={16} />
          New Task
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <XPDisplay
          currentXP={user?.total_xp || 0}
          level={user?.level || 1}
          showProgress={true}
        />
        
        <StreakDisplay
          currentStreak={user?.streak_count || 0}
          bestStreak={user?.streak_count || 0}
        />

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success-50 rounded-xl flex items-center justify-center">
              <Target className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {todayCompletedTasks}/{totalTodayTasks}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Tasks Today
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primarysolid-50 rounded-xl flex items-center justify-center">
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
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-title-20 font-title-20-black text-black-100">
                Today's Focus
              </h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/tasks')}
                className="gap-2"
              >
                View All
                <ArrowRight size={14} />
              </Button>
            </div>
            
            {todayTasks.length === 0 ? (
              <div className="text-center py-8 bg-white-100 rounded-2xl border-2 border-black-100">
                <div className="w-12 h-12 bg-success-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="text-success-60" size={20} />
                </div>
                <p className="text-text-16-reg font-text-16-reg text-black-60 mb-4">
                  No tasks scheduled for today. Great job staying on top of things!
                </p>
                <Button className="gap-2" onClick={() => navigate('/tasks')}>
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

          {/* Upcoming Tasks */}
          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
                Coming Up This Week
              </h3>
              <div className="space-y-2">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-white-100 rounded-xl border border-black-100 hover:bg-primarysolid-10 transition-colors cursor-pointer"
                    onClick={() => navigate('/tasks')}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-text-14-med font-text-14-med text-black-100">
                          {task.title}
                        </h4>
                        {task.due_date && (
                          <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                            Due {format(new Date(task.due_date), 'MMM d')}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-caption-10-med font-caption-10-med text-black-60">
                          P{task.priority}
                        </span>
                        <div className="w-2 h-2 bg-warning-50 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Virtuas Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-title-16 font-title-16-black text-black-100">
                Your Virtuas
              </h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/virtuas')}
                className="gap-2"
              >
                View All
                <ArrowRight size={14} />
              </Button>
            </div>
            
            {virtuas.length === 0 ? (
              <div className="text-center py-6 bg-white-100 rounded-2xl border-2 border-black-100">
                <div className="w-12 h-12 bg-secondarysolid-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="text-secondarysolid-60" size={20} />
                </div>
                <p className="text-text-14-reg font-text-14-reg text-black-60 mb-4">
                  Create your first Virtua to start your journey!
                </p>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/virtuas')}
                  className="gap-2"
                >
                  <Plus size={14} />
                  Create Virtua
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {virtuas.slice(0, 2).map((virtua) => (
                  <VirtuaCard
                    key={virtua.id}
                    virtua={virtua}
                    isSelected={selectedVirtua?.id === virtua.id}
                    onClick={() => setSelectedVirtua(virtua)}
                    showProgress={true}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};