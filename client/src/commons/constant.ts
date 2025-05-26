import { MessageType } from "@/components/ChatInterface";
import { AyrShareSocialHandles, PostType } from "@/types";
import { PlatformType } from "@/types/post";

// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = 'https://mark-ai-backend-1057029383450.asia-south2.run.app';

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

  export const ENABLE_AI_GENERATE = false;
  
  export const platformsRow1: { name: PlatformType; icon: string }[] = [
    { name: "instagram", icon: "I" },
    { name: "twitter", icon: "X" },
    { name: "threads", icon: "@" },
    { name: "facebook", icon: "f" },
  ];

  export const initialiseChatWithMark = "This is the system message. The user is online. Send greetings and provide 1 liner update. DO NOT mention anything about system. Just greet the user."

  export const intialSocialHandlesMapping: AyrShareSocialHandles =  {
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
  };