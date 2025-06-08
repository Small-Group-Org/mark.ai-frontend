import React, { useState, useRef, useEffect } from 'react';
import SocialCalendar from '@/components/calendar/SocialCalendar';
import { usePostStore } from '@/store/usePostStore';
import ActionScreenHeader from './ActionScreenHeader';
import { syncPostsFromDB } from '@/utils/postSync';
import { CalendarView } from '@/types/post';
import { useAuthStore } from '@/store/useAuthStore';
import { useEditPostContext } from '@/context/EditPostProvider';
import { useLocation } from 'wouter';
import { 
  calculateDisplayDate, 
  handlePostOpening, 
  navigateToPostMonth 
} from '@/utils/calendarUtils';
import { getAndClearCalendarNavigationState } from '@/utils/infoMessageUtils';

export default function CalendarRoute() {
  const today = new Date();
  const posts = usePostStore((state) => state.posts);
  const setDisplayDate = usePostStore((state) => state.setDisplayDate);
  const [timeframe, setTimeframe] = useState<CalendarView>('month');
  const { isMobileView } = useAuthStore();
  const [location] = useLocation();
  const editPostContext = useEditPostContext();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [weekStart, setWeekStart] = useState(() => {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return start;
  });
  const [weekEnd, setWeekEnd] = useState(() => {
    const end = new Date(today);
    end.setDate(today.getDate() + (6 - today.getDay()));
    return end;
  });

  const [displayDate, setLocalDisplayDate] = useState(today);
  const [navigationState, setNavigationState] = useState<{ editPostId?: string; scheduleDate?: string } | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const weekNavigationCountRef = useRef<number>(0);

  // Check for navigation state from global state (from ChatPanel)
  useEffect(() => {
    const globalNavState = getAndClearCalendarNavigationState();
    if (globalNavState) {
      setNavigationState(globalNavState);
    }
  }, [location]);

  // Handle navigation from info messages
  useEffect(() => {
    if (navigationState?.editPostId && navigationState?.scheduleDate) {
      const scheduleDate = new Date(navigationState.scheduleDate);
      
      navigateToPostMonth(scheduleDate, setSelectedMonth, setSelectedYear);
      
      const openPost = () => {
        handlePostOpening(
          navigationState.editPostId!,
          scheduleDate,
          posts,
          editPostContext
        );
      };

      setTimeout(openPost, 1000);
      setNavigationState(null);
    }
  }, [navigationState, posts, editPostContext]);

  // Update display date when dependencies change
  useEffect(() => {
    const newDisplayDate = calculateDisplayDate(timeframe, selectedMonth, selectedYear, weekStart);
    setLocalDisplayDate(newDisplayDate);
    setDisplayDate(newDisplayDate);
  }, [selectedMonth, selectedYear, weekStart, timeframe, setDisplayDate]);

  // Effect for syncing posts when month or week changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(async () => {
      const shouldSync = timeframe === 'month' || (timeframe === 'week' && Math.abs(weekNavigationCountRef.current) >= 3);
      
      if (shouldSync) {
        await syncPostsFromDB(displayDate);
        if (timeframe === 'week') {
          weekNavigationCountRef.current = 0;
        }
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedMonth, selectedYear, weekStart, weekEnd, displayDate]);

  useEffect(() => {
    syncPostsFromDB(displayDate);
    weekNavigationCountRef.current = 0;
  }, [timeframe, displayDate]);

  return (
    <div className={`h-full flex flex-col bg-white`}>
      <ActionScreenHeader
        title="Calendar"
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        weekStart={weekStart}
        weekEnd={weekEnd}
        setWeekStart={setWeekStart}
        setWeekEnd={setWeekEnd}
        weekNavigationCountRef={weekNavigationCountRef}
        isCalendarPage={true}
      />
      <div className="overflow-auto">
        <SocialCalendar
          posts={posts.filter(post => post.status !== 'deleted' && post.status !== 'live')}
          currentView={timeframe}
          displayDate={displayDate}
        />
      </div>
    </div>
  );
}