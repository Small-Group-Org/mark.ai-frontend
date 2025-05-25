import { create } from 'zustand';
import { AyrShareSocialHandles, User } from '@/types';
import { removeValue, STORAGE_KEYS } from '@/commons/storage';
import { resetPostState } from './usePostStore';

interface PostState {
  isAuth: boolean | null;
  setIsAuth: (isAuth: boolean) => void;
  userDetails?: User;
  setUserDetails: (userDetails: User) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  view: 'signin' | 'signup';
  setView: (view: 'signin' | 'signup') => void;
  token?: string;
  setToken: (token: string) => void;
  logout: () => void;
  isVerifying: boolean;
  setIsVerifying: (isVerifying: boolean) => void;
  userSocialHandles: AyrShareSocialHandles;
  setUserSocialHandles: (userSocialHandles: AyrShareSocialHandles) => void;
  timeZoneLabel: string;
  setTimeZoneLabel: (timeZoneLabel: string) => void;
}

export const useAuthStore = create<PostState>((set) => ({
  isAuth: null,
  isOpen: false,
  view: 'signin',
  isVerifying: false,
  timeZoneLabel: 'GMT+05:30', // Default timezone
  userSocialHandles: {
    "bluesky": false,
    "facebook": false,
    "gmb": false,
    "instagram": false,
    "linkedin": false,
    "pinterest": false,
    "reddit": false,
    "telegram": false,
    "threads": false,
    "tiktok": false,
    "twitter": false,
    "youtube": false
},
  setIsAuth: (isAuth: boolean) => set({isAuth}),
  setUserDetails: (userDetails: User) => set({userDetails}),
  setIsOpen: (isOpen: boolean) => set({isOpen}),
  setView: (view) => set({ view }),
  setToken: (token: string) => set({token}),
  logout: () => {
    set({isAuth: false});
    removeValue(STORAGE_KEYS.TOKEN);
    resetPostState();
  },
  setIsVerifying: (isVerifying: boolean) => set({isVerifying}),
  setUserSocialHandles: (userSocialHandles: AyrShareSocialHandles) => set({userSocialHandles}),
  setTimeZoneLabel: (timeZoneLabel: string) => set({timeZoneLabel}),
}));
