import React from 'react';
import { Trash2, Image, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaUploadAreaProps {
  // Media data
  mediaUrl?: string | string[];
  isUploading?: boolean;
  onMediaUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMediaDelete?: () => void;
  
  // Behavior props
  isEditable?: boolean;
  showEmptyIcons?: boolean;
  
  // Styling props
  containerClassName?: string;
  height?: string;
  mediaClassName?: string;
  
  // Content props
  emptyText?: string;
  uploadingText?: string;
}

const MediaUploadArea: React.FC<MediaUploadAreaProps> = ({
  mediaUrl,
  isUploading = false,
  onMediaUpload,
  onMediaDelete,
  isEditable = true,
  showEmptyIcons = false,
  containerClassName = "",
  height = "h-[300px]",
  mediaClassName = "",
  emptyText = "No media",
  uploadingText = "Uploading..."
}) => {
  const [mediaError, setMediaError] = React.useState(false);
  
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i);
  };

  // Handle both string and array formats
  const currentMediaUrl = Array.isArray(mediaUrl) ? mediaUrl[0] : mediaUrl;
  const hasMedia = currentMediaUrl && currentMediaUrl.length > 0;

  // Reset error when media changes
  React.useEffect(() => {
    setMediaError(false);
  }, [currentMediaUrl]);

  return (
    <div className={cn("relative", containerClassName)}>
      {hasMedia && !mediaError ? (
        <div className={cn("relative overflow-hidden flex items-start justify-center", height)}>
          {isVideo(currentMediaUrl) ? (
            <video 
              src={currentMediaUrl} 
              className={cn("object-contain h-full", mediaClassName)}
              controls
              preload="metadata"
            />
          ) : (
            <img 
              src={currentMediaUrl} 
              alt="Post media" 
              className={cn("object-contain h-full", mediaClassName)}
              onError={() => setMediaError(true)}
              onLoad={() => setMediaError(false)}
            />
          )}
          {isEditable && onMediaDelete && (
            <button 
              className="absolute top-2 right-2 p-1 bg-gray-800/80 rounded-full hover:bg-gray-800 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onMediaDelete();
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className={cn(
          "flex flex-col items-center justify-center bg-gray-100 relative",
          height,
          isEditable ? "cursor-pointer hover:bg-gray-200" : "",
          containerClassName.includes("border") ? "" : "border border-gray-200"
        )}>
          {isUploading ? (
            <div className="flex flex-col items-center text-center w-full h-full justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 animate-spin">
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
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">{uploadingText}</p>
            </div>
          ) : isEditable ? (
            <>
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
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  <line x1="16" y1="5" x2="22" y2="5" />
                  <line x1="19" y1="2" x2="19" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 text-center mx-4">
                <span className="font-semibold text-blue-600 cursor-pointer">
                  Click to Upload
                </span>
                <span className="block mt-1">or Drag & Drop</span>
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={onMediaUpload}
                disabled={isUploading}
              />
            </>
          ) : showEmptyIcons ? (
            <>
              <div className="flex items-center space-x-2 mb-2">
                <Image className="w-6 h-6 text-gray-400" />
                <Video className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-xs sm:text-sm text-gray-400">{emptyText}</p>
            </>
          ) : (
            <p className="text-sm text-gray-500">{emptyText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaUploadArea; 