import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { useStore } from '@/lib/store';

export const AppLayout: React.FC = () => {
  const { sidebarOpen } = useStore();

  return (
    <div className="min-h-screen bg-primarysolid-10 flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <Header />
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};