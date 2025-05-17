import React, { useState, useEffect } from 'react';
import Calendar, { EventData } from '../components/Calendar';
import { useEditPostContext } from '@/context/EditPostProvider';

export default function CalendarRoute() {
  // Get access to the EditPost component functions
  const { onOpen } = useEditPostContext();
  
  // Calendar events state
  const [events, setEvents] = useState<EventData[]>([
    {
      id: 1,
      title: "Morning Strategy Meeting",
      scheduled_time: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
      platforms: ["Instagram", "X/Twitter"],
      content: "Discuss campaign performance and plan next steps.",
      hashtags: ["#strategy", "#marketing"],
      mediaUrl: []
    },
    {
      id: 2,
      title: "Social Media Campaign Launch",
      scheduled_time: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      platforms: ["Facebook", "Instagram"],
      content: "Launch our summer collection campaign across all platforms.",
      hashtags: ["#summer", "#launch", "#campaign"],
      mediaUrl: []
    },
    {
      id: 3,
      title: "Content Review Session",
      scheduled_time: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      platforms: ["Facebook", "YouTube"],
      content: "Review all scheduled content for the upcoming week.",
      hashtags: ["#content", "#review"],
      mediaUrl: []
    },
    {
      id: 4,
      title: "Weekly Analytics Report",
      scheduled_time: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      platforms: ["X/Twitter", "Facebook"],
      content: "Share weekly engagement and performance metrics with the team.",
      hashtags: ["#analytics", "#report", "#metrics"],
      mediaUrl: []
    }
  ]);

  // This function will be called when events are updated via drag and drop
  const handleEventsChange = (updatedEvents: EventData[]) => {
    setEvents(updatedEvents);
    // Save to localStorage for persistence
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    console.log("Events updated:", updatedEvents);
  };
  
  // Handle clicking on an event in the calendar
  const handleEventClick = (eventId: number | string) => {
    // Open the EditPost modal with the clicked event
    onOpen(eventId);
  };
  
  // Initialize localStorage on component mount if it doesn't exist
  useEffect(() => {
    if (!localStorage.getItem('calendarEvents')) {
      // Add a sample Tea Garden event as the first event with the correct format for EditPost UI
      const initialEvents = [
        {
          id: 1,
          title: "Tea Garden",
          scheduled_time: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
          platforms: ["Instagram", "X/Twitter"],
          content: "Netflix and Chill\nMountain-ing and Hill\nAbsolutely loved the greens",
          hashtags: ["#kudremukh", "#mausam", "#karnataka"],
          mediaUrl: []
        },
        ...events.slice(1)
      ];
      
      // Save to localStorage
      localStorage.setItem('calendarEvents', JSON.stringify(initialEvents));
      // Update the state
      setEvents(initialEvents);
    }
  }, []);
  
  // Listen for calendar updates from EditPost
  useEffect(() => {
    const handleCalendarUpdated = () => {
      // Load the updated events from localStorage
      const savedEventsStr = localStorage.getItem('calendarEvents');
      if (savedEventsStr) {
        try {
          const savedEvents = JSON.parse(savedEventsStr);
          setEvents(savedEvents);
        } catch (e) {
          console.error('Error loading updated events', e);
        }
      }
    };
    
    // Add event listener
    window.addEventListener('calendarUpdated', handleCalendarUpdated);
    
    // Cleanup
    return () => {
      window.removeEventListener('calendarUpdated', handleCalendarUpdated);
    };
  }, []);

  return (
    <div className="p-6 h-full flex flex-col bg-white">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Content Calendar</h1>
            <p className="text-gray-400 mt-1">
              Manage your scheduled content across platforms
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onOpen()} 
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors flex items-center"
            >
              <span>Create Post</span>
            </button>
            <button
              onClick={() => onOpen(events[0].id)} 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-4 py-2 transition-colors flex items-center"
            >
              <span>Edit Post</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl flex-1 overflow-auto transition-shadow hover:shadow-2xl">
        <Calendar 
          events={events} 
          onEventsChange={handleEventsChange}
          onEventClick={handleEventClick}
        />
      </div>
    </div>
  );
}