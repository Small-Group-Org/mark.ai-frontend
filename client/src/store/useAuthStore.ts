import { create } from 'zustand';
import { User, AyrsharePlatformDetails, OnboardingResponse, PlatformType } from '@/types';
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
  updatePlatformToggleStatus: (value: string, toggleStatus: boolean) => void;
  getEnabledPlatforms: () => AyrsharePlatformDetails[];
  getConnectedPlatforms: () => AyrsharePlatformDetails[];
  getActivePlatforms: () => PlatformType[];
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
  
  const isMobileWidth = window.innerWidth < 768;
  
  return isMobileWidth;
};

export const useAuthStore = create<PostState>((set, get) => ({
  isAuth: null,
  userDetails: undefined,
  isOpen: false,
  view: 'signin',
  token: undefined,
  isVerifying: true,
  timeZoneLabel: 'GMT+00:00',
  socialPlatforms: initialSocialPlatforms,
  onboardingState: undefined,
  isMobileView: false,

  setIsAuth: (isAuth: boolean) => set({isAuth}),
  setUserDetails: (userDetails: User) => {
    const formatName = (name: string): string => {
      return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const formattedUserDetails = {
      ...userDetails,
      name: userDetails.name ? formatName(userDetails.name) : userDetails.name
    };

    // Update social platforms based on activePlatforms from userDetails
    if (userDetails.activePlatforms) {
      const updatedSocialPlatforms = get().socialPlatforms.map((platform) => ({
        ...platform,
        toggleStatus: userDetails.activePlatforms?.[platform.value as keyof typeof userDetails.activePlatforms] || false
      }));
      
      set({ 
        userDetails: formattedUserDetails, 
        socialPlatforms: updatedSocialPlatforms 
      });
    } else {
      set({ userDetails: formattedUserDetails });
    }
  },
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
  updatePlatformToggleStatus: (value: string, toggleStatus: boolean) => set((state) => {
    const updatedSocialPlatforms = state.socialPlatforms.map((platform) =>
      platform.value === value ? { ...platform, toggleStatus } : platform
    );
    
    // Also update activePlatforms in userDetails if it exists
    const updatedUserDetails = state.userDetails?.activePlatforms ? {
      ...state.userDetails,
      activePlatforms: {
        ...state.userDetails.activePlatforms,
        [value]: toggleStatus
      }
    } : state.userDetails;
    
    return {
      socialPlatforms: updatedSocialPlatforms,
      userDetails: updatedUserDetails
    };
  }),
  getEnabledPlatforms: () => get().socialPlatforms.filter((platform) => platform.isEnabled),
  getConnectedPlatforms: () => get().socialPlatforms.filter((platform) => platform.isEnabled && platform.isConnected),
  getActivePlatforms: () => get().socialPlatforms.filter((platform) => platform.toggleStatus).map((platform) => platform.value as PlatformType),
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
    return state?.onboarding?.onboarding_complete ?? false;
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
