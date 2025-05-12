import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ResizablePanel, ResizablePanelGroup, Panel } from '@/components/ui/resizable';
import Header from '@/components/dashboard/Header';
import Calendar from '@/components/Calendar';
import ChatPanel from '@/components/dashboard/ChatPanel';
import { EditPostProvider, useEditPostContext } from '@/context/EditPostProvider';

// Modified EventData to match our needs
export interface EventData {
  id: number | string;
  title: string;
  scheduled_time: string; // ISO format
  platforms: string[];
  content?: string;
  hashtags?: string[];
  mediaUrl?: string[];
}

// Example of integration with Calendar page
export default function CalendarWithEditPostRoute() {
  const [rightPanelSize, setRightPanelSize] = useState<number>(70);
  const [mobileView, setMobileView] = useState<'chat' | 'calendar'>('chat');
  const [events, setEvents] = useState<EventData[]>([]);

  // Example of initializing events
  useEffect(() => {
    // In a real app, you'd fetch events from your API
    const initialEvents: EventData[] = [
      {
        id: '1',
        title: 'Instagram Post',
        scheduled_time: new Date().toISOString(),
        platforms: ['Instagram', 'Facebook'],
        content: 'Check out our latest product!',
        hashtags: ['#newproduct', '#launch'],
        mediaUrl: ['/sample-image.jpg']
      },
      {
        id: '2',
        title: 'Twitter Announcement',
        scheduled_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        platforms: ['X/Twitter', 'LinkedIn'],
        content: 'Big news coming soon!',
        hashtags: ['#announcement', '#comingsoon'],
        mediaUrl: []
      }
    ];
    
    setEvents(initialEvents);
  }, []);

  // Handler for event changes (modified for EditPost integration)
  const handleEventsChange = (updatedEvents: EventData[]) => {
    setEvents(updatedEvents);
  };

  // Example of custom event component that integrates with EditPost
  const CalendarEvent = ({ event }: { event: EventData }) => {
    const { onOpen } = useEditPostContext();
    
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Convert calendar event to post data format
      onOpen(event.id);
    };
    
    return (
      <div 
        onClick={handleClick}
        className="cursor-pointer hover:brightness-95 transition-all"
      >
        <div className="font-medium truncate">{event.title}</div>
        <div className="text-xs truncate">
          {event.platforms.length} platform{event.platforms.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  };

  // Messages and state for the chat panel (for display purposes)
  const [messages, setMessages] = useState<{id: number; text: string; sender: 'user' | 'ai'}[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');
  const [postHashtags, setPostHashtags] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState<string[]>([]);
  const [socialPlatforms, setSocialPlatforms] = useState<Record<string, boolean>>({});
  const [postType, setPostType] = useState<{post: boolean; story: boolean; reel: boolean}>({
    post: true, story: false, reel: false
  });
  const [scheduledDate, setScheduledDate] = useState<string>('');

  return (
    <EditPostProvider>
      <DashboardLayout>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen bg-white">
          {/* Header */}
          <Header />
          
          {/* Mobile View Toggle - Only visible on mobile */}
          <div className="md:hidden flex bg-gray-800 text-white">
            <button
              className={`flex-1 py-2 px-4 text-center ${mobileView === 'chat' ? 'bg-blue-600' : ''}`}
              onClick={() => setMobileView('chat')}
            >
              Chat
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${mobileView === 'calendar' ? 'bg-blue-600' : ''}`}
              onClick={() => setMobileView('calendar')}
            >
              Calendar
            </button>
          </div>
          
          {/* Main Content - Desktop */}
          <div className="hidden md:flex flex-1 overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel 
                defaultSize={100 - rightPanelSize} 
                minSize={30} // Minimum 30% width
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
                  socialPlatforms={socialPlatforms as any}
                  postType={postType}
                  scheduledDate={scheduledDate}
                  setPostTitle={setPostTitle}
                  setPostContent={setPostContent}
                  setPostHashtags={setPostHashtags}
                  setMediaUrl={setMediaUrl}
                  setSocialPlatforms={setSocialPlatforms as any}
                  setPostType={setPostType}
                  setScheduledDate={setScheduledDate}
                />
              </ResizablePanel>
              
              <Panel className="w-[2px] bg-gray-200" />
              
              <ResizablePanel 
                defaultSize={rightPanelSize} 
                minSize={30} // Minimum 30% width
                className="h-full"
              >
                <div className="p-6 h-full flex flex-col bg-white">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-blue-400">Content Calendar</h1>
                    <p className="text-gray-400 mt-1">
                      Manage your scheduled content across platforms
                    </p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl flex-1 overflow-auto transition-shadow hover:shadow-2xl">
                    <Calendar 
                      events={events} 
                      onEventsChange={handleEventsChange}
                      // In a real implementation, you'd pass a custom event renderer
                      // that uses EditPost or modify the Calendar component to use
                      // the CalendarEvent component defined above
                    />
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          
          {/* Main Content - Mobile */}
          <div className="flex md:hidden flex-1 overflow-hidden">
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
                socialPlatforms={socialPlatforms as any}
                postType={postType}
                scheduledDate={scheduledDate}
                setPostTitle={setPostTitle}
                setPostContent={setPostContent}
                setPostHashtags={setPostHashtags}
                setMediaUrl={setMediaUrl}
                setSocialPlatforms={setSocialPlatforms as any}
                setPostType={setPostType}
                setScheduledDate={setScheduledDate}
              />
            </div>
            
            {/* Calendar View - Show only when toggled to calendar view */}
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
    </EditPostProvider>
  );
}