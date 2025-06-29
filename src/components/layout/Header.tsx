import React, { useState } from 'react';
import { Bell, Search, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { useStore } from '@/lib/store';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickAdd = () => {
    navigate('/tasks');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tasks?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="bg-white-100 border-b-2 border-black-100 p-4 shadow-[0_2px_0_#001428]">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-60" size={20} />
              <input
                type="text"
                placeholder="Search tasks, quests, or virtuas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                         text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                         focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickAdd}
              className="gap-2"
            >
              <Plus size={16} />
              Quick Add
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative p-2"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-50 rounded-full"></span>
              </Button>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-text-12-med font-text-12-med text-black-100">
                  {user?.display_name || 'User'}
                </p>
                <p className="text-caption-10-reg font-caption-10-reg text-black-60">
                  Level {user?.level || 1} • {user?.total_xp || 0} XP
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/settings')}
                className="p-2"
              >
                <div className="w-8 h-8 bg-primarysolid-50 rounded-full flex items-center justify-center border-2 border-black-100">
                  <span className="text-text-12-med font-text-12-med text-black-100">
                    {user?.display_name?.[0] || 'U'}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};