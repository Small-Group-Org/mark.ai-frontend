import React from 'react';
import TagPill from './TagPill';

interface PostDetailsProps {
  title: string;
  caption: string;
  tags: string[];
  className?: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ 
  title, 
  caption, 
  tags, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <div id="title" className="text-lg font-bold text-gray-900">
          {title || 'No title provided'}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
          Caption
        </label>
        <div id="caption" className="text-base text-gray-700 whitespace-pre-line">
          {caption || 'No caption provided'}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => (
              <TagPill key={index} tag={tag} />
            ))
          ) : (
            <span className="text-sm text-gray-500 italic">No tags added</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;