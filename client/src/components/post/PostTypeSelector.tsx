import React from 'react';
import { cn } from '@/lib/utils';
import { PlatformType, SupportedPostType } from '@/types';
import { initialSocialPlatforms } from '@/commons/constant';

interface PostTypeSelectorProps {
  postType: string;
  isEditing: boolean;
  platform: PlatformType;
  onPostTypeToggle: (type: SupportedPostType) => void;
}

const PostTypeSelector: React.FC<PostTypeSelectorProps> = ({ postType, isEditing, platform, onPostTypeToggle }) => {
    const supportedPostTypes = initialSocialPlatforms.find(_platform => _platform.value === platform)?.postType;

    if (!supportedPostTypes) return null;

    return (
        <div className="mb-4">
          <h3 className="text-xs sm:text-sm text-gray-700 font-medium mb-2">Post Type</h3>
          <div className="flex gap-1 sm:gap-2">
            {Object.entries(supportedPostTypes).map(([key, value]) => {
                if (!value) return null;
                
                return (
                  <button
                    key={key}
                    className={cn(
                      "px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors flex-1",
                      (postType === key || (postType === 'text' && key === 'post'))
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-600",
                      !isEditing && "opacity-75 cursor-not-allowed hover:bg-gray-100 hover:text-gray-600"
                    )}
                    onClick={() => isEditing && onPostTypeToggle(key as SupportedPostType)}
                    disabled={!isEditing}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                );
            })}
          </div>
        </div>
    );
};

export default PostTypeSelector; 