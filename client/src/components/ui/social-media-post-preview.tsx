import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import ScheduleActionButton from "./schedule-action-button";
import { usePostStore } from "@/store/usePostStore";
import { useAuthStore } from "@/store/useAuthStore";
import { SupportedPostType, User } from "@/types";
import DatePickerWithButton from "./date-picker-with-button";
import { cn } from "@/lib/utils";
import { parseHashtagsToArray } from "@/utils/postUtils";
import MediaUploadArea from "./media-upload-area";

// Define types for component props
interface SocialMediaPostPreviewProps {
  // Post content
  postTitle?: string | null;
  postContent?: string | null;
  hashtag?: string[];

  // Image data
  imageUrl?: string;

  // Scheduling options
  scheduledDate?: Date;
  onSchedule?: () => void;
  onDraft?: () => void;
  onDateChange: (date: Date) => void;

  // Customization options
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;

  // Add these props for upload
  uploadedMediaFile?: string | string[];
  onMediaChange?: (mediaUrls: string[]) => Promise<void>;
  initialMediaUrlRef: MutableRefObject<string[] | null>
}

/**
 * A reusable component that displays a social media post preview with user info,
 * post content, media upload area, and scheduling options.
 */
const SocialMediaPostPreview: React.FC<SocialMediaPostPreviewProps> = ({
  // User data with defaults

  // Post content with defaults
  imageUrl,
  scheduledDate,
  onSchedule,
  onDraft,
  onDateChange,

  // Customization options
  hideHeader = false,
  hideFooter = false,
  className = "",

  // Add these props for upload
  uploadedMediaFile,
  onMediaChange,
  initialMediaUrlRef
}) => {
  const {livePost} = usePostStore();
  const {content: _postContent, hashtag, title: postTitle, postType} = livePost;
  const { userDetails = {} } = useAuthStore();
  const { name: userName = "" } = userDetails as User;
  
  const formattedUserName = userName
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  const userInitials = userName
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase())
    .join('') || 'U';
  
  // Parse hashtags for display
  const hashtagsArray = parseHashtagsToArray(hashtag || '');
  const postContent = _postContent.split(`#`)?.[0];


  return (
    <div className={`flex flex-col ${className}`}>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 w-full">
        {!hideHeader && (
          <div className="px-4 py-2 border-b border-gray-100 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
              {userInitials}
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-900">{formattedUserName}</h3>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row">
          {postType !== "text" && (
            <div className="md:flex-1 h-[250px] md:h-[350px] flex items-center justify-center bg-gray-100 border-r border-gray-100 relative">
              <MediaUploadArea
                mediaUrl={uploadedMediaFile}
                isUploading={false}
                onMediaChange={onMediaChange}
                isEditable={true}
                height="h-full"
                containerClassName="w-full h-full"
                postType={postType as SupportedPostType}
                initialMediaUrlRef={initialMediaUrlRef}
              />
            </div>
          )}

          <div className={`md:flex-1 p-5 h-[250px] md:h-[350px] overflow-y-auto box-border ${postType === "text" ? "h-[400px]" : ""}`}>
            {postTitle ? (
              <h2 className="font-bold text-lg text-gray-900 mb-2">
                {postTitle}
              </h2>
            ) : (
              <h2 className="font-bold text-lg text-gray-400 mb-2 italic">
                Post title will appear here
              </h2>
            )}

            {postContent ? (
              <p className="text-gray-700 mb-4 text-sm">{postContent}</p>
            ) : (
              <p className="text-gray-400 mb-4 text-sm italic">
                Your post content will be displayed in this area. Add compelling
                content to engage your audience.
              </p>
            )}

            {hashtagsArray.length > 0 && (
              <div className="text-blue-500 text-sm space-x-1 flex flex-wrap">
                {hashtagsArray.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {!hideFooter && (
        <div className="max-w-2xl mx-auto mt-4 flex items-center justify-end w-full">
          <div className="flex flex-col items-center gap-4 w-full sm:flex-row sm:items-center sm:gap-2 justify-end">
            <div className="sm:w-auto w-full">
              <DatePickerWithButton
                date={scheduledDate || new Date()}
                onDateChange={(date) => onDateChange(date)}
              />
            </div>
              
            <div className={cn("w-full sm:w-auto flex rounded-lg shadow-sm relative")}>
              <ScheduleActionButton
                onSchedule={onSchedule}
                onDraft={onDraft}
                className={!onSchedule && !onDraft ? "opacity-70" : ""}
                disabled={!onSchedule && !onDraft}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaPostPreview;
