import React, { useState } from 'react';
import Calendar, { EventData } from '../components/Calendar';

export default function CalendarRoute() {
  const [events, setEvents] = useState<EventData[]>([
    {
      id: 1,
      title: "Morning Strategy Meeting",
      scheduled_time: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
      platforms: ["Instagram", "Twitter"]
    },
    {
      id: 2,
      title: "Social Media Campaign Launch",
      scheduled_time: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      platforms: ["Facebook", "LinkedIn", "Instagram"]
    },
    {
      id: 3,
      title: "Content Review Session",
      scheduled_time: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      platforms: ["Facebook", "YouTube"]
    },
    {
      id: 4,
      title: "Weekly Analytics Report",
      scheduled_time: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      platforms: ["Email", "Slack"]
    }
  ]);

  // This function will be called when events are updated via drag and drop
  const handleEventsChange = (updatedEvents: EventData[]) => {
    setEvents(updatedEvents);
    
    // You can add API calls here to save changes to your backend
    console.log("Events updated:", updatedEvents);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 p-6 overflow-hidden">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground/90">Content Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Manage your scheduled content across platforms
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-[calc(100vh-180px)]">
          <Calendar 
            events={events} 
            onEventsChange={handleEventsChange} 
          />
        </div>
      </div>
    </div>
  );
}