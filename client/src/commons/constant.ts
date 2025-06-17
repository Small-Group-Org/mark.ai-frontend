import { MessageType } from "@/components/ChatInterface";
import { AyrsharePlatformDetails, PostType, PlatformType, PostTypeConfig } from "@/types";
import { SocialIconComponents } from "@/assets/icons/social/SocialIcons";

// export const BASE_URL = "http://localhost:5001";
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
      label: 'Post'
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

// Refer to https://www.ayrshare.com/docs/media-guidelines/overview for media guidelines
export const mediaGuidelines: Partial<Record<PlatformType, string>> = {
  linkedin: "LinkedIn supports images (JPG, PNG, GIF) up to 5MB, videos (MP4) up to 200MB and 30 mins, and documents (PDF, DOC, PPT). Recommended image size is 1200x627 px. Aspect ratio: 1:2.4 to 2.4:1.",

  twitter: "Twitter (X) supports up to 4 images (JPG, PNG, GIF, WEBP) and 4 videos (MP4, MOV) per post. Max video size 512MB, duration up to 140 secs. Recommended video resolution: 1280x720 px, aspect ratio 1:3 to 3:1.",

  instagram: "Instagram supports carousel (up to 10 images), reels, stories, and videos. Images up to 8MB (JPG, PNG, GIF), videos up to 300MB. Recommended size for reels/stories: 1080x1920 px. Aspect ratio: 4:5 to 1.91:1.",

  facebook: "Facebook supports carousel (up to 10 images), stories, reels, and videos. Images up to 10MB (JPG, PNG, GIF, TIFF), videos up to 2GB and 4 hrs. Reels: max 90s, 1080x1920 px. Aspect ratio: 9:16.",

  pinterest: "Pinterest supports up to 5 carousel images (JPG, PNG, GIF, WEBP) and 1 video (MP4, MOV, M4V) per post. Max image size: 20MB. Recommended image size: 1000x1500 px. Video duration: 4s to 15 mins, max size 1GB. Aspect ratio: 2:3 or 9:16.",

  tiktok: "TikTok supports up to 35 images (JPG, JPEG, WebP) and 1 video (MP4, MOV, WebM) per post. Max video size: 1GB, duration: 3s to 10 mins. Recommended resolution: 1080x1920 px. Aspect ratio: 9:16 or 16:9. PNG images not supported.",

};


export const initialSocialPlatforms: AyrsharePlatformDetails[] = [
  {
    label: "Bluesky",
    value: "bluesky",
    isConnected: false,
    isEnabled: false,
    toggleStatus: false,
    willLaunching: false,
    img: SocialIconComponents.bluesky,
    toggleColor: "#0085C3",
    mediaGuidelines: mediaGuidelines.bluesky || ""
  },
  {
    label: "Facebook",
    value: "facebook",
    isConnected: false,
    isEnabled: true,
    toggleStatus: false,
    willLaunching: false,
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
    mediaGuidelines: mediaGuidelines.facebook || ""
  },
  {
    label: "Gmb",
    value: "gmb",
    isConnected: false,
    isEnabled: false,
    toggleStatus: false,
    willLaunching: true,
    img: "",
    toggleColor: "#3367D6",
    mediaGuidelines: mediaGuidelines.gmb || ""
  },
  {
    label: "Instagram",
    value: "instagram",
    isConnected: false,
    isEnabled: true,
    toggleStatus: false,
    willLaunching: false,
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
    mediaGuidelines: mediaGuidelines.instagram || ""
  },
  {
    label: "Linkedin",
    value: "linkedin",
    isConnected: false,
    isEnabled: true,
    toggleStatus: false,
    willLaunching: false,
    img: SocialIconComponents.linkedin,
    toggleColor: "#005885",
    postType: {
      carousel: true,
      video: true,
      text: true,
      reel: false,
      story: false,
    },
    mediaGuidelines: mediaGuidelines.linkedin || ""
  },
  {
    label: "Pinterest",
    value: "pinterest",
    isConnected: false,
    isEnabled: true,
    toggleStatus: false,
    willLaunching: true,
    img: SocialIconComponents.pinterest,
    toggleColor: "#BD081C",
    mediaGuidelines: mediaGuidelines.pinterest || ""
  },
  {
    label: "Reddit",
    value: "reddit",
    isConnected: false,
    isEnabled: false,
    toggleStatus: false,
    willLaunching: true,
    img: SocialIconComponents.reddit,
    toggleColor: "#D93900",
    mediaGuidelines: mediaGuidelines.reddit || ""
  },
  {
    label: "Telegram",
    value: "telegram",
    isConnected: false,
    isEnabled: false,
    toggleStatus: false,
    willLaunching: true,
    img: SocialIconComponents.telegram,
    toggleColor: "#006BA6",
    mediaGuidelines: mediaGuidelines.telegram || ""
  },
  {
    label: "Threads",
    value: "threads",
    isConnected: false,
    isEnabled: false,
    toggleStatus: false,
    willLaunching: true,
    img: SocialIconComponents.threads,
    toggleColor: "#1A1A1A",
    mediaGuidelines: mediaGuidelines.threads || ""
  },
  {
    label: "Tiktok",
    value: "tiktok",
    isConnected: false,
    isEnabled: true,
    toggleStatus: false,
    willLaunching: true,
    img: SocialIconComponents.tiktok,
    toggleColor: "#4A9DA8",
    mediaGuidelines: mediaGuidelines.tiktok || ""
  },
  {
    label: "Twitter",
    value: "twitter",
    isConnected: false,
    isEnabled: true,
    toggleStatus: false,
    willLaunching: false,
    img: SocialIconComponents.twitter,
    toggleColor: "#1976D2",
    postType: {
      carousel: true,
      video: true,
      text: true,
      reel: false,
      story: false,
    },
    mediaGuidelines: mediaGuidelines.twitter || ""
  },
  {
    label: "Youtube",
    value: "youtube",
    isConnected: false,
    isEnabled: false,
    toggleStatus: false,
    willLaunching: true,
    img: SocialIconComponents.youtube,
    toggleColor: "#CC0000",
    mediaGuidelines: mediaGuidelines.youtube || ""
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
