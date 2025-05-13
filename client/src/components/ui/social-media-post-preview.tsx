import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import DatePickerButton from './date-picker-button';
import ScheduleActionButton from './schedule-action-button';

// Define types for component props
interface SocialMediaPostPreviewProps {
  // User data
  userInitials?: string;
  userName?: string;
  userHandle?: string;
  userTitle?: string;
  
  // Post content
  postTitle?: string | null;
  postContent?: string | null;
  hashtags?: string[];
  
  // Image data
  imageUrl?: string;
  
  // Scheduling options
  scheduledDate?: string;
  onSchedule?: () => void;
  onDateChange?: () => void;
  onToggleOptions?: () => void; // For dropdown toggle
  buttonType?: 'schedule' | 'draft'; // Button type to display
  
  // Customization options
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;
  
  // Add these props for upload
  onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedImageFile?: File | null;
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
  onToggleOptions,
  buttonType = 'schedule',
  
  // Customization options
  hideHeader = false,
  hideFooter = false,
  className = '',
  
  // Add these props for upload
  onImageUpload,
  uploadedImageFile,
}) => {
  // State for handling dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handler for clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Helper for local preview
  const [localPreviewUrl, setLocalPreviewUrl] = React.useState<string | null>(null);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    if (uploadedImageFile) {
      const url = URL.createObjectURL(uploadedImageFile);
      setLocalPreviewUrl(url);
      setImageError(false); // Reset error on new upload
      return () => URL.revokeObjectURL(url);
    } else {
      setLocalPreviewUrl(null);
    }
  }, [uploadedImageFile]);

  // Reset error if imageUrl changes
  React.useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

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
            {((!imageUrl && !localPreviewUrl) || imageError) ? (
              /* If no image uploaded yet, or image failed to load, show upload option */
              <div className="flex flex-col items-center text-center w-full h-full justify-center">
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
                  <span className="font-semibold text-blue-600 cursor-pointer">Click to Upload</span>
                  <span className="block mt-1">or Drag & Drop</span>
                </p>
                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onImageUpload} />
              </div>
            ) : (
              /* If image is uploaded, show it (local preview takes precedence) */
              <img 
                src={localPreviewUrl || imageUrl} 
                alt="Post visual content" 
                className="object-cover h-full w-full" 
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            )}
          </div>

          {/* Right side - Post Text Content */}
          <div className="md:w-1/2 p-5">
            {/* Post Title - with placeholder if missing */}
            {postTitle ? (
              <h2 className="font-bold text-lg text-gray-900 mb-2">{postTitle}</h2>
            ) : (
              <h2 className="font-bold text-lg text-gray-400 mb-2 italic">Post title will appear here</h2>
            )}
            
            {/* Post Content - with placeholder if missing */}
            {postContent ? (
              <p className="text-gray-700 mb-4 text-sm">{postContent}</p>
            ) : (
              <p className="text-gray-400 mb-4 text-sm italic">Your post content will be displayed in this area. Add compelling content to engage your audience.</p>
            )}
            
            {/* Hashtags - only show if there are any */}
            {hashtags && hashtags.length > 0 && (
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
        <div className="max-w-2xl mx-auto mt-4 flex items-center justify-end flex-wrap gap-4 w-full">
          <DatePickerButton
            date={scheduledDate}
            onClick={onDateChange}
          />
          <ScheduleActionButton
            onSchedule={onSchedule}
            onToggleOptions={onToggleOptions}
            buttonType={buttonType}
          />
        </div>
      )}
    </div>
  );
};

export default SocialMediaPostPreview;