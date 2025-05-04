import React, { useState, useRef, useEffect } from 'react';
import PlatformToggle from './PlatformToggle';
import { CalendarTodayIcon } from './IconComponents';
import SocialMediaPostPreview from '../ui/social-media-post-preview';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Define platform names type for Ayrshare API
type PlatformName = 'bluesky' | 'facebook' | 'google' | 'instagram' | 'twitter' | 'reddit' | 'telegram' | 'threads' | 'tiktok' | 'youtube';

// Define platform names for UI display (different case and naming)
type UIPlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

// Define the post type options
type PostType = 'post' | 'story' | 'reel' | 'shorts';

// Define Ayrshare post data structure
interface AyrsharePost {
    post: string;             // The post content
    platforms: PlatformName[]; // Array of platforms to post to
    mediaUrls?: string[];      // Optional array of media URLs (images, videos, etc.)
    scheduleDate?: string;     // ISO date string for scheduling
    title?: string;            // Optional title for the post
    tags?: string[];           // Optional array of hashtags
    postType?: PostType;       // Type of post (regular post, story, reel, etc.)
    profileKeys?: string[];    // Optional array of profile keys
    userId?: string;           // Optional user ID
    userDisplayName?: string;  // Optional user display name
    userTitle?: string;        // Optional user title/description
    userProfilePicture?: string; // Optional user profile picture URL
}

