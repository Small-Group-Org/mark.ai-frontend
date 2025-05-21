import { create } from 'zustand';
import { Message, PlatformName } from '@/types';

interface PostState {
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  isThinking: boolean;
  setIsThinking: (isThinking: boolean) => void;

  postTitle: string;
  setPostTitle: (title: string) => void;
  postContent: string;
  setPostContent: (content: string) => void;
  postHashtags: string[];
  setPostHashtags: (hashtags: string[]) => void;
  mediaUrl: string[];
  setMediaUrl: (urls: string[]) => void;
  socialPlatforms: Record<PlatformName, boolean>;
  setSocialPlatforms: (platforms: Record<PlatformName, boolean>) => void;
  postType: {
    post: boolean;
    story: boolean;
    reel: boolean;
  };
  setPostType: (type: { post: boolean; story: boolean; reel: boolean }) => void;
  scheduledDate: string;
  setScheduledDate: (date: string) => void;

  posts: any[];
  setPosts: (posts: any[]) => void;

  resetPostState: () => void;
}

const initialState = {
  showSignUpPrompt: false,
  messageCount: 0,
  messages: [],
  isThinking: false,
  postTitle: "",
  postContent: "",
  postHashtags: [],
  mediaUrl: [],
  socialPlatforms: {
    'Bluesky': false,
    'Facebook': false,
    'Google Business': false,
    'Instagram': false,
    'X/Twitter': false,
    'Reddit': false,
    'Telegram': false,
    'Threads': false,
    'TikTok': false,
    'YouTube': false,
  },
  postType: {
    post: true,
    story: false,
    reel: false,
  },
  scheduledDate: new Date().toISOString(),
  posts: [],
};

export const usePostStore = create<PostState>((set) => ({
  ...initialState,
  setMessages: (messages) => set((state) => ({
    messages: typeof messages === 'function' ? messages(state.messages) : messages
  })),
  setIsThinking: (isThinking) => set({ isThinking }),

  // Post details actions
  setPostTitle: (postTitle) => set({ postTitle }),
  setPostContent: (postContent) => set({ postContent }),
  setPostHashtags: (postHashtags) => set({ postHashtags }),
  setMediaUrl: (mediaUrl) => set({ mediaUrl }),
  setSocialPlatforms: (socialPlatforms) => set({ socialPlatforms }),
  setPostType: (postType) => set({ postType }),
  setScheduledDate: (scheduledDate) => set({ scheduledDate }),

  setPosts: (posts) => set({ posts }),

  // Reset all post state
  resetPostState: () => set(initialState),
}));

export const resetPostState = usePostStore.getState().resetPostState;
