import React, { useEffect } from 'react';
import SocialCalendar from '@/components/calendar/SocialCalendar';
import { generateMockPosts } from '@/utils/mockPosts';
import { useToast } from '@/hooks/use-toast';
import { getPosts } from '@/services/postServices';
import { usePostStore } from '@/store/usePostStore';
import { mockPostsApiResponse } from '@/utils/postresponse';

export default function CalendarRoute() {
  const today = new Date();
  const { toast } = useToast();
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setPosts(generateMockPosts(today, 50));
    fetchPosts();
  }, []);

  // Function to fetch posts from API
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() - 1);
      const endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + 1);

      const startDateStr = startDate.toISOString().slice(0, 10);
      const endDateStr = endDate.toISOString().slice(0, 10);

      let response = await getPosts({
        startDate: startDateStr,
        endDate: endDateStr
      });

      // Simulate API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // response = mockPostsApiResponse;

      if (response && response.success && response.data && response.data.data && response.data.data.length > 0) {
        setPosts(response.data.data);
      } else {
        setPosts(generateMockPosts(today, 50));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch posts. Using mock data instead.',
        variant: 'destructive'
      });
      setPosts(generateMockPosts(today, 50));
    } finally {
      setIsLoading(false);
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
          onDateSelect={handleDateSelect}
          timeZoneLabel="GMT+05:30"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}