import React from 'react';
import { Post } from '@/types/calendar';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import { getHoursArray } from '@/utils/dateUtils';
import { PostsByDateTime, getPostsForDateTime } from '@/utils/postUtils';
import PostIndicatorWeek from '../post/PostIndicatorWeek';

interface DayColumnWeekProps {
  date: Date;
  postsMap: PostsByDateTime;
  isToday: boolean;
  onPostClick: (postId: string | number) => void;
  onTimeSlotClick?: (date: Date, hour: number) => void;
}

const DayColumnWeek: React.FC<DayColumnWeekProps> = ({
  date,
  postsMap,
  isToday,
  onPostClick,
  onTimeSlotClick
}) => {
  const hours = getHoursArray();
  
  const handleTimeSlotClick = (hour: number) => {
    if (onTimeSlotClick) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);
      onTimeSlotClick(slotDate, hour);
    }
  };
  
  return (
    <div className="relative flex-1 border-r border-slate-200">
      {/* Grid container with relative positioning */}
      <div className="relative h-[1440px]">
        {/* Hour cells - one for each hour */}
        {hours.map((hour) => {
          const postsForHour = getPostsForDateTime(postsMap, date, hour);
          return (
            <div 
              key={hour} 
              className="h-[60px] border-b border-slate-200 relative cursor-pointer hover:bg-gray-50"
              data-hour={hour}
              onClick={() => handleTimeSlotClick(hour)}
            >
              {/* Render posts for this hour */}
              <div className="space-y-1 p-1">
                {postsForHour.map((post) => (
                  <PostIndicatorWeek
                    key={post.postId}
                    post={post}
                    onClick={onPostClick}
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Current time indicator */}
        <CurrentTimeIndicator isToday={isToday} />
      </div>
    </div>
  );
};

export default DayColumnWeek;
