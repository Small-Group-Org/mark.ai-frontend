import React, { useMemo } from 'react';
import { Post } from '@/types/calendar';
import { 
  DAYS_OF_WEEK, 
  getWeekDates, 
  isToday, 
  formatHourLabel
} from '@/utils/dateUtils';
import { preprocessPosts, getPostsForDateTime } from '@/utils/postUtils';
import DayHeaderCellWeek from './DayHeaderCellWeek';
import DayColumnWeek from './DayColumnWeek';
import TimeGutter from './TimeGutter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface WeekViewProps {
  displayDate: Date;
  posts: Post[];
  onPostClick: (postId: string | number) => void;
  onTimeSlotClick?: (date: Date) => void;
  timeZoneLabel?: string;
}

const WeekView: React.FC<WeekViewProps> = ({
  displayDate,
  posts,
  onPostClick,
  onTimeSlotClick,
  timeZoneLabel = 'GMT+00:00',
}) => {
  const weekDates = getWeekDates(displayDate);
  const { toast } = useToast();
  
  // Preprocess posts once and memoize the result
  const postsMap = useMemo(() => preprocessPosts(posts), [posts]);
  console.log("Total Post count: ", posts.length);
  console.log("Post Map: ", postsMap);
  
  const handleTimeSlotClick = (date: Date, hour: number) => {
    const dayName = DAYS_OF_WEEK[date.getDay()];
    const timeLabel = formatHourLabel(hour);
    
    // Create a new date object with the selected hour
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hour, 0, 0, 0);
    
    if (onTimeSlotClick) {
      onTimeSlotClick(selectedDateTime);
    }
  };
  
  return (
    <>
    <div className="text-xs text-gray-500 font-poppins px-4 py-2 border-b border-slate-200 text-left">
      {timeZoneLabel}
    </div>
    <div className="flex flex-col border border-slate-200 rounded-lg overflow-hidden animate-view-switch bg-white">
      
      {/* Header row */}
      <div className="grid grid-cols-[60px,repeat(7,1fr)] border-b border-slate-200">
        <div className="border-r border-slate-200"></div>
        {weekDates.map((date, index) => (
          <DayHeaderCellWeek
          key={index}
          day={DAYS_OF_WEEK[date.getDay()]}
          date={date.getDate()}
          isToday={isToday(date)}
          />
        ))}
      </div>
      
      {/* Week grid with scrollable content */}
      <ScrollArea className="h-[500px]">
        <div className="grid grid-cols-[60px,repeat(7,1fr)] relative" style={{ height: '1440px' }}>
          <TimeGutter />
          
          {weekDates.map((date, index) => (
            <DayColumnWeek
            key={index}
            date={date}
            postsMap={postsMap}
            isToday={isToday(date)}
            onPostClick={onPostClick}
            onTimeSlotClick={handleTimeSlotClick}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
    </>
  );
};

export default WeekView;
