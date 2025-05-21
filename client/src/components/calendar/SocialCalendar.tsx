import React, { useState } from 'react';
import { Post, CalendarView } from '@/types/calendar';
import CalendarHeader from './CalendarHeader';
import MonthView from './month/MonthView';
import WeekView from './week/WeekView';
import { useToast } from '@/hooks/use-toast';
import { formatHourLabel } from '@/utils/dateUtils';
import { useEditPostContext } from '@/context/EditPostProvider';

interface SocialCalendarProps {
  initialDate?: Date;
  posts: Post[];
  onDateSelect?: (date: Date) => void;
  timeZoneLabel?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  isLoading?: boolean;
}

const SocialCalendar: React.FC<SocialCalendarProps> = ({
  initialDate = new Date(),
  posts = [],
  onDateSelect = () => {},
  timeZoneLabel = 'GMT+00:00',
  minWidth = '300px',
  isLoading = false,
}) => {
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [displayDate, setDisplayDate] = useState<Date>(initialDate);
  const { toast } = useToast();
  const editPostContext = useEditPostContext();
  
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
    const post = posts.find(p => p._id === postId);
    if (post) {
      // Convert only the necessary fields while keeping the rest of the post object
      const postWithRequiredFields = {
        ...post,
        scheduleDate: post.scheduleDate.toISOString().slice(0, 16),
        postType: post.postType || 'post'
      };
      editPostContext.onOpen(post._id, postWithRequiredFields, timeZoneLabel);
    }
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
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : currentView === 'month' ? (
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
          timeZoneLabel={timeZoneLabel}
        />
      )}
    </div>
  );
};

export default SocialCalendar;
