import React from 'react';
import { format, parseISO } from 'date-fns';
import { useEditPostContext } from '@/context/EditPostProvider';
import { EventData } from '@/components/Calendar';
import { PostData } from '@/components/EditPost';

interface EventRendererProps {
  event: EventData;
  view: 'week' | 'month';
}

// This component shows how to render a calendar event that opens the EditPost modal when clicked
const EventRenderer: React.FC<EventRendererProps> = ({ event, view }) => {
  const { onOpen } = useEditPostContext();

  // Convert EventData to PostData format when opening the edit modal
  const handleEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // When a user clicks an event, convert the event data to post data format
    // and open the edit post modal
    const postData: PostData = {
      id: event.id,
      title: event.title,
      content: event.content || '',
      hashtags: event.hashtags || [],
      mediaUrl: event.mediaUrl || [],
      scheduledDate: event.scheduled_time,
      // Default platforms based on the event's platforms array
      socialPlatforms: {
        'Instagram': event.platforms.includes('Instagram'),
        'Facebook': event.platforms.includes('Facebook'),
        'TikTok': event.platforms.includes('TikTok'),
        'X/Twitter': event.platforms.includes('X/Twitter'),
        'Reddit': event.platforms.includes('Reddit'),
        'Telegram': event.platforms.includes('Telegram'),
        'Threads': event.platforms.includes('Threads'),
        'YouTube': event.platforms.includes('YouTube'),
        'Bluesky': event.platforms.includes('Bluesky'),
        'Google Business': event.platforms.includes('Google Business')
      },
      // Default post type (can be refined with actual data)
      postType: {
        post: true,
        story: false,
        reel: false
      }
    };
    
    // Open the edit post modal with the event data
    onOpen(event.id);
  };

  // Different styling based on the view (week or month)
  if (view === 'week') {
    return (
      <div 
        className="calendar-event absolute inset-x-1 p-1 overflow-hidden bg-blue-500 text-white rounded cursor-pointer hover:brightness-95"
        onClick={handleEventClick}
        data-event-id={event.id}
      >
        <div className="text-xs font-medium truncate">{event.title}</div>
        <div className="text-xs opacity-90 truncate">
          {format(parseISO(event.scheduled_time), 'h:mm a')}
        </div>
        <div className="text-xs opacity-80 truncate mt-1">
          {event.platforms.length} platform{event.platforms.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  } else {
    // Month view
    return (
      <div
        className="text-xs p-1 my-1 overflow-hidden bg-blue-100 text-blue-800 border-l-2 border-blue-500 rounded-sm cursor-pointer hover:bg-blue-200"
        onClick={handleEventClick}
      >
        <div className="font-medium truncate">
          {format(parseISO(event.scheduled_time), 'h:mm a')} - {event.title}
        </div>
        <div className="text-xs truncate">
          {event.platforms.length} platform{event.platforms.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  }
};

export default EventRenderer;