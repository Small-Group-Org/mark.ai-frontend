import React, { useState, useEffect, useRef } from 'react';
import { X, Edit, Trash2, PlusCircle, CalendarIcon, CheckSquare, XSquare, ChevronDown, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { format, parse, addDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { PlatformName } from '@/types';
export interface PostData {
  postId: string | number;
  userId: string | number;
  title: string;
  content: string;
  hashtag: string;
  hashtags?: string[];
  mediaUrls: string[];
  socialPlatforms: {
    facebook: boolean;
    instagram: boolean;
    twitter: boolean;
    linkedin: boolean;
  };
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledDate: string;
  postType: {
    post: boolean;
    story: boolean;
    reel: boolean;
  };
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
  const [showGeneratePrompt, setShowGeneratePrompt] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedButtonType, setSelectedButtonType] = useState<'schedule' | 'draft'>('schedule');
  
  // Calendar and time selection state
  const [date, setDate] = useState<Date>(new Date(post.scheduledDate));
  const [inputHour, setInputHour] = useState<string>(format(new Date(post.scheduledDate), 'h'));
  const [inputMinute, setInputMinute] = useState<string>(format(new Date(post.scheduledDate), 'mm'));
  const [inputAmPm, setInputAmPm] = useState<string>(format(new Date(post.scheduledDate), 'a').toUpperCase());
  
  // Hour/minute options for dropdowns
  const hourOptions = Array.from({ length: 12 }, (_, i) => ((i + 1).toString()));
  const minuteOptions = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  const allMinuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Update character count when content changes
  useEffect(() => {
    setCharacterCount(editedPost.content.length);
  }, [editedPost.content]);

  // Initialize edited post when post prop changes
  useEffect(() => {
    if (post) {
      setEditedPost(post);
      // Initialize date and time fields
      const postDate = new Date(post.scheduledDate);
      setDate(postDate);
      setInputHour(format(postDate, 'h'));
      setInputMinute(format(postDate, 'mm'));
      setInputAmPm(format(postDate, 'a').toUpperCase());
    }
  }, [post]);
  
  // Handle clicks outside calendar and dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Handle text input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle platform toggle
  const handlePlatformToggle = (platform: keyof typeof editedPost.socialPlatforms) => {
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
      .map(tag => tag.startsWith('#') ? tag.substring(1) : tag)
      .filter(tag => tag.length > 0);
    
    setEditedPost(prev => ({
      ...prev,
      hashtags: hashtagsList
    }));
  };

  // Handle media deletion
  const handleDeleteMedia = (index: number) => {
    setEditedPost(prev => ({
      ...prev,
      mediaUrls: prev.mediaUrls.filter((_, i) => i !== index)
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

  // Handle calendar date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const currentDate = new Date(editedPost.scheduledDate);
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      
      date.setHours(hours);
      date.setMinutes(minutes);
      
      setEditedPost({
        ...editedPost,
        scheduledDate: date.toISOString()
      });
      setIsCalendarOpen(false);
    }
  };
  
  // Handle time change
  const handleTimeChange = (hours: number, minutes: number) => {
    const scheduledDate = new Date(editedPost.scheduledDate);
    scheduledDate.setHours(hours);
    scheduledDate.setMinutes(minutes);
    
    setEditedPost({
      ...editedPost,
      scheduledDate: scheduledDate.toISOString()
    });
  };
  
  // Handle date change functions
  const handleDateChange = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  
  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    // Keep the time but update the date
    const currentDate = new Date(editedPost.scheduledDate);
    const newDate = new Date(selectedDate);
    
    // Extract hours and minutes based on the AM/PM format
    let hours = parseInt(inputHour);
    if (inputAmPm === 'PM' && hours < 12) hours += 12;
    if (inputAmPm === 'AM' && hours === 12) hours = 0;
    
    newDate.setHours(hours);
    newDate.setMinutes(parseInt(inputMinute));
    
    // Update both the internal calendar state and the post data
    setDate(newDate);
    setEditedPost(prev => ({
      ...prev,
      scheduledDate: newDate.toISOString()
    }));
  };
  
  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputHour(e.target.value);
    updateTimeInDate(e.target.value, inputMinute, inputAmPm);
  };
  
  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputMinute(e.target.value);
    updateTimeInDate(inputHour, e.target.value, inputAmPm);
  };
  
  const handleAmPmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputAmPm(e.target.value);
    updateTimeInDate(inputHour, inputMinute, e.target.value);
  };
  
  const updateTimeInDate = (hour: string, minute: string, ampm: string) => {
    const currentDate = new Date(editedPost.scheduledDate);
    
    // Convert hour to 24-hour format if needed
    let hours = parseInt(hour);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    currentDate.setHours(hours);
    currentDate.setMinutes(parseInt(minute));
    
    setDate(currentDate);
    setEditedPost(prev => ({
      ...prev,
      scheduledDate: currentDate.toISOString()
    }));
  };
  
  // Handle toggle between Schedule and Draft
  const handleToggleDropdownOption = (option: 'schedule' | 'draft') => {
    setSelectedButtonType(option);
    setIsDropdownOpen(false);
  };
  
  // Handle schedule button click
  const handleSchedulePost = () => {
    if (!isEditing) return;
    
    // Update post with current settings
    onSave(editedPost);
    setIsEditing(false);
    
    const actionText = selectedButtonType === 'schedule' ? 'scheduled' : 'saved as draft';
    toast({
      title: selectedButtonType === 'schedule' ? "Post Scheduled" : "Draft Saved",
      description: `Your post has been ${actionText}.`,
    });
    
    // Notify calendar of the update if this is a calendar event
    if (editedPost.postId) {
      const event = new CustomEvent('calendarUpdated', { 
        detail: { type: 'update', eventId: editedPost.postId }
      });
      document.dispatchEvent(event);
    }
  };
  
  // Original save function - keeping for compatibility
  const handleSave = handleSchedulePost;

  // Handle delete
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted.",
      });
      
      // Notify calendar of the deletion if this is a calendar event
      if (editedPost.postId) {
        const event = new CustomEvent('calendarUpdated', { 
          detail: { type: 'delete', eventId: editedPost.postId }
        });
        document.dispatchEvent(event);
      }
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  }

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-hidden"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-[95%] sm:w-[85%] md:w-[80%] xl:w-[64%] flex flex-col h-[90vh] md:h-[80vh] max-h-[700px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b rounded-tr-[8px] rounded-tl-[8px] border-gray-200 sticky top-0 bg-white z-10">
          <div className="w-5 h-5"></div> {/* Empty space for alignment */}

          <div className="flex items-center">
            <h2 className="text-lg font-medium mr-2 text-gray-800 dark:text-gray-100">Post Details</h2>
            {!isEditing && <button 
              className={cn(
                "text-gray-600 hover:text-gray-900 cursor-pointer flex items-center",
                isEditing && "text-blue-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(!isEditing);
              }}
            >
              <Edit className="w-5 h-5" />
            </button>}
          </div>
          
          <button 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden rounded-bl-[8px] rounded-br-[8px]">
          {/* Left side - Media preview (desktop) */}
          <div className="hidden md:flex w-1/2 border-r border-gray-200 p-4 flex-col">
            <div className="relative flex-grow">
              {editedPost.mediaUrls.length > 0 ? (
                <div className="relative mb-4 rounded-lg overflow-hidden h-64 md:h-72 lg:h-80">
                  <img 
                    src={editedPost.mediaUrls[0]} 
                    alt="Post media" 
                    className="object-cover w-full h-full"
                  />
                  {isEditing && (
                    <button 
                      className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
                      onClick={() => handleDeleteMedia(0)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className={cn(
                  "flex flex-col items-center justify-center h-64 md:h-72 lg:h-80 rounded-lg mb-4 border-2 border-dashed border-gray-300",
                  isEditing ? "bg-gray-100 cursor-pointer hover:bg-gray-200" : "bg-gray-50"
                )}>
                  {isEditing ? (
                    <>
                      <PlusCircle className="w-10 h-10 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Click to upload media</p>
                      <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setEditedPost(prev => ({
                              ...prev,
                              mediaUrls: [...prev.mediaUrls, url]
                            }));
                          }
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Image className="w-10 h-10 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400">No image</p>
                    </>
                  )}
                </div>
              )}

              {/* Media navigation dots */}
              {editedPost.mediaUrls.length > 0 && (
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

            {/* Post Type Selection - Moved from bottom to top */}
            <div className="mb-4">
              <h3 className="text-sm text-gray-700 font-medium mb-2">Post Type</h3>
              <div className="flex gap-2">
                {Object.entries(editedPost.postType).map(([type, isSelected]) => (
                  <button
                    key={type}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex-1",
                      isSelected 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      !isEditing && "cursor-default"
                    )}
                    onClick={() => isEditing && handlePostTypeToggle(type as 'post' | 'story' | 'reel')}
                    disabled={!isEditing}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Social platform toggles */}
            <div className="mt-4 border-t border-gray-100 pt-4">
              <h3 className="text-sm text-gray-700 font-medium mb-3">Platforms</h3>
              
              {/* Platform toggles in a single grid */}
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 mb-4">
                {Object.entries(editedPost.socialPlatforms).map(([platform, isSelected]) => (
                  <button
                    key={platform}
                    className={cn(
                      "flex items-center justify-center px-1 py-1.5 rounded-md text-xs font-medium transition-colors",
                      isSelected 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      !isEditing && "cursor-default"
                    )}
                    onClick={() => isEditing && handlePlatformToggle(platform as keyof typeof editedPost.socialPlatforms)}
                    disabled={!isEditing}
                  >
                    {platform === 'X/Twitter' ? 'X' : 
                     platform === 'Google Business' ? 'Google' :
                     platform === 'Instagram' ? 'IG' : platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile view: stacked layout */}
          <div className="md:hidden flex flex-col w-full h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                {/* Media preview for mobile */}
                <div className="my-4 mx-4 relative">
                  {editedPost.mediaUrls.length > 0 ? (
                    <div className="relative rounded-lg overflow-hidden h-64">
                      <img 
                        src={editedPost.mediaUrls[0]} 
                        alt="Post media" 
                        className="object-cover w-full h-full"
                      />
                      {isEditing && (
                        <button 
                          className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMedia(0);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className={cn(
                      "flex flex-col items-center justify-center h-64 rounded-lg border-2 border-dashed border-gray-300",
                      isEditing ? "bg-gray-100 cursor-pointer hover:bg-gray-200" : "bg-gray-50"
                    )}>
                      {isEditing ? (
                        <>
                          <PlusCircle className="w-10 h-10 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">Click to upload media</p>
                          <label 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                e.stopPropagation();
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = URL.createObjectURL(file);
                                  setEditedPost(prev => ({
                                    ...prev,
                                    mediaUrls: [...prev.mediaUrls, url]
                                  }));
                                }
                              }}
                            />
                          </label>
                        </>
                      ) : (
                        <>
                          <Image className="w-10 h-10 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-400">No image</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Title input (Mobile) */}
                <div className={cn(
                  "mb-3 px-4",
                  !isEditing && "opacity-50"
                )}>
                  <label className="block text-sm text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    className={cn(
                      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800",
                      !isEditing && "bg-gray-50 cursor-default"
                    )}
                    value={editedPost.title}
                    onChange={handleTextChange}
                    placeholder="Enter post title"
                    readOnly={!isEditing}
                  />
                </div>
                
                {/* Content textarea (Mobile) */}
                <div className={cn(
                  "mb-3 px-4",
                  !isEditing && "opacity-50"
                )}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm text-gray-600">Caption</label>
                    <span className="text-xs text-gray-400">{characterCount}/2,200</span>
                  </div>
                  {!isEditing ? (
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none max-h-60 overflow-y-auto text-gray-800 bg-gray-50">
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
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-gray-800"
                      value={editedPost.content}
                      onChange={handleTextChange}
                      placeholder="Write your caption..."
                      maxLength={2200}
                    />
                  )}
                </div>
                
                {/* Hashtags input (Mobile) */}
                <div className={cn(
                  "mb-4 px-4",
                  !isEditing && "opacity-50"
                )}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm text-gray-600">Hashtags</label>
                    <span className="text-xs text-gray-400">0/2,200</span>
                  </div>
                  <input
                    type="text"
                    className={cn(
                      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800",
                      !isEditing && "bg-gray-50 cursor-default"
                    )}
                    value={editedPost.hashtags?.map(tag => `#${tag}`).join(' ') || ''}
                    onChange={handleHashtagsChange}
                    placeholder="#hashtag1 #hashtag2 #hashtag3"
                    readOnly={!isEditing}
                  />
                </div>
                
                {/* AI Generation Button (Mobile) */}
                {onGenerate && (
                  <div className={cn(
                    "mb-4 px-4",
                    !isEditing && "opacity-50"
                  )}>
                    <button 
                      className={cn(
                        "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 w-full",
                        isEditing 
                          ? "hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          : "cursor-not-allowed"
                      )}
                      onClick={() => {
                        if (isEditing) {
                          setGeneratePrompt("Generate engaging content about " + editedPost.title);
                          handleGenerate();
                        }
                      }}
                      disabled={!isEditing}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      AI Generate
                    </button>
                  </div>
                )}

                {/* Platform toggles for mobile */}
                <div className={cn(
                  "px-4 mb-4",
                  !isEditing && "opacity-50"
                )}>
                  <h3 className="text-sm text-gray-700 font-medium mb-2">Platforms</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(editedPost.socialPlatforms).map(([platform, isSelected]) => (
                      <button
                        key={platform}
                        className={cn(
                          "flex items-center justify-center px-2 py-1.5 rounded-md text-xs font-medium transition-colors",
                          isSelected 
                            ? "bg-blue-500 text-white" 
                            : "bg-gray-100 text-gray-600",
                          !isEditing && "cursor-default"
                        )}
                        onClick={() => isEditing && handlePlatformToggle(platform as keyof typeof editedPost.socialPlatforms)}
                        disabled={!isEditing}
                      >
                        {platform === 'X/Twitter' ? 'X' : 
                         platform === 'Google Business' ? 'Google' :
                         platform === 'Instagram' ? 'IG' : platform}
                      </button>
                    ))}
                  </div>

                  {/* Post Type Selection for mobile */}
                  <h3 className="text-sm text-gray-700 font-medium mb-2">Post Type</h3>
                  <div className="flex gap-2 mb-4">
                    {Object.entries(editedPost.postType).map(([type, isSelected]) => (
                      <button
                        key={type}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex-1",
                          isSelected 
                            ? "bg-blue-500 text-white" 
                            : "bg-gray-100 text-gray-600",
                          !isEditing && "cursor-default"
                        )}
                        onClick={() => isEditing && handlePostTypeToggle(type as 'post' | 'story' | 'reel')}
                        disabled={!isEditing}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduling Controls for mobile - Fixed at bottom */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-2">
                {/* Calendar Date Picker */}
                <div 
                  className={cn(
                    "flex items-center bg-gray-200 rounded-md px-3 py-2 space-x-2 w-full",
                    isEditing ? "cursor-pointer hover:bg-gray-300" : "opacity-75 bg-gray-100"
                  )}
                  onClick={() => isEditing && handleDateChange()}
                >
                  <span className="text-sm text-gray-700 font-medium">
                    {format(date, 'MMM d, yyyy')} • {inputHour}:{inputMinute} {inputAmPm}
                  </span>
                  <CalendarIcon className="text-gray-700 h-4 w-4 flex-shrink-0 ml-auto" />
                </div>
                
                {/* Schedule Button with Dropdown */}
                <div className={cn("flex rounded-lg shadow-sm relative", !isEditing && "opacity-70")}>
                  <button 
                    className={cn(
                      "px-6 py-2 text-sm font-medium bg-cyan-500 text-white whitespace-nowrap rounded-l-lg focus:outline-none flex-1",
                      isEditing ? "hover:bg-cyan-600" : "bg-cyan-400 cursor-not-allowed"
                    )}
                    onClick={() => isEditing && handleSchedulePost()}
                    disabled={!isEditing}
                  >
                    {selectedButtonType === 'schedule' ? 'Schedule Post' : 'Save Draft'}
                  </button>
                  <button 
                    className={cn(
                      "px-2 py-2 bg-cyan-500 text-white rounded-r-lg focus:outline-none",
                      isEditing ? "hover:bg-cyan-700" : "bg-cyan-400 cursor-not-allowed"
                    )}
                    onClick={() => isEditing && setIsDropdownOpen(!isDropdownOpen)}
                    disabled={!isEditing}
                  >
                    <ChevronDown className={`h-5 w-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Post details (desktop) */}
          <div className="hidden md:flex w-full md:w-1/2 p-4 flex-col h-full">
            {/* Title input */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800",
                  !isEditing && "opacity-75 bg-gray-50 cursor-default"
                )}
                value={editedPost.title}
                onChange={handleTextChange}
                placeholder="Enter post title"
                readOnly={!isEditing}
              />
            </div>

            {/* Content textarea with rich preview */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-gray-600">Caption</label>
                <span className="text-xs text-gray-400">{characterCount}/2,200</span>
              </div>
              {!isEditing ? (
                <div className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-[12rem] overflow-y-auto text-gray-800",
                  "opacity-75 bg-gray-50"
                )}>
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
                  className="w-full h-[12rem] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none text-gray-800"
                  value={editedPost.content}
                  onChange={handleTextChange}
                  placeholder="Write your caption..."
                  maxLength={2200}
                />
              )}
            </div>

            {/* Hashtags input */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-gray-600">Hashtags</label>
                <span className="text-xs text-gray-400">0/2,200</span>
              </div>
              <input
                type="text"
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800",
                  !isEditing && "opacity-75 bg-gray-50 cursor-default"
                )}
                value={editedPost.hashtags?.map(tag => `#${tag}`).join(' ') || ''}
                onChange={handleHashtagsChange}
                placeholder="#hashtag1 #hashtag2 #hashtag3"
                readOnly={!isEditing}
              />
            </div>

            {/* AI Generation Button */}
            {onGenerate && (
              <div className="mb-6">
                <button
                  className={cn(
                    "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600",
                    isEditing 
                      ? "hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                      : "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (isEditing) {
                      setGeneratePrompt("Generate engaging content about " + editedPost.title);
                      handleGenerate();
                    }
                  }}
                  disabled={!isEditing}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  AI Generate
                </button>
              </div>
            )}
            
            {/* Scheduling Controls - Made responsive */}
            <div className="mt-auto">
              <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
                {/* Calendar Date Picker */}
                <div 
                  className={cn(
                    "flex items-center bg-gray-200 rounded-md px-3 py-2 space-x-2 w-full lg:w-auto",
                    isEditing ? "cursor-pointer hover:bg-gray-300" : "opacity-75 bg-gray-100"
                  )}
                  onClick={() => isEditing && handleDateChange()}
                >
                  <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                    {format(date, 'MMM d, yyyy')} • {inputHour}:{inputMinute} {inputAmPm}
                  </span>
                  <CalendarIcon className="text-gray-700 h-4 w-4 flex-shrink-0" />
                </div>
                
                {/* Schedule Button with Dropdown */}
                <div className={cn("flex rounded-lg shadow-sm relative flex-1 lg:flex-initial", !isEditing && "opacity-70")}>
                  <button 
                    className={cn(
                      "px-6 py-2 text-sm font-medium bg-cyan-500 text-white whitespace-nowrap rounded-l-lg focus:outline-none flex-1 lg:flex-initial",
                      isEditing ? "hover:bg-cyan-600" : "bg-cyan-400 cursor-not-allowed"
                    )}
                    onClick={() => isEditing && handleSchedulePost()}
                    disabled={!isEditing}
                  >
                    {selectedButtonType === 'schedule' ? 'Schedule Post' : 'Save Draft'}
                  </button>
                  <button 
                    className={cn(
                      "px-2 py-2 bg-cyan-500 text-white rounded-r-lg focus:outline-none",
                      isEditing ? "hover:bg-cyan-700" : "bg-cyan-400 cursor-not-allowed"
                    )}
                    onClick={() => isEditing && setIsDropdownOpen(!isDropdownOpen)}
                    disabled={!isEditing}
                  >
                    <ChevronDown className={`h-5 w-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;