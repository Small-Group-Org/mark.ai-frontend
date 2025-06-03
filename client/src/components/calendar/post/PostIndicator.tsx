import React from 'react';
import { Post } from '@/types/post';
import { formatTime12Hour } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Image, Clock, FileText } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

interface PostIndicatorProps {
  post: Post;
  onClick: (postId: string | number) => void;
}

const PostIndicator: React.FC<PostIndicatorProps> = ({ post, onClick }) => {
  const { isMobileView } = useAuthStore();

  if (post.status === 'deleted' || post.status === 'live') return null;

  const handleClick = () => {
    onClick(post._id || '');
  };

  const postType = post.status === 'schedule' ? 'scheduled' : 'draft';
  const imageUrl = post.mediaUrl.length > 0 && post.mediaUrl[0];

  // Mobile view - ultra compact design
  if (isMobileView) {
    return (
      <div 
        className="post-indicator cursor-pointer w-8 h-8"
        onClick={handleClick}
        title={`${postType} - ${formatTime12Hour(post.scheduleDate)}`}
      > 
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={post.title}
            className="rounded-sm object-cover"
          />
        ) : (
          <FileText className="text-gray-400" />
        )}
      </div>
    );
  }

  // Desktop view - original design
  return (
    <div 
      className={cn(
        "post-indicator cursor-pointer flex items-center gap-2 px-1 py-0.5",
        postType
      )}
      onClick={handleClick}
    > 
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={post.title}
          className="w-4 h-4 rounded-sm object-cover"
        />
      ) : (
        <FileText className="w-4 h-4 text-gray-400" />
      )}
      <span className="post-time text-xs">{formatTime12Hour(post.scheduleDate)}</span>
    </div>
  );
};

export default PostIndicator; 