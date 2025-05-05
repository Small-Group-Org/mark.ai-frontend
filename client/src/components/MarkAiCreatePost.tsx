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

// Define the message structure (can be moved to a types file later)
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

// Define platform names type (can be moved to a types file later)
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

const MarkAiCreatePost = () => {
  // Layout states
  const [leftPanelSize, setLeftPanelSize] = useState(30); // 30% of the width
  const [rightPanelSize, setRightPanelSize] = useState(70); // 70% of the width
  
  // Mobile view state (chat or preview)
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat');
  
  // --- SHARED STATE LIFTED UP ---
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Post details state
  const [postTitle, setPostTitle] = useState("New Product Launch");
  const [postContent, setPostContent] = useState(
    "We're excited to announce our newest product line! After months of development, we're proud to bring you the most innovative solution for your needs."
  );
  const [postHashtags, setPostHashtags] = useState<string[]>(["productlaunch", "innovation", "technology"]);
  const [mediaUrl, setMediaUrl] = useState<string[]>(["www.img.com"]); // Initial example URL
  const [socialPlatforms, setSocialPlatforms] = useState<Record<PlatformName, boolean>>({
    'Bluesky': false,
    'Facebook': false,
    'Google Business': false,
    'Instagram': true,
    'X/Twitter': true,
    'Reddit': false,
    'Telegram': false,
    'Threads': false,
    'TikTok': true,
    'YouTube': true,
  });
  const [postType, setPostType] = useState({
    feedPost: true,
    igStory: false,
    reel: false,
    youtubeShorts: false,
  });
  const [scheduledDate, setScheduledDate] = useState("2025-05-05T09:00:00Z"); // ISO string
  // --- END SHARED STATE ---
  
  // Function to handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length >= 2) {
      setLeftPanelSize(sizes[0]);
      setRightPanelSize(sizes[1]);
    }
  };
  
  // Toggle between chat and preview on mobile
  const toggleMobileView = () => {
    setMobileView(prev => prev === 'chat' ? 'preview' : 'chat');
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden"> {/* Always keep overflow hidden */}
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] h-screen"> {/* Set fixed height */}
        {/* Header */}
        <Header />
        
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
        <div className="hidden lg:block flex-1 h-[calc(100vh-70px)]">
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
              <ChatPanel 
                messages={messages}
                setMessages={setMessages}
                isThinking={isThinking}
                setIsThinking={setIsThinking}
                postTitle={postTitle}
                postContent={postContent}
                postHashtags={postHashtags}
                mediaUrl={mediaUrl}
                socialPlatforms={socialPlatforms}
                postType={postType}
                scheduledDate={scheduledDate}
                setPostTitle={setPostTitle}
                setPostContent={setPostContent}
                setPostHashtags={setPostHashtags}
                setMediaUrl={setMediaUrl}
                setSocialPlatforms={setSocialPlatforms}
                setPostType={setPostType}
              />
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
              <PostPreviewPanel 
                postTitle={postTitle}
                postContent={postContent}
                postHashtags={postHashtags}
                mediaUrl={mediaUrl}
                socialPlatforms={socialPlatforms}
                postType={postType}
                scheduledDate={scheduledDate}
                setSocialPlatforms={setSocialPlatforms}
                setPostType={setPostType}
                setScheduledDate={setScheduledDate}
              />
            </Panel>
          </PanelGroup>
        </div>
        
        {/* Mobile Layout - Toggle between views */}
        <div className="flex flex-1 lg:hidden h-[calc(100vh-110px)]">
          {/* Chat Panel - Show only when toggled to chat view */}
          <div className={`w-full h-full ${mobileView === 'chat' ? 'block' : 'hidden'}`}>
            <ChatPanel 
              messages={messages}
              setMessages={setMessages}
              isThinking={isThinking}
              setIsThinking={setIsThinking}
              postTitle={postTitle}
              postContent={postContent}
              postHashtags={postHashtags}
              mediaUrl={mediaUrl}
              socialPlatforms={socialPlatforms}
              postType={postType}
              scheduledDate={scheduledDate}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              setPostHashtags={setPostHashtags}
              setMediaUrl={setMediaUrl}
              setSocialPlatforms={setSocialPlatforms}
              setPostType={setPostType}
            />
          </div>
          
          {/* Post Preview Panel - Show only when toggled to preview view */}
          <div className={`w-full h-full ${mobileView === 'preview' ? 'block' : 'hidden'}`}>
            <PostPreviewPanel 
              postTitle={postTitle}
              postContent={postContent}
              postHashtags={postHashtags}
              mediaUrl={mediaUrl}
              socialPlatforms={socialPlatforms}
              postType={postType}
              scheduledDate={scheduledDate}
              setSocialPlatforms={setSocialPlatforms}
              setPostType={setPostType}
              setScheduledDate={setScheduledDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAiCreatePost;