import React from 'react';
import { getHoursArray, formatHourLabel } from '@/utils/dateUtils';

const TimeGutter: React.FC = () => {
  const hours = getHoursArray();
  
  return (
    <div className="sticky left-0 z-10 h-full border-r border-slate-200 bg-white">
      {hours.map((hour) => (
        <div 
          key={hour} 
          className="h-[60px] border-b border-slate-200 relative"
        >
          <span className="absolute -top-2 right-2 text-xs text-gray-500 font-poppins">
            {formatHourLabel(hour)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TimeGutter;
