import { create } from 'zustand';
import { User, AyrsharePlatformDetails, OnboardingResponse } from '@/types';
import { removeValue, STORAGE_KEYS } from '@/commons/storage';
import { resetPostState } from './usePostStore';
import { initialSocialPlatforms } from '@/commons/constant';
import { getOnboardingState } from '@/services/chatServices';

interface PostState {
  isAuth: boolean | null;
  userDetails?: User;
  isOpen: boolean;
  view: 'signin' | 'signup';
  token?: string;
  isVerifying: boolean;
  timeZoneLabel: string;
  socialPlatforms: AyrsharePlatformDetails[];
  onboardingState?: OnboardingResponse;
  
  setIsAuth: (isAuth: boolean) => void;
  setUserDetails: (userDetails: User) => void;
  setIsOpen: (isOpen: boolean) => void;
  setView: (view: 'signin' | 'signup') => void;
  setToken: (token: string) => void;
  setIsVerifying: (isVerifying: boolean) => void;
  setTimeZoneLabel: (timeZoneLabel: string) => void;
  updatePlatformConnection: (value: string, isConnected: boolean) => void;
  getEnabledPlatforms: () => AyrsharePlatformDetails[];
  getConnectedPlatforms: () => AyrsharePlatformDetails[];
  setOnboardingState: (onboardingState: OnboardingResponse) => void;
  fetchOnboardingState: () => Promise<void>;
  isOnboardingComplete: () => boolean;
  logout: () => void;
}

export const useAuthStore = create<PostState>((set, get) => ({
  isAuth: null,
  userDetails: undefined,
  isOpen: false,
  view: 'signin',
  token: undefined,
  isVerifying: false,
  timeZoneLabel: 'GMT+00:00',
  socialPlatforms: initialSocialPlatforms,
  onboardingState: undefined,

  setIsAuth: (isAuth: boolean) => set({isAuth}),
  setUserDetails: (userDetails: User) => set({userDetails}),
  setIsOpen: (isOpen: boolean) => set({isOpen}),
  setView: (view) => set({ view }),
  setToken: (token: string) => set({token}),
  setIsVerifying: (isVerifying: boolean) => set({isVerifying}),
  setTimeZoneLabel: (timeZoneLabel: string) => set({timeZoneLabel}),
  updatePlatformConnection: (value: string, isConnected: boolean) => set((state) => ({
    socialPlatforms: state.socialPlatforms.map((platform) =>
      platform.value === value ? { ...platform, isConnected } : platform
    )
  })),
  getEnabledPlatforms: () => get().socialPlatforms.filter((platform) => platform.isEnabled),
  getConnectedPlatforms: () => get().socialPlatforms.filter((platform) => platform.isEnabled && platform.isConnected),
  setOnboardingState: (onboardingState: OnboardingResponse) => set({ onboardingState }),
  fetchOnboardingState: async () => {
    try {
      const onboardingData = await getOnboardingState();
      set({ onboardingState: onboardingData });
    } catch (error) {
      console.error('Failed to fetch onboarding state:', error);
    }
  },
  isOnboardingComplete: () => {
    const state = get().onboardingState;
    return state?.onboarding_complete ?? false;
  },
  logout: () => {
    set({isAuth: false, onboardingState: undefined});
    removeValue(STORAGE_KEYS.TOKEN);
    resetPostState();
  }
}));
