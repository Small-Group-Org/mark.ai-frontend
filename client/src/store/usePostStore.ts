import { create } from 'zustand';
import { Message } from '@/types';
import { Post, PlatformType } from '@/types/post';

interface PostState {
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  isThinking: boolean;
  setIsThinking: (isThinking: boolean) => void;

  postTitle: string;
  setPostTitle: (title: string) => void;
  postContent: string;
  setPostContent: (content: string) => void;
  hashtag: string;
  setHashtag: (hashtag: string) => void;
  mediaUrl: string[];
  setMediaUrl: (urls: string[]) => void;
  platform: PlatformType[];
  setPlatform: (platform: PlatformType[]) => void;
  postType: string;
  setPostType: (type: string) => void;
  scheduleDate: Date;
  setScheduleDate: (date: Date) => void;

  posts: Post[];
  setPosts: (posts: Post[]) => void;

  resetPostState: () => void;
}

const initialState = {
  showSignUpPrompt: false,
  messageCount: 0,
  messages: [],
  isThinking: false,
  postTitle: "",
  postContent: "",
  hashtag: "",
  mediaUrl: [],
  platform: [],
  postType: 'post',
  scheduleDate: new Date(),
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
  setHashtag: (hashtag) => set({ hashtag }),
  setMediaUrl: (mediaUrl) => set({ mediaUrl }),
  setPlatform: (platform) => set({ platform }),
  setPostType: (postType) => set({ postType }),
  setScheduleDate: (scheduleDate) => set({ scheduleDate }),

  setPosts: (posts) => set({ posts }),

  // Reset all post state
  resetPostState: () => set(initialState),
}));

export const resetPostState = usePostStore.getState().resetPostState;
