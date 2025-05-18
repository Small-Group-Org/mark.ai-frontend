import React, { useState, useEffect } from 'react';
import Calendar, { EventData } from '../components/Calendar';
import { useEditPostContext } from '@/context/EditPostProvider';
import SocialCalendar from '@/components/calendar/SocialCalendar';
import { generateMockPosts } from '@/utils/mockPosts';
import { Post } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';


export default function CalendarRoute() {
  // Get access to the EditPost component functions
  const today = new Date();
  const { onOpen } = useEditPostContext();
  const { toast } = useToast();
  const [posts] = useState<Post[]>(() => generateMockPosts(today, 50));
  
  const handlePostClick = (postId: string | number) => {
    const post = posts.find(p => p.postId === postId);
    if (post) {
      onOpen(post.postId);
    }
  };

  const handleDateSelect = (date: Date) => {
    toast({
      title: 'Date Selected',
      description: `You selected: ${date.toLocaleDateString()}`,
    });
  };

  return (
    <div className="p-6 h-full flex flex-col bg-white">
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl flex-1 overflow-auto transition-shadow hover:shadow-2xl">
        <SocialCalendar
          initialDate={today}
          posts={posts}
          onPostClick={handlePostClick}
          onDateSelect={handleDateSelect}
          timeZoneLabel="GMT+05:30"
        />
      </div>
    </div>
  );
}