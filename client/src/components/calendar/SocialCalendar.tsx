import React, { useState, useRef, useEffect } from 'react';
import { Post, CalendarView } from '@/types/post';
import CalendarHeader from './CalendarHeader';
import MonthView from './month/MonthView';
import WeekView from './week/WeekView';
import { useEditPostContext } from '@/context/EditPostProvider';
import { syncPostsFromDB } from '@/utils/postSync';

interface SocialCalendarProps {
  initialDate?: Date;
  posts: Post[];
  onDateSelect?: (date: Date) => void;
  timeZoneLabel?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
}

const SocialCalendar: React.FC<SocialCalendarProps> = ({
  initialDate = new Date(),
  posts = [],
  onDateSelect = () => {},
  timeZoneLabel = 'GMT+00:00',
  minWidth = '300px',
  isLoading = false,
  setIsLoading = () => {},
}) => {
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [displayDate, setDisplayDate] = useState<Date>(initialDate);
  const editPostContext = useEditPostContext();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const weekNavigationCountRef = useRef<number>(0);
  const today = new Date();

  // Debounced sync for both month and week views
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setIsLoading(true);
    debounceRef.current = setTimeout(() => {
      if (currentView === 'month') {
        // For month view, sync on every month change
        const syncDate = new Date(displayDate);
        syncDate.setDate(today.getDate());
        syncPostsFromDB(syncDate);
      } else if (currentView === 'week') {
        // For week view, sync after approximately a month's worth of weeks
        if (Math.abs(weekNavigationCountRef.current) >= 3) {
          const syncDate = new Date(displayDate);
          syncDate.setDate(today.getDate());
          syncPostsFromDB(syncDate);
          weekNavigationCountRef.current = 0; // Reset counter after sync
        }
      }
      setIsLoading(false);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayDate, currentView]);

  const handleViewChange = (view: CalendarView) => {
    setCurrentView(view);
    weekNavigationCountRef.current = 0; // Reset week navigation counter when view changes
  };

  const handleNavigatePrev = () => {
    const newDate = new Date(displayDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
      weekNavigationCountRef.current -= 1; // Decrement week navigation counter
    }
    setDisplayDate(newDate);
  };

  const handleNavigateNext = () => {
    const newDate = new Date(displayDate);
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
      weekNavigationCountRef.current += 1; // Increment week navigation counter
    }
    setDisplayDate(newDate);
  };

  const handlePostClick = (postId: string | number) => {
    const post = posts.find(p => p._id === postId);
    if (post) {
      const postWithRequiredFields = {
        ...post,
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
