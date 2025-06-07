import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Header from './Header';
import ChatPanel from '../dashboard/ChatPanel';
import BottomNavigation from './BottomNavigation';
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';
import Sidebar from './Sidebar';
import { useAuthStore } from '@/store/useAuthStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [leftPanelSize, setLeftPanelSize] = useState(40);
  const [rightPanelSize, setRightPanelSize] = useState(60);
  const [mobileView, setMobileView] = useState<'chat' | 'content'>('chat');
  const { isMobileView } = useAuthStore();

  // Extract the current route for highlighting in the sidebar
  const currentRoute = location.split('/')[1] || 'create';

  // Function to handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length >= 2) {
      setLeftPanelSize(sizes[0]);
      setRightPanelSize(sizes[1]);
    }
  };

  return (
    <div className="flex h-screen text-white overflow-hidden">
      <Sidebar currentRoute={currentRoute} />

      <div className={`flex-1 flex flex-col ${isMobileView ? '' : 'ml-[80px]'} h-screen`}>
        <Header mobileView={mobileView} setMobileView={setMobileView} />

        {!isMobileView ? (
          <div className="flex-1 h-[calc(100vh-70px)]">
            <PanelGroup 
              direction="horizontal" 
              autoSaveId="dashboard-layout"
              onLayout={handlePanelResize}
            >
              <Panel 
                defaultSize={leftPanelSize} 
                minSize={20}
                className="h-full"
              >
                <ChatPanel />
              </Panel>
              
              <PanelResizeHandle className="w-2 bg-gray-800 hover:bg-blue-500 transition-colors duration-200 cursor-col-resize relative group flex items-center justify-center">
                <div className="absolute inset-y-0 -right-2 -left-2 group-hover:bg-blue-500/10"></div>
                <div className="flex flex-col items-center justify-center h-16 space-y-1 z-10">
                  <div className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue-400"></div>
                </div>
                <div className="absolute opacity-0 group-hover:opacity-100 top-1/2 left-1/2 transform -translate-y-1/2 translate-x-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity duration-200">
                  Drag to resize
                </div>
              </PanelResizeHandle>
              
              <Panel 
                defaultSize={rightPanelSize} 
                minSize={30}
                className="h-full"
              >
                <div className="h-full">
                  {children}
                </div>
              </Panel>
            </PanelGroup>
          </div>
        ) : (
          <div className="flex flex-1 h-[100vh] overflow-y-auto pb-16">
            <div className={`w-full h-full ${mobileView === 'chat' ? 'block' : 'hidden'}`}>
              <ChatPanel />
            </div>
            
            <div className={`w-full h-full ${mobileView === 'content' ? 'block' : 'hidden'}`}>
              {children}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation currentRoute={currentRoute} setMobileView={setMobileView}  />
    </div>
  );
};

export default Layout;