import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Target, 
  Zap, 
  Trophy, 
  BarChart3,
  Settings, 
  Menu,
  X
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/quests', icon: Target, label: 'Quests' },
  { to: '/virtuas', icon: Zap, label: 'Virtuas' },
  { to: '/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useStore();

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
      <div className={`
        fixed left-0 top-0 h-full bg-white-100 border-r-2 border-black-100 z-50
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-16'}
        shadow-[4px_0_0_#001428,8px_0_12px_rgba(0,20,40,0.3)]
      `}>
        {/* Header */}
        <div className="p-4 border-b-2 border-black-100">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-title-20 font-title-20-black text-black-100">
                MindForge
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-primarysolid-20"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                border-2 border-transparent hover:border-black-100
                ${isActive 
                  ? 'bg-primarysolid-50 text-black-100 shadow-[-2px_4px_0px_#001428]' 
                  : 'hover:bg-primarysolid-20 text-black-70'
                }
                ${!sidebarOpen ? 'justify-center' : ''}
              `}
            >
              <Icon size={20} />
              {sidebarOpen && (
                <span className="text-text-16-med font-text-16-med">
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-3 bg-secondarysolid-10 rounded-xl border-2 border-black-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primarysolid-50 rounded-full flex items-center justify-center">
                  <span className="text-text-12-med font-text-12-med text-black-100">
                    U
                  </span>
                </div>
                <div>
                  <p className="text-text-14-med font-text-14-med text-black-100">
                    User
                  </p>
                  <p className="text-caption-11-reg font-caption-11-reg text-black-60">
                    Level 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};