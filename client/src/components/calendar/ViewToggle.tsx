
import React from 'react';
import { CalendarView } from '@/types/post';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={cn(
          "transition-all",
          currentView === 'month' ? 'active' : ''
        )}
        onClick={() => onViewChange('month')}
      >
        Month
      </button>
      <button
        className={cn(
          "transition-all",
          currentView === 'week' ? 'active' : ''
        )}
        onClick={() => onViewChange('week')}
      >
        Week
      </button>
    </div>
  );
};

export default ViewToggle;
