import React from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import ChatPanel from './dashboard/ChatPanel';
import PostPreviewPanel from './dashboard/PostPreviewPanel';

const MarkAiDashboard = () => {

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden"> {/* Added overflow-hidden */} 
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] overflow-hidden"> {/* Added overflow-hidden and margin */} 
        {/* Header */}
        <Header />

        {/* Content Panels */} 
        {/* Use grid for layout, ensure panels take full height */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
            
            {/* Chat Panel (Left) - Takes 4 columns on large screens */}
            <div className="lg:col-span-4 h-full overflow-hidden">
                <ChatPanel />
            </div>

            {/* Post Preview Panel (Right) - Takes 8 columns on large screens */} 
            <div className="lg:col-span-8 h-full overflow-hidden">
                 <PostPreviewPanel />
            </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAiDashboard; 