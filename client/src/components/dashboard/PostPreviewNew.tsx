import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import PostDetails from './PostDetails';
import { CalendarTodayIcon } from './IconComponents';

// Sample data for demonstration
const samplePostData = {
  title: "Summer Promotion Campaign",
  caption: "Get ready for the hottest deals of the summer! 🔥\n\nOur annual summer sale is back with discounts up to 50% on all products. Don't miss this opportunity to refresh your style!",
  tags: ["summersale", "discount", "fashion", "limitedtime"]
};

const PostPreviewNew: React.FC = () => {
  const [postData] = useState(samplePostData);
  
  return (
    <div className="flex flex-col bg-white h-full overflow-hidden">
      {/* Header */}
      <div className="h-[58px] flex items-center px-5 border-b border-gray-200 shrink-0">
        <h2 className="font-semibold text-gray-800">Post Preview</h2>
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