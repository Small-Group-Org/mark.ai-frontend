import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import PostDetails from './PostDetails';
import PlatformToggle from './PlatformToggle';
import {
    CalendarTodayIcon,
    UploadIcon
} from './IconComponents';

// Define platform names type for state management
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

// Sample data for demonstration
const samplePostData = {
  title: "Summer Promotion Campaign",
  caption: "Get ready for the hottest deals of the summer! 🔥\n\nOur annual summer sale is back with discounts up to 50% on all products. Don't miss this opportunity to refresh your style!",
  tags: ["summersale", "discount", "fashion", "limitedtime"]
};

const PostPreviewNew: React.FC = () => {
  const [postData] = useState(samplePostData);
  const [activePlatforms, setActivePlatforms] = useState<Record<PlatformName, boolean>>({
    'Bluesky': false,
    'Facebook': false,
    'Google Business': false,
    'Instagram': true, // Default active based on screenshot
    'X/Twitter': true, // Default active based on screenshot
    'Reddit': false,
    'Telegram': false,
    'Threads': false,
    'TikTok': true,   // Default active based on screenshot
    'YouTube': true,  // Default active based on screenshot
  });

  const handlePlatformToggle = (platformName: PlatformName) => {
    setActivePlatforms(prev => ({
        ...prev,
        [platformName]: !prev[platformName],
    }));
  };

  // Platform Data (could be fetched or defined elsewhere)
  const platformsRow1: { name: PlatformName; icon: string }[] = [
    { name: 'Bluesky', icon: 'B' },
    { name: 'Facebook', icon: 'f' },
    { name: 'Google Business', icon: 'G' },
    { name: 'Instagram', icon: 'I' },
    { name: 'X/Twitter', icon: 'X' },
  ];
  
  const platformsRow2: { name: PlatformName; icon: string }[] = [
    { name: 'Reddit', icon: 'R' },
    { name: 'Telegram', icon: 'T' },
    { name: 'Threads', icon: '@' },
    { name: 'TikTok', icon: '♪' },
    { name: 'YouTube', icon: '▶' },
  ];
  
  return (
    <div className="flex flex-col bg-white h-full overflow-hidden">
      {/* Header */}
      <div className="h-[58px] flex items-center px-5 border-b border-gray-200 shrink-0">
        <h2 className="font-semibold text-gray-800">Post Preview</h2>
      </div>
      
      {/* Platform Selection */}
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
        {/* Platform Row 1 */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 mb-3">
            {platformsRow1.map((platform) => (
                <PlatformToggle
                    key={platform.name}
                    label={platform.name}
                    icon={platform.icon}
                    active={activePlatforms[platform.name]}
                    onToggle={() => handlePlatformToggle(platform.name)}
                />
            ))}
        </div>
        {/* Platform Row 2 */}
        <div className="flex flex-wrap gap-x-10 gap-y-3">
            {platformsRow2.map((platform) => (
                <PlatformToggle
                    key={platform.name}
                    label={platform.name}
                    icon={platform.icon}
                    active={activePlatforms[platform.name]}
                    onToggle={() => handlePlatformToggle(platform.name)}
                />
            ))}
        </div>
      </div>
      
      {/* Post Type Selection */}
      <div className="px-5 py-3 border-b border-gray-200 bg-white shrink-0 flex flex-wrap gap-3">
        <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-500 text-white">Feed Post</button>
        <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300">IG Story</button>
        <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300">Reel</button>
        <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300">TikTok</button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </label>
            <ImageUploader />
          </div>
          
          {/* Right Column - Post Details */}
          <div>
            <PostDetails 
              title={postData.title}
              caption={postData.caption}
              tags={postData.tags}
            />
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <CalendarTodayIcon className="w-4 h-4" />
                <span>Select Date</span>
              </button>
              
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewNew;