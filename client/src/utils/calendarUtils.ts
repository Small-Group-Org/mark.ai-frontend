/**
 * Utility functions for calendar operations
 */

import { CalendarView } from '@/types/post';
import { syncPostsFromDB } from './postSync';
import { usePostStore } from '@/store/usePostStore';

/**
 * Calculates display date based on timeframe and selected date values
 */
export const calculateDisplayDate = (
  timeframe: CalendarView,
  selectedMonth: number,
  selectedYear: number,
  weekStart: Date
): Date => {
  if (timeframe === 'month') {
    const date = new Date();
    date.setMonth(selectedMonth);
    date.setFullYear(selectedYear);
    return date;
  } else {
    return weekStart;
  }
};

/**
 * Handles post opening logic with fallback syncing
 */
export const handlePostOpening = async (
  postId: string,
  scheduleDate: Date,
  posts: any[],
  editPostContext: any
) => {
  const post = posts.find(p => p._id === postId);
  
  if (post) {
    const postWithRequiredFields = {
      ...post,
      postType: post.postType || 'post'
    };
    editPostContext.onOpen(post._id, postWithRequiredFields);
  } else {
    // If post not found, sync posts and try again
    await syncPostsFromDB(scheduleDate);
    
    setTimeout(() => {
      const updatedPost = usePostStore.getState().posts.find(p => p._id === postId);
      if (updatedPost) {
        const postWithRequiredFields = {
          ...updatedPost,
          postType: updatedPost.postType || 'post'
        };
        editPostContext.onOpen(updatedPost._id, postWithRequiredFields);
      }
    }, 500);
  }
};

/**
 * Sets up calendar navigation to specific month/year
 */
export const navigateToPostMonth = (
  scheduleDate: Date,
  setSelectedMonth: (month: number) => void,
  setSelectedYear: (year: number) => void
) => {
  setSelectedMonth(scheduleDate.getMonth());
  setSelectedYear(scheduleDate.getFullYear());
}; 