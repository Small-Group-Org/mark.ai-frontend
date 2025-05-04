import React from 'react';

interface TagPillProps {
  tag: string;
  className?: string;
}

const TagPill: React.FC<TagPillProps> = ({ tag, className = '' }) => {
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 ${className}`}
    >
      #{tag}
    </span>
  );
};

export default TagPill;