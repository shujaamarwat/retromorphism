import React, { useState } from 'react';
import { X, Target, Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quest, Virtua } from '@/lib/supabase';

interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (questData: Partial<Quest>) => void;
  virtuas: Virtua[];
}

export const CreateQuestModal: React.FC<CreateQuestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  virtuas
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    virtua_id: '',
    priority: 3,
    due_date: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        virtua_id: formData.virtua_id || null,
        due_date: formData.due_date || null,
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        virtua_id: '',
        priority: 3,
        due_date: '',
      });
    } catch (error) {
      console.error('Error creating quest:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      virtua_id: '',
      priority: 3,
      due_date: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Target className="text-black-100" size={16} />
            </div>
            <h2 className="text-title-18 font-title-18-black text-black-100">
              Create New Quest
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
              Quest Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter your quest title..."
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
              placeholder="Describe your quest..."
              rows={3}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50
                       resize-none"
            />
          </div>

          {/* Virtua Selection */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Assign to Virtua
            </label>
            <select
              value={formData.virtua_id}
              onChange={(e) => setFormData({ ...formData, virtua_id: e.target.value })}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            >
              <option value="">No Virtua (General Quest)</option>
              {virtuas.map((virtua) => (
                <option key={virtua.id} value={virtua.id}>
                  {virtua.name} ({virtua.domain})
                </option>
              ))}
            </select>
          </div>

          {/* Priority and Due Date */}
          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              />
            </div>
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
              {loading ? 'Creating...' : 'Create Quest'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};