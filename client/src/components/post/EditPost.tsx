import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import MediaUploadArea from "@/components/ui/media-upload-area";
import { Post, PostStatus } from '@/types/post';
import { PlatformType, SupportedPostType } from '@/types';
import { ENABLE_AI_GENERATE } from '@/commons/constant';
import { formatHashtagsForDisplay, formatHashtagsForSubmission } from "@/utils/postUtils";
import { useConfirmationDialogContext } from '@/context/ConfirmationDialogProvider';
import PostTypeSelector from './PostTypeSelector';
import PostFormFields from './PostFormFields';
import SchedulingControls from './SchedulingControls';

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
  const { timeZoneLabel = 'GMT+00:00', getConnectedPlatforms } = useAuthStore();
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [generatePrompt, setGeneratePrompt] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(post.status === 'draft' || post.status === 'schedule');
  const [date, setDate] = useState<Date>(new Date(post.scheduleDate));
  
  const { toast } = useToast();
  const connectedPlatforms = getConnectedPlatforms();
  const { showConfirmation } = useConfirmationDialogContext();

  useEffect(() => {
    setCharacterCount(editedPost.content?.length);
  }, [editedPost.content]);

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
  
  const handlePlatformToggle = (platform: PlatformType, isActive: boolean) => {
    setEditedPost(prev => ({
      ...prev,
      platform: isActive ? [...prev.platform, platform] : prev.platform.filter(p => p !== platform)
    }));
  };

  const handlePostTypeToggle = (type: SupportedPostType) => {
    setEditedPost(prev => ({ ...prev, postType: type }));
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[80vw] xl:max-w-[64vw] flex flex-col h-full max-h-[65vh] md:max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b rounded-tr-[8px] rounded-tl-[8px] border-gray-200 bg-white z-10 flex-shrink-0">
          <div className="w-5 h-5"></div>
          <h2 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100">Post Details</h2>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0" onClick={handleClose}>
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden rounded-bl-[8px] rounded-br-[8px] min-h-0">
          
          {/* Desktop: Left side - Media and controls */}
          <div className="hidden md:flex w-1/2 border-r border-gray-200 flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <MediaUploadArea
                mediaUrl={editedPost.mediaUrl}
                onMediaChange={handleMediaChange}
                isEditable={isEditing}
                showEmptyIcons={!isEditing}
                containerClassName="mb-4 rounded-lg border-2 border-dashed border-gray-300"
                height="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80"
                mediaClassName="rounded-lg"
                postType={editedPost.postType as SupportedPostType}
              />
              <PostTypeSelector
                postType={editedPost.postType}
                isEditing={isEditing}
                onPostTypeToggle={handlePostTypeToggle}
              />
            </div>
          </div>

          {/* Mobile: Full width stacked layout */}
          <div className="md:hidden flex flex-col w-full h-full min-h-0">
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-4" onClick={(e) => e.stopPropagation()}>
                <MediaUploadArea
                  mediaUrl={editedPost.mediaUrl}
                  onMediaChange={handleMediaChange}
                  isEditable={isEditing}
                  showEmptyIcons={!isEditing}
                  containerClassName="mb-4 rounded-lg border-2 border-dashed border-gray-300"
                  height="h-48 sm:h-56"
                  mediaClassName="rounded-lg"
                  postType={editedPost.postType as SupportedPostType}
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

          {/* Desktop: Right side - Form fields */}
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