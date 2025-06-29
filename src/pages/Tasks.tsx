import React, { useEffect, useState } from 'react';
import { TaskList } from '@/components/task/TaskList';
import { useStore } from '@/lib/store';
import { supabase, Task } from '@/lib/supabase';

export const Tasks: React.FC = () => {
  const { user } = useStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskCreate = async (taskData: Partial<Task>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setTasks([data, ...tasks]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-16-reg font-text-16-reg text-black-60">
          Loading tasks...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-32 font-display-32-black text-black-100">
          All Tasks
        </h1>
        <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
          Manage and organize all your tasks in one place
        </p>
      </div>

      <TaskList
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskCreate={handleTaskCreate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};