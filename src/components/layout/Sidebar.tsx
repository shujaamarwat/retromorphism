import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Target, 
  Zap, 
  Trophy, 
  BarChart3,
  Link,
  Settings, 
  Menu,
  X,
  LogOut,
  CheckSquare
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/quests', icon: Target, label: 'Quests' },
  { to: '/chains', icon: Link, label: 'Habit Chains' },
  { to: '/virtuas', icon: Zap, label: 'Virtuas' },
  { to: '/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, user, setUser } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  // Determine if sidebar should show expanded content
  const showExpanded = sidebarOpen || isHovered;

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleMouseEnter = () => {
    if (!sidebarOpen) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black-80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          fixed left-0 top-0 h-full bg-white-100 border-r-2 border-black-100 z-50
          transition-all duration-300 ease-in-out
          ${showExpanded ? 'w-64' : 'w-16'}
          shadow-[4px_0_0_#001428,8px_0_12px_rgba(0,20,40,0.3)]
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className={`p-4 border-b-2 border-black-100 ${!showExpanded ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center ${showExpanded ? 'justify-between' : 'justify-center'}`}>
            {showExpanded && (
              <h1 className="text-title-20 font-title-20-black text-black-100">
                MindForge
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-primarysolid-20"
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <div key={to} className="relative group">
              <NavLink
                to={to}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                  border-2 border-transparent hover:border-black-100
                  ${isActive 
                    ? 'bg-primarysolid-50 text-black-100 shadow-[-2px_4px_0px_#001428]' 
                    : 'hover:bg-primarysolid-20 text-black-70'
                  }
                  ${!showExpanded ? 'justify-center w-12 h-12 mx-auto' : ''}
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                {showExpanded && (
                  <span className={`
                    text-text-16-med font-text-16-med transition-opacity duration-200
                    ${isHovered && !sidebarOpen ? 'opacity-100' : ''}
                  `}>
                    {label}
                  </span>
                )}
              </NavLink>
              
              {/* Tooltip for collapsed state (only when not hovered) */}
              {!showExpanded && !isHovered && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-black-100 text-white-100 text-caption-11-reg font-caption-11-reg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {label}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black-100"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t-2 border-black-100">
          {showExpanded ? (
            <div className="space-y-3">
              <div className="p-3 bg-secondarysolid-10 rounded-xl border-2 border-black-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primarysolid-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-text-12-med font-text-12-med text-black-100">
                      {user?.display_name?.[0] || 'U'}
                    </span>
                  </div>
                  <div className={`
                    flex-1 min-w-0 transition-opacity duration-200
                    ${isHovered && !sidebarOpen ? 'opacity-100' : ''}
                  `}>
                    <p className="text-text-14-med font-text-14-med text-black-100 truncate">
                      {user?.display_name || 'User'}
                    </p>
                    <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                      Level {user?.level || 1}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className={`
                  w-full gap-2 transition-opacity duration-200
                  ${isHovered && !sidebarOpen ? 'opacity-100' : ''}
                `}
              >
                <LogOut size={16} />
                <span className={`transition-opacity duration-200 ${isHovered && !sidebarOpen ? 'opacity-100' : ''}`}>
                  Sign Out
                </span>
              </Button>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <div className="w-8 h-8 bg-primarysolid-50 rounded-full flex items-center justify-center">
                <span className="text-text-12-med font-text-12-med text-black-100">
                  {user?.display_name?.[0] || 'U'}
                </span>
              </div>
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="p-2 w-8 h-8"
                >
                  <LogOut size={16} />
                </Button>
                
                {/* Tooltip for sign out button */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-black-100 text-white-100 text-caption-11-reg font-caption-11-reg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Sign Out
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black-100"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};