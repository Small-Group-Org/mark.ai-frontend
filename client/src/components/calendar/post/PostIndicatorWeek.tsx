import React from 'react';
import { Post } from '@/types/calendar';
import { formatTime12Hour } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';

interface PostIndicatorWeekProps {
  post: Post;
  onClick: (postId: string | number) => void;
}

const PostIndicatorWeek: React.FC<PostIndicatorWeekProps> = ({ post, onClick }) => {
  const handleClick = () => {
    onClick(post.postId);
  };

  const postType = post.status === 'scheduled' ? 'scheduled' : 'draft';
  
  // Get first image from mediaUrls or use sample image
  const imageUrl = post.mediaUrls.length > 0 
    ? post.mediaUrls[0] 
    : 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=100&h=100';

  return (
    <div 
      className={cn(
        "post-indicator cursor-pointer flex items-center gap-2 px-1 py-0.5",
        postType
      )}
      onClick={handleClick}
    > 
      <img 
        src={imageUrl} 
        alt={post.title}
        className="w-4 h-4 rounded-sm object-cover"
      />
      <span className="post-time text-xs">{formatTime12Hour(post.scheduledDate)}</span>
    </div>
  );
};

export default PostIndicatorWeek;
