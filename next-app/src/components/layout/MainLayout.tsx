import React from 'react';
import { Suspense } from 'react';
import Sidebar from '../common/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Suspense fallback={<div className="w-[280px] max-[980px]:w-[84px] min-h-screen flex-shrink-0" />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;