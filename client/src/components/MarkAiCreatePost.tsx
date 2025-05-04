import React from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import ChatPanel from './dashboard/ChatPanel';
import PostPreviewPanel from './dashboard/PostPreviewPanel';

const MarkAiCreatePost = () => {
  return (
    <div className="flex h-screen bg-black text-white overflow-auto"> {/* Changed to overflow-auto to allow scrolling */}
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] min-h-screen"> {/* Removed overflow-hidden, added min-height */}
        {/* Header */}
        <Header />

        {/* Content Panels */}
        {/* Grid layout for desktop, flex column for mobile */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-0 pb-6">
          {/* Chat Panel (Left) - Takes 4 columns on large screens */}
          <div className="lg:col-span-4 h-full lg:h-[calc(100vh-70px)]"> {/* Fixed height on desktop, auto on mobile */}
            <ChatPanel />
          </div>

          {/* Post Preview Panel (Right) - Takes 8 columns on large screens */}
          <div className="lg:col-span-8 h-full lg:h-[calc(100vh-70px)]"> {/* Fixed height on desktop, auto on mobile */}
            <PostPreviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAiCreatePost;