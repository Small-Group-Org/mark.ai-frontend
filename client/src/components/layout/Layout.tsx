import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Header from './Header';
import ChatPanel from '../dashboard/ChatPanel';
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';
import Sidebar from './Sidebar';

// Define the message structure
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

// Define platform names type
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [leftPanelSize, setLeftPanelSize] = useState(30);
  const [rightPanelSize, setRightPanelSize] = useState(70);
  const [mobileView, setMobileView] = useState<'chat' | 'content'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Post details state
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postHashtags, setPostHashtags] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState<string[]>([]);
  const [socialPlatforms, setSocialPlatforms] = useState<Record<PlatformName, boolean>>({
    'Bluesky': false,
    'Facebook': false,
    'Google Business': false,
    'Instagram': false,
    'X/Twitter': false,
    'Reddit': false,
    'Telegram': false,
    'Threads': false,
    'TikTok': false,
    'YouTube': false,
  });
  const [postType, setPostType] = useState({
    post: true,
    story: false,
    reel: false,
  });
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString());

  // This would be called when navigation occurs
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  // Extract the current route for highlighting in the sidebar
  const currentRoute = location.split('/')[1] || 'dashboard';

  // Function to handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length >= 2) {
      setLeftPanelSize(sizes[0]);
      setRightPanelSize(sizes[1]);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentRoute={currentRoute} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[80px] h-screen">
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
              onClick={() => setMobileView('content')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                mobileView === 'content' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Content
            </button>
          </div>
        </div>

        {/* Desktop Layout - Always side by side with resize handle */}
        <div className="hidden lg:block flex-1 h-[calc(100vh-70px)]">
          <PanelGroup 
            direction="horizontal" 
            autoSaveId="dashboard-layout"
            onLayout={handlePanelResize}
          >
            {/* Chat Panel (Left) */}
            <Panel 
              defaultSize={leftPanelSize} 
              minSize={20}
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
                setScheduledDate={setScheduledDate}
              />
            </Panel>
            
            {/* Resize Handle */}
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
            
            {/* Main Content Panel (Right) */}
            <Panel 
              defaultSize={rightPanelSize} 
              minSize={30}
              className="h-full"
            >
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
              setScheduledDate={setScheduledDate}
            />
          </div>
          
          {/* Main Content - Show only when toggled to content view */}
          <div className={`w-full h-full ${mobileView === 'content' ? 'block' : 'hidden'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;