import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Target, Calendar, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/task/TaskCard';
import { CreateTaskModal } from '@/components/task/CreateTaskModal';
import { DependencyGraph } from '@/components/task/DependencyGraph';
import { supabase, Quest, Task } from '@/lib/supabase';
import { useStore } from '@/lib/store';
import { format } from 'date-fns';

export const QuestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useStore();
  
  const [quest, setQuest] = useState<Quest & { virtuas?: any } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [view, setView] = useState<'list' | 'graph'>('list');

  useEffect(() => {
    if (id) {
      loadQuestData();
    }
  }, [id, user]);

  const loadQuestData = async () => {
    if (!id || !user) return;

    try {
      setLoading(true);

      // Load quest details
      const { data: questData, error: questError } = await supabase
        .from('quests')
        .select(`
          *,
          virtuas (
            id,
            name,
            domain,
            level,
            xp
          )
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (questError) throw questError;
      setQuest(questData);

      // Load quest tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('quest_id', id)
        .eq('user_id', user.id)
        .order('sort_order')
        .order('created_at');

      if (tasksError) throw tasksError;
      setTasks(tasksData || []);

    } catch (error) {
      console.error('Error loading quest data:', error);
      navigate('/quests');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Partial<Task>) => {
    if (!quest || !user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          user_id: user.id,
          quest_id: quest.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setTasks([...tasks, data]);
      setShowCreateTask(false);
      
      // Update quest completion rate
      updateQuestProgress();
    } catch (error) {
      console.error('Error creating task:', error);
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

      setTasks(tasks.map(t => 
        t.id === taskId 
          ? { ...t, completed: !t.completed, completed_at: !t.completed ? new Date().toISOString() : null }
          : t
      ));

      // Update quest progress
      updateQuestProgress();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const updateQuestProgress = async () => {
    if (!quest) return;

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    try {
      const { error } = await supabase
        .from('quests')
        .update({ completion_rate: completionRate })
        .eq('id', quest.id);

      if (error) throw error;
      
      setQuest({ ...quest, completion_rate: completionRate });
    } catch (error) {
      console.error('Error updating quest progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading quest details...
        </div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="text-center py-12">
        <h2 className="text-title-20 font-title-20-black text-black-100 mb-2">
          Quest not found
        </h2>
        <Button onClick={() => navigate('/quests')}>
          Back to Quests
        </Button>
      </div>
    );
  }

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/quests')}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <div className="flex-1">
          <h1 className="text-display-28 font-display-28-black text-black-100">
            {quest.title}
          </h1>
          {quest.description && (
            <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
              {quest.description}
            </p>
          )}
        </div>

        <Button className="gap-2" onClick={() => setShowCreateTask(true)}>
          <Plus size={16} />
          Add Task
        </Button>
      </div>

      {/* Quest Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Target className="text-black-100" size={20} />
            </div>
            <div>
              <p className="text-title-16 font-title-16-black text-black-100">
                {quest.completion_rate}%
              </p>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Complete
              </p>
            </div>
          </div>
        </div>

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
                Tasks
              </p>
            </div>
          </div>
        </div>

        {quest.virtuas && (
          <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondarysolid-50 rounded-xl flex items-center justify-center">
                <Zap className="text-white-100" size={20} />
              </div>
              <div>
                <p className="text-title-14 font-title-14-black text-black-100">
                  {quest.virtuas.name}
                </p>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                  Level {quest.virtuas.level}
                </p>
              </div>
            </div>
          </div>
        )}

        {quest.due_date && (
          <div className="p-4 bg-white-100 rounded-2xl border-2 border-black-100 shadow-[-2px_4px_0px_#001428]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning-50 rounded-xl flex items-center justify-center">
                <Calendar className="text-white-100" size={20} />
              </div>
              <div>
                <p className="text-title-14 font-title-14-black text-black-100">
                  {format(new Date(quest.due_date), 'MMM d')}
                </p>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                  Due Date
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={view === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setView('list')}
        >
          List View
        </Button>
        <Button
          variant={view === 'graph' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setView('graph')}
        >
          Dependency Graph
        </Button>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primarysolid-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-primarysolid-60" size={24} />
              </div>
              <h3 className="text-title-18 font-title-18-black text-black-100 mb-2">
                No tasks yet
              </h3>
              <p className="text-text-14-reg font-text-14-reg text-black-60 mb-6">
                Add your first task to start working on this quest!
              </p>
              <Button onClick={() => setShowCreateTask(true)} className="gap-2">
                <Plus size={16} />
                Add First Task
              </Button>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleTaskComplete}
              />
            ))
          )}
        </div>
      ) : (
        <DependencyGraph tasks={tasks} />
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onSubmit={handleCreateTask}
        questId={quest.id}
      />
    </div>
  );
};