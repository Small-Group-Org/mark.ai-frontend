import React from 'react';
import { useEditPostContext } from '@/context/EditPostProvider';
import { EventData } from '@/components/Calendar';

interface CalendarEventHandlerProps {
  event: EventData;
}

const CalendarEventHandler: React.FC<CalendarEventHandlerProps> = ({ 
  event 
}) => {
  const { onOpen } = useEditPostContext();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Open the edit post modal with the selected event
    onOpen(event.id);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:brightness-95 transition-all"
    >
      {/* Your existing event rendering code */}
      <div className="font-medium truncate">
        {event.title}
      </div>
      <div className="text-xs truncate">
        {event.platforms.length} platform{event.platforms.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default CalendarEventHandler;