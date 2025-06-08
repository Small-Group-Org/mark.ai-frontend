import { MessageType } from "@/components/ChatInterface";
import { AyrsharePlatformDetails, PostType, PlatformType, PostTypeConfig } from "@/types";
import { SocialIconComponents } from "@/assets/icons/social/SocialIcons";

// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = 'https://mark-ai-backend-1057029383450.asia-south2.run.app';

export const ENABLE_AI_GENERATE = false;

export const ENABLE_ANALYTICS = false;

export const AYRSHARE = "ayrshare";

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};
  

export const AllPostType: PostType[] = [
  {
      id: 'carousel',
      label: 'Carousel'
  },
  {
      id: 'story',
      label: 'Story'
  },
  {
      id: 'reel',
      label: 'Reel'
  },
  {
      id: 'text',
      label: 'Text'
  },
  {
      id: 'video',
      label: 'Video'
  },
];

export const initialMessages: MessageType[] = [
  {
    id: '1',
    text: '👋 Hi! I\'m Mark, your potential social media manager.',
    sender: 'system',
  },
  {
    id: '2',
    text: 'I\'d love to learn about your business and social media goals.',
    sender: 'system',
  },
  {
    id: '3',
    text: 'What\'s your biggest social media challenge right now?',
    sender: 'system',
  }
];

export const platformsRow1: { name: PlatformType; icon: string }[] = [
  { name: "instagram", icon: "I" },
  { name: "twitter", icon: "X" },
  { name: "threads", icon: "@" },
  { name: "facebook", icon: "f" },
];

export const initialiseChatWithMark = "This is the system message. The user is online. Send greetings and provide 1 liner update. DO NOT mention anything about system. Just greet the user."


export const initialSocialPlatforms: AyrsharePlatformDetails[] = [
  {
    label: "Bluesky",
    value: "bluesky",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.bluesky,
    toggleColor: "#0085C3",
    mediaGuidelines: "Bluesky supports images in JPG, PNG, and GIF formats. Maximum file size is 5MB."
  },
  {
    label: "Facebook",
    value: "facebook",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.facebook,
    toggleColor: "#1565C0",
    postType: {
      carousel: true,
      video: true,
      text: false,
      reel: true,
      story: true,
    },
    feature: {
      location: true,
      collab: false
    },
    mediaGuidelines: "Facebook supports images (JPG, PNG, GIF) and videos (MP4, MOV). Maximum video length is 240 minutes. Image size should be at least 1200x630 pixels for optimal display."
  },
  {
    label: "Gmb",
    value: "gmb",
    isConnected: false,
    isEnabled: false,
    img: "",
    toggleColor: "#3367D6",
    mediaGuidelines: "Google My Business supports images in JPG and PNG formats. Recommended size is 720x720 pixels."
  },
  {
    label: "Instagram",
    value: "instagram",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.instagram,
    toggleColor: "#C13584",
    postType: {
      carousel: true,
      video: true,
      text: false,
      reel: true,
      story: true,
    },
    feature: {
      location: true,
      collab: true
    },
    mediaGuidelines: "Instagram supports images (JPG, PNG) and videos (MP4). Feed posts: 1:1, 4:5, or 16:9 aspect ratio. Stories: 9:16 aspect ratio. Reels: 9:16 aspect ratio, max 90 seconds."
  },
  {
    label: "Linkedin",
    value: "linkedin",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.linkedin,
    toggleColor: "#005885",
    postType: {
      carousel: true,
      video: true,
      text: true,
      reel: false,
      story: false,
    },
    mediaGuidelines: "LinkedIn supports images (JPG, PNG) and videos (MP4). Maximum video length is 10 minutes. Recommended image size is 1200x627 pixels."
  },
  {
    label: "Pinterest",
    value: "pinterest",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.pinterest,
    toggleColor: "#BD081C",
    mediaGuidelines: "Pinterest supports images in JPG and PNG formats. Recommended aspect ratio is 2:3 or 1:1. Minimum width should be 1000 pixels."
  },
  {
    label: "Reddit",
    value: "reddit",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.reddit,
    toggleColor: "#D93900",
    mediaGuidelines: "Reddit supports images (JPG, PNG, GIF) and videos (MP4). Maximum file size is 100MB for videos and 20MB for images."
  },
  {
    label: "Telegram",
    value: "telegram",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.telegram,
    toggleColor: "#006BA6",
    mediaGuidelines: "Telegram supports images (JPG, PNG) and videos (MP4). Maximum file size is 2GB."
  },
  {
    label: "Threads",
    value: "threads",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.threads,
    toggleColor: "#1A1A1A",
    mediaGuidelines: "Threads supports images (JPG, PNG) and videos (MP4). Maximum video length is 5 minutes. Recommended aspect ratio is 1:1 or 4:5."
  },
  {
    label: "Tiktok",
    value: "tiktok",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.tiktok,
    toggleColor: "#4A9DA8",
    mediaGuidelines: "TikTok supports videos in MP4 format. Maximum video length is 3 minutes. Recommended aspect ratio is 9:16."
  },
  {
    label: "Twitter",
    value: "twitter",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.twitter,
    toggleColor: "#1976D2",
    postType: {
      carousel: true,
      video: true,
      text: true,
      reel: false,
      story: false,
    },
    mediaGuidelines: "Twitter supports images (JPG, PNG, GIF) and videos (MP4). Maximum video length is 2 minutes and 20 seconds. Maximum file size is 512MB."
  },
  {
    label: "Youtube",
    value: "youtube",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.youtube,
    toggleColor: "#CC0000",
    mediaGuidelines: "YouTube supports videos in MP4, MOV, AVI formats. Maximum video length is 12 hours. Recommended resolution is 1920x1080 pixels."
  }
];

export const postTypeConfig: PostTypeConfig = {
  video: {
    maxFiles: 1,
    allowedTypes: 'video/*',
    showCarousel: false,
    allowMultiple: false,
    emptyText: 'No video selected'
  },
  carousel: {
    maxFiles: 10,
    allowedTypes: 'image/*',
    showCarousel: true,
    allowMultiple: true,
    emptyText: 'No images selected'
  },
  reel: {
    maxFiles: 1,
    allowedTypes: 'video/*',
    showCarousel: false,
    allowMultiple: false,
    emptyText: 'No reel selected'
  },
  text: {
    maxFiles: 0,
    allowedTypes: '',
    showCarousel: false,
    allowMultiple: false,
    emptyText: ''
  },
  story: {
    maxFiles: 1,
    allowedTypes: 'image/*,video/*',
    showCarousel: false,
    allowMultiple: false,
    emptyText: 'No story selected'
  }
};

export const VIDEO_EXTENSIONS_REGEX = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i;
