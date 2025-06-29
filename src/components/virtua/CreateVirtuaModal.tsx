import React, { useState } from 'react';
import { X, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Virtua } from '@/lib/supabase';

interface CreateVirtuaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (virtuaData: Partial<Virtua>) => void;
}

const domains = [
  { name: 'Focus', description: 'Concentration and deep work', color: 'bg-primarysolid-50' },
  { name: 'Fitness', description: 'Physical health and exercise', color: 'bg-success-50' },
  { name: 'Learning', description: 'Knowledge and skill development', color: 'bg-secondarysolid-50' },
  { name: 'Creativity', description: 'Art, writing, and innovation', color: 'bg-warning-50' },
  { name: 'Social', description: 'Relationships and communication', color: 'bg-info-50' },
  { name: 'Finance', description: 'Money management and investing', color: 'bg-success-60' },
  { name: 'Wellness', description: 'Mental health and self-care', color: 'bg-error-50' },
  { name: 'Career', description: 'Professional development', color: 'bg-black-70' },
];

export const CreateVirtuaModal: React.FC<CreateVirtuaModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    customDomain: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.domain) return;

    setLoading(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        domain: formData.domain === 'custom' ? formData.customDomain.trim() : formData.domain,
        level: 1,
        xp: 0,
        evolution_stage: 1,
        traits: {
          personality: generateRandomPersonality(),
          preferences: generateRandomPreferences(),
        }
      });
      
      // Reset form
      setFormData({
        name: '',
        domain: '',
        customDomain: '',
      });
    } catch (error) {
      console.error('Error creating virtua:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRandomPersonality = () => {
    const personalities = ['Enthusiastic', 'Calm', 'Determined', 'Playful', 'Wise', 'Energetic'];
    return personalities[Math.floor(Math.random() * personalities.length)];
  };

  const generateRandomPreferences = () => {
    const preferences = ['Morning tasks', 'Evening reflection', 'Quick wins', 'Long challenges', 'Team work', 'Solo focus'];
    return preferences[Math.floor(Math.random() * preferences.length)];
  };

  const handleClose = () => {
    setFormData({
      name: '',
      domain: '',
      customDomain: '',
    });
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
              <Sparkles className="text-black-100" size={16} />
            </div>
            <h2 className="text-title-18 font-title-18-black text-black-100">
              Create New Virtua
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Virtua Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter a unique name for your Virtua..."
              required
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>

          {/* Domain Selection */}
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-3">
              Domain *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {domains.map((domain) => (
                <div
                  key={domain.name}
                  onClick={() => setFormData({ ...formData, domain: domain.name })}
                  className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${formData.domain === domain.name
                      ? 'border-black-100 bg-primarysolid-20 shadow-[-2px_4px_0px_#001428]'
                      : 'border-black-100 bg-white-100 hover:bg-primarysolid-10'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${domain.color} rounded-lg flex items-center justify-center`}>
                      <Zap className="text-white-100" size={16} />
                    </div>
                    <div>
                      <h4 className="text-text-14-med font-text-14-med text-black-100">
                        {domain.name}
                      </h4>
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Custom Domain Option */}
              <div
                onClick={() => setFormData({ ...formData, domain: 'custom' })}
                className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${formData.domain === 'custom'
                    ? 'border-black-100 bg-primarysolid-20 shadow-[-2px_4px_0px_#001428]'
                    : 'border-black-100 bg-white-100 hover:bg-primarysolid-10'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black-70 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-white-100" size={16} />
                  </div>
                  <div>
                    <h4 className="text-text-14-med font-text-14-med text-black-100">
                      Custom
                    </h4>
                    <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                      Create your own domain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Domain Input */}
          {formData.domain === 'custom' && (
            <div>
              <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
                Custom Domain Name *
              </label>
              <input
                type="text"
                value={formData.customDomain}
                onChange={(e) => setFormData({ ...formData, customDomain: e.target.value })}
                placeholder="Enter your custom domain..."
                required
                className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              />
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-secondarysolid-10 rounded-xl border-2 border-black-100">
            <div className="flex items-start gap-3">
              <Sparkles className="text-secondarysolid-60 mt-1" size={16} />
              <div>
                <h4 className="text-text-14-med font-text-14-med text-black-100 mb-1">
                  Your Virtua will start at Level 1
                </h4>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                  Complete quests and tasks in this domain to help your Virtua grow stronger. 
                  Each Virtua develops unique traits and preferences as they evolve!
                </p>
              </div>
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
              disabled={loading || !formData.name.trim() || !formData.domain || (formData.domain === 'custom' && !formData.customDomain.trim())}
            >
              {loading ? 'Creating...' : 'Create Virtua'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};