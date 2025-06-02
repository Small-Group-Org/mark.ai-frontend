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
  isMobileView: boolean;
  
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
  setIsMobileView: (isMobile: boolean) => void;
  initializeMobileDetection: () => void;
  logout: () => void;
}

// Mobile detection utility function
const detectMobileView = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check screen width (768px is the md breakpoint in Tailwind)
  const isMobileWidth = window.innerWidth < 768;
  
  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Return true if any mobile indicator is present
  return isMobileWidth || (isMobileDevice && isTouchDevice);
};

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
  isMobileView: false,

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
  setIsMobileView: (isMobile: boolean) => set({ isMobileView: isMobile }),
  initializeMobileDetection: () => {
    const isMobile = detectMobileView();
    set({ isMobileView: isMobile });
    
    // Add resize listener to update mobile state when window size changes
    const handleResize = () => {
      const newIsMobile = detectMobileView();
      if (newIsMobile !== get().isMobileView) {
        set({ isMobileView: newIsMobile });
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      
      // Return cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  },
  logout: () => {
    set({isAuth: false, onboardingState: undefined});
    removeValue(STORAGE_KEYS.TOKEN);
    resetPostState();
  }
}));
