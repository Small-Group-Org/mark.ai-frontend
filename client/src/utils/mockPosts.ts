import { Post, PostStatus, SocialPlatforms } from '@/types/calendar';

// Sample media URLs
const mediaUrls = [
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=100&h=100',
  'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=100&h=100',
  'https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=100&h=100',
  'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=100&h=100',
];

// Sample hashtags
const hashtags = [
  '#socialmedia',
  '#marketing',
  '#digital',
  '#content',
  '#strategy',
  '#branding',
  '#growth',
  '#engagement'
];

// Generate a random time on a given date
const getRandomTime = (date: Date, startHour = 8, endHour = 20) => {
  const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const randomMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, or 45 minutes
  
  const newDate = new Date(date);
  newDate.setHours(randomHour, randomMinute);
  
  return newDate;
};

// Generate random social platforms configuration
const generateRandomSocialPlatforms = (): SocialPlatforms => {
  return {
    facebook: Math.random() > 0.5,
    instagram: Math.random() > 0.5,
    twitter: Math.random() > 0.5,
    linkedin: Math.random() > 0.5
  };
};

// Generate random posts for the current month
export const generateMockPosts = (date: Date, count = 30): Post[] => {
  const posts: Post[] = [];
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  
  // Generate posts for the current and next month
  for (let i = 0; i < count; i++) {
    // Randomly distribute across days in the current and surrounding months
    const monthOffset = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const targetMonth = currentMonth + monthOffset;
    
    // Random day within the month (1-28 to be safe for all months)
    const day = Math.floor(Math.random() * 28) + 1;
    
    // Create base date
    const postDate = new Date(currentYear, targetMonth, day);
    
    // Random status
    const status: PostStatus = Math.random() > 0.3 ? 'scheduled' : 'draft';
    
    // Random scheduled time
    const scheduledDate = getRandomTime(postDate);
    
    // Random media (0-2)
    const mediaCount = Math.floor(Math.random() * 3);
    const selectedMedia = mediaUrls
      .sort(() => Math.random() - 0.5)
      .slice(0, mediaCount);
    
    // Random hashtag
    const hashtag = hashtags[Math.floor(Math.random() * hashtags.length)];
    
    const post: Post = {
      postId: `post-${i}`,
      userId: `user-${Math.floor(Math.random() * 10)}`,
      title: `Post ${i + 1}`,
      content: `This is the content for post ${i + 1}. ${hashtag}`,
      hashtag,
      mediaUrls: selectedMedia,
      socialPlatforms: generateRandomSocialPlatforms(),
      status,
      scheduledDate,
    };
    
    posts.push(post);
  }
  
  return posts;
};
