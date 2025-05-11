import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
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
    <DashboardLayout>
      {/* Calendar Content */}
      <div className="p-6 h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-400">Content Calendar</h1>
          <p className="text-gray-400 mt-1">
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
    </DashboardLayout>
  );
}