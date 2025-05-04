import React, { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import ChatPanel from './dashboard/ChatPanel';
import PostPreviewPanel from './dashboard/PostPreviewPanel';
import PostPreviewNew from './dashboard/PostPreviewNew';

const MarkAiDashboard = () => {
  const [useNewPostPreview, setUseNewPostPreview] = useState(true);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] overflow-hidden">
        {/* Header */}
        <Header />

        {/* Toggle between preview versions */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-end">
          <div className="flex items-center">
            <span className="mr-2 text-sm">Toggle Preview:</span>
            <button 
              onClick={() => setUseNewPostPreview(!useNewPostPreview)}
              className={`px-3 py-1 text-xs rounded-md ${useNewPostPreview ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              {useNewPostPreview ? 'New' : 'Original'}
            </button>
          </div>
        </div>

        {/* Content Panels */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
          {/* Chat Panel (Left) - Takes 4 columns on large screens */}
          <div className="lg:col-span-4 h-full overflow-hidden">
            <ChatPanel />
          </div>

          {/* Post Preview Panel (Right) - Takes 8 columns on large screens */}
          <div className="lg:col-span-8 h-full overflow-hidden">
            {useNewPostPreview ? <PostPreviewNew /> : <PostPreviewPanel />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAiDashboard;