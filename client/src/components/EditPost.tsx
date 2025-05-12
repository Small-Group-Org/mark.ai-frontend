import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Define platform types
export type PlatformName = 'Instagram' | 'Facebook' | 'TikTok' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'YouTube' | 'Bluesky' | 'Google Business';

// Define the post type structure
export interface PostData {
  id?: number | string;
  title: string;
  content: string;
  hashtags: string[];
  mediaUrl: string[];
  socialPlatforms: Record<PlatformName, boolean>;
  postType: { post: boolean; story: boolean; reel: boolean; };
  scheduledDate: string;
}

// Define component props
interface EditPostProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostData;
  onSave: (updatedPost: PostData) => void;
  onDelete?: () => void;
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
  // Component state
  const [editedPost, setEditedPost] = useState<PostData>(post);
  const [activeTab, setActiveTab] = useState<'content' | 'schedule'>('content');
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [generatePrompt, setGeneratePrompt] = useState<string>('');
  const { toast } = useToast();

  // Update character count when content changes
  useEffect(() => {
    setCharacterCount(editedPost.content.length);
  }, [editedPost.content]);

  // Initialize edited post when post prop changes
  useEffect(() => {
    setEditedPost(post);
  }, [post]);

  // Handle text input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle platform toggle
  const handlePlatformToggle = (platform: PlatformName) => {
    setEditedPost(prev => ({
      ...prev,
      socialPlatforms: {
        ...prev.socialPlatforms,
        [platform]: !prev.socialPlatforms[platform]
      }
    }));
  };

  // Handle post type toggle
  const handlePostTypeToggle = (type: 'post' | 'story' | 'reel') => {
    setEditedPost(prev => ({
      ...prev,
      postType: {
        ...prev.postType,
        [type]: !prev.postType[type]
      }
    }));
  };

  // Handle hashtags input
  const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hashtagsText = e.target.value;
    const hashtagsList = hashtagsText.split(' ')
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
      .filter(tag => tag.length > 1);
    
    setEditedPost(prev => ({
      ...prev,
      hashtags: hashtagsList
    }));
  };

  // Handle media deletion
  const handleDeleteMedia = (index: number) => {
    setEditedPost(prev => ({
      ...prev,
      mediaUrl: prev.mediaUrl.filter((_, i) => i !== index)
    }));
  };

  // Handle AI generation
  const handleGenerate = () => {
    if (onGenerate && generatePrompt.trim()) {
      onGenerate(generatePrompt);
      setGeneratePrompt('');
      toast({
        title: "AI Generation Requested",
        description: "Generating content based on your prompt...",
      });
    }
  };

  // Handle save
  const handleSave = () => {
    onSave(editedPost);
    toast({
      title: "Post Saved",
      description: "Your post has been saved successfully.",
    });
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col h-[90vh] max-h-[600px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Edit className="w-5 h-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold">Post Details</h2>
          </div>
          <button 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-grow overflow-hidden">
          {/* Left side - Media preview */}
          <div className="w-full md:w-2/5 border-r border-gray-200 overflow-auto p-4 flex flex-col">
            <div className="relative flex-grow">
              {editedPost.mediaUrl.length > 0 ? (
                <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={editedPost.mediaUrl[0]} 
                    alt="Post media" 
                    className="w-full h-auto object-cover"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition-colors"
                    onClick={() => handleDeleteMedia(0)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg mb-4">
                  <PlusCircle className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Add media</p>
                </div>
              )}

              {/* Media navigation dots */}
              {editedPost.mediaUrl.length > 1 && (
                <div className="flex justify-center gap-1 my-2">
                  {editedPost.mediaUrl.map((_, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "h-2 rounded-full", 
                        index === 0 ? "w-4 bg-blue-500" : "w-2 bg-gray-300"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Social platform toggles */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Platforms</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(editedPost.socialPlatforms).map(([platform, isActive]) => (
                  <div 
                    key={platform}
                    className={cn(
                      "flex items-center px-3 py-1.5 rounded-md cursor-pointer text-sm",
                      isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    )}
                    onClick={() => handlePlatformToggle(platform as PlatformName)}
                  >
                    <span className="font-bold mr-1">{platform.charAt(0)}</span>
                    <span>{platform}</span>
                    <div className="ml-auto">
                      <div 
                        className={cn(
                          "w-4 h-4 rounded-full border",
                          isActive 
                            ? "border-blue-500 bg-blue-500" 
                            : "border-gray-300 bg-white"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post type toggles */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Post Type</h3>
              <div className="flex gap-2">
                {Object.entries(editedPost.postType).map(([type, isActive]) => (
                  <div 
                    key={type}
                    className={cn(
                      "px-3 py-1.5 rounded-md cursor-pointer text-sm capitalize",
                      isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                    )}
                    onClick={() => handlePostTypeToggle(type as 'post' | 'story' | 'reel')}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full md:w-3/5 p-4 flex flex-col">
            {/* Title input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedPost.title}
                onChange={handleTextChange}
                placeholder="Add a title..."
              />
            </div>

            {/* Content textarea */}
            <div className="mb-4 flex-grow">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Caption</label>
                <span className="text-xs text-gray-400">{characterCount}/2000</span>
              </div>
              <textarea
                name="content"
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none flex-grow"
                value={editedPost.content}
                onChange={handleTextChange}
                placeholder="Write your caption..."
                maxLength={2000}
              />
            </div>

            {/* Hashtags input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hashtags</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedPost.hashtags.join(' ')}
                onChange={handleHashtagsChange}
                placeholder="Add hashtags..."
              />
            </div>

            {/* AI generation */}
            {onGenerate && (
              <div className="mb-4 flex items-end gap-2">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">AI Generate</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={generatePrompt}
                    onChange={(e) => setGeneratePrompt(e.target.value)}
                    placeholder="Generate content using AI..."
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                  onClick={handleGenerate}
                  disabled={!generatePrompt.trim()}
                >
                  Generate
                </button>
              </div>
            )}

            {/* Scheduled date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
              <input
                type="datetime-local"
                name="scheduledDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedPost.scheduledDate}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          {onDelete && (
            <button
              className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;