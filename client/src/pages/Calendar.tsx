import React, { useState, useRef, useEffect } from 'react';
import SocialCalendar from '@/components/calendar/SocialCalendar';
import { usePostStore } from '@/store/usePostStore';
import ActionScreenHeader from './ActionScreenHeader';
import { syncPostsFromDB } from '@/utils/postSync';
import { CalendarView } from '@/types/post';

export default function CalendarRoute() {
  const today = new Date();
  const posts = usePostStore((state) => state.posts);
  const [timeframe, setTimeframe] = useState<CalendarView>('month');

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

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const weekNavigationCountRef = useRef<number>(0);

  // Effect for handling debounced post fetching for navigation
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(async () => {
      if (timeframe === 'month') {
        await syncPostsFromDB(getDisplayDate());
      } else if (timeframe === 'week' && Math.abs(weekNavigationCountRef.current) >= 3) {
        await syncPostsFromDB(getDisplayDate());
        weekNavigationCountRef.current = 0;
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedMonth, selectedYear, weekStart, weekEnd]);

  // Effect for syncing posts when timeframe changes
  useEffect(() => {
    syncPostsFromDB(getDisplayDate());
    weekNavigationCountRef.current = 0;
  }, [timeframe]);

  const handlePrevPeriod = () => {
    if (timeframe === 'month') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      const newWeekStart = new Date(weekStart);
      newWeekStart.setDate(weekStart.getDate() - 7);
      const newWeekEnd = new Date(weekEnd);
      newWeekEnd.setDate(weekEnd.getDate() - 7);
      setWeekStart(newWeekStart);
      setWeekEnd(newWeekEnd);
      weekNavigationCountRef.current -= 1;
    }
  };

  const handleNextPeriod = () => {
    if (timeframe === 'month') {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    } else {
      const newWeekStart = new Date(weekStart);
      newWeekStart.setDate(weekStart.getDate() + 7);
      const newWeekEnd = new Date(weekEnd);
      newWeekEnd.setDate(weekEnd.getDate() + 7);
      setWeekStart(newWeekStart);
      setWeekEnd(newWeekEnd);
      weekNavigationCountRef.current += 1;
    }
  };

  const getDisplayDate = () => {
    let date;
    if (timeframe === 'month') {
      date = new Date();
      date.setMonth(selectedMonth);
      date.setFullYear(selectedYear);
    } else {
      date = weekStart;
    }
    usePostStore.getState().setDisplayDate(date);
    return date;
  };

  return (
    <div className="p-5 h-full flex flex-col bg-white">
      <ActionScreenHeader
        title="Calendar"
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        weekStart={weekStart}
        weekEnd={weekEnd}
        handlePrevPeriod={handlePrevPeriod}
        handleNextPeriod={handleNextPeriod}
      />
      <div className="overflow-auto">
        <SocialCalendar
          posts={posts.filter(post => post.status !== 'deleted')}
          timeZoneLabel="GMT+05:30"
          currentView={timeframe}
          displayDate={getDisplayDate()}
        />
      </div>
    </div>
  );
}