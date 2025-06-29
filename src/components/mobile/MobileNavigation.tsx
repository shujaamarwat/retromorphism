import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Target, Zap, Trophy } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { to: '/quests', icon: Target, label: 'Quests' },
    { to: '/virtuas', icon: Zap, label: 'Virtuas' },
    { to: '/achievements', icon: Trophy, label: 'Awards' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white-100 border-t-2 border-black-100 z-40 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200
              ${isActive 
                ? 'text-primarysolid-60' 
                : 'text-black-60 hover:text-black-100'
              }
            `}
          >
            <Icon size={20} />
            <span className="text-caption-10-reg font-caption-10-reg">
              {label}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};