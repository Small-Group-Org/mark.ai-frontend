import { create } from 'zustand';
import { User, AyrsharePlatformDetails } from '@/types';
import { removeValue, STORAGE_KEYS } from '@/commons/storage';
import { resetPostState } from './usePostStore';

const initialSocialPlatforms: AyrsharePlatformDetails[] = [
  {
    label: "Bluesky",
    value: "bluesky",
    isConnected: false,
    isEnabled: false,
    img: ""
  },
  {
    label: "Facebook",
    value: "facebook",
    isConnected: false,
    isEnabled: true,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s"
  },
  {
    label: "Gmb",
    value: "gmb",
    isConnected: false,
    isEnabled: false,
    img: ""
  },
  {
    label: "Instagram",
    value: "instagram",
    isConnected: false,
    isEnabled: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
  },
  {
    label: "Linkedin",
    value: "linkedin",
    isConnected: true,
    isEnabled: true,
    img: "https://1000logos.net/wp-content/uploads/2017/03/Color-of-the-LinkedIn-Logo.jpg"
  },
  {
    label: "Pinterest",
    value: "pinterest",
    isConnected: false,
    isEnabled: false,
    img: ""
  },
  {
    label: "Reddit",
    value: "reddit",
    isConnected: false,
    isEnabled: false,
    img: ""
  },
  {
    label: "Telegram",
    value: "telegram",
    isConnected: false,
    isEnabled: false,
    img: ""
  },
  {
    label: "Threads",
    value: "threads",
    isConnected: false,
    isEnabled: true,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOQT83dtIlgCmJiM8X08gAFfHSDkuxBXA1Q&s"
  },
  {
    label: "Tiktok",
    value: "tiktok",
    isConnected: false,
    isEnabled: false,
    img: ""
  },
  {
    label: "Twitter",
    value: "twitter",
    isConnected: false,
    isEnabled: true,
    img: "https://pngdownload.io/wp-content/uploads/2023/12/X-Logo-Twitter-Logo-Iconic-Social-Media-Brand-Symbol-PNG-Transparent-Recognizable-Emblem-jpg.webp"
  },
  {
    label: "Youtube",
    value: "youtube",
    isConnected: false,
    isEnabled: false,
    img: ""
  }
];

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
  timeZoneLabel: string;
  setTimeZoneLabel: (timeZoneLabel: string) => void;
  socialPlatforms: AyrsharePlatformDetails[];
  updatePlatformConnection: (value: string, isConnected: boolean) => void;
  getEnabledPlatforms: () => AyrsharePlatformDetails[];
}

export const useAuthStore = create<PostState>((set, get) => ({
  isAuth: null,
  isOpen: false,
  view: 'signin',
  isVerifying: false,
  timeZoneLabel: 'GMT+00:00',
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
  setTimeZoneLabel: (timeZoneLabel: string) => set({timeZoneLabel}),
  socialPlatforms: initialSocialPlatforms,
  updatePlatformConnection: (value: string, isConnected: boolean) => set((state) => ({
    socialPlatforms: state.socialPlatforms.map((platform) =>
      platform.value === value ? { ...platform, isConnected } : platform
    )
  })),
  getEnabledPlatforms: () => get().socialPlatforms.filter((platform) => platform.isEnabled)
}));
