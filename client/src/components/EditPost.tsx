import React, { useState, useEffect, useRef } from 'react';
import { X, Edit, Trash2, PlusCircle, CalendarIcon, CheckSquare, XSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { format, parse, addDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';

// Define platform types
export type PlatformName = 'Instagram' | 'Facebook' | 'TikTok' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'YouTube' | 'Bluesky' | 'Google Business';

// Define post data interface
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
    setEditedPost(post);
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
    if (editedPost.id) {
      const event = new CustomEvent('calendarUpdated', { 
        detail: { type: 'update', eventId: editedPost.id }
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
      if (editedPost.id) {
        const event = new CustomEvent('calendarUpdated', { 
          detail: { type: 'delete', eventId: editedPost.id }
        });
        document.dispatchEvent(event);
      }
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col h-[80vh] max-h-[700px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <button 
            className="p-1 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex items-center">
            <h2 className="text-lg font-medium">Edit Post</h2>
            <button 
              className={cn(
                "ml-2 text-gray-600 hover:text-gray-900 cursor-pointer",
                isEditing && "text-blue-500"
              )}
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-5 h-5"></div> {/* Empty space for alignment */}
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
                  "flex flex-col items-center justify-center h-80 rounded-lg mb-4 border-2 border-dashed border-gray-300",
                  isEditing ? "bg-gray-100 cursor-pointer hover:bg-gray-200" : "bg-gray-50 opacity-75"
                )}>
                  <PlusCircle className={cn("w-10 h-10 mb-2", isEditing ? "text-gray-400" : "text-gray-300")} />
                  <p className={cn("text-sm", isEditing ? "text-gray-500" : "text-gray-400")}>
                    {isEditing ? "Click to upload media" : "No media"}
                  </p>
                  {isEditing && (
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
                            mediaUrl: [...prev.mediaUrl, url]
                          }));
                        }
                      }}
                    />
                  )}
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
              <h3 className="text-sm text-gray-700 font-medium mb-3">Platforms</h3>
              
              {/* Platform toggles - Row 1 */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                {Object.entries(editedPost.socialPlatforms)
                  .slice(0, 5)
                  .map(([platform, isSelected]) => (
                    <button
                      key={platform}
                      className={cn(
                        "flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        isSelected 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                        !isEditing && "cursor-default"
                      )}
                      onClick={() => isEditing && handlePlatformToggle(platform as PlatformName)}
                      disabled={!isEditing}
                    >
                      {platform === 'X/Twitter' ? 'X' : 
                       platform === 'Google Business' ? 'Google' : platform}
                    </button>
                  ))
                }
              </div>
              
              {/* Platform toggles - Row 2 */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {Object.entries(editedPost.socialPlatforms)
                  .slice(5)
                  .map(([platform, isSelected]) => (
                    <button
                      key={platform}
                      className={cn(
                        "flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        isSelected 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                        !isEditing && "cursor-default"
                      )}
                      onClick={() => isEditing && handlePlatformToggle(platform as PlatformName)}
                      disabled={!isEditing}
                    >
                      {platform === 'X/Twitter' ? 'X' : 
                       platform === 'Google Business' ? 'Google' : platform}
                    </button>
                  ))
                }
              </div>
              
              {/* Post Type Selection */}
              <h3 className="text-sm text-gray-700 font-medium mb-2">Post Type</h3>
              <div className="flex gap-2 mb-4">
                {Object.entries(editedPost.postType).map(([type, isSelected]) => (
                  <button
                    key={type}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex-1",
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
          </div>

          {/* Right side - Post details */}
          <div className="w-full md:w-7/12 p-4 flex flex-col h-full overflow-y-auto">
            {/* Title input */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500",
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
              {!isEditing || editedPost.content.includes("Netflix and Chill") ? (
                <div className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-md resize-none max-h-40 overflow-y-auto",
                  !isEditing && "opacity-75 bg-gray-50"
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
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  value={editedPost.content}
                  onChange={handleTextChange}
                  placeholder="Write your caption..."
                  maxLength={2200}
                  readOnly={!isEditing}
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
                  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500",
                  !isEditing && "opacity-75 bg-gray-50 cursor-default"
                )}
                value={editedPost.hashtags.map(tag => `#${tag}`).join(' ')}
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
                    "bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center w-auto transition-colors",
                    isEditing ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed bg-blue-400"
                  )}
                  onClick={() => {
                    if (isEditing) {
                      setGeneratePrompt("Generate engaging content about " + editedPost.title);
                      handleGenerate();
                    }
                  }}
                  disabled={!isEditing}
                >
                  AI Generate
                </button>
              </div>
            )}
            
            {/* Scheduling Controls */}
            <div className="mt-auto">
              <div className="flex justify-between items-center">
                {/* Calendar Date Picker */}
                <div 
                  className={cn(
                    "flex items-center bg-gray-200 rounded-md px-3 py-2 space-x-2",
                    isEditing ? "cursor-pointer hover:bg-gray-300" : "opacity-75 bg-gray-100"
                  )}
                  onClick={() => isEditing && handleDateChange()}
                >
                  <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                    {format(date, 'MMM d, yyyy')} • {inputHour}:{inputMinute} {inputAmPm}
                  </span>
                  <CalendarIcon className="text-gray-700 h-4 w-4" />
                </div>
                
                {/* Schedule Button with Dropdown */}
                <div className={cn("flex rounded-lg shadow-sm relative", !isEditing && "opacity-70")}>
                  <button 
                    className={cn(
                      "px-6 py-2 text-sm font-medium bg-cyan-500 text-white whitespace-nowrap rounded-l-lg focus:outline-none",
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
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 divide-y divide-gray-100"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleToggleDropdownOption('schedule');
                          }}
                          className="group flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          role="menuitem"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Schedule Post
                        </button>
                        
                        <button
                          onClick={() => {
                            handleToggleDropdownOption('draft');
                          }}
                          className="group flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          role="menuitem"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Draft Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Calendar Popup */}
              {isCalendarOpen && (
                <div 
                  ref={calendarRef}
                  className="fixed right-1/4 top-1/3 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3"
                >
                  <div className="flex flex-col">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={handleSelectDate}
                      className="rounded-md border"
                    />
                    <div className="mt-3 border-t pt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Select Time:</h4>
                        <div className="flex items-center space-x-2">
                            {/* Hour Dropdown */}
                            <select 
                                value={inputHour} 
                                onChange={handleHourChange} 
                                className="hour-select w-auto p-1.5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm time-select"
                                size={1}
                            >
                                {hourOptions.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <span className="text-gray-700">:</span>
                            {/* Minute Dropdown with controlled height */}
                            <select 
                                value={inputMinute} 
                                onChange={handleMinuteChange} 
                                className="minute-select w-auto p-1.5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm time-select"
                                size={1}
                            >
                                {minuteOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                {/* Add a "Custom..." option that shows all minutes */}
                                <option value="custom" disabled style={{fontStyle: 'italic', color: '#aaa'}}>───────────</option>
                                {allMinuteOptions
                                    .filter(m => !minuteOptions.includes(m)) // Only show minutes not already in the list
                                    .map(m => <option key={`all-${m}`} value={m}>{m}</option>)}
                            </select>
                            {/* AM/PM Selector */}
                            <select 
                                value={inputAmPm} 
                                onChange={handleAmPmChange} 
                                className="w-auto p-1.5 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;