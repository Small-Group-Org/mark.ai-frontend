import { PlatformType, SupportedPostType } from "@/types";
import blueskyPng from "@/assets/icons/social/png/bluesky.png";
import facebookPng from "@/assets/icons/social/png/facebook.png";
import instagramPng from "@/assets/icons/social/png/instagram.png";
import linkedinPng from "@/assets/icons/social/png/linkedin.png";
import pinterestPng from "@/assets/icons/social/png/pinterest.png";
import redditPng from "@/assets/icons/social/png/reddit.png";
import telegramPng from "@/assets/icons/social/png/telegram.png";
import threadsPng from "@/assets/icons/social/png/threads.png";
import tiktokPng from "@/assets/icons/social/png/tiktok.png";
import twitterPng from "@/assets/icons/social/png/twitter.png";
import youtubePng from "@/assets/icons/social/png/youtube.png";
import { VIDEO_EXTENSIONS_REGEX } from "./constant";

export function convertMarkdownToHTML(md: string) {
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\n$/gim, '<br />')
      .replace(/\n/g, '<br />')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      .replace(/---/g, '<hr />');
  }
  
export const getPlatformImage = (platform: PlatformType): string => {
  const platformImages: Record<PlatformType, string> = {
    bluesky: blueskyPng,
    facebook: facebookPng,
    gmb: facebookPng,
    instagram: instagramPng,
    linkedin: linkedinPng,
    pinterest: pinterestPng,
    reddit: redditPng,
    telegram: telegramPng,
    threads: threadsPng,
    tiktok: tiktokPng,
    twitter: twitterPng,
    youtube: youtubePng,
  };
 
  return platformImages[platform] || facebookPng;
};

export const getMediaSupportInfo = (postType: SupportedPostType) => {
  switch (postType) {
    case 'carousel':
      return 'Post support multiple images (upto 10). Each image should be in JPG, PNG, or GIF format.';
    case 'video':
      return 'Video posts support MP4, MOV, or AVI formats. Maximum duration varies by platform.';
    case 'text':
      return 'Text posts do not require media files.';
    case 'reel':
      return 'Reels support vertical video format (9:16 aspect ratio) in MP4 format. Maximum duration is 90 seconds.';
    case 'story':
      return 'Stories support images (JPG, PNG) and videos (MP4) in vertical format (9:16 aspect ratio).';
    default:
      return 'Please select a valid post type.';
  }
};

export const isVideo = (url: string = "") => {
  return url?.match(VIDEO_EXTENSIONS_REGEX);
};