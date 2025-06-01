import { format, parseISO, startOfDay, addHours, isSameDay, isSameHour } from 'date-fns';
import { Post } from '@/types/post';

// Type for the preprocessed posts map
export type PostsByDateTime = Map<string, Post[]>;

/**
 * Generates a unique key for a date and hour combination
 * Format: YYYY-MM-DD-HH
 */
export const generateDateTimeKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd-HH');
};

/**
 * Preprocesses posts into a Map for O(1) lookup
 * Handles timezone conversion and groups posts by date and hour
 */
export const preprocessPosts = (posts: Post[]): PostsByDateTime => {
  const postsMap = new Map<string, Post[]>();

  posts.forEach(post => {
    // Ensure we're working with a proper Date object
    const postDate = post.scheduleDate instanceof Date 
      ? post.scheduleDate 
      : parseISO(post.scheduleDate as unknown as string);

    // Generate the key for this post's date and hour
    const key = generateDateTimeKey(postDate);

    // Get or create the array for this date-time slot
    const existingPosts = postsMap.get(key) || [];
    postsMap.set(key, [...existingPosts, post]);
  });

  return postsMap;
};

/**
 * Gets posts for a specific day and hour
 * Returns an empty array if no posts exist for that time slot
 */
export const getPostsForDateTime = (
  postsMap: PostsByDateTime,
  date: Date,
  hour: number
): Post[] => {
  const targetDate = addHours(startOfDay(date), hour);
  const key = generateDateTimeKey(targetDate);
  return postsMap.get(key) || [];
};

/**
 * Gets all posts for a specific day
 * Returns an array of all posts scheduled for that day
 */
export const getPostsForDay = (
  postsMap: PostsByDateTime,
  date: Date
): Post[] => {
  const dayPosts: Post[] = [];
  
  // Check all hours of the day
  for (let hour = 0; hour < 24; hour++) {
    const key = generateDateTimeKey(addHours(startOfDay(date), hour));
    const postsForHour = postsMap.get(key) || [];
    dayPosts.push(...postsForHour);
  }
  
  return dayPosts;
};

/**
 * Checks if two posts overlap in time
 * Used for positioning posts in the week view
 */
export const doPostsOverlap = (post1: Post, post2: Post): boolean => {
  const date1 = post1.scheduleDate;
  const date2 = post2.scheduleDate;
  
  return isSameDay(date1, date2) && isSameHour(date1, date2);
};

/**
 * Formats hashtag string for initial display when loading from backend
 * Ensures all hashtags have proper # prefix for display purposes
 */
export const formatHashtagsForDisplay = (hashtagString: string): string => {
  if (!hashtagString || !hashtagString.trim()) {
    return '';
  }

  const words = hashtagString.trim().split(/\s+/).filter(Boolean);
  
  if (words.length === 0) {
    return '';
  }

  const formattedWords = words.map(word => {
    if (word.startsWith('#')) {
      return word;
    }
    return `#${word}`;
  });

  return formattedWords.join(' ');
};

/**
 * Formats hashtag string before sending to backend
 * Cleans up user input and ensures proper formatting
 * Removes multiple consecutive # symbols and normalizes spacing
 */
export const formatHashtagsForSubmission = (hashtagString: string): string => {
  if (!hashtagString || !hashtagString.trim()) {
    return '';
  }

  const cleanInput = hashtagString.trim();
  
  // If input doesn't contain any #, treat as space-separated words
  if (!cleanInput.includes('#')) {
    const words = cleanInput.split(/\s+/).filter(Boolean);
    return words.map(word => `#${word}`).join(' ');
  }
  
  const hashtagParts = cleanInput.split('#').filter(Boolean);
  
  if (hashtagParts.length === 0) {
    return '';
  }
  
  const startsWithHash = cleanInput.startsWith('#');
  let processedParts: string[] = [];
  
  hashtagParts.forEach((part, index) => {
    const words = part.trim().split(/\s+/).filter(Boolean);
    
    words.forEach((word, wordIndex) => {
      if (word) {
        if (index === 0 && wordIndex === 0 && !startsWithHash) {
          processedParts.push(`#${word}`);
        } else {
          processedParts.push(`#${word}`);
        }
      }
    });
  });
  
  return processedParts.join(' ');
};

/**
 * Parses hashtag string into an array of individual hashtags
 * Useful for processing hashtags for display or validation
 */
export const parseHashtagsToArray = (hashtagString: string): string[] => {
  if (!hashtagString || !hashtagString.trim()) {
    return [];
  }
  
  const formatted = formatHashtagsForDisplay(hashtagString);
  return formatted.split(/\s+/).filter(Boolean);
}; 