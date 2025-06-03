import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, PlusCircle, CheckSquare, XSquare, Image, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/useAuthStore';
import ScheduleActionButton from "@/components/ui/schedule-action-button";
import DatePickerWithButton from "./ui/date-picker-with-button";
import PlatformToggle from "@/components/dashboard/PlatformToggle";
import { Post, PostStatus } from '@/types/post';
import { PlatformType } from '@/types';
import { ENABLE_AI_GENERATE } from '@/commons/constant';
import { uploadSingleMedia } from "@/services/uploadServices";
import { formatHashtagsForDisplay, formatHashtagsForSubmission } from "@/utils/postUtils";

interface EditPostProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onSave: (updatedPost: Post) => void;
  onDelete: () => void;
  onGenerate?: (prompt: string) => void;
}

// Media Upload Component
const MediaUpload: React.FC<{
  mediaUrl: string[];
  isEditing: boolean;
  isImageUploading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteMedia: (index: number) => void;
  className?: string;
}> = ({ mediaUrl, isEditing, isImageUploading, onImageUpload, onDeleteMedia, className = "" }) => (
  <div className={`relative mb-4 ${className}`}>
    {mediaUrl.length > 0 ? (
      <div className="relative rounded-lg overflow-hidden h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
        <img 
          src={mediaUrl[0]} 
          alt="Post media" 
          className="object-contain w-full h-full"
        />
        {isEditing && (
          <button 
            className="absolute top-2 right-2 p-1 bg-gray-800/80 rounded-full hover:bg-gray-800 text-white"
            onClick={() => onDeleteMedia(0)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    ) : (
      <div className={cn(
        "flex flex-col items-center justify-center h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-lg border-2 border-dashed border-gray-300",
        isEditing ? "bg-gray-100 cursor-pointer hover:bg-gray-200" : "bg-gray-50"
      )}>
        {isImageUploading ? (
          <div className="flex flex-col items-center text-center w-full h-full justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : isEditing ? (
          <>
            <PlusCircle className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-gray-400" />
            <p className="text-xs sm:text-sm text-gray-500">Click to upload media</p>
            <label className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <input type="file" className="hidden" accept="image/*" onChange={onImageUpload} disabled={isImageUploading} />
            </label>
          </>
        ) : (
          <>
            <Image className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-gray-400" />
            <p className="text-xs sm:text-sm text-gray-400">No image</p>
          </>
        )}
      </div>
    )}
  </div>
);

// Post Type Selection Component
const PostTypeSelector: React.FC<{
  postType: string;
  isEditing: boolean;
  onPostTypeToggle: (type: string) => void;
}> = ({ postType, isEditing, onPostTypeToggle }) => (
  <div className="mb-4">
    <h3 className="text-xs sm:text-sm text-gray-700 font-medium mb-2">Post Type</h3>
    <div className="flex gap-1 sm:gap-2">
      {['post', 'story', 'reel'].map((type) => (
        <button
          key={type}
          className={cn(
            "px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors flex-1",
            (postType === type || (postType === 'text' && type === 'post'))
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 text-gray-600",
            !isEditing && "opacity-75 cursor-not-allowed hover:bg-gray-100 hover:text-gray-600"
          )}
          onClick={() => isEditing && onPostTypeToggle(type)}
          disabled={!isEditing}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

// Platform Selection Component
const PlatformSelector: React.FC<{
  platforms: PlatformType[];
  connectedPlatforms: any[];
  isEditing: boolean;
  onPlatformToggle: (platform: PlatformType, isActive: boolean) => void;
}> = ({ platforms, connectedPlatforms, isEditing, onPlatformToggle }) => (
  <div className="mb-4">
    <h3 className="text-xs sm:text-sm text-gray-700 font-medium mb-3">Platforms</h3>
    <div className="grid gap-4 mb-4 w-full max-w-2xl grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))]">
      {connectedPlatforms.map((platformObj) => (
        <div key={platformObj.value} className="flex-shrink-0">
          <PlatformToggle
            label={platformObj.label}
            platform={platformObj.value}
            initialState={platforms.includes(platformObj.value as PlatformType)}
            onToggle={(isActive) => isEditing && onPlatformToggle(platformObj.value as PlatformType, isActive)}
          />
        </div>
      ))}
    </div>
  </div>
);

// Form Fields Component
const PostFormFields: React.FC<{
  editedPost: Post;
  characterCount: number;
  isEditing: boolean;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onHashtagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate?: () => void;
  textareaHeight?: string;
}> = ({ editedPost, characterCount, isEditing, onTextChange, onHashtagsChange, onGenerate, textareaHeight = "h-20 sm:h-24" }) => (
  <>
    {/* Title input */}
    <div className={cn("mb-3", !isEditing && "opacity-50")}>
      <label className="block text-xs sm:text-sm text-gray-600 mb-1">Title</label>
      <input
        type="text"
        name="title"
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 text-sm",
          !isEditing && "bg-gray-50 cursor-default"
        )}
        value={editedPost.title}
        onChange={onTextChange}
        placeholder="Enter post title"
        readOnly={!isEditing}
      />
    </div>
    
    {/* Content textarea */}
    <div className={cn("mb-3", !isEditing && "opacity-50")}>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs sm:text-sm text-gray-600">Caption</label>
        <span className="text-xs text-gray-400">{characterCount}/2,200</span>
      </div>
      {!isEditing ? (
        <div className={cn("w-full px-3 py-2 border border-gray-300 rounded-md resize-none overflow-y-auto text-gray-800 bg-gray-50 text-sm", textareaHeight)}>
          {editedPost.content.split('\n').map((line, i) => (
            <div key={i} className="mb-1 relative flex items-center">
              {line.includes("Netflix and Chill") && (
                <div className="flex items-center">
                  <span>{line}</span>
                  <XSquare className="ml-1 text-red-500 h-4 w-4" />
                </div>
              )}
              {line.includes("Mountain-ing and Hill") && (
                <div className="flex items-center">
                  <span>{line}</span>
                  <CheckSquare className="ml-1 text-green-600 h-4 w-4" />
                </div>
              )}
              {!line.includes("Netflix and Chill") && !line.includes("Mountain-ing and Hill") && (
                <span>{line}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <textarea
          name="content"
          className={cn("w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-gray-800 text-sm", textareaHeight)}
          value={editedPost.content}
          onChange={onTextChange}
          placeholder="Write your caption..."
          maxLength={2200}
        />
      )}
    </div>
    
    {/* Hashtags input */}
    <div className={cn("mb-4", !isEditing && "opacity-50")}>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs sm:text-sm text-gray-600">Hashtags</label>
        <span className="text-xs text-gray-400">0/2,200</span>
      </div>
      <input
        type="text"
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 text-sm",
          !isEditing && "bg-gray-50 cursor-default"
        )}
        value={editedPost.hashtag}
        onChange={onHashtagsChange}
        placeholder="#hashtag1 #hashtag2 #hashtag3"
        readOnly={!isEditing}
      />
    </div>
    
    {/* AI Generation Button */}
    {onGenerate && ENABLE_AI_GENERATE && (
      <div className={cn("mb-4", !isEditing && "opacity-50")}>
        <button 
          className={cn(
            "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 w-full",
            isEditing 
              ? "hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              : "cursor-not-allowed"
          )}
          onClick={onGenerate}
          disabled={!isEditing}
        >
          <Edit className="mr-2 h-4 w-4" />
          AI Generate
        </button>
      </div>
    )}
  </>
);

// Scheduling Controls Component
const SchedulingControls: React.FC<{
  editedPost: Post;
  post: Post;
  date: Date;
  timeZoneLabel: string;
  isEditing: boolean;
  isImageUploading: boolean;
  hasChanges: boolean;
  onDateChange: (date: Date) => void;
  onSave: (status: PostStatus) => void;
  onDelete: () => void;
}> = ({ editedPost, post, date, timeZoneLabel, isEditing, isImageUploading, hasChanges, onDateChange, onSave, onDelete }) => (
  <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200 bg-white flex-shrink-0">
    <div className="flex justify-between items-center mb-1">
      <div className="text-xs text-gray-500">{timeZoneLabel}</div>
    </div>
    <div className="flex flex-col space-y-2">
      <DatePickerWithButton
        date={date}
        onDateChange={onDateChange}
        disabled={!isEditing}
        className={cn("w-full", !isEditing && "opacity-75")}
      />
      {editedPost.status === 'published' ? (
        <div className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md">
          <CheckCircle className="w-5 h-5" />
          <span>Post Published</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
          </button>
          <div className="flex-1">
            <ScheduleActionButton
              onSchedule={() => isEditing && onSave('schedule')}
              onDraft={() => isEditing && onSave('draft')}
              className={(!isEditing || isImageUploading) ? "opacity-70 cursor-not-allowed" : ""}
              disabled={!isEditing || isImageUploading}
              initialPostStatus={post.status}
              hasChanges={hasChanges}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

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
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date(post.scheduleDate));
  
  const { toast } = useToast();
  const connectedPlatforms = getConnectedPlatforms();

  useEffect(() => {
    setCharacterCount(editedPost.content.length);
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

  const handlePostTypeToggle = (type: string) => {
    setEditedPost(prev => ({ ...prev, postType: type }));
  };

  const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPost(prev => ({ ...prev, hashtag: e.target.value }));
  };

  const handleDeleteMedia = (index: number) => {
    setEditedPost(prev => ({ ...prev, mediaUrl: prev.mediaUrl.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageUploading(true);
      try {
        const response = await uploadSingleMedia(file);
        setEditedPost(prev => ({ ...prev, mediaUrl: [response] }));
        toast({ title: "Success", description: "Image uploaded successfully" });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
      } finally {
        setIsImageUploading(false);
      }
    }
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
    if (status === 'schedule' && editedPost.platform.length === 0) {
      toast({
        title: "Select Platform",
        description: "Please select at least one platform to schedule your post.",
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
              <MediaUpload
                mediaUrl={editedPost.mediaUrl}
                isEditing={isEditing}
                isImageUploading={isImageUploading}
                onImageUpload={handleImageUpload}
                onDeleteMedia={handleDeleteMedia}
              />
              <PostTypeSelector
                postType={editedPost.postType}
                isEditing={isEditing}
                onPostTypeToggle={handlePostTypeToggle}
              />
              <div className="border-t border-gray-100 pt-4">
                <PlatformSelector
                  platforms={editedPost.platform}
                  connectedPlatforms={connectedPlatforms}
                  isEditing={isEditing}
                  onPlatformToggle={handlePlatformToggle}
                />
              </div>
            </div>
          </div>

          {/* Mobile: Full width stacked layout */}
          <div className="md:hidden flex flex-col w-full h-full min-h-0">
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-4" onClick={(e) => e.stopPropagation()}>
                <MediaUpload
                  mediaUrl={editedPost.mediaUrl}
                  isEditing={isEditing}
                  isImageUploading={isImageUploading}
                  onImageUpload={handleImageUpload}
                  onDeleteMedia={handleDeleteMedia}
                  className="h-48 sm:h-56"
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
                  <PlatformSelector
                    platforms={editedPost.platform}
                    connectedPlatforms={connectedPlatforms}
                    isEditing={isEditing}
                    onPlatformToggle={handlePlatformToggle}
                  />
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
              isImageUploading={isImageUploading}
              hasChanges={hasChanges}
              onDateChange={handleDateChange}
              onSave={handleSave}
              onDelete={onDelete}
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
                isImageUploading={isImageUploading}
                hasChanges={hasChanges}
                onDateChange={handleDateChange}
                onSave={handleSave}
                onDelete={onDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;