const PostPreviewPanel = () => {
    // Create a mapping from UI platform names to Ayrshare platform names
    const platformMapping: Record<string, PlatformName> = {
        'Bluesky': 'bluesky',
        'Facebook': 'facebook',
        'Google Business': 'google',
        'Instagram': 'instagram',
        'X/Twitter': 'twitter',
        'Reddit': 'reddit',
        'Telegram': 'telegram',
        'Threads': 'threads',
        'TikTok': 'tiktok',
        'YouTube': 'youtube',
    };

    // State for active platforms (UI tracking)
    const [activePlatforms, setActivePlatforms] = useState<Record<string, boolean>>({
        'Bluesky': false,
        'Facebook': false,
        'Google Business': false,
        'Instagram': true, // Default active based on screenshot
        'X/Twitter': true, // Default active based on screenshot
        'Reddit': false,
        'Telegram': false,
        'Threads': false,
        'TikTok': true,   // Default active based on screenshot
        'YouTube': true,  // Default active based on screenshot
    });
    
    // State for post type
    const [postType, setPostType] = useState<PostType>('post');
    
    // State for managing date object
    const [date, setDate] = useState<Date>(new Date(2025, 4, 5, 9, 0)); // May 5, 2025, 9:00 AM
    
    // State for formatted date string display
    const [scheduledDate, setScheduledDate] = useState("May 5, 2025 • 9:00 AM");
    
    // State for calendar visibility/popover
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    
    // Time options for dropdown
    const timeOptions = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];
    
    // State for selected time
    const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
    
    // Main Ayrshare post state
    const [ayrsharePost, setAyrsharePost] = useState<AyrsharePost>({
        post: "We're excited to announce our newest product line! After months of development, we're proud to bring you the most innovative solution for your needs.",
        platforms: ['instagram', 'twitter', 'tiktok', 'youtube'], // Default active platforms
        title: "New Product Launch",
        tags: ['productlaunch', 'innovation', 'technology'],
        postType: 'post',
        scheduleDate: new Date(2025, 4, 5, 9, 0).toISOString(),
        userDisplayName: "Stephen Conley",
        userId: "@steveconley",
        userTitle: "Product Designer"
    });
    
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
    
    // Update Ayrshare post data whenever date, time, or other relevant fields change
    useEffect(() => {
        // Create a date object that includes the selected date and parses the time
        let dateObj = new Date(date);
        
        // Extract hours and minutes from selectedTime (format: "9:00 AM", "2:30 PM", etc.)
        const timeMatch = selectedTime.match(/(\d+):(\d+)\s+(AM|PM)/i);
        if (timeMatch) {
            let hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            const period = timeMatch[3].toUpperCase();
            
            // Convert 12-hour format to 24-hour format
            if (period === 'PM' && hours < 12) {
                hours += 12;
            } else if (period === 'AM' && hours === 12) {
                hours = 0;
            }
            
            dateObj.setHours(hours, minutes, 0, 0);
        }
        
        // Update the Ayrshare post with the new schedule date
        setAyrsharePost(prev => ({
            ...prev,
            scheduleDate: dateObj.toISOString(),
        }));
    }, [date, selectedTime]);
    
    // Function to handle schedule button click
    const handleSchedulePost = () => {
        // Display a confirmation and the complete Ayrshare post data
        console.log('Scheduling post with Ayrshare data:', ayrsharePost);
        alert(`Post scheduled for: ${scheduledDate} on ${ayrsharePost.platforms.length} platforms`);
        
        // In a real app, this would make an API call to Ayrshare's endpoint:
        // POST https://app.ayrshare.com/api/post
        // with the ayrsharePost data and the API key in the header
    };

    // Function to handle platform toggling and update Ayrshare post data
    const handlePlatformToggle = (platformDisplayName: string) => {
        // First update the UI state
        setActivePlatforms(prev => {
            const newState = {
                ...prev,
                [platformDisplayName]: !prev[platformDisplayName]
            };
            
            // Then update the Ayrshare post data with the new platforms
            const platformName = platformMapping[platformDisplayName];
            if (platformName) {
                setAyrsharePost(prevPost => {
                    if (newState[platformDisplayName]) {
                        // Add platform if it's not already there
                        if (!prevPost.platforms.includes(platformName)) {
                            return {
                                ...prevPost,
                                platforms: [...prevPost.platforms, platformName]
                            };
                        }
                    } else {
                        // Remove platform
                        return {
                            ...prevPost,
                            platforms: prevPost.platforms.filter(p => p !== platformName)
                        };
                    }
                    return prevPost;
                });
            }
            
            return newState;
        });
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
    const platformsRow1: { name: string; icon: string }[] = [
        { name: 'Bluesky', icon: 'B' },
        { name: 'Facebook', icon: 'f' },
        { name: 'Google Business', icon: 'G' },
        { name: 'Instagram', icon: 'I' }, // Replace 'I' with actual icon component/SVG if available
        { name: 'X/Twitter', icon: 'X' }, // Replace 'X' with actual icon component/SVG if available
    ];
    const platformsRow2: { name: string; icon: string }[] = [
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
                {/* Platform Row 1 */}
                <div className="flex flex-wrap gap-x-10 gap-y-3 mb-3"> {/* Adjusted gaps */} 
                    {platformsRow1.map((platform) => (
                        <PlatformToggle
                            key={platform.name}
                            label={platform.name}
                            icon={platform.icon}
                            active={activePlatforms[platform.name]}
                            onToggle={() => handlePlatformToggle(platform.name)}
                        />
                    ))}
                </div>
                {/* Platform Row 2 */}
                <div className="flex flex-wrap gap-x-10 gap-y-3"> {/* Adjusted gaps */} 
                    {platformsRow2.map((platform) => (
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
            <div className={`px-5 py-3 border-b ${postPreviewBorder} ${postPreviewCardBg} shrink-0 flex flex-wrap gap-3`}> {/* Added gap, reduced py */} 
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType === 'post' ? `${activeButtonBg} text-white` : `bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}`}
                    onClick={() => {
                        setPostType('post');
                        setAyrsharePost(prev => ({...prev, postType: 'post'}));
                    }}
                >
                    Feed Post
                </button>
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType === 'story' ? `${activeButtonBg} text-white` : `bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}`}
                    onClick={() => {
                        setPostType('story');
                        setAyrsharePost(prev => ({...prev, postType: 'story'}));
                    }}
                >
                    IG Story
                </button>
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType === 'reel' ? `${activeButtonBg} text-white` : `bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}`}
                    onClick={() => {
                        setPostType('reel');
                        setAyrsharePost(prev => ({...prev, postType: 'reel'}));
                    }}
                >
                    Reel
                </button>
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType === 'shorts' ? `${activeButtonBg} text-white` : `bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}`}
                    onClick={() => {
                        setPostType('shorts');
                        setAyrsharePost(prev => ({...prev, postType: 'shorts'}));
                    }}
                >
                    Youtube Shorts
                </button>
            </div>

            {/* Content Display Area with Social Media Post Preview Component */} 
            <div className={`flex-1 overflow-y-auto p-6 ${postPreviewCardBg}`}>
                <SocialMediaPostPreview 
                    userInitials={ayrsharePost.userDisplayName?.split(' ').map(n => n[0]).join('') || 'SC'}
                    userName={ayrsharePost.userDisplayName || "Stephen Conley"}
                    userHandle={ayrsharePost.userId || "@steveconley"}
                    userTitle={ayrsharePost.userTitle || "Product Designer"}
                    postTitle={ayrsharePost.title || "New Product Launch"}
                    postContent={ayrsharePost.post}
                    hashtags={ayrsharePost.tags || ['productlaunch', 'innovation', 'technology']}
                    scheduledDate={scheduledDate}
                    onSchedule={handleSchedulePost}
                    onDateChange={handleDateChange}
                    hideFooter={true} // Hide the footer since we have our own implementation below
                    // Update the content when it changes in the preview
                    onContentChange={(newContent) => {
                        setAyrsharePost(prev => ({...prev, post: newContent}));
                    }}
                    // Update the title when it changes in the preview
                    onTitleChange={(newTitle) => {
                        setAyrsharePost(prev => ({...prev, title: newTitle}));
                    }}
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