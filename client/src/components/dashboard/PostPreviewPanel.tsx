import React from 'react';
import { useState, useRef, useEffect } from 'react';
import PlatformToggle from './PlatformToggle';
import { CalendarTodayIcon } from './IconComponents';
import SocialMediaPostPreview from '@/components/ui/social-media-post-preview';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';

// Declare the global function on the Window interface
declare global {
    interface Window {
        updatePostPreview: (data: PostData) => any;
    }
}

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
    
    /**
     * Update all post data from a JSON object
     * This function will be exposed globally for testing via the console
     */
    const updatePostData = (data: PostData) => {
        // Check if post object exists and has required fields
        if (!data || !data.post) {
            console.error("Invalid post data format - missing post object");
            return false;
        }
        
        console.log("Updating post with new data:", data.post);
        
        try {
            // Create a promise to handle all state updates and return a value after they complete
            return new Promise<boolean>((resolve) => {
                // First, batch all state updates using a function to ensure we're using latest state
                
                // Update post content
                const newTitle = data.post.title || null as any;
                const newContent = data.post.content || null as any;
                const newHashtags = Array.isArray(data.post.hashtags) ? [...data.post.hashtags] : [];
                
                // Handle image URL
                let newImageUrl = undefined;
                if (data.post.mediaUrl && Array.isArray(data.post.mediaUrl) && data.post.mediaUrl.length > 0) {
                    newImageUrl = data.post.mediaUrl[0];
                }
                
                // Update platform selections
                let newPlatforms = {...activePlatforms};
                if (data.post.socialPlatforms) {
                    console.log("Setting platforms to:", data.post.socialPlatforms);
                    newPlatforms = {...data.post.socialPlatforms};
                }
                
                // Update post type
                let newPostType = {...postType};
                if (data.post.postType) {
                    console.log("Setting post type to:", data.post.postType);
                    newPostType = {...data.post.postType};
                }
                
                // Update scheduled date/time
                let newDate = date;
                let newSelectedTime = selectedTime;
                let newFormattedScheduledDate = scheduledDate;
                
                if (data.post.scheduledDate) {
                    try {
                        // Parse the ISO date string
                        newDate = parseISO(data.post.scheduledDate);
                        
                        // Format time for the dropdown
                        const hours = newDate.getHours();
                        const minutes = newDate.getMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const hour12 = hours % 12 || 12; // Convert to 12-hour format
                        
                        // Format as "9:00 AM" style string
                        const timeString = `${hour12}:${minutes === 0 ? '00' : minutes} ${ampm}`;
                        
                        // Find closest matching time in our options or use the formatted time
                        newSelectedTime = timeOptions.find(t => t === timeString) || timeString;
                        
                        // Update the formatted display string
                        const formattedDate = format(newDate, "MMMM d, yyyy");
                        newFormattedScheduledDate = `${formattedDate} • ${newSelectedTime}`;
                    } catch (error) {
                        console.error("Error parsing date:", error);
                    }
                }
                
                // Now update all state at once
                setPostTitle(newTitle);
                setPostContent(newContent);
                setPostHashtags(newHashtags);
                setImageUrl(newImageUrl);
                setActivePlatforms(newPlatforms);
                setPostType(newPostType);
                setDate(newDate);
                setSelectedTime(newSelectedTime);
                setScheduledDate(newFormattedScheduledDate);
                
                // Force a check for the update with setTimeout
                setTimeout(() => {
                    // Very important - log the state AFTER it's been updated
                    // This is a workaround for the React state timing issue
                    console.log("State updated to:", {
                        title: newTitle,
                        content: newContent,
                        hashtags: newHashtags,
                        platforms: newPlatforms,
                        postType: newPostType,
                        scheduledDate: newFormattedScheduledDate
                    });
                    console.log("Post data updated successfully!");
                    resolve(true);
                }, 100);
            });
        } catch (error) {
            console.error("Error updating post data:", error);
            return false;
        }
    };
    
    // Expose the function globally for testing via console and load initial data
    useEffect(() => {
        console.log('PostPreviewPanel mounted - registering global function');
        
        // Create a global wrapper for the updatePostData function
        // This wrapper will trigger a UI state update, then return the Promise result
        const globalUpdateFunction = (data: PostData) => {
            // Return the result of updatePostData which is a Promise
            const result = updatePostData(data);
            // Force a forceUpdate by setting a dummy state
            setActivePlatforms(current => ({...current}));
            return result;
        };
        
        // Make updatePostData available globally via window object
        window.updatePostPreview = globalUpdateFunction;
        
        // Load initial sample data on component mount
        const sampleData: PostData = {
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
        
        // Initialize the component with sample data
        updatePostData(sampleData);
        
        // Clean up the global function when unmounting
        return () => {
            // Make the property undefined rather than using delete
            window.updatePostPreview = undefined as any;
        };
    }, []);
    
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
    
    // Function to toggle calendar visibility
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
    
    // Function to handle schedule button click
    const handleSchedulePost = () => {
        // Display a confirmation in the console (would be an API call in a real app)
        console.log(`Post scheduled for: ${scheduledDate}`);
        alert(`Post successfully scheduled for: ${scheduledDate}`);
    };

    const handlePlatformToggle = (platformName: PlatformName) => {
        setActivePlatforms(prev => ({
            ...prev,
            [platformName]: !prev[platformName],
        }));
    };

    // Color definitions (consider moving to a shared constants file if used elsewhere)
    const previewPanelBg = 'bg-gray-100';
    const postPreviewCardBg = 'bg-white';
    const postPreviewBorder = 'border-gray-200'; // border-[#e5e7eb]
    const postPreviewHeaderText = 'text-gray-800'; // text-[#23282f]
    const platformSectionBg = 'bg-gray-50'; // bg-[#fafafa]
    const activeButtonBg = 'bg-blue-500'; // bg-[#3b8eff]
    const inactiveButtonText = 'text-gray-500'; // Adjusted for better contrast
    const inputBorder = 'border-gray-300';
    const inputTextColor = 'text-black';
    const scheduleButtonBg = 'bg-cyan-500'; // bg-[#00bfff]
    const datePickerBg = 'bg-gray-200'; // Adjusted bg-gray-500/30 from figma as it was hard to see
    const datePickerText = 'text-gray-700'; // Adjusted for better contrast

    // Platform Data (could be fetched or defined elsewhere)
    const platformsRow1: { name: PlatformName; icon: string }[] = [
        { name: 'Bluesky', icon: 'B' },
        { name: 'Facebook', icon: 'f' },
        { name: 'Google Business', icon: 'G' },
        { name: 'Instagram', icon: 'I' }, // Replace 'I' with actual icon component/SVG if available
        { name: 'X/Twitter', icon: 'X' }, // Replace 'X' with actual icon component/SVG if available
    ];
    const platformsRow2: { name: PlatformName; icon: string }[] = [
        { name: 'Reddit', icon: 'R' }, // Replace 'R' with actual icon component/SVG if available
        { name: 'Telegram', icon: 'T' }, // Replace 'T' with actual icon component/SVG if available
        { name: 'Threads', icon: '@' }, // Replace '@' with actual icon component/SVG if available
        { name: 'TikTok', icon: '♪' }, // Replace '♪' with actual icon component/SVG if available
        { name: 'YouTube', icon: '▶' },
    ];

    return (
        <div className={`flex flex-col ${previewPanelBg} text-black overflow-hidden h-full`}> {/* Ensure full height */} 
            {/* Post Preview Header */}
            <div className={`h-[58px] flex items-center px-5 border-b ${postPreviewBorder} shrink-0 ${postPreviewCardBg}`}>
                <h2 className={`font-semibold ${postPreviewHeaderText}`}>Post Preview</h2>
            </div>

            {/* Platform Selection */}
            <div className={`px-5 py-4 border-b ${postPreviewBorder} ${platformSectionBg} shrink-0`}>
                {/* All platforms in a single responsive grid with more space for longer names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-4 sm:gap-x-6">
                    {/* Combine all platforms into a single array for the grid */}
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
                    hideFooter={true} // Hide the footer since we have our own implementation below
                />
            </div>

            {/* Footer with Schedule Options */}
            <div className={`px-5 py-4 border-t ${postPreviewBorder} ${postPreviewCardBg} shrink-0`}>
                <div className="max-w-2xl mx-auto flex items-center justify-between flex-wrap gap-4">
                    {/* Left: Date Display & Selector */}
                    <div className="flex items-center space-x-2 relative">
                        <span className="text-sm text-gray-700">Post scheduled for:</span>
                        {/* Date Picker Trigger */}
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