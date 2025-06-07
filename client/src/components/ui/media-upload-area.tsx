import React from 'react';
import { Trash2, Image, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadMultipleMedia } from '@/services/uploadServices';
import { useToast } from '@/hooks/use-toast';

interface MediaUploadAreaProps {
  // Media data
  mediaUrl?: string | string[];
  isUploading?: boolean;
  onMediaChange?: (mediaUrls: string[]) => void;
  
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
  
  // File validation
  maxFiles?: number;
  maxVideoSizeMB?: number;
  maxImageSizeMB?: number;
}

const MediaUploadArea: React.FC<MediaUploadAreaProps> = ({
  mediaUrl,
  isUploading: externalIsUploading = false,
  onMediaChange,
  isEditable = true,
  showEmptyIcons = false,
  containerClassName = "",
  height = "h-[300px]",
  mediaClassName = "",
  emptyText = "No media",
  uploadingText = "Uploading...",
  maxFiles = 10
}) => {
  const [mediaError, setMediaError] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [internalIsUploading, setInternalIsUploading] = React.useState(false);
  const { toast } = useToast();
  
  const isUploading = externalIsUploading || internalIsUploading;
  
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i);
  };

  // Handle both string and array formats
  const mediaArray = Array.isArray(mediaUrl) ? mediaUrl : mediaUrl ? [mediaUrl] : [];
  const hasMedia = mediaArray.length > 0;
  const hasMultipleMedia = mediaArray.length > 1;

  // Reset error when media changes
  React.useEffect(() => {
    setMediaError(false);
  }, [mediaArray[currentIndex]]);

  // Reset current index if it's out of bounds
  React.useEffect(() => {
    if (currentIndex >= mediaArray.length && mediaArray.length > 0) {
      setCurrentIndex(0);
    }
  }, [mediaArray.length, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaArray.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mediaArray.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const currentMediaCount = mediaArray.length;
    
    // Check if total files would exceed maximum
    if (currentMediaCount + fileArray.length > maxFiles) {
      toast({ 
        title: "Too many files", 
        description: `Maximum ${maxFiles} files allowed. You can add ${maxFiles - currentMediaCount} more files.`, 
        variant: "destructive" 
      });
      return;
    }

    // Validate file sizes
    const validFiles = [];
    for (const file of fileArray) {
      const isFileVideo = file.type.startsWith('video/');
      const maxSizeInMB = 500;
      const maxSize = maxSizeInMB * 1024 * 1024;
      
      if (file.size > maxSize) {
        const sizeLimit = maxSizeInMB + 'MB';
        toast({ 
          title: "File too large", 
          description: `${file.name} is larger than ${sizeLimit}. Please select a smaller ${isFileVideo ? 'video' : 'image'}.`, 
          variant: "destructive" 
        });
        continue;
      }
      
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setInternalIsUploading(true);
    try {
      const uploadedUrls = await uploadMultipleMedia(validFiles);
      const newMediaArray = [...mediaArray, ...uploadedUrls];
      
      if (onMediaChange) {
        onMediaChange(newMediaArray);
      }
      
      toast({ 
        title: "Success", 
        description: `${uploadedUrls.length} file(s) uploaded successfully` 
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to upload files", 
        variant: "destructive" 
      });
    } finally {
      setInternalIsUploading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleDeleteMedia = (index: number) => {
    const newMediaArray = mediaArray.filter((_, i) => i !== index);
    
    if (onMediaChange) {
      onMediaChange(newMediaArray);
    }
    
    // Adjust current index if necessary
    if (currentIndex >= newMediaArray.length && newMediaArray.length > 0) {
      setCurrentIndex(newMediaArray.length - 1);
    } else if (newMediaArray.length === 0) {
      setCurrentIndex(0);
    }
  };

  const renderMediaItem = (url: string) => {
    if (isVideo(url)) {
      return (
        <video 
          src={url} 
          className={cn("object-contain h-full w-full", mediaClassName)}
          controls
          preload="metadata"
        />
      );
    } else {
      return (
        <img 
          src={url} 
          alt="Post media" 
          className={cn("object-contain h-full w-full", mediaClassName)}
          onError={() => setMediaError(true)}
          onLoad={() => setMediaError(false)}
        />
      );
    }
  };

  return (
    <div className={cn("relative", containerClassName)}>
      {hasMedia && !mediaError ? (
        <div className={cn("relative overflow-hidden flex items-start justify-center", height)}>
          {/* Media Display */}
          {renderMediaItem(mediaArray[currentIndex])}
          
          {/* Navigation Arrows (only show if multiple media) */}
          {hasMultipleMedia && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-gray-800/80 rounded-full hover:bg-gray-800 text-white transition-opacity"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-gray-800/80 rounded-full hover:bg-gray-800 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          
          {/* Delete Button */}
          {isEditable && (
            <button 
              className="absolute top-2 right-2 p-1 bg-gray-800/80 rounded-full hover:bg-gray-800 text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteMedia(currentIndex);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          
          {/* Add More Media Button (show when editable and under max files) */}
          {isEditable && mediaArray.length < maxFiles && (
            <button 
              className="absolute bottom-2 right-2 p-2 bg-blue-600/90 rounded-full hover:bg-blue-700 text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                const fileInput = e.currentTarget.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) {
                  fileInput.click();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          )}
          
          {/* Navigation Dots (Instagram-style) */}
          {hasMedia && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {mediaArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentIndex 
                      ? "bg-white scale-110" 
                      : "bg-white/50 hover:bg-white/75"
                  )}
                />
              ))}
            </div>
          )}
          
          {/* Hidden file input for adding more media */}
          {isEditable && (
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaUpload}
              disabled={isUploading}
              multiple
            />
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
                <span className="block mt-1 text-xs text-gray-400">Max {maxFiles} files</span>
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleMediaUpload}
                disabled={isUploading}
                multiple
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