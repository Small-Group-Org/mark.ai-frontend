import React, { useState, useRef, useEffect } from 'react';
import PlatformToggle from './PlatformToggle';
import { CalendarTodayIcon } from './IconComponents';
import SocialMediaPostPreview from '../ui/social-media-post-preview';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';

// Define the PostData interface based on the provided JSON structure
export interface PostData {
  post: {
    userId: number;
    title: string;
    content: string;
    mediaUrl: string[];
    hashtags: string[];
    socialPlatforms: Record<PlatformName, boolean>;
    postType: {
      feedPost: boolean;
      igStory: boolean;
      reel: boolean;
      youtubeShorts: boolean;
    };
    scheduledDate: string; // ISO date string
  };
}

// Declare the global function on the Window interface
declare global {
  interface Window {
    updatePostData: (data: PostData) => void;
  }
}

// Define platform names type for state management
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

const PostPreviewPanel = () => {
    // Post content states
    const [postTitle, setPostTitle] = useState<string | null>("New Product Launch");
    const [postContent, setPostContent] = useState<string | null>("We're excited to announce our newest product line! After months of development, we're proud to bring you the most innovative solution for your needs.");
    const [postHashtags, setPostHashtags] = useState<string[]>(['productlaunch', 'innovation', 'technology']);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    
    // Platform toggles state
    const [activePlatforms, setActivePlatforms] = useState<Record<PlatformName, boolean>>({
        'Bluesky': false,
        'Facebook': false,
        'Google Business': false,
        'Instagram': true,
        'X/Twitter': true,
        'Reddit': false,
        'Telegram': false,
        'Threads': false,
        'TikTok': true,
        'YouTube': true,
    });
    
    // Post type selection state
    const [postType, setPostType] = useState({
        feedPost: true,
        igStory: false,
        reel: false,
        youtubeShorts: false
    });
    
    // State for managing actual date object
    const [date, setDate] = useState<Date>(new Date(2025, 4, 5, 9, 0)); // May 5, 2025, 9:00 AM
    
    // State for formatted date string display
    const [scheduledDate, setScheduledDate] = useState("May 5, 2025 • 9:00 AM");
    
    // State to control calendar visibility
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    
    // Time options for dropdown
    const timeOptions = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];
    
    // State for selected time
    const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
    
    // Reference for calendar dropdown (to detect clicks outside)
    const calendarRef = useRef<HTMLDivElement>(null);
    
    // Update the formatted date string whenever date changes
    useEffect(() => {
        const formattedDate = format(date, "MMMM d, yyyy");
        setScheduledDate(`${formattedDate} • ${selectedTime}`);
    }, [date, selectedTime]);
    
    // Handle clicking outside calendar to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // This is the function that will update all the state from the external JSON
    const updatePostData = (data: PostData) => {
        if (!data || !data.post) {
            console.error("Invalid post data");
            return false;
        }

        console.log("Updating post data with:", data.post);

        // Update title and content
        setPostTitle(data.post.title);
        setPostContent(data.post.content);
        
        // Update hashtags
        if (Array.isArray(data.post.hashtags)) {
            setPostHashtags(data.post.hashtags);
        }
        
        // Update image URL (take first if it's an array)
        if (data.post.mediaUrl && data.post.mediaUrl.length > 0) {
            setImageUrl(data.post.mediaUrl[0]);
        }
        
        // Update platform toggles
        if (data.post.socialPlatforms) {
            setActivePlatforms(data.post.socialPlatforms);
        }
        
        // Update post type toggles
        if (data.post.postType) {
            setPostType(data.post.postType);
        }
        
        // Update date/time if provided
        if (data.post.scheduledDate) {
            try {
                const scheduledDate = parseISO(data.post.scheduledDate);
                setDate(scheduledDate);
                
                // Format the time string
                const hours = scheduledDate.getHours();
                const minutes = scheduledDate.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const hour12 = hours % 12 || 12;
                const timeString = `${hour12}:${minutes === 0 ? '00' : minutes} ${ampm}`;
                
                // Either find matching time in options or use custom one
                const bestTimeMatch = timeOptions.find(t => t === timeString) || timeString;
                setSelectedTime(bestTimeMatch);
            } catch (error) {
                console.error("Error parsing date:", error);
            }
        }
        
        return true;
    };
    
    // Register global function on mount
    useEffect(() => {
        console.log("PostPreviewPanel mounted - registering global function");
        
        // Set the global function directly 
        window.updatePostData = (data: PostData) => {
            return updatePostData(data);
        };
        
        // Initial data
        const sampleData = {
            post: {
                userId: 123,
                title: "New Product Launch",
                content: "We're excited to announce our newest product line! After months of development, we're proud to bring you the most innovative solution for your needs.",
                mediaUrl: [],
                hashtags: ["productlaunch", "innovation", "technology"],
                socialPlatforms: {
                    'Bluesky': false,
                    'Facebook': false,
                    'Google Business': false,
                    'Instagram': true,
                    'X/Twitter': true,
                    'Reddit': false,
                    'Telegram': false,
                    'Threads': false,
                    'TikTok': true,
                    'YouTube': true
                },
                postType: {
                    feedPost: true,
                    igStory: false,
                    reel: false,
                    youtubeShorts: false
                },
                scheduledDate: "2025-05-05T09:00:00Z"
            }
        };
        
        // Initialize with sample data
        updatePostData(sampleData);
        
        // Cleanup on unmount
        return () => {
            window.updatePostData = undefined as any;
        };
    }, []);
    
    // Toggle calendar visibility
    const handleDateChange = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };
    
    // Handle date selection from calendar
    const handleSelectDate = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate);
        }
    };
    
    // Handle time selection
    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setIsCalendarOpen(false);
    };
    
    // Handle schedule button click
    const handleSchedulePost = () => {
        // Display a confirmation in the console (would be an API call in a real app)
        console.log(`Post scheduled for: ${scheduledDate}`);
        alert(`Post successfully scheduled for: ${scheduledDate}`);
    };

    // Handle platform toggle click
    const handlePlatformToggle = (platformName: PlatformName) => {
        setActivePlatforms(prev => ({
            ...prev,
            [platformName]: !prev[platformName],
        }));
    };

    // Color definitions
    const previewPanelBg = 'bg-gray-100';
    const postPreviewCardBg = 'bg-white';
    const postPreviewBorder = 'border-gray-200';
    const postPreviewHeaderText = 'text-gray-800';
    const platformSectionBg = 'bg-gray-50';
    const activeButtonBg = 'bg-blue-500';
    const inactiveButtonText = 'text-gray-500';
    const scheduleButtonBg = 'bg-cyan-500';
    const datePickerBg = 'bg-gray-200';
    const datePickerText = 'text-gray-700';

    // Platform Data
    const platformsRow1: { name: PlatformName; icon: string }[] = [
        { name: 'Bluesky', icon: 'B' },
        { name: 'Facebook', icon: 'f' },
        { name: 'Google Business', icon: 'G' },
        { name: 'Instagram', icon: 'I' },
        { name: 'X/Twitter', icon: 'X' },
    ];
    const platformsRow2: { name: PlatformName; icon: string }[] = [
        { name: 'Reddit', icon: 'R' },
        { name: 'Telegram', icon: 'T' },
        { name: 'Threads', icon: '@' },
        { name: 'TikTok', icon: '♪' },
        { name: 'YouTube', icon: '▶' },
    ];

    return (
        <div className={`flex flex-col ${previewPanelBg} text-black overflow-hidden h-full`}> 
            {/* Post Preview Header */}
            <div className={`h-[58px] flex items-center px-5 border-b ${postPreviewBorder} shrink-0 ${postPreviewCardBg}`}>
                <h2 className={`font-semibold ${postPreviewHeaderText}`}>Post Preview</h2>
            </div>

            {/* Platform Selection */}
            <div className={`px-5 py-4 border-b ${postPreviewBorder} ${platformSectionBg} shrink-0`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-4 sm:gap-x-6">
                    {[...platformsRow1, ...platformsRow2].map((platform) => (
                        <PlatformToggle
                            key={platform.name}
                            label={platform.name}
                            icon={platform.icon}
                            active={activePlatforms[platform.name]}
                            onToggle={() => handlePlatformToggle(platform.name)}
                        />
                    ))}
                </div>
            </div>

            {/* Post Type Selection */}
            <div className={`px-5 py-3 border-b ${postPreviewBorder} ${postPreviewCardBg} shrink-0 flex flex-wrap gap-3`}> 
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType.feedPost ? activeButtonBg + ' text-white' : 'bg-white border ' + postPreviewBorder + ' ' + inactiveButtonText + ' hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => setPostType({...postType, feedPost: true, igStory: false, reel: false, youtubeShorts: false})}
                >
                    Feed Post
                </button>
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType.igStory ? activeButtonBg + ' text-white' : 'bg-white border ' + postPreviewBorder + ' ' + inactiveButtonText + ' hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => setPostType({...postType, feedPost: false, igStory: true, reel: false, youtubeShorts: false})}
                >
                    IG Story
                </button>
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType.reel ? activeButtonBg + ' text-white' : 'bg-white border ' + postPreviewBorder + ' ' + inactiveButtonText + ' hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => setPostType({...postType, feedPost: false, igStory: false, reel: true, youtubeShorts: false})}
                >
                    Reel
                </button>
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType.youtubeShorts ? activeButtonBg + ' text-white' : 'bg-white border ' + postPreviewBorder + ' ' + inactiveButtonText + ' hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => setPostType({...postType, feedPost: false, igStory: false, reel: false, youtubeShorts: true})}
                >
                    Youtube Shorts
                </button>
            </div>

            {/* Content Display Area with Social Media Post Preview Component */} 
            <div className={`flex-1 overflow-y-auto p-6 ${postPreviewCardBg}`}>
                <SocialMediaPostPreview 
                    userInitials="SC"
                    userName="Stephen Conley"
                    userHandle="@steveconley"
                    userTitle="Product Designer"
                    postTitle={postTitle}
                    postContent={postContent}
                    hashtags={postHashtags}
                    imageUrl={imageUrl}
                    scheduledDate={scheduledDate}
                    onSchedule={handleSchedulePost}
                    onDateChange={handleDateChange}
                    hideFooter={true}
                />
            </div>

            {/* Footer with Schedule Options */}
            <div className={`px-5 py-4 border-t ${postPreviewBorder} ${postPreviewCardBg} shrink-0`}>
                <div className="max-w-2xl mx-auto flex items-center justify-between flex-wrap gap-4">
                    {/* Left: Date Display & Selector */}
                    <div className="flex items-center space-x-2 relative">
                        <span className="text-sm text-gray-700">Post scheduled for:</span>
                        <div 
                            className={`flex items-center ${datePickerBg} rounded-md px-3 py-2 space-x-2 cursor-pointer hover:bg-gray-300`}
                            onClick={handleDateChange}
                        >
                            <span className={`text-sm ${datePickerText} font-medium whitespace-nowrap`}>{scheduledDate}</span>
                            <CalendarTodayIcon className={`${datePickerText}`} />
                        </div>
                        
                        {/* Calendar Dropdown */}
                        {isCalendarOpen && (
                            <div 
                                ref={calendarRef}
                                className="absolute left-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3"
                            >
                                <div className="flex flex-col">
                                    {/* Calendar */}
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleSelectDate}
                                        className="rounded-md border"
                                    />
                                    
                                    {/* Time Selection */}
                                    <div className="mt-3 border-t pt-3">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Select Time:</h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            {timeOptions.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => handleTimeSelect(time)}
                                                    className={`text-xs py-1 px-2 rounded ${
                                                        selectedTime === time
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Right: Schedule Button */}
                    <button 
                        className={`px-6 py-2 rounded-lg text-sm font-medium ${scheduleButtonBg} text-white hover:bg-cyan-600 whitespace-nowrap`}
                        onClick={handleSchedulePost}
                    >
                        Schedule Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostPreviewPanel;