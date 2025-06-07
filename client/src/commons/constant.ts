import { MessageType } from "@/components/ChatInterface";
import { AyrsharePlatformDetails, PostType, PlatformType } from "@/types";
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
  

export const postTypes: PostType[] = [
  {
      id: 'post',
      label: 'Post'
  },
  {
      id: 'story',
      label: 'Story'
  },
  {
      id: 'reel',
      label: 'Reel'
  }
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
    toggleColor: "#0085C3"  // Darker blue while maintaining Bluesky brand
  },
  {
    label: "Facebook",
    value: "facebook",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.facebook,
    toggleColor: "#1565C0"  // Darker Facebook blue
  },
  {
    label: "Gmb",
    value: "gmb",
    isConnected: false,
    isEnabled: false,
    img: "",
    toggleColor: "#3367D6"  // Darker Google blue
  },
  {
    label: "Instagram",
    value: "instagram",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.instagram,
    toggleColor: "#C13584"  // Darker Instagram pink/purple
  },
  {
    label: "Linkedin",
    value: "linkedin",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.linkedin,
    toggleColor: "#005885"  // Darker LinkedIn blue
  },
  {
    label: "Pinterest",
    value: "pinterest",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.pinterest,
    toggleColor: "#BD081C"  // Darker Pinterest red
  },
  {
    label: "Reddit",
    value: "reddit",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.reddit,
    toggleColor: "#D93900"  // Darker Reddit orange
  },
  {
    label: "Telegram",
    value: "telegram",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.telegram,
    toggleColor: "#006BA6"  // Darker Telegram blue
  },
  {
    label: "Threads",
    value: "threads",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.threads,
    toggleColor: "#1A1A1A"  // Darker than pure black for better visibility
  },
  {
    label: "Tiktok",
    value: "tiktok",
    isConnected: false,
    isEnabled: false,
    img: SocialIconComponents.tiktok,
    toggleColor: "#4A9DA8"  // Darker TikTok teal
  },
  {
    label: "Twitter",
    value: "twitter",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.twitter,
    toggleColor: "#1976D2"  // Darker Twitter blue
  },
  {
    label: "Youtube",
    value: "youtube",
    isConnected: false,
    isEnabled: true,
    img: SocialIconComponents.youtube,
    toggleColor: "#CC0000"  // Darker YouTube red
  }
];