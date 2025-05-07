import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import PostPreviewPanel from './PostPreviewPanel';
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';

const CreateContent = () => {
  // Default panel sizes (can also be stored in localStorage for persistence)
  const [leftPanelSize, setLeftPanelSize] = useState(40); // 40% of the width
  const [rightPanelSize, setRightPanelSize] = useState(55); // 55% of the width
  
  // Mobile view state (chat or preview)
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat');
  
  // Function to handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length >= 2) {
      setLeftPanelSize(sizes[0]);
      setRightPanelSize(sizes[1]);
    }
  };

  return (
    <div className="h-full">
      {/* Mobile View Toggle - Only visible on mobile */}
      <div className="block lg:hidden bg-gray-800 text-center py-2 px-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setMobileView('chat')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              mobileView === 'chat' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Chat
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              mobileView === 'preview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Desktop Layout - Always side by side with resize handle */}
      <div className="hidden lg:block h-full">
        <PanelGroup 
          direction="horizontal" 
          autoSaveId="mark-ai-layout"
          onLayout={handlePanelResize}
          units="percentages" 
          disablePointerEventsDuringResize={true}
        >
          {/* Chat Panel (Left) */}
          <Panel 
            defaultSize={40}
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
            defaultSize={55} 
            minSize={30} // Minimum 30% width
            className="h-full"
          >
            <PostPreviewPanel />
          </Panel>
        </PanelGroup>
      </div>
      
      {/* Mobile Layout - Toggle between views */}
      <div className="flex flex-1 lg:hidden h-[calc(100vh-110px)]">
        {/* Chat Panel - Show only when toggled to chat view */}
        <div className={`w-full h-full ${mobileView === 'chat' ? 'block' : 'hidden'}`}>
          <ChatPanel />
        </div>
        
        {/* Post Preview Panel - Show only when toggled to preview view */}
        <div className={`w-full h-full ${mobileView === 'preview' ? 'block' : 'hidden'}`}>
          <PostPreviewPanel />
        </div>
      </div>
    </div>
  );
};

export default CreateContent;