import React, { useState } from 'react';
import { Post, CalendarView } from '@/types/calendar';
import CalendarHeader from './CalendarHeader';
import MonthView from './month/MonthView';
import WeekView from './week/WeekView';
import { useToast } from '@/hooks/use-toast';
import { formatHourLabel } from '@/utils/dateUtils';

interface SocialCalendarProps {
  initialDate?: Date;
  posts: Post[];
  onPostClick?: (postId: string | number) => void;
  onDateSelect?: (date: Date) => void;
  timeZoneLabel?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
}

const SocialCalendar: React.FC<SocialCalendarProps> = ({
  initialDate = new Date(),
  posts = [],
  onPostClick = () => {},
  onDateSelect = () => {},
  timeZoneLabel = 'GMT+00:00',
  minWidth = '300px',
}) => {
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [displayDate, setDisplayDate] = useState<Date>(initialDate);
  const { toast } = useToast();
  
  const handleViewChange = (view: CalendarView) => {
    setCurrentView(view);
  };
  
  const handleNavigatePrev = () => {
    const newDate = new Date(displayDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setDisplayDate(newDate);
  };
  
  const handleNavigateNext = () => {
    const newDate = new Date(displayDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setDisplayDate(newDate);
  };
  
  const handlePostClick = (postId: string | number) => {
    const post = posts.find(p => p.postId === postId);
    if (post) {
      console.log('Clicked Post Details:', JSON.stringify(post, null, 2));
      toast({
        title: `${post.status === 'scheduled' ? 'Scheduled' : 'Draft'} Post`,
        description: `Post ID: ${post.postId}, Time: ${post.scheduledDate.toLocaleString()}`,
      });
    }
    
    onPostClick(postId);
  };

  const handleTimeSlotClick = (date: Date) => {
    // Show toast with both date and time
    toast({
      title: 'Time Slot Selected',
      description: `${date.toLocaleDateString()} : ${formatHourLabel(date.getHours())}-${formatHourLabel(date.getHours()+1)}`,
    });
    
  };
  
  return (
    <div 
      className="calendar-container bg-calendar-bg p-4 rounded-xl"
      style={{ 
        minWidth, 
      }}
    >
      <CalendarHeader
        currentView={currentView}
        displayDate={displayDate}
        onViewChange={handleViewChange}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
      />
      
      {currentView === 'month' ? (
        <MonthView
          displayDate={displayDate}
          posts={posts}
          onPostClick={handlePostClick}
          onDateSelect={onDateSelect}
          timeZoneLabel={timeZoneLabel}
        />
      ) : (
        <WeekView
          displayDate={displayDate}
          posts={posts}
          onPostClick={handlePostClick}
          onTimeSlotClick={handleTimeSlotClick}
          timeZoneLabel={timeZoneLabel}
        />
      )}
    </div>
  );
};

export default SocialCalendar;
