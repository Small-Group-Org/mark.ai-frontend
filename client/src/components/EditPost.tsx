import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, PlusCircle, CalendarIcon, Calendar, CheckSquare, XSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col h-[90vh] max-h-[800px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <h2 className="text-lg font-medium">Post Details</h2>
            <Edit className="w-5 h-5 ml-2 text-gray-600" />
          </div>
          <button 
            className="p-1 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-grow overflow-hidden">
          {/* Left side - Media preview */}
          <div className="w-full md:w-5/12 border-r border-gray-200 p-4 flex flex-col">
            <div className="relative flex-grow">
              {editedPost.mediaUrl.length > 0 ? (
                <div className="relative mb-4 rounded-lg overflow-hidden h-80">
                  <img 
                    src={editedPost.mediaUrl[0]} 
                    alt="Post media" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-gray-500/80 rounded-full p-1.5 text-white hover:bg-gray-700/80 transition-colors"
                    onClick={() => handleDeleteMedia(0)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg mb-4">
                  <PlusCircle className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Add media</p>
                </div>
              )}

              {/* Media navigation dots */}
              {editedPost.mediaUrl.length > 0 && (
                <div className="flex justify-center gap-1 my-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "h-2 w-2 rounded-full", 
                        index === 0 ? "bg-blue-500" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Social platform toggles */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5",
                    editedPost.socialPlatforms['Facebook'] ? "text-gray-900" : "text-gray-500"
                  )}
                  onClick={() => handlePlatformToggle('Facebook')}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-1.5">F</span>
                    <span>Facebook</span>
                  </div>
                  <div 
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      editedPost.socialPlatforms['Facebook'] ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    {editedPost.socialPlatforms['Facebook'] ? (
                      <div className="w-4 h-4 bg-blue-500" />
                    ) : null}
                  </div>
                </div>
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5",
                    editedPost.socialPlatforms['Instagram'] ? "text-gray-900" : "text-gray-500"
                  )}
                  onClick={() => handlePlatformToggle('Instagram')}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-1.5">I</span>
                    <span>Instagram</span>
                  </div>
                  <div 
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      editedPost.socialPlatforms['Instagram'] ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    {editedPost.socialPlatforms['Instagram'] ? (
                      <div className="w-4 h-4 bg-blue-500" />
                    ) : null}
                  </div>
                </div>
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5",
                    editedPost.socialPlatforms['TikTok'] ? "text-gray-900" : "text-gray-500"
                  )}
                  onClick={() => handlePlatformToggle('TikTok')}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-1.5">T</span>
                    <span>TikTok</span>
                  </div>
                  <div 
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      editedPost.socialPlatforms['TikTok'] ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    {editedPost.socialPlatforms['TikTok'] ? (
                      <div className="w-4 h-4 bg-blue-500" />
                    ) : null}
                  </div>
                </div>
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5",
                    editedPost.socialPlatforms['X/Twitter'] ? "text-gray-900" : "text-gray-500"
                  )}
                  onClick={() => handlePlatformToggle('X/Twitter')}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-1.5">X</span>
                    <span>X/Twitter</span>
                  </div>
                  <div 
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      editedPost.socialPlatforms['X/Twitter'] ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    {editedPost.socialPlatforms['X/Twitter'] ? (
                      <div className="w-4 h-4 bg-blue-500" />
                    ) : null}
                  </div>
                </div>
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5",
                    editedPost.socialPlatforms['Reddit'] ? "text-gray-900" : "text-gray-500"
                  )}
                  onClick={() => handlePlatformToggle('Reddit')}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-1.5">R</span>
                    <span>Reddit</span>
                  </div>
                  <div 
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      editedPost.socialPlatforms['Reddit'] ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    {editedPost.socialPlatforms['Reddit'] ? (
                      <div className="w-4 h-4 bg-blue-500" />
                    ) : null}
                  </div>
                </div>
                <div 
                  className={cn(
                    "flex items-center justify-between py-1.5",
                    editedPost.socialPlatforms['YouTube'] ? "text-gray-900" : "text-gray-500"
                  )}
                  onClick={() => handlePlatformToggle('YouTube')}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-1.5">Y</span>
                    <span>YouTube</span>
                  </div>
                  <div 
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      editedPost.socialPlatforms['YouTube'] ? "bg-blue-500 text-white" : "bg-gray-200"
                    )}
                  >
                    {editedPost.socialPlatforms['YouTube'] ? (
                      <div className="w-4 h-4 bg-blue-500" />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full md:w-7/12 p-6 flex flex-col">
            {/* Title input */}
            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-1.5">Title</label>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={editedPost.title}
                onChange={handleTextChange}
                placeholder="Add a title..."
              />
            </div>

            {/* Content textarea with rich preview */}
            <div className="mb-5 flex-grow">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm text-gray-600">Caption</label>
                <span className="text-xs text-gray-400">{characterCount}/2,200</span>
              </div>
              {editedPost.content ? (
                <div className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none overflow-auto">
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
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  value={editedPost.content}
                  onChange={handleTextChange}
                  placeholder="Write your caption..."
                  maxLength={2200}
                />
              )}
            </div>

            {/* Hashtags input */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm text-gray-600">Hashtags</label>
                <span className="text-xs text-gray-400">0/2,200</span>
              </div>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={editedPost.hashtags.join(' ')}
                onChange={handleHashtagsChange}
                placeholder="#hashtag1 #hashtag2 #hashtag3"
              />
            </div>

            {/* AI Generation Button */}
            {onGenerate && (
              <div className="mb-6">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center w-full transition-colors"
                  onClick={() => {
                    setGeneratePrompt("Generate engaging content about " + editedPost.title);
                    handleGenerate();
                  }}
                >
                  AI Generate
                </button>
              </div>
            )}
            
            {/* Scheduling Controls */}
            <div className="mt-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600 bg-gray-100 py-2 px-4 rounded">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{format(new Date(editedPost.scheduledDate), 'MMM d, yyyy • h:mm a')}</span>
                </div>
                
                <button
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={handleSave}
                >
                  Schedule Post
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;