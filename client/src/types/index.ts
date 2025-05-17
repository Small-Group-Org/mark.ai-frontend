export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
} 

export type PlatformName = 'Instagram' | 'Facebook' | 'TikTok' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'YouTube' | 'Bluesky' | 'Google Business';
