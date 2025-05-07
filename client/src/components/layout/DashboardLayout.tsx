import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // This would be called when navigation occurs
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  // Extract the current route for highlighting in the sidebar
  const currentRoute = location.split('/')[1] || 'dashboard';

  return (
    <div className="flex h-screen w-screen bg-[#11132f] text-white overflow-hidden">
      {/* Left Sidebar - Fixed Width */}
      <div className="w-[80px] h-screen bg-[#11132f]">
        <Sidebar currentRoute={currentRoute} />
      </div>

      {/* Right Content Container - All remaining width */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-50">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                <p className="mt-3 text-blue-400">Loading...</p>
              </div>
            </div>
          )}
          
          {/* Actual Content */}
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;