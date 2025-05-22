import React from 'react';
import { Post } from '@/types/post';
import { 
  DAYS_OF_WEEK, 
  getCalendarDates, 
  isToday, 
  isCurrentMonth, 
  getPostsForDay
} from '@/utils/dateUtils';
import DayHeaderCellMonth from './DayHeaderCellMonth';
import DayCellMonth from './DayCellMonth';

interface MonthViewProps {
  displayDate: Date;
  posts: Post[];
  onPostClick: (postId: string | number) => void;
  onDateSelect: (date: Date) => void;
  timeZoneLabel?: string;
}

const MonthView: React.FC<MonthViewProps> = ({
  displayDate,
  posts,
  onPostClick,
  onDateSelect,
  timeZoneLabel = 'GMT+00:00',
}) => {
  const calendarDates = getCalendarDates(displayDate);
  
  return (
    <>
      <div className="text-xs text-gray-500 font-poppins px-4 py-2 border-b border-slate-200 text-left">
        {timeZoneLabel}
      </div>
      <div className="month-grid border border-border rounded-lg overflow-hidden animate-fade-in">
        {/* Day headers */}
        {DAYS_OF_WEEK.map((day) => (
          <DayHeaderCellMonth key={day} day={day} />
        ))}
        
        {/* Day cells */}
        {calendarDates.map((date, index) => {
          const postsForDay = getPostsForDay(posts, date);
          return (
            <DayCellMonth
              key={index}
              date={date}
              posts={postsForDay}
              isToday={isToday(date)}
              isCurrentMonth={isCurrentMonth(date, displayDate)}
              onPostClick={onPostClick}
              onDateSelect={onDateSelect}
            />
          );
        })}
      </div>
    </>
  );
};

export default MonthView;
