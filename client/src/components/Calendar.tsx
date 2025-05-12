// Calendar.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  format, parseISO, addMinutes, startOfWeek, endOfWeek, eachDayOfInterval, 
  isSameDay, addMonths, subMonths, startOfMonth, endOfMonth, getHours, 
  getMinutes, isSameMonth
} from "date-fns";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";

// Type definitions
export interface EventData {
  id: number | string;
  title: string;
  scheduled_time: string; // ISO format
  platforms: string[];
}

interface CalendarProps {
  events: EventData[];
  onEventsChange: (updatedEvents: EventData[]) => void;
  onEventClick?: (eventId: number | string) => void;
}

// Helper function for class name management
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Hour Row Component
const HourRow = ({ hour, days, events, onDragStart }: { 
  hour: number, 
  days: Date[], 
  events: EventData[],
  onDragStart: (e: React.MouseEvent, event: EventData) => void 
}) => {
  const timeLabel = hour === 0 
    ? '12 AM' 
    : hour < 12 
      ? `${hour} AM` 
      : hour === 12 
        ? '12 PM' 
        : `${hour - 12} PM`;
  return (
    <>
      {/* Time Label */}
      <div className="sticky left-0 z-10 bg-white text-right pr-2 text-xs text-gray-500 border-r border-gray-200 flex items-start">
        <span className="mt-[-8px]">{timeLabel}</span>
      </div>
      
      {/* Day cells for this hour */}
      {days.map((day, dayIndex) => {
        const dayEvents = events.filter(event => {
          const eventDate = parseISO(event.scheduled_time);
          return isSameDay(eventDate, day) && getHours(eventDate) === hour;
        });
        
        return (
          <div 
            key={`cell-${dayIndex}-${hour}`} 
            className="time-slot relative border-t border-gray-200"
            data-day={dayIndex}
            data-hour={hour}
          >
            {dayEvents.map(event => {
              const eventTime = parseISO(event.scheduled_time);
              const minute = getMinutes(eventTime);
              // Using round to ensure alignment to 5-min intervals
              const top = Math.round(minute / 5) * 5 - 30; // 30 minutes before scheduled time
              
              return (
                <div 
                  key={`event-${event.id}`}
                  data-event-id={event.id}
                  className="calendar-event absolute inset-x-1 p-1 overflow-hidden"
                  style={{
                    top: `${Math.max(0, top)}px`,
                    height: "60px",
                    backgroundColor: `#3b82f6`,
                    color: "white",
                    borderRadius: "4px",
                    position: "absolute",
                    left: "2px",
                    right: "2px",
                    zIndex: 10,
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                    touchAction: "none",
                    userSelect: "none"
                  }}
                >
                  {/* Make the entire event draggable */}
                  <div 
                    className="event-drag-area absolute inset-0 cursor-pointer p-1"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      cursor: "pointer",
                      padding: "4px",
                      zIndex: 11
                    }}
                    onMouseDown={(e) => onDragStart(e, event)}
                  >
                    <div className="drag-handle-indicator absolute top-1 right-1 w-6 h-6 flex items-center justify-center"
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "2px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      <GripVertical className="h-4 w-4 text-white opacity-80" />
                    </div>
                    <div className="text-xs font-medium truncate pr-6">{event.title}</div>
                    <div className="text-xs text-white opacity-90 truncate">
                      {format(eventTime, 'h:mm a')}
                    </div>
                    <div className="text-xs text-white opacity-80 truncate mt-1">
                      {event.platforms.length} platform{event.platforms.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

// Month Day Component
const MonthDay = ({ day, events, currentMonth }: { 
  day: Date, 
  events: EventData[],
  currentMonth: Date
}) => {
  const dayEvents = events.filter(event => {
    const eventDate = parseISO(event.scheduled_time);
    return isSameDay(eventDate, day);
  });
  
  const isToday = isSameDay(day, new Date());
  const isCurrentMonth = isSameMonth(day, currentMonth);
  
  return (
    <div 
      className={cn(
        "border border-gray-200 p-1 min-h-[100px]",
        !isCurrentMonth ? "bg-gray-50 text-gray-500" : "",
        isToday ? "bg-blue-50" : ""
      )}
    >
      <div className="text-sm">{format(day, 'd')}</div>
      
      {/* Events for this day */}
      {dayEvents.map(event => (
        <div 
          key={`month-event-${event.id}`}
          className="text-xs p-1 my-1 overflow-hidden bg-blue-100 text-blue-800 border-l-2 border-blue-500 rounded-sm"
        >
          <div className="font-medium truncate">
            {format(parseISO(event.scheduled_time), 'h:mm a')} - {event.title}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Calendar Component
export default function Calendar({ events, onEventsChange, onEventClick }: CalendarProps) {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggingEvent, setDraggingEvent] = useState<EventData | null>(null);
  const [draggingStartY, setDraggingStartY] = useState(0);
  const [draggingStartTime, setDraggingStartTime] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Get the days to display based on the current view and date
  const daysToShow = useMemo(() => {
    if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 });
      return eachDayOfInterval({ start, end: endOfWeek(currentDate, { weekStartsOn: 0 }) });
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const monthStart = startOfWeek(start, { weekStartsOn: 0 });
      const monthEnd = endOfWeek(end, { weekStartsOn: 0 });
      return eachDayOfInterval({ start: monthStart, end: monthEnd });
    }
  }, [currentDate, view]);

  // Hour slots for week view
  const hourSlots = Array.from({ length: 24 }, (_, i) => i);

  // Timezone information
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneAbbr = new Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(new Date())
    .find(part => part.type === 'timeZoneName')?.value || timezone;

  // Navigate to previous/next period
  const navigatePrevious = () => {
    if (view === "week") {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      });
    } else {
      setCurrentDate(prev => subMonths(prev, 1));
    }
  };

  const navigateNext = () => {
    if (view === "week") {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      });
    } else {
      setCurrentDate(prev => addMonths(prev, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format the display date range
  const dateRangeText = useMemo(() => {
    if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 });
      const end = endOfWeek(currentDate, { weekStartsOn: 0 });
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  }, [currentDate, view]);

  // Handle event dragging (start)
  const handleDragStart = (e: React.MouseEvent, eventData: EventData) => {
    if (view !== "week") return;
    e.preventDefault();
    e.stopPropagation();
    
    // Get the parent event element (the actual colored box)
    const eventElement = (e.currentTarget as HTMLElement).closest('.calendar-event') as HTMLElement;
    if (!eventElement) return;
    
    // Create a clone of the event element for dragging
    const rect = eventElement.getBoundingClientRect();
    const ghostElement = eventElement.cloneNode(true) as HTMLElement;
    
    // Enhance the ghost element
    ghostElement.style.position = 'fixed';
    ghostElement.style.top = `${rect.top}px`;
    ghostElement.style.left = `${rect.left}px`;
    ghostElement.style.width = `${rect.width}px`;
    ghostElement.style.height = `${rect.height}px`;
    ghostElement.style.opacity = '0.8';
    ghostElement.style.pointerEvents = 'none';
    ghostElement.style.zIndex = '9999';
    ghostElement.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    ghostElement.style.transform = 'scale(1.02)';
    ghostElement.id = 'drag-ghost';
    
    // Add the ghost element to the document body
    document.body.appendChild(ghostElement);
    
    // Initialize dragging state
    setDraggingEvent(eventData);
    setDraggingStartY(e.clientY);
    setDraggingStartTime(parseISO(eventData.scheduled_time));
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.body.style.cursor = 'grabbing';
    
    // Make the original element semi-transparent
    eventElement.style.opacity = '0.4';
    
    // Add a class to the body to prevent text selection during drag
    document.body.classList.add('dragging-active');
  };

  // Handle event dragging (move)
  const handleDragMove = (e: MouseEvent) => {
    if (!draggingEvent || !draggingStartTime || !calendarRef.current) return;
    
    // Move the ghost element with the cursor
    const ghostElement = document.getElementById('drag-ghost');
    if (ghostElement) {
      const deltaY = e.clientY - draggingStartY;
      ghostElement.style.transform = `translate3d(0, ${deltaY}px, 0) scale(1.02)`;
      
      // Highlight the time slot we're over
      const timeSlots = document.querySelectorAll('.time-slot');
      timeSlots.forEach(slot => {
        (slot as HTMLElement).classList.remove('drag-over');
      });
      
      // Find the time slot we're currently over
      const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
      const targetSlot = elementsAtPoint.find(el => el.classList.contains('time-slot'));
      
      if (targetSlot) {
        targetSlot.classList.add('drag-over');
        
        // Ensure the calendar container scrolls if needed
        const calendarRect = calendarRef.current.getBoundingClientRect();
        
        // Auto-scroll when near the top or bottom
        const scrollThreshold = 50; // pixels from edge
        
        if (e.clientY < calendarRect.top + scrollThreshold) {
          // Scroll up
          calendarRef.current.scrollBy(0, -10);
        } else if (e.clientY > calendarRect.bottom - scrollThreshold) {
          // Scroll down
          calendarRef.current.scrollBy(0, 10);
        }
      }
    }
  };

  // Handle event dragging (end)
  const handleDragEnd = (e: MouseEvent) => {
    if (!draggingEvent || !draggingStartTime || !calendarRef.current) return;
    
    try {
      // Find the time slot we're dropping onto
      const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
      const targetSlot = elementsAtPoint.find(el => el.classList.contains('time-slot')) as HTMLElement;
      
      if (targetSlot) {
        // Get data attributes from the target slot
        const dayIndex = parseInt(targetSlot.getAttribute('data-day') || '0', 10);
        const hour = parseInt(targetSlot.getAttribute('data-hour') || '0', 10);
        
        // Get the target day
        const targetDay = daysToShow[dayIndex];
        
        // Calculate the new time by preserving minutes from original time
        // but updating the day and hour
        const originalTime = new Date(draggingStartTime);
        const originalMinutes = originalTime.getMinutes();
        
        // Create a new Date based on the target day and hour
        const newTime = new Date(targetDay);
        newTime.setHours(hour, originalMinutes, 0, 0);
        
        // Update the events array
        const updatedEvents = events.map(e => {
          if (e.id === draggingEvent.id) {
            return {
              ...e,
              scheduled_time: newTime.toISOString(),
            };
          }
          return e;
        });
        
        // Call the callback with updated events
        onEventsChange(updatedEvents);
      } else {
        // If not dropped on a valid slot, calculate based on Y offset
        const deltaY = e.clientY - draggingStartY;
        // 1 hour = 60px, so convert to 15-minute intervals
        const minutesDelta = Math.round((deltaY / 15)) * 15;
        
        // Calculate new time
        const newTime = addMinutes(draggingStartTime, minutesDelta);
        
        // Update the events array
        const updatedEvents = events.map(e => {
          if (e.id === draggingEvent.id) {
            return {
              ...e,
              scheduled_time: newTime.toISOString(),
            };
          }
          return e;
        });
        
        // Call the callback with updated events
        onEventsChange(updatedEvents);
      }
    } catch (error) {
      console.error("Error during drag end:", error);
    } finally {
      // Clean up all drag-related elements and states
      
      // Remove the ghost element
      const ghostElement = document.getElementById('drag-ghost');
      if (ghostElement) {
        document.body.removeChild(ghostElement);
      }
      
      // Reset all time slots
      const timeSlots = document.querySelectorAll('.time-slot');
      timeSlots.forEach(slot => {
        (slot as HTMLElement).classList.remove('drag-over');
      });
      
      // Reset all event elements
      const eventElements = document.querySelectorAll('.calendar-event');
      eventElements.forEach((el: Element) => {
        (el as HTMLElement).style.opacity = '';
        (el as HTMLElement).style.transform = '';
      });
      
      // Reset dragging state
      setDraggingEvent(null);
      setDraggingStartY(0);
      setDraggingStartTime(null);
      
      // Remove event listeners
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = 'default';
      
      // Remove the dragging class from the body
      document.body.classList.remove('dragging-active');
    }
  };

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.body.style.cursor = 'default';
    };
  }, []);

  // Week view renderer
  const WeekView = () => (
    <div className="calendar-grid-week h-auto min-h-full" style={{
      display: "grid",
      gridTemplateColumns: "60px repeat(7, 1fr)",
      gridTemplateRows: "auto repeat(24, 60px)",
      minWidth: "700px",
      position: "relative",
      zIndex: 1,
      borderCollapse: "collapse"
    }}>
      {/* Time column header (empty corner) */}
      <div className="sticky left-0 top-0 z-20 bg-white border-b border-gray-200"></div>
      
      {/* Day headers */}
      {daysToShow.map((day, index) => (
        <div 
          key={`header-${index}`} 
          className="sticky top-0 z-20 bg-white border-b border-gray-200 font-medium text-center py-2 shadow-sm"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            backgroundColor: "#fff"
          }}
        >
          <div className="text-gray-700 font-bold">{format(day, 'EEE')}</div>
          <div className={cn(
            "text-xs mt-1",
            isSameDay(day, new Date()) ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto" : ""
          )}>
            {format(day, 'd')}
          </div>
        </div>
      ))}
      
      {/* Time rows with hour cells */}
      {hourSlots.map((hour) => (
        <HourRow
          key={`hour-${hour}`}
          hour={hour}
          days={daysToShow}
          events={events}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
  
  // Month view renderer
  const MonthView = () => (
    <div className="calendar-grid-month h-auto min-h-full" style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gridAutoRows: "minmax(100px, auto)",
      gridGap: 0,
      borderCollapse: "collapse",
      minWidth: "500px"
    }}>
      {/* Day headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center text-sm text-gray-700 py-2 font-bold bg-white sticky top-0 z-20 border-b border-gray-200 shadow-sm">
          {day}
        </div>
      ))}
      
      {/* Calendar grid */}
      {Array.from({ length: Math.ceil(daysToShow.length / 7) }).map((_, rowIndex) => (
        daysToShow.slice(rowIndex * 7, (rowIndex + 1) * 7).map((day, dayIndex) => (
          <MonthDay 
            key={`day-${dayIndex}-${rowIndex}`}
            day={day}
            events={events}
            currentMonth={currentDate}
          />
        ))
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden"
    }}>
      {/* Calendar Controls */}
      <div className="bg-white border-b border-gray-200 p-4 flex flex-wrap justify-between items-center gap-2 overflow-x-auto" style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "1rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-2" style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          {/* Toggle Month/Week View */}
          <div className="inline-flex rounded-md shadow-sm" style={{
            display: "inline-flex",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
          }}>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-l-md",
                view === "week" 
                  ? "bg-blue-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              )}
              onClick={() => setView("week")}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
                backgroundColor: view === "week" ? "#3b82f6" : "#fff",
                color: view === "week" ? "#fff" : "#374151",
                border: view === "week" ? "none" : "1px solid #d1d5db"
              }}
            >
              Week
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-r-md",
                view === "month" 
                  ? "bg-blue-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              )}
              onClick={() => setView("month")}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                borderTopRightRadius: "0.375rem",
                borderBottomRightRadius: "0.375rem",
                backgroundColor: view === "month" ? "#3b82f6" : "#fff",
                color: view === "month" ? "#fff" : "#374151",
                border: view === "month" ? "none" : "1px solid #d1d5db"
              }}
            >
              Month
            </button>
          </div>
          
          {/* Today Button */}
          <button 
            onClick={goToToday} 
            className="ml-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: 500,
              backgroundColor: "#fff",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              color: "#374151"
            }}
          >
            Today
          </button>
        </div>
        
        {/* Date Navigation */}
        <div className="flex items-center space-x-4" style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem"
        }}>
          <button 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={navigatePrevious}
            style={{
              padding: "0.5rem",
              color: "#4b5563",
              borderRadius: "9999px"
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium text-center min-w-[180px] px-3 text-gray-800" style={{
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            fontWeight: 500,
            color: "#1f2937"
          }}>
            {dateRangeText}
          </h2>
          <button 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={navigateNext}
            style={{
              padding: "0.5rem",
              color: "#4b5563",
              borderRadius: "9999px"
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Timezone Display */}
      <div className="bg-white border-b border-gray-200 px-4 py-1 text-sm text-gray-500" style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0.25rem 1rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        color: "#6b7280"
      }}>
        All times are shown in your local timezone ({timezoneAbbr})
      </div>
      
      {/* Calendar Main Content */}
      <div 
        className="flex-1 overflow-auto relative p-1 bg-white" 
        ref={calendarRef}
        style={{
          flex: "1 1 0%",
          overflow: "auto",
          position: "relative",
          padding: "0.25rem",
          backgroundColor: "#fff"
        }}
      >
        <div className="min-w-full md:min-w-0 md:w-full overflow-auto">
          {view === "week" ? <WeekView /> : <MonthView />}
        </div>
      </div>
      
      {/* Note: CSS for drag-over effect is now in index.css */}
    </div>
  );
}