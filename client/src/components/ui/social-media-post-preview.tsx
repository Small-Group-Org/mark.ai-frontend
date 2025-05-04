import React from 'react';
import { CalendarIcon } from 'lucide-react';

// Define types for component props
interface SocialMediaPostPreviewProps {
  // User data
  userInitials?: string;
  userName?: string;
  userHandle?: string;
  userTitle?: string;
  
  // Post content
  postTitle?: string;
  postContent?: string;
  hashtags?: string[];
  
  // Image data
  imageUrl?: string;
  
  // Scheduling options
  scheduledDate?: string;
  onSchedule?: () => void;
  onDateChange?: () => void;
  
  // Content editing callbacks
  onContentChange?: (content: string) => void;
  onTitleChange?: (title: string) => void;
  
  // Customization options
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;
}

/**
 * A reusable component that displays a social media post preview with user info,
 * post content, image upload area, and scheduling options.
 */
const SocialMediaPostPreview: React.FC<SocialMediaPostPreviewProps> = ({
  // User data with defaults
  userInitials = 'SC',
  userName = 'Stephen Conley',
  userHandle = '@steveconley',
  userTitle = 'Product Designer',
  
  // Post content with defaults
  postTitle = 'New Product Launch',
  postContent = "We're excited to announce our newest product line! After months of development, we're proud to bring you the most innovative solution for your needs.",
  hashtags = ['productlaunch', 'innovation', 'technology'],
  
  // Image data
  imageUrl,
  
  // Scheduling options
  scheduledDate = 'May 5, 2025 • 9:00 AM',
  onSchedule,
  onDateChange,
  
  // Content editing callbacks
  onContentChange,
  onTitleChange,
  
  // Customization options
  hideHeader = false,
  hideFooter = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Post Preview Container */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 w-full">
        {/* Post Header with User Info */}
        {!hideHeader && (
          <div className="p-4 border-b border-gray-100 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
              {userInitials}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{userName}</h3>
              <p className="text-xs text-gray-500">{userHandle} • {userTitle}</p>
            </div>
          </div>
        )}

        {/* Post Content Area */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image/Video */}
          <div className="md:w-1/2 h-[300px] flex items-center justify-center bg-gray-100 border-r border-gray-100 relative">
            {!imageUrl ? (
              /* If no image uploaded yet, show upload option */
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-gray-500"
                  >
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/>
                    <line x1="16" y1="5" x2="22" y2="5"/>
                    <line x1="19" y1="2" x2="19" y2="8"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500 mx-4">
                  <span className="font-semibold text-blue-600">Upload Image</span>
                  <span className="block mt-1">for your post</span>
                </p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            ) : (
              /* If image is uploaded, show it */
              <img 
                src={imageUrl} 
                alt="Post visual" 
                className="object-cover h-full w-full" 
              />
            )}
          </div>

          {/* Right side - Post Text Content */}
          <div className="md:w-1/2 p-5">
            {onTitleChange ? (
              <input
                type="text"
                className="font-bold text-lg text-gray-900 mb-2 w-full border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1 -ml-2"
                value={postTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Add a title for your post"
              />
            ) : (
              <h2 className="font-bold text-lg text-gray-900 mb-2">{postTitle}</h2>
            )}
            
            {onContentChange ? (
              <textarea
                className="text-gray-700 mb-4 text-sm w-full min-h-[120px] border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded px-2 py-1 -ml-2"
                value={postContent}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Write your post content here..."
              />
            ) : (
              <p className="text-gray-700 mb-4 text-sm">
                {postContent}
              </p>
            )}
            
            {hashtags.length > 0 && (
              <div className="text-blue-500 text-sm space-x-1">
                {hashtags.map((tag, index) => (
                  <span key={index}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer with Schedule Options */}
      {!hideFooter && (
        <div className="max-w-2xl mx-auto mt-4 flex items-center justify-between flex-wrap gap-4 w-full">
          {/* Left: Date Display & Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Post scheduled for:</span>
            {/* Date Picker Component */}
            <div 
              className="flex items-center bg-gray-200 rounded-md px-3 py-2 space-x-2 cursor-pointer hover:bg-gray-300"
              onClick={onDateChange}
            >
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">{scheduledDate}</span>
              <CalendarIcon className="text-gray-700 h-4 w-4" />
            </div>
          </div>
          
          {/* Right: Schedule Button */}
          <button 
            className="px-6 py-2 rounded-lg text-sm font-medium bg-cyan-500 text-white hover:bg-cyan-600 whitespace-nowrap"
            onClick={onSchedule}
          >
            Schedule Post
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialMediaPostPreview;