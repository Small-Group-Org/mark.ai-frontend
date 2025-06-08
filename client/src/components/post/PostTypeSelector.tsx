import React from 'react';
import { cn } from '@/lib/utils';
import { SupportedPostType } from '@/types';

interface PostTypeSelectorProps {
  postType: string;
  isEditing: boolean;
  onPostTypeToggle: (type: SupportedPostType) => void;
}

const PostTypeSelector: React.FC<PostTypeSelectorProps> = ({ postType, isEditing, onPostTypeToggle }) => (
  <div className="mb-4">
    <h3 className="text-xs sm:text-sm text-gray-700 font-medium mb-2">Post Type</h3>
    <div className="flex gap-1 sm:gap-2">
      {['post', 'story', 'reel'].map((type) => (
        <button
          key={type}
          className={cn(
            "px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors flex-1",
            (postType === type || (postType === 'text' && type === 'post'))
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 text-gray-600",
            !isEditing && "opacity-75 cursor-not-allowed hover:bg-gray-100 hover:text-gray-600"
          )}
          onClick={() => isEditing && onPostTypeToggle(type as SupportedPostType)}
          disabled={!isEditing}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

export default PostTypeSelector; 