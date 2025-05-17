import React, { useState } from 'react';
import PostPreviewPanel from './dashboard/PostPreviewPanel';

// Define the message structure (can be moved to a types file later)
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

// Define platform names type (can be moved to a types file later)
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

const MarkAiCreatePost = () => {
  // Post details state
  const [postTitle, setPostTitle] = useState("New Product Launch");
  const [postContent, setPostContent] = useState(
    "We're excited to announce our newest product line! After months of development, we're proud to bring you the most innovative solution for your needs."
  );
  const [postHashtags, setPostHashtags] = useState<string[]>(["productlaunch", "innovation", "technology"]);
  const [mediaUrl, setMediaUrl] = useState<string[]>(["www.img.com"]); // Initial example URL
  const [socialPlatforms, setSocialPlatforms] = useState<Record<PlatformName, boolean>>({
    'Bluesky': false,
    'Facebook': false,
    'Google Business': false,
    'Instagram': true,
    'X/Twitter': true,
    'Reddit': false,
    'Telegram': false,
    'Threads': false,
    'TikTok': true,
    'YouTube': true,
  });
  const [postType, setPostType] = useState({
    post: true,
    story: false,
    reel: false,
  });
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString());

  return (
    <div className="h-full bg-white">
      <PostPreviewPanel 
        postTitle={postTitle}
        postContent={postContent}
        postHashtags={postHashtags}
        mediaUrl={mediaUrl}
        socialPlatforms={socialPlatforms}
        postType={postType}
        scheduledDate={scheduledDate}
        setSocialPlatforms={setSocialPlatforms}
        setPostType={setPostType}
        setScheduledDate={setScheduledDate}
      />
    </div>
  );
};

export default MarkAiCreatePost;