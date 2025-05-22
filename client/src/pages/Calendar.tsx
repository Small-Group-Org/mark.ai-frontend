import React from 'react';
import SocialCalendar from '@/components/calendar/SocialCalendar';
import { useToast } from '@/hooks/use-toast';
import { usePostStore } from '@/store/usePostStore';
// import { mockPostsApiResponse } from '@/utils/postresponse';

export default function CalendarRoute() {
  const today = new Date();
  const { toast } = useToast();
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  const [isLoading, setIsLoading] = React.useState(false);

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
          onDateSelect={handleDateSelect}
          timeZoneLabel="GMT+05:30"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}