import React, { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import ChatPanel from './dashboard/ChatPanel';
import PostPreviewPanel from './dashboard/PostPreviewPanel';
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';

const MarkAiCreatePost = () => {
  // Default panel sizes (can also be stored in localStorage for persistence)
  const [leftPanelSize, setLeftPanelSize] = useState(30); // 30% of the width
  const [rightPanelSize, setRightPanelSize] = useState(70); // 70% of the width
  
  // Function to handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length >= 2) {
      setLeftPanelSize(sizes[0]);
      setRightPanelSize(sizes[1]);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-auto"> {/* Changed to overflow-auto to allow scrolling */}
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] min-h-screen"> {/* Removed overflow-hidden, added min-height */}
        {/* Header */}
        <Header />

        {/* Content Panels - Resizable on Desktop, Stack on Mobile */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Use PanelGroup for resizable layout on desktop only */}
          <div className="hidden lg:block w-full h-[calc(100vh-70px)]">
            <PanelGroup 
              direction="horizontal" 
              autoSaveId="mark-ai-layout"
              onLayout={handlePanelResize}
            >
              {/* Chat Panel (Left) */}
              <Panel 
                defaultSize={leftPanelSize} 
                minSize={20} // Minimum 20% width
                className="h-full"
              >
                <ChatPanel />
              </Panel>
              
              {/* Resize Handle with visual indicators */}
              <PanelResizeHandle className="w-2 bg-gray-800 hover:bg-blue-500 transition-colors duration-200 cursor-col-resize relative group flex items-center justify-center">
                {/* Visual hover effect */}
                <div className="absolute inset-y-0 -right-2 -left-2 group-hover:bg-blue-500/10"></div>
                
                {/* Dots for drag indicator */}
                <div className="flex flex-col items-center justify-center h-16 space-y-1 z-10">
                  <div className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue-400"></div>
                  <div className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-blue-400"></div>
                </div>
                
                {/* Add tooltip on hover */}
                <div className="absolute opacity-0 group-hover:opacity-100 top-1/2 left-1/2 transform -translate-y-1/2 translate-x-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity duration-200">
                  Drag to resize
                </div>
              </PanelResizeHandle>
              
              {/* Post Preview Panel (Right) */}
              <Panel 
                defaultSize={rightPanelSize} 
                minSize={30} // Minimum 30% width
                className="h-full"
              >
                <PostPreviewPanel />
              </Panel>
            </PanelGroup>
          </div>
          
          {/* Mobile layout (stacked) */}
          <div className="block lg:hidden flex-1">
            {/* Chat Panel */}
            <div className="mb-4 h-[500px]"> {/* Fixed height for mobile */}
              <ChatPanel />
            </div>
            
            {/* Post Preview Panel */}
            <div className="flex-1">
              <PostPreviewPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAiCreatePost;