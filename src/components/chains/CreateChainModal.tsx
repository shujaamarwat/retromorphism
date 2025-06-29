import React, { useState } from 'react';
import { X, Link, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chain } from '@/lib/supabase';

interface CreateChainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (chainData: Partial<Chain>) => void;
}

const categories = [
  { name: 'wellness', label: 'Wellness', description: 'Health and self-care', color: 'bg-success-50' },
  { name: 'fitness', label: 'Fitness', description: 'Exercise and physical activity', color: 'bg-error-50' },
  { name: 'education', label: 'Education', description: 'Learning and skill development', color: 'bg-secondarysolid-50' },
  { name: 'productivity', label: 'Productivity', description: 'Work and efficiency', color: 'bg-primarysolid-50' },
  { name: 'creativity', label: 'Creativity', description: 'Art and creative pursuits', color: 'bg-warning-50' },
  { name: 'social', label: 'Social', description: 'Relationships and community', color: 'bg-info-50' },
  { name: 'general', label: 'General', description: 'Other habits', color: 'bg-black-70' },
];

const chainTemplates = [
  {
    name: 'Morning Routine',
    description: 'Start your day with energy and focus',
    category: 'wellness',
    chain_length: 5,
    frequency_period: 'daily',
    steps: [
      'Wake up early',
      'Drink water',
      'Exercise',
      'Meditation',
      'Plan the day'
    ]
  },
  {
    name: 'Learning Path',
    description: 'Daily learning and skill development',
    category: 'education',
    chain_length: 7,
    frequency_period: 'daily',
    steps: [
      'Read for 20 minutes',
      'Watch educational video',
      'Practice new skill',
      'Take notes',
      'Review yesterday\'s learning',
      'Apply knowledge',
      'Reflect on progress'
    ]
  },
  {
    name: 'Fitness Journey',
    description: 'Build strength and endurance',
    category: 'fitness',
    chain_length: 6,
    frequency_period: 'daily',
    steps: [
      'Warm up',
      'Cardio exercise',
      'Strength training',
      'Stretching',
      'Cool down',
      'Log workout'
    ]
  }
];

export const CreateChainModal: React.FC<CreateChainModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'general',
    chain_length: 7,
    frequency_period: 'daily' as 'daily' | 'weekly' | 'monthly',
    target_frequency: 1,
    reward_xp: 50,
    auto_advance: true,
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: 'general',
        chain_length: 7,
        frequency_period: 'daily',
        target_frequency: 1,
        reward_xp: 50,
        auto_advance: true,
      });
      setSelectedTemplate(null);
    } catch (error) {
      console.error('Error creating chain:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: typeof chainTemplates[0]) => {
    setFormData({
      ...formData,
      name: template.name,
      description: template.description,
      category: template.category,
      chain_length: template.chain_length,
      frequency_period: template.frequency_period as 'daily' | 'weekly' | 'monthly',
    });
    setSelectedTemplate(template.name);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: 'general',
      chain_length: 7,
      frequency_period: 'daily',
      target_frequency: 1,
      reward_xp: 50,
      auto_advance: true,
    });
    setSelectedTemplate(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primarysolid-50 rounded-xl flex items-center justify-center">
              <Link className="text-black-100" size={16} />
            </div>
            <h2 className="text-title-18 font-title-18-black text-black-100">
              Create Habit Chain
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

        {/* Templates */}
        <div className="p-6 border-b-2 border-black-100">
          <h3 className="text-title-14 font-title-14-black text-black-100 mb-3">
            Quick Start Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chainTemplates.map((template) => (
              <div
                key={template.name}
                onClick={() => handleTemplateSelect(template)}
                className={`
                  p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${selectedTemplate === template.name
                    ? 'border-primarysolid-50 bg-primarysolid-20 shadow-[-2px_4px_0px_#001428]'
                    : 'border-black-100 bg-white-100 hover:bg-primarysolid-10'
                  }
                `}
              >
                <h4 className="text-text-12-med font-text-12-med text-black-100 mb-1">
                  {template.name}
                </h4>
                <p className="text-caption-10-reg font-caption-10-reg text-black-60 mb-2">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-caption-10-reg font-caption-10-reg text-black-60">
                    {template.chain_length} steps
                  </span>
                  <span className="text-caption-10-reg font-caption-10-reg text-black-60 capitalize">
                    {template.frequency_period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Chain Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter chain name..."
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
              placeholder="Describe your habit chain..."
              rows={3}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50
                       resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => setFormData({ ...formData, category: category.name })}
                  className={`
                    p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${formData.category === category.name
                      ? 'border-black-100 bg-primarysolid-20 shadow-[-2px_4px_0px_#001428]'
                      : 'border-black-100 bg-white-100 hover:bg-primarysolid-10'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${category.color} rounded`} />
                    <span className="text-caption-11-med font-caption-11-med text-black-100">
                      {category.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Chain Length
              </label>
              <input
                type="number"
                value={formData.chain_length}
                onChange={(e) => setFormData({ ...formData, chain_length: parseInt(e.target.value) || 7 })}
                min="2"
                max="30"
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              />
            </div>

            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Frequency
              </label>
              <select
                value={formData.frequency_period}
                onChange={(e) => setFormData({ ...formData, frequency_period: e.target.value as 'daily' | 'weekly' | 'monthly' })}
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Reward XP */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Completion Reward (XP)
            </label>
            <input
              type="number"
              value={formData.reward_xp}
              onChange={(e) => setFormData({ ...formData, reward_xp: parseInt(e.target.value) || 50 })}
              min="10"
              max="500"
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>

          {/* Auto Advance */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="auto_advance"
              checked={formData.auto_advance}
              onChange={(e) => setFormData({ ...formData, auto_advance: e.target.checked })}
              className="w-4 h-4 text-primarysolid-50 border-2 border-black-100 rounded focus:ring-primarysolid-50"
            />
            <label htmlFor="auto_advance" className="text-text-14-reg font-text-14-reg text-black-100">
              Auto-advance to next step when completed
            </label>
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
              disabled={loading || !formData.name.trim()}
            >
              {loading ? 'Creating...' : 'Create Chain'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};