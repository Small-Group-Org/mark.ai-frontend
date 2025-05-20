import React, { useState, useEffect } from 'react';
import SocialCalendar from '@/components/calendar/SocialCalendar';
import { generateMockPosts } from '@/utils/mockPosts';
import { Post } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';
import { getPosts } from '@/services/postServices';

export default function CalendarRoute() {
  const today = new Date();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(() => generateMockPosts(today, 50));
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch posts from API
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() - 1); // Get posts from last month
      
      const endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + 1); // Get posts till next month

      const response = await getPosts({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });

      if (response && response.length > 0) {
        setPosts(response);
      } else {
        // Fallback to mock posts if no data from API
        setPosts(generateMockPosts(today, 50));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch posts. Using mock data instead.',
        variant: 'destructive'
      });
      // Fallback to mock posts on error
      setPosts(generateMockPosts(today, 50));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

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