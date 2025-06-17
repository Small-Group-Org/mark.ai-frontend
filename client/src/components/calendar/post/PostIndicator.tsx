import React from 'react';
import { Post } from '@/types/post';
import { formatTime12Hour } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Image, Clock, FileText } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { VIDEO_EXTENSIONS_REGEX } from '@/commons/constant';
import { getPlatformImage } from '@/commons/utils';

interface PostIndicatorProps {
  post: Post;
  onClick: (postId: string | number) => void;
}

const PostIndicator: React.FC<PostIndicatorProps> = ({ post, onClick }) => {
  const { isMobileView } = useAuthStore();

  if (post.status === 'deleted') return null;

  const handleClick = () => {
    onClick(post._id || '');
  };

  
  const postType = post.status === 'schedule' ? 'scheduled' : post.status === 'published' ? 'published' : 'draft';
  const mediaUrl = post.mediaUrl.length > 0 ? post.mediaUrl[0] : null;
  const isVideo = mediaUrl ? mediaUrl.match(VIDEO_EXTENSIONS_REGEX) !== null : false;
  const firstPlatform = post.platform && post.platform.length > 0 ? post.platform[0] : null;

  // Platform badge component
  const PlatformBadge = () => {
    if (!firstPlatform) return null;
    
    return (
      <div className="absolute w-4 h-4 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-sm" style={{bottom: '-4px', right: '-2px'}}>
        <img 
          src={getPlatformImage(firstPlatform)} 
          alt={firstPlatform}
          className="w-3 h-3 rounded-full object-cover"
        />
      </div>
    );
  };

  // Mobile view - ultra compact design
  if (isMobileView) {
    return (
      <div 
        className={cn(
          "post-indicator cursor-pointer w-8 h-8 relative",
          postType === 'published' && "bg-green-100"
        )}
        onClick={handleClick}
        title={`${postType} - ${formatTime12Hour(post.scheduleDate)}`}
      > 
        {mediaUrl ? (
          isVideo ? (
            <video 
              src={mediaUrl}
              className="rounded-sm object-cover w-full h-full pointer-events-none"
              muted
              playsInline
            />
          ) : (
            <img 
              src={mediaUrl} 
              alt={post.title}
              className="rounded-sm object-cover w-full h-full"
            />
          )
        ) : (
          <FileText className={cn("text-gray-400", postType === 'published' && "text-green-800")} />
        )}
        <PlatformBadge />
      </div>
    );
  }

  // Desktop view - original design
  return (
    <div 
      className={cn(
        "post-indicator cursor-pointer flex items-center gap-2 px-1 py-0.5 relative",
        postType === 'published' ? "bg-green-100 text-green-800" : postType
      )}
      onClick={handleClick}
    > 
      {mediaUrl ? (
        isVideo ? (
          <video 
            src={mediaUrl}
            className="w-4 h-4 rounded-sm object-cover pointer-events-none"
            muted
            playsInline
          />
        ) : (
          <img 
            src={mediaUrl} 
            alt={post.title}
            className="w-4 h-4 rounded-sm object-cover"
          />
        )
      ) : (
        <FileText className={cn("w-4 h-4", postType === 'published' ? "text-green-800" : "text-gray-400")} />
      )}
      <span className="post-time mr-2 text-xs">{formatTime12Hour(post.scheduleDate)}</span>
      <PlatformBadge />
    </div>
  );
};

export default PostIndicator; 