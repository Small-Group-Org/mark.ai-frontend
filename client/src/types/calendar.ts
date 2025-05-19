export interface PostUser {
  id: string | number;
  avatarUrl: string;
  name?: string;
}

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface SocialPlatforms {
  facebook: boolean;
  instagram: boolean;
  twitter: boolean;
  linkedin: boolean;
}

export interface Post {
  postId: string | number;
  userId: string | number;
  title: string;
  content: string;
  hashtag: string;
  hashtags?: string[];
  mediaUrls: string[];
  socialPlatforms: SocialPlatforms;
  status: PostStatus;
  scheduledDate: Date; // Date object for scheduled date and time
  postType?: {
    post: boolean;
    story: boolean;
    reel: boolean;
  };
}

export type CalendarView = 'month' | 'week';
