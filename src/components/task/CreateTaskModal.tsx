import React, { useState } from 'react';
import { X, Target, Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task } from '@/lib/supabase';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Partial<Task>) => void;
  questId?: string;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  questId
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 2,
    priority: 3,
    xp_reward: 10,
    due_date: '',
    estimated_duration: '',
    tags: '',
    context: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        quest_id: questId || null,
        due_date: formData.due_date || null,
        estimated_duration: formData.estimated_duration ? parseInt(formData.estimated_duration) : null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        context: formData.context || null,
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        difficulty: 2,
        priority: 3,
        xp_reward: 10,
        due_date: '',
        estimated_duration: '',
        tags: '',
        context: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      difficulty: 2,
      priority: 3,
      xp_reward: 10,
      due_date: '',
      estimated_duration: '',
      tags: '',
      context: '',
    });
    onClose();
  };

  // Calculate XP based on difficulty
  const calculateXP = (difficulty: number) => {
    const baseXP = [5, 10, 20, 35, 50];
    return baseXP[difficulty - 1] || 10;
  };

  const handleDifficultyChange = (difficulty: number) => {
    setFormData({
      ...formData,
      difficulty,
      xp_reward: calculateXP(difficulty)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Target className="text-black-100" size={16} />
            </div>
            <h2 className="text-title-18 font-title-18-black text-black-100">
              Create New Task
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="p-2"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter your task title..."
              required
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your task..."
              rows={3}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50
                       resize-none"
            />
          </div>

          {/* Difficulty and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleDifficultyChange(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              >
                <option value={1}>Easy (1)</option>
                <option value={2}>Medium (2)</option>
                <option value={3}>Hard (3)</option>
                <option value={4}>Very Hard (4)</option>
                <option value={5}>Expert (5)</option>
              </select>
            </div>

            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              >
                <option value={1}>Low (1)</option>
                <option value={2}>Medium (2)</option>
                <option value={3}>High (3)</option>
                <option value={4}>Urgent (4)</option>
                <option value={5}>Critical (5)</option>
              </select>
            </div>
          </div>

          {/* XP Reward and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                XP Reward
              </label>
              <input
                type="number"
                value={formData.xp_reward}
                onChange={(e) => setFormData({ ...formData, xp_reward: parseInt(e.target.value) || 10 })}
                min="1"
                max="100"
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              />
            </div>

            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={formData.estimated_duration}
                onChange={(e) => setFormData({ ...formData, estimated_duration: e.target.value })}
                placeholder="30"
                min="1"
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Due Date
            </label>
            <input
              type="datetime-local"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="work, urgent, coding (comma separated)"
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>

          {/* Context */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Context
            </label>
            <input
              type="text"
              value={formData.context}
              onChange={(e) => setFormData({ ...formData, context: e.target.value })}
              placeholder="@home, @work, @computer"
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || !formData.title.trim()}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};