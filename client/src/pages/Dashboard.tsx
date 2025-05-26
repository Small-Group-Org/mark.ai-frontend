"use client";
import React, { useState, useEffect, useRef } from 'react';
import ActionScreenHeader from './ActionScreenHeader.tsx';
import PostsList from '@/components/dashboard/PostsList';
import { CalendarView, Post as PostType } from '@/types/post';
import { syncPostsFromDB } from '@/utils/postSync';
import { usePostStore } from '@/store/usePostStore';
import { useEditPostContext } from '@/context/EditPostProvider';
import { ENABLE_ANALYTICS } from '@/commons/constant';

type TabType = 'past' | 'upcoming' | 'drafts';

interface PostAnalytics {
  likes: number;
  comments: number;
  views: number;
}

const Dashboard = () => {
  const today = new Date();
  const [activeTab, setActiveTab] = useState<TabType>('past');
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [postAnalytics, setPostAnalytics] = useState<PostAnalytics>({
    likes: 0,
    comments: 0,
    views: 0
  });
  const [timeframe, setTimeframe] = useState<CalendarView>('month');
  const [weekStart, setWeekStart] = useState(() => {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return start;
  });
  const [weekEnd, setWeekEnd] = useState(() => {
    const end = new Date(today);
    end.setDate(today.getDate() + (6 - today.getDay()));
    return end;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const weekNavigationCountRef = useRef<number>(0);
  const posts = usePostStore((state) => state.posts);
  const editPostContext = useEditPostContext();

  // Effect for syncing posts when month or week changes
  useEffect(() => {
    syncPosts();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedMonth, selectedYear, weekStart, weekEnd]);

  // Effect for syncing posts when timeframe changes
  useEffect(() => {
    syncPostsFromDB(getDisplayDate());
    weekNavigationCountRef.current = 0;
  }, [timeframe]);

  const syncPosts = async () => {
    setError(null);
    try {
      debounceRef.current = setTimeout(async () => {
        const shouldSync = timeframe === 'month' || (timeframe === 'week' && Math.abs(weekNavigationCountRef.current) >= 3);
        
        if (shouldSync) {
          setLoading(true);
          await syncPostsFromDB(getDisplayDate());
          if (timeframe === 'week') {
            weekNavigationCountRef.current = 0;
          }
          setLoading(false);
        }
      }, 500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const getDisplayDate = () => {
    let date;
    if (timeframe === 'month') {
      date = new Date();
      date.setMonth(selectedMonth);
      date.setFullYear(selectedYear);
    } else {
      date = weekStart;
    }
    usePostStore.getState().setDisplayDate(date);
    return date;
  };

  // Map activeTab  status for API
  const getStatusFromTab = (tab: TabType): string => {
    const statusMap: Record<TabType, string> = {
      past: 'published',
      upcoming: 'schedule',
      drafts: 'draft',
    };
    return statusMap[tab];
  };

  // Filter posts by timeframe (month/week)
  const timeframeFilteredPosts = posts.filter(post => {
    const postDate = new Date(post.scheduleDate);
    if (timeframe === 'month') {
      return postDate.getMonth() === selectedMonth && postDate.getFullYear() === selectedYear;
    } else {
      return postDate >= weekStart && postDate <= weekEnd;
    }
  });

  // Filter posts by status based on active tab
  const filteredPosts = timeframeFilteredPosts.filter(post => {
    const statusMap: Record<TabType, string> = {
      past: 'published',
      upcoming: 'schedule',
      drafts: 'draft'
    };
    return post.status === statusMap[activeTab];
  });

  const postCreatedCount = timeframeFilteredPosts.filter(post => post.status === 'published').length;
  const postScheduledCount = timeframeFilteredPosts.filter(post => post.status === 'schedule').length;

  const handlePostClick = (post: PostType) => {
    if (post) {
      editPostContext.onOpen(post._id, post);
    }
  };

  return (
    <div className="w-full h-full p-5 border border-gray-300 bg-white overflow-y-auto box-border relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <ActionScreenHeader
        title="Dashboard"
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        weekStart={weekStart}
        weekEnd={weekEnd}
        setWeekStart={setWeekStart}
        setWeekEnd={setWeekEnd}
        weekNavigationCountRef={weekNavigationCountRef}
      />
      {ENABLE_ANALYTICS && 
      (
        <div className="flex w-[95%] mx-auto gap-[10px] justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex-1 bg-[#FF89004D] p-5 rounded-lg text-center w-[246px] h-[108px]">
              <h3 className="text-base font-semibold text-gray-800 m-0 mb-[10px]">Post created</h3>
              <p className="text-2xl font-bold text-gray-800 m-0">{postCreatedCount}</p>
            </div>
            <div className="flex-1 bg-[#FF89004D] p-5 rounded-lg text-center w-[246px] h-[108px]">
              <h3 className="text-base font-semibold text-gray-800 m-0 mb-[10px]">Post scheduled</h3>
              <p className="text-2xl font-bold text-gray-800 m-0">{postScheduledCount}</p>
            </div>
          </div>
          <div className="flex-1 bg-[#FF89004D] p-5 rounded-lg text-center w-[444px] h-[247px]">
            <h3 className="text-base font-semibold text-gray-800 m-0 mb-[10px]">Ayrshare analytics</h3>
            {selectedPost ? (
              <div className="mt-[10px]">
                <p className="text-sm text-gray-800 my-[5px]">Likes: {postAnalytics.likes}</p>
                <p className="text-sm text-gray-800 my-[5px]">Comments: {postAnalytics.comments}</p>
                <p className="text-sm text-gray-800 my-[5px]">Views: {postAnalytics.views}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[80%]">
                <img
                  src="https://via.placeholder.com/150x100.png?text=Graph"
                  alt="Analytics Graph Placeholder"
                  className="w-[150px] h-[100px] mb-[10px]"
                />
                <p className="text-sm text-gray-800 my-[5px]">Select a post to view analytics</p>
              </div>
            )}
          </div>
        </div>
      )}
      <PostsList
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredPosts={filteredPosts}
        loading={loading}
        error={error}
        onPostClick={handlePostClick}
      />
    </div>
  );
};

export default Dashboard;