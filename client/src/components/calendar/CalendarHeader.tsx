
import React from 'react';
import { CalendarView } from '@/types/post';
import ViewToggle from './ViewToggle';
import { getMonthTitle, getWeekTitle } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentView: CalendarView;
  displayDate: Date;
  onViewChange: (view: CalendarView) => void;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentView,
  displayDate,
  onViewChange,
  onNavigatePrev,
  onNavigateNext,
}) => {
  const title = currentView === 'month' 
    ? getMonthTitle(displayDate)
    : getWeekTitle(displayDate);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-2xl font-bold font-inter text-day-text">Social Calendar</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNavigatePrev}
            className="text-day-text"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <span className="font-poppins font-medium text-day-text px-2 min-w-[200px] text-center">
            {title}
          </span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNavigateNext}
            className="text-day-text"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        
        <ViewToggle currentView={currentView} onViewChange={onViewChange} />
      </div>
    </div>
  );
};

export default CalendarHeader;
