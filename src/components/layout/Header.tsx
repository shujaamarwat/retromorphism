import React from 'react';
import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

export const Header: React.FC = () => {
  const { user } = useStore();

  return (
    <header className="bg-white-100 border-b-2 border-black-100 p-4 shadow-[0_2px_0_#001428]">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-60" size={20} />
            <input
              type="text"
              placeholder="Search tasks, quests, or virtuas..."
              className="w-full pl-10 pr-4 py-2 bg-primarysolid-10 border-2 border-black-100 rounded-xl 
                       text-text-16-reg font-text-16-reg text-black-100 placeholder-black-60
                       focus:outline-none focus:ring-2 focus:ring-primarysolid-50 focus:border-primarysolid-50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Plus size={16} />
            Quick Add
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="relative"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-50 rounded-full"></span>
          </Button>

          {/* User avatar */}
          <div className="w-8 h-8 bg-primarysolid-50 rounded-full flex items-center justify-center border-2 border-black-100">
            <span className="text-text-12-med font-text-12-med text-black-100">
              {user?.display_name?.[0] || 'U'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};