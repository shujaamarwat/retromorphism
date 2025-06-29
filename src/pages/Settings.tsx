import React, { useState } from 'react';
import { User, Bell, Palette, Shield, Database, LogOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export const Settings: React.FC = () => {
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    display_name: user?.display_name || '',
    email_notifications: true,
    push_notifications: true,
    daily_reminder: true,
    theme: 'light',
    language: 'en',
    timezone: 'UTC'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data', icon: Database }
  ];

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('users')
        .update({
          display_name: settings.display_name,
          preferences: {
            ...user.preferences,
            email_notifications: settings.email_notifications,
            push_notifications: settings.push_notifications,
            daily_reminder: settings.daily_reminder,
            theme: settings.theme,
            language: settings.language,
            timezone: settings.timezone
          }
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser({
        ...user,
        display_name: settings.display_name,
        preferences: {
          ...user.preferences,
          email_notifications: settings.email_notifications,
          push_notifications: settings.push_notifications,
          daily_reminder: settings.daily_reminder,
          theme: settings.theme,
          language: settings.language,
          timezone: settings.timezone
        }
      });

      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
          Profile Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={settings.display_name}
              onChange={(e) => setSettings({ ...settings, display_name: e.target.value })}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>

          <div className="p-4 bg-secondarysolid-10 rounded-xl border border-black-100">
            <h4 className="text-text-14-med font-text-14-med text-black-100 mb-2">
              Progress Stats
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">Level</p>
                <p className="text-title-14 font-title-14-black text-black-100">{user?.level || 1}</p>
              </div>
              <div>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">Total XP</p>
                <p className="text-title-14 font-title-14-black text-black-100">{user?.total_xp || 0}</p>
              </div>
              <div>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">Streak</p>
                <p className="text-title-14 font-title-14-black text-black-100">{user?.streak_count || 0} days</p>
              </div>
              <div>
                <p className="text-caption-11-reg font-caption-11-reg text-black-60">Member Since</p>
                <p className="text-title-14 font-title-14-black text-black-100">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white-100 rounded-xl border border-black-100">
            <div>
              <h4 className="text-text-14-med font-text-14-med text-black-100">Email Notifications</h4>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Receive updates via email
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.email_notifications}
              onChange={(e) => setSettings({ ...settings, email_notifications: e.target.checked })}
              className="w-4 h-4 text-primarysolid-50 border-2 border-black-100 rounded focus:ring-primarysolid-50"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white-100 rounded-xl border border-black-100">
            <div>
              <h4 className="text-text-14-med font-text-14-med text-black-100">Push Notifications</h4>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Receive browser notifications
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.push_notifications}
              onChange={(e) => setSettings({ ...settings, push_notifications: e.target.checked })}
              className="w-4 h-4 text-primarysolid-50 border-2 border-black-100 rounded focus:ring-primarysolid-50"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white-100 rounded-xl border border-black-100">
            <div>
              <h4 className="text-text-14-med font-text-14-med text-black-100">Daily Reminder</h4>
              <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                Get reminded to check your tasks
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.daily_reminder}
              onChange={(e) => setSettings({ ...settings, daily_reminder: e.target.checked })}
              className="w-4 h-4 text-primarysolid-50 border-2 border-black-100 rounded focus:ring-primarysolid-50"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
          Appearance Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-text-14-med font-text-14-med text-black-100 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-3 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
          Privacy & Security
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-info-10 rounded-xl border border-info-50">
            <h4 className="text-text-14-med font-text-14-med text-black-100 mb-2">
              Data Privacy
            </h4>
            <p className="text-caption-11-reg font-caption-11-reg text-black-60 mb-3">
              Your data is encrypted and stored securely. We never share your personal information with third parties.
            </p>
            <Button variant="outline" size="sm">
              View Privacy Policy
            </Button>
          </div>

          <div className="p-4 bg-warning-10 rounded-xl border border-warning-50">
            <h4 className="text-text-14-med font-text-14-med text-black-100 mb-2">
              Account Security
            </h4>
            <p className="text-caption-11-reg font-caption-11-reg text-black-60 mb-3">
              Keep your account secure by using a strong password and enabling two-factor authentication.
            </p>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-title-16 font-title-16-black text-black-100 mb-4">
          Data Management
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-success-10 rounded-xl border border-success-50">
            <h4 className="text-text-14-med font-text-14-med text-black-100 mb-2">
              Export Data
            </h4>
            <p className="text-caption-11-reg font-caption-11-reg text-black-60 mb-3">
              Download all your data including tasks, quests, and progress.
            </p>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>

          <div className="p-4 bg-error-10 rounded-xl border border-error-50">
            <h4 className="text-text-14-med font-text-14-med text-black-100 mb-2">
              Delete Account
            </h4>
            <p className="text-caption-11-reg font-caption-11-reg text-black-60 mb-3">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="outline" size="sm" className="text-error-60 border-error-50 hover:bg-error-20">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-32 font-display-32-black text-black-100">
            Settings
          </h1>
          <p className="text-text-16-reg font-text-16-reg text-black-60 mt-1">
            Customize your MindForge experience
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="gap-2"
          >
            <Save size={16} />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="gap-2 text-error-60 border-error-50 hover:bg-error-20"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-4">
            <nav className="space-y-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                    border-2 border-transparent
                    ${activeTab === id
                      ? 'bg-primarysolid-50 text-black-100 shadow-[-2px_4px_0px_#001428]'
                      : 'hover:bg-primarysolid-20 text-black-70 hover:border-black-100'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span className="text-text-14-med font-text-14-med">
                    {label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white-100 rounded-2xl border-2 border-black-100 p-6">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'appearance' && renderAppearanceTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
            {activeTab === 'data' && renderDataTab()}
          </div>
        </div>
      </div>
    </div>
  );
};