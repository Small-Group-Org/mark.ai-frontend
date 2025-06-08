import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import MediaUploadArea from "@/components/ui/media-upload-area";
import { Post, PostStatus } from '@/types/post';
import { SupportedPostType } from '@/types';
import { initialSocialPlatforms, VIDEO_EXTENSIONS_REGEX } from '@/commons/constant';
import { formatHashtagsForDisplay, formatHashtagsForSubmission } from "@/utils/postUtils";
import { useConfirmationDialogContext } from '@/context/ConfirmationDialogProvider';
import PostTypeSelector from './PostTypeSelector';
import PostFormFields from './PostFormFields';
import SchedulingControls from './SchedulingControls';
import { getPlatformImage } from '@/commons/utils';
import LocationDropdown from './TagLocation';

interface EditPostProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onSave: (updatedPost: Post) => void;
  onDelete: () => void;
  onGenerate?: (prompt: string) => void;
}

const EditPost: React.FC<EditPostProps> = ({
  isOpen,
  onClose,
  post,
  onSave,
  onDelete,
  onGenerate
}) => {
  const [editedPost, setEditedPost] = useState<Post>(post);
  const [originalPost, setOriginalPost] = useState<Post>(post);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const { timeZoneLabel = 'GMT+00:00', isMobileView } = useAuthStore();
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [generatePrompt, setGeneratePrompt] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(post.status === 'draft' || post.status === 'schedule');
  const [date, setDate] = useState<Date>(new Date(post.scheduleDate));
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);

  const initialMediaUrlRef = useRef<string[] | null>(null);
  
  const { toast } = useToast();
  const { showConfirmation } = useConfirmationDialogContext();

  useEffect(() => {
    setCharacterCount(editedPost.content?.length);
  }, [editedPost.content]);

  useEffect(() => {
    initialMediaUrlRef.current = editedPost.mediaUrl;
  }, [editedPost._id]);

  useEffect(() => {
    if (post) {
      const formattedHashtags = formatHashtagsForDisplay(post.hashtag || '');
      const postWithFormattedHashtags = { ...post, hashtag: formattedHashtags };
      
      setEditedPost(postWithFormattedHashtags);
      setOriginalPost(postWithFormattedHashtags);
      setDate(new Date(post.scheduleDate));
      setHasChanges(false);
      setIsEditing(post.status === 'draft' || post.status === 'schedule');
    }
  }, [post, timeZoneLabel]);

  useEffect(() => {
    const checkForChanges = () => {
      const titleChanged = editedPost.title !== originalPost.title;
      const contentChanged = editedPost.content !== originalPost.content;
      const hashtagChanged = editedPost.hashtag !== originalPost.hashtag;
      const platformChanged = JSON.stringify(editedPost.platform.sort()) !== JSON.stringify(originalPost.platform.sort());
      const postTypeChanged = editedPost.postType !== originalPost.postType;
      const mediaChanged = JSON.stringify(editedPost.mediaUrl) !== JSON.stringify(originalPost.mediaUrl);
      const dateChanged = date.getTime() !== new Date(originalPost.scheduleDate).getTime();
      
      setHasChanges(titleChanged || contentChanged || hashtagChanged || platformChanged || postTypeChanged || mediaChanged || dateChanged);
    };
    
    checkForChanges();
  }, [editedPost, date, originalPost]);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({ ...prev, [name]: value }));
  };

  const handlePostTypeToggle = (type: SupportedPostType) => {
    let filteredMediaUrls = initialMediaUrlRef.current || [];
      
      if (type === 'video' || type === 'reel') {
        const videoUrls = filteredMediaUrls.filter(url => url.match(VIDEO_EXTENSIONS_REGEX));
        filteredMediaUrls = videoUrls.length > 0 ? [videoUrls[0]] : [];
      } else if (type === 'carousel') {
        filteredMediaUrls = filteredMediaUrls.filter(url => !url.match(VIDEO_EXTENSIONS_REGEX));
      } else {
        filteredMediaUrls = [filteredMediaUrls[0]];
      }

      setEditedPost(prev => ({ ...prev, postType: type, mediaUrl: filteredMediaUrls }));
  };

  const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPost(prev => ({ ...prev, hashtag: e.target.value }));
  };

  const handleMediaChange = (mediaUrls: string[]) => {
    setEditedPost(prev => ({ ...prev, mediaUrl: mediaUrls }));
  };

  const handleGenerate = () => {
    if (onGenerate && generatePrompt.trim()) {
      onGenerate(generatePrompt);
      setGeneratePrompt('');
      toast({ title: "AI Generation Requested", description: "Generating content based on your prompt..." });
    }
  };
  
  const handleDateChange = (newDate: Date) => setDate(newDate);

  const handleSave = (status: PostStatus) => {
    if (!isEditing) return;
    
    // Check if platforms are selected when scheduling
    if (editedPost.platform.length === 0) {
      toast({
        title: "Select Platform",
        description: `Please select at least one platform to ${status === "schedule" ? "schedule" : "save"} your post.`,
        variant: "destructive",
      });
      return;
    }
    
    const now = new Date();
    if (date < now) {
      toast({ title: "Invalid Date/Time", description: "Please select a future date and time.", variant: "destructive" });
      return;
    }
    
    const formattedHashtags = formatHashtagsForSubmission(editedPost.hashtag || '');
    const updatedPost = { ...editedPost, hashtag: formattedHashtags, scheduleDate: date, status };
    onSave(updatedPost);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleAIGenerate = () => {
    if (isEditing) {
      setGeneratePrompt("Generate engaging content about " + editedPost.title);
      handleGenerate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-hidden p-2 sm:p-4" onClick={handleClose}>
      <div className="bg-white rounded-lg shadow-xl h-[90vh] w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[80vw] xl:max-w-[64vw] flex flex-col md:h-full md:max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center p-2 sm:p-4 border-b rounded-tr-[8px] rounded-tl-[8px] border-gray-200 bg-white z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            {editedPost.platform?.[0] && (() => {
              const platformInfo = initialSocialPlatforms.find(p => p.value === editedPost.platform[0]);
              return (
                <div 
                  className="flex items-center gap-1.5 sm:gap-1.5 px-2 sm:px-3 py-[2px] sm:py-[2px] rounded-full border"
                  style={{ borderColor: platformInfo?.toggleColor || '#e5e7eb' }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-gray-50 rounded-full">
                    <img
                      src={getPlatformImage(editedPost.platform[0])}
                      alt={editedPost.platform[0]}
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium capitalize" style={{ color: platformInfo?.toggleColor || '#374151' }}>
                    {platformInfo?.label || editedPost.platform[0]}
                  </span>
                </div>
              );
            })()}
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0" onClick={handleClose}>
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden rounded-bl-[8px] rounded-br-[8px] min-h-0">
          <div className="hidden md:flex gap-4 py-4 w-1/2 border-r border-gray-200 flex-col min-h-0">
            {
              (!isMobileView && (editedPost.platform[0] === "facebook" || editedPost.platform[0] === "instagram")) && (
                <div className="px-4 sticky top-0 bg-white z-50 pb-2">
                  <LocationDropdown
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isLocationOpen={isLocationOpen}
                    setIsLocationOpen={setIsLocationOpen}
                  />
                </div>
              )
            }
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 relative">
              <MediaUploadArea
                mediaUrl={editedPost.mediaUrl}
                onMediaChange={handleMediaChange}
                isEditable={isEditing}
                showEmptyIcons={!isEditing}
                containerClassName="mb-4 rounded-lg border-2 border-dashed border-gray-300"
                height="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80"
                mediaClassName="rounded-lg"
                postType={editedPost.postType as SupportedPostType}
                initialMediaUrlRef={initialMediaUrlRef}
              />
              <PostTypeSelector
                postType={editedPost.postType}
                isEditing={isEditing}
                onPostTypeToggle={handlePostTypeToggle}
                platform={editedPost.platform?.[0]}
              />
            </div>
          </div>

          <div className="md:hidden flex flex-col w-full h-full min-h-0">
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-4" onClick={(e) => e.stopPropagation()}>
                {
                  (isMobileView && (editedPost.platform[0] === "facebook" || editedPost.platform[0] === "instagram")) && (
                    <div className="sticky top-0 bg-white z-50 pb-2">
                      <LocationDropdown
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        isLocationOpen={isLocationOpen}
                        setIsLocationOpen={setIsLocationOpen}
                      />
                    </div>
                  )
                }
                <MediaUploadArea
                  mediaUrl={editedPost.mediaUrl}
                  onMediaChange={handleMediaChange}
                  isEditable={isEditing}
                  showEmptyIcons={!isEditing}
                  containerClassName="mb-4 rounded-lg border-2 border-dashed border-gray-300"
                  height="h-48 sm:h-56"
                  mediaClassName="rounded-lg"
                  postType={editedPost.postType as SupportedPostType}
                  initialMediaUrlRef={initialMediaUrlRef}
                />
                <PostFormFields
                  editedPost={editedPost}
                  characterCount={characterCount}
                  isEditing={isEditing}
                  onTextChange={handleTextChange}
                  onHashtagsChange={handleHashtagsChange}
                  onGenerate={handleAIGenerate}
                />
                <div className={cn("mb-4", !isEditing && "opacity-50")}>
                  <PostTypeSelector
                    postType={editedPost.postType}
                    isEditing={isEditing}
                    onPostTypeToggle={handlePostTypeToggle}
                    platform={editedPost.platform?.[0]}
                  />
                </div>
              </div>
            </div>
            <SchedulingControls
              editedPost={editedPost}
              post={post}
              date={date}
              timeZoneLabel={timeZoneLabel}
              isEditing={isEditing}
              hasChanges={hasChanges}
              onDateChange={handleDateChange}
              onSave={handleSave}
              onDelete={onDelete}
              showDeleteConfirmation={showConfirmation}
            />
          </div>

          <div className="hidden md:flex w-full md:w-1/2 flex-col h-full min-h-0">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <PostFormFields
                editedPost={editedPost}
                characterCount={characterCount}
                isEditing={isEditing}
                onTextChange={handleTextChange}
                onHashtagsChange={handleHashtagsChange}
                onGenerate={handleAIGenerate}
                textareaHeight="h-24 sm:h-32 md:h-40 lg:h-48"
              />
            </div>
            <div className="bg-white flex-shrink-0">
              <SchedulingControls
                editedPost={editedPost}
                post={post}
                date={date}
                timeZoneLabel={timeZoneLabel}
                isEditing={isEditing}
                hasChanges={hasChanges}
                onDateChange={handleDateChange}
                onSave={handleSave}
                onDelete={onDelete}
                showDeleteConfirmation={showConfirmation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost; 