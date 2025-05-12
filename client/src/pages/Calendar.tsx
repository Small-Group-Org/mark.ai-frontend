import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Calendar, { EventData } from '../components/Calendar';
import ChatPanel from '../components/dashboard/ChatPanel';
import {
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';
import Header from '../components/dashboard/Header';
import { useEditPostContext } from '@/context/EditPostProvider';
// Define platform names type
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

// Define message structure
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function CalendarRoute() {
  // Get access to the EditPost component functions
  const { onOpen } = useEditPostContext();
  
  // Layout states
  const [leftPanelSize, setLeftPanelSize] = useState(30); // 30% of the width
  const [rightPanelSize, setRightPanelSize] = useState(70); // 70% of the width
  
  // Mobile view state (chat or preview)
  const [mobileView, setMobileView] = useState<'chat' | 'calendar'>('chat');

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Calendar events state
  const [events, setEvents] = useState<EventData[]>([
    {
      id: 1,
      title: "Morning Strategy Meeting",
      scheduled_time: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
      platforms: ["Instagram", "Twitter"]
    },
    {
      id: 2,
      title: "Social Media Campaign Launch",
      scheduled_time: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      platforms: ["Facebook", "LinkedIn", "Instagram"]
    },
    {
      id: 3,
      title: "Content Review Session",
      scheduled_time: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      platforms: ["Facebook", "YouTube"]
    },
    {
      id: 4,
      title: "Weekly Analytics Report",
      scheduled_time: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      platforms: ["Email", "Slack"]
    }
  ]);

  // Mock post data for chat panel (needed for its props)
  const [postTitle, setPostTitle] = useState("Calendar Event");
  const [postContent, setPostContent] = useState("Event details and description");
  const [postHashtags, setPostHashtags] = useState<string[]>(["event", "calendar"]);
  const [mediaUrl, setMediaUrl] = useState<string[]>([]);
  const [socialPlatforms, setSocialPlatforms] = useState<Record<PlatformName, boolean>>({
    'Bluesky': false,
    'Facebook': true,
    'Google Business': false,
    'Instagram': true,
    'X/Twitter': false,
    'Reddit': false,
    'Telegram': false,
    'Threads': false,
    'TikTok': false,
    'YouTube': false
  });
  const [postType, setPostType] = useState({ post: true, story: false, reel: false });
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString());

  // Handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    setLeftPanelSize(sizes[0]);
    setRightPanelSize(sizes[1]);
  };

  // This function will be called when events are updated via drag and drop
  const handleEventsChange = (updatedEvents: EventData[]) => {
    setEvents(updatedEvents);
    console.log("Events updated:", updatedEvents);
  };

  return (
    <DashboardLayout>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen bg-white">
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
              onClick={() => setMobileView('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                mobileView === 'calendar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Desktop Layout - Always side by side with resize handle */}
        <div className="hidden lg:block flex-1 h-[calc(100vh-70px)]">
          <PanelGroup 
            direction="horizontal" 
            autoSaveId="calendar-layout"
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
                setScheduledDate={setScheduledDate}
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
            
            {/* Calendar Panel (Right) */}
            <Panel 
              defaultSize={rightPanelSize} 
              minSize={30} // Minimum 30% width
              className="h-full"
            >
              <div className="p-6 h-full flex flex-col bg-white">
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-3xl font-bold text-blue-400">Content Calendar</h1>
                      <p className="text-gray-400 mt-1">
                        Manage your scheduled content across platforms
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onOpen()} 
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors flex items-center"
                      >
                        <span>Create Post</span>
                      </button>
                      <button
                        onClick={() => onOpen(events[0].id)} 
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-4 py-2 transition-colors flex items-center"
                      >
                        <span>Edit Post</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-xl flex-1 overflow-auto transition-shadow hover:shadow-2xl">
                  <Calendar 
                    events={events} 
                    onEventsChange={handleEventsChange} 
                  />
                </div>
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
          
          {/* Calendar View - Show only when toggled to preview view */}
          <div className={`w-full h-full ${mobileView === 'calendar' ? 'block' : 'hidden'}`}>
            <div className="p-4 h-full flex flex-col bg-white">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Content Calendar</h2>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-xl flex-1 overflow-auto transition-shadow hover:shadow-2xl">
                <Calendar 
                  events={events} 
                  onEventsChange={handleEventsChange} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}