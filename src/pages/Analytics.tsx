import React, { useEffect, useState } from 'react';
import { TrendingUp, Calendar, Target, Zap, BarChart3, PieChart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressChart } from '@/components/analytics/ProgressChart';
import { HeatmapCalendar } from '@/components/analytics/HeatmapCalendar';
import { ProductivityInsights } from '@/components/analytics/ProductivityInsights';
import { VirtuaProgressChart } from '@/components/analytics/VirtuaProgressChart';
import { TaskCompletionStats } from '@/components/analytics/TaskCompletionStats';
import { AdvancedInsights } from '@/components/analytics/AdvancedInsights';
import { MilestoneTracker } from '@/components/gamification/MilestoneTracker';
import { useStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { subDays, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

interface AnalyticsData {
  totalTasks: number;
  completedTasks: number;
  totalXP: number;
  currentStreak: number;
  weeklyProgress: Array<{ date: string; completed: number; total: number }>;
  monthlyProgress: Array<{ date: string; xp: number }>;
  virtuaProgress: Array<{ name: string; domain: string; xp: number; level: number }>;
  heatmapData: Array<{ date: string; count: number }>;
  productivityInsights: {
    bestDay: string;
    bestTime: string;
    averageTasksPerDay: number;
    completionRate: number;
  };
  advancedInsights: {
    productivityScore: number;
    focusTime: number;
    peakHours: string[];
    completionTrend: number;
    weeklyGoalProgress: number;
    burnoutRisk: 'low' | 'medium' | 'high';
    recommendations: string[];
  };
}

export const Analytics: React.FC = () => {
  const { user, virtuas } = useStore();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Mock milestones data
  const milestones = [
    {
      id: '1',
      title: 'Task Master',
      description: 'Complete 100 tasks',
      target: 100,
      current: 67,
      type: 'tasks' as const,
      reward: 'Special Badge',
      completed: false
    },
    {
      id: '2',
      title: 'XP Collector',
      description: 'Earn 5,000 XP',
      target: 5000,
      current: 3250,
      type: 'xp' as const,
      reward: 'Bonus Multiplier',
      completed: false
    },
    {
      id: '3',
      title: 'Consistency King',
      description: 'Maintain 30-day streak',
      target: 30,
      current: 18,
      type: 'streak' as const,
      reward: 'Golden Crown',
      completed: false
    },
    {
      id: '4',
      title: 'Level Legend',
      description: 'Reach Level 10',
      target: 10,
      current: 10,
      type: 'level' as const,
      reward: 'Legendary Title',
      completed: true
    }
  ];

  useEffect(() => {
    loadAnalyticsData();
  }, [user, timeRange]);

  const loadAnalyticsData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const now = new Date();
      const startDate = timeRange === 'week' 
        ? startOfWeek(now)
        : timeRange === 'month'
        ? startOfMonth(now)
        : subDays(now, 90);

      // Load tasks data
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString())
        .order('created_at');

      // Load streak logs
      const { data: streakLogs } = await supabase
        .from('streak_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date');

      // Process data
      const completedTasks = tasks?.filter(t => t.completed) || [];
      const totalTasks = tasks?.length || 0;
      const totalXP = completedTasks.reduce((sum, task) => sum + task.xp_reward, 0);

      // Calculate current streak
      const currentStreak = calculateCurrentStreak(streakLogs || []);

      // Weekly progress
      const weeklyProgress = generateWeeklyProgress(tasks || [], startDate);

      // Monthly XP progress
      const monthlyProgress = generateMonthlyProgress(completedTasks, startDate);

      // Virtua progress
      const virtuaProgress = virtuas.map(v => ({
        name: v.name,
        domain: v.domain,
        xp: v.xp,
        level: v.level
      }));

      // Heatmap data
      const heatmapData = generateHeatmapData(streakLogs || []);

      // Productivity insights
      const productivityInsights = calculateProductivityInsights(tasks || [], streakLogs || []);

      // Advanced insights
      const advancedInsights = calculateAdvancedInsights(tasks || [], streakLogs || []);

      setAnalyticsData({
        totalTasks,
        completedTasks: completedTasks.length,
        totalXP,
        currentStreak,
        weeklyProgress,
        monthlyProgress,
        virtuaProgress,
        heatmapData,
        productivityInsights,
        advancedInsights
      });

    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCurrentStreak = (streakLogs: any[]) => {
    if (streakLogs.length === 0) return 0;
    
    let streak = 0;
    for (let i = streakLogs.length - 1; i >= 0; i--) {
      const log = streakLogs[i];
      if (log.streak_maintained) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const generateWeeklyProgress = (tasks: any[], startDate: Date) => {
    const progress = [];
    const endDate = new Date();
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayTasks = tasks.filter(t => t.created_at.startsWith(dateStr));
      const completed = dayTasks.filter(t => t.completed).length;
      
      progress.push({
        date: dateStr,
        completed,
        total: dayTasks.length
      });
    }
    
    return progress;
  };

  const generateMonthlyProgress = (completedTasks: any[], startDate: Date) => {
    const progress = [];
    const endDate = new Date();
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayTasks = completedTasks.filter(t => 
        t.completed_at && t.completed_at.startsWith(dateStr)
      );
      const xp = dayTasks.reduce((sum, task) => sum + task.xp_reward, 0);
      
      progress.push({
        date: dateStr,
        xp
      });
    }
    
    return progress;
  };

  const generateHeatmapData = (streakLogs: any[]) => {
    return streakLogs.map(log => ({
      date: log.date,
      count: log.tasks_completed
    }));
  };

  const calculateProductivityInsights = (tasks: any[], streakLogs: any[]) => {
    // Find best day of week
    const dayStats = {};
    tasks.forEach(task => {
      if (task.completed_at) {
        const day = new Date(task.completed_at).toLocaleDateString('en', { weekday: 'long' });
        dayStats[day] = (dayStats[day] || 0) + 1;
      }
    });
    
    const bestDay = Object.entries(dayStats).reduce((a, b) => 
      dayStats[a[0]] > dayStats[b[0]] ? a : b, ['Monday', 0]
    )[0];

    // Find best time (simplified)
    const timeStats = {};
    tasks.forEach(task => {
      if (task.completed_at) {
        const hour = new Date(task.completed_at).getHours();
        const timeSlot = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
        timeStats[timeSlot] = (timeStats[timeSlot] || 0) + 1;
      }
    });
    
    const bestTime = Object.entries(timeStats).reduce((a, b) => 
      timeStats[a[0]] > timeStats[b[0]] ? a : b, ['Morning', 0]
    )[0];

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const averageTasksPerDay = streakLogs.length > 0 
      ? streakLogs.reduce((sum, log) => sum + log.tasks_completed, 0) / streakLogs.length
      : 0;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      bestDay,
      bestTime,
      averageTasksPerDay: Math.round(averageTasksPerDay * 10) / 10,
      completionRate: Math.round(completionRate)
    };
  };

  const calculateAdvancedInsights = (tasks: any[], streakLogs: any[]) => {
    const completedTasks = tasks.filter(t => t.completed);
    const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    
    // Calculate productivity score based on multiple factors
    const consistencyScore = streakLogs.length > 0 ? Math.min(streakLogs.length * 5, 40) : 0;
    const completionScore = Math.min(completionRate, 40);
    const volumeScore = Math.min(completedTasks.length * 2, 20);
    const productivityScore = Math.round(consistencyScore + completionScore + volumeScore);

    // Mock advanced calculations
    const focusTime = 4.5 + Math.random() * 2; // 4.5-6.5 hours
    const peakHours = ['9:00 AM', '2:00 PM', '7:00 PM'];
    const completionTrend = 15; // +15% from last period
    const weeklyGoalProgress = 78;
    
    // Determine burnout risk
    let burnoutRisk: 'low' | 'medium' | 'high' = 'low';
    if (focusTime > 8) burnoutRisk = 'high';
    else if (focusTime > 6) burnoutRisk = 'medium';

    // Generate recommendations
    const recommendations = [
      'Schedule demanding tasks during your peak hours (9 AM, 2 PM)',
      'Take regular breaks to maintain focus and prevent burnout',
      'Consider batching similar tasks to improve efficiency',
      'Your Monday productivity is excellent - replicate this pattern'
    ];

    return {
      productivityScore,
      focusTime,
      peakHours,
      completionTrend,
      weeklyGoalProgress,
      burnoutRisk,
      recommendations
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading analytics...
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-title-20 font-title-20-black text-black-100 mb-2">
          No data available
        </h2>
        <p className="text-text-14-reg font-text-14-reg text-black-60">
          Complete some tasks to see your analytics
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-32 font-display-32-black text-black-100">
            Analytics
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
            Deep insights into your productivity patterns and progress
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'quarter'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
              <Target className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {analyticsData.completedTasks}/{analyticsData.totalTasks}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Tasks Completed
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Zap className="text-black-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {analyticsData.totalXP.toLocaleString()}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                XP Earned
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error-50 rounded-xl flex items-center justify-center">
              <Activity className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {analyticsData.currentStreak}
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Day Streak
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondarysolid-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {analyticsData.productivityInsights.completionRate}%
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Completion Rate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Insights */}
      <AdvancedInsights data={analyticsData.advancedInsights} />

      {/* Milestone Tracker */}
      <MilestoneTracker milestones={milestones} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-primarysolid-60" size={20} />
            <h3 className="text-title-16 font-title-16-black text-black-100">
              Daily Progress
            </h3>
          </div>
          <ProgressChart data={analyticsData.weeklyProgress} />
        </div>

        {/* XP Chart */}
        <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-secondarysolid-60" size={20} />
            <h3 className="text-title-16 font-title-16-black text-black-100">
              XP Over Time
            </h3>
          </div>
          <ProgressChart data={analyticsData.monthlyProgress} type="xp" />
        </div>

        {/* Virtua Progress */}
        <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <PieChart className="text-success-60" size={20} />
            <h3 className="text-title-16 font-title-16-black text-black-100">
              Virtua Progress
            </h3>
          </div>
          <VirtuaProgressChart data={analyticsData.virtuaProgress} />
        </div>

        {/* Task Completion Stats */}
        <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-warning-60" size={20} />
            <h3 className="text-title-16 font-title-16-black text-black-100">
              Task Statistics
            </h3>
          </div>
          <TaskCompletionStats 
            completed={analyticsData.completedTasks}
            total={analyticsData.totalTasks}
            insights={analyticsData.productivityInsights}
          />
        </div>
      </div>

      {/* Heatmap Calendar */}
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-info-60" size={20} />
          <h3 className="text-title-16 font-title-16-black text-black-100">
            Activity Heatmap
          </h3>
        </div>
        <HeatmapCalendar data={analyticsData.heatmapData} />
      </div>

      {/* Productivity Insights */}
      <ProductivityInsights insights={analyticsData.productivityInsights} />
    </div>
  );
};