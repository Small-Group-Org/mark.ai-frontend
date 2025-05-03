import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1">
        <div className="h-[84px] border-b border-[#ECECEC] opacity-40"></div>
        <main className="flex">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;