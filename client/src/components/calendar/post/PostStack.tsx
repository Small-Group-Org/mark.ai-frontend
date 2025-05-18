import React from 'react';
import { Post } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface PostStackProps {
  posts: Post[];
  onPostClick: (postId: string | number) => void;
}

const PostStack: React.FC<PostStackProps> = ({ posts, onPostClick }) => {
  const MAX_VISIBLE_POSTS = 3;
  const OVERLAP_OFFSET = 8; // pixels to offset each post
  const visiblePosts = posts.slice(0, MAX_VISIBLE_POSTS);
  const hiddenCount = Math.max(0, posts.length - MAX_VISIBLE_POSTS);

  return (
    <div className="relative w-full h-full p-1">
      {/* Stack of posts */}
      {visiblePosts.map((post, index) => (
        <div
          key={post.postId}
          className={cn(
            "absolute left-0 right-0 h-6 rounded-sm cursor-pointer transition-all duration-200",
            "hover:z-20 hover:scale-105",
            post.status === 'scheduled' ? 'bg-blue-100' : 'bg-gray-100'
          )}
          style={{
            transform: `translateX(${index * OVERLAP_OFFSET}px)`,
            zIndex: 10 + index,
            top: `${index * 2}px`,
          }}
          onClick={() => onPostClick(post.postId)}
        >
          <div className="flex items-center gap-1 px-1 h-full">
            <img
              src={post.mediaUrls[0] || 'https://via.placeholder.com/16'}
              alt={post.title}
              className="w-4 h-4 rounded-sm object-cover"
            />
            <span className="text-xs truncate">{post.title}</span>
          </div>
        </div>
      ))}

      {/* +n badge */}
      {hiddenCount > 0 && (
        <div
          className="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-full"
          style={{
            zIndex: 20,
          }}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default PostStack; 