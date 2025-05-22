import { MessageType } from "@/components/ChatInterface";
import { PostType } from "@/types";

// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://mark-ai-backend-yc34.onrender.com';

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

export const socialMedia = [
    {
        isConnected: true,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
        label: "instagram"
    },
    {
        isConnected: true,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s",
        label: "facebook"
    },
    {
        isConnected: false,
         img: "https://pngdownload.io/wp-content/uploads/2023/12/X-Logo-Twitter-Logo-Iconic-Social-Media-Brand-Symbol-PNG-Transparent-Recognizable-Emblem-jpg.webp",
        label: "twitter"
    },
    {
        isConnected: false,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOQT83dtIlgCmJiM8X08gAFfHSDkuxBXA1Q&s",
        label: "linkedin"
    },
]

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