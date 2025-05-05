import React, { useState, useRef, useEffect } from 'react';
import PlatformToggle from './PlatformToggle';
import { CalendarTodayIcon } from './IconComponents';
import SocialMediaPostPreview from '../ui/social-media-post-preview';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';

// Define PlatformName type (can move to types file)
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

// --- Define Props Interface --- 
interface PostPreviewPanelProps {
    postTitle: string | null;
    postContent: string | null;
    postHashtags: string[];
    mediaUrl: string[];
    socialPlatforms: Record<PlatformName, boolean>;
    postType: { feedPost: boolean; igStory: boolean; reel: boolean; youtubeShorts: boolean };
    scheduledDate: string; // ISO string from parent
    // Setters passed from parent
    setSocialPlatforms: React.Dispatch<React.SetStateAction<Record<PlatformName, boolean>>>;
    setPostType: React.Dispatch<React.SetStateAction<{ feedPost: boolean; igStory: boolean; reel: boolean; youtubeShorts: boolean }>>;
    setScheduledDate: React.Dispatch<React.SetStateAction<string>>;
}

// Remove global declaration for window.updatePostData
// declare global {
//   interface Window {
//     updatePostData: (data: PostData) => void;
//     updatePostPreview: (data: PostData) => void; 
//   }
// }

// Component receives props now
const PostPreviewPanel: React.FC<PostPreviewPanelProps> = ({ 
    postTitle, postContent, postHashtags, mediaUrl,
    socialPlatforms, postType, scheduledDate,
    setSocialPlatforms, setPostType, setScheduledDate 
}) => {

    // --- Local UI State Only ---
    // State for managing actual date object derived from prop
    const [date, setDate] = useState<Date | undefined>(undefined);
    // State for formatted date string display derived from prop
    const [displayDate, setDisplayDate] = useState("");
    // State to control calendar visibility
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    // State for selected time (part of the date)
    const [selectedTime, setSelectedTime] = useState("9:00 AM"); // Default or derived
    const calendarRef = useRef<HTMLDivElement>(null);
    // Time options for dropdown
    const timeOptions = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];
    // Derive image URL from mediaUrl prop
    const imageUrl = mediaUrl && mediaUrl.length > 0 ? mediaUrl[0] : undefined;

    // --- Effects for handling date prop ---
    // Effect to parse the ISO scheduledDate prop into local Date object and time string
    useEffect(() => {
        try {
            const parsedDate = parseISO(scheduledDate);
            setDate(parsedDate);
            
            const hours = parsedDate.getHours();
            const minutes = parsedDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hour12 = hours % 12 || 12;
            const timeString = `${hour12}:${minutes === 0 ? '00' : minutes} ${ampm}`;
            
            const bestTimeMatch = timeOptions.find(t => t === timeString) || timeString;
            setSelectedTime(bestTimeMatch);
        } catch (error) {
            console.error("Error parsing scheduledDate prop:", error);
            setDate(new Date()); // Fallback to now if parse fails
            setSelectedTime("9:00 AM"); // Fallback time
        }
    }, [scheduledDate]); // Re-run when the scheduledDate prop changes

    // Effect to update the display date string whenever local date or time changes
    useEffect(() => {
        if (date) {
            const formattedDate = format(date, "MMMM d, yyyy");
            setDisplayDate(`${formattedDate} • ${selectedTime}`);
        }
    }, [date, selectedTime]);

    // Effect for closing calendar on outside click (remains the same)
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

    // REMOVE the updatePostData function and the useEffect that registers it
    // const updatePostData = (data: PostData) => { ... };
    // useEffect(() => { window.updatePostData = ... }, []);

    // --- Event Handlers using Prop Setters ---

    // Handle platform toggle click - use prop setter
    const handlePlatformToggle = (platformName: PlatformName) => {
        setSocialPlatforms(prev => ({
            ...prev,
            [platformName]: !prev[platformName],
        }));
    };

    // Handle post type click - use prop setter
    const handlePostTypeClick = (type: 'feedPost' | 'igStory' | 'reel' | 'youtubeShorts') => {
        setPostType({
            feedPost: type === 'feedPost',
            igStory: type === 'igStory',
            reel: type === 'reel',
            youtubeShorts: type === 'youtubeShorts'
        });
    };

    // Toggle calendar visibility
    const handleDateChange = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    // Handle date selection from calendar - update local date state first
    const handleSelectDate = (newDate: Date | undefined) => {
        if (newDate && date) {
             // Keep the time from the existing date state
             newDate.setHours(date.getHours());
             newDate.setMinutes(date.getMinutes());
             setDate(newDate); // Update local date state
             // Update parent state with new ISO string
             setScheduledDate(newDate.toISOString()); 
        }
    };

    // Handle time selection - update local time state first
    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setIsCalendarOpen(false);
        // Parse time and update the local Date object, then update parent
        if (date) {
            const [timePart, ampm] = time.split(' ');
            let [hoursStr, minutesStr] = timePart.split(':');
            let hours = parseInt(hoursStr);
            const minutes = parseInt(minutesStr);

            if (ampm === 'PM' && hours !== 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0; // Midnight case

            const newDate = new Date(date);
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);
            
            setDate(newDate); // Update local date state
            setScheduledDate(newDate.toISOString()); // Update parent state
        }
    };

    // Handle schedule button click (logic can remain or be moved up)
    const handleSchedulePost = () => {
        console.log(`Post scheduled for: ${displayDate} (ISO: ${scheduledDate})`);
        alert(`Post successfully scheduled for: ${displayDate}`);
    };

    // --- Render using props and local UI state ---
    // Color definitions (remain the same)
    const previewPanelBg = 'bg-gray-100';
    // ... other color definitions ...
    const scheduleButtonBg = 'bg-cyan-500';
    const datePickerBg = 'bg-gray-200';
    const datePickerText = 'text-gray-700';

    // Platform Data (remain the same)
    const platformsRow1: { name: PlatformName; icon: string }[] = [
        { name: 'Bluesky', icon: 'B' }, { name: 'Facebook', icon: 'f' }, { name: 'Google Business', icon: 'G' },
        { name: 'Instagram', icon: 'I' }, { name: 'X/Twitter', icon: 'X' },
    ];
    const platformsRow2: { name: PlatformName; icon: string }[] = [
        { name: 'Reddit', icon: 'R' }, { name: 'Telegram', icon: 'T' }, { name: 'Threads', icon: '@' },
        { name: 'TikTok', icon: '♪' }, { name: 'YouTube', icon: '▶' },
    ];

    return (
        <div className={`flex flex-col ${previewPanelBg} text-black overflow-hidden h-full`}>
            {/* Header (remains the same) */}
            <div className={`h-[58px] flex items-center px-5 border-b border-gray-200 shrink-0 bg-white`}>
                <h2 className={`font-semibold text-gray-800`}>Post Preview</h2>
            </div>

            {/* Platform Selection - Use socialPlatforms prop and handlePlatformToggle */}
            <div className={`px-5 py-4 border-b border-gray-200 bg-gray-50 shrink-0`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-4 sm:gap-x-6">
                    {[...platformsRow1, ...platformsRow2].map((platform) => (
                        <PlatformToggle
                            key={platform.name}
                            label={platform.name}
                            icon={platform.icon}
                            active={socialPlatforms?.[platform.name] ?? false} // Use prop with fallback
                            onToggle={() => handlePlatformToggle(platform.name)} // Calls prop setter
                        />
                    ))}
                </div>
            </div>

            {/* Post Type Selection - Use postType prop and handlePostTypeClick */}
            <div className={`px-5 py-3 border-b border-gray-200 bg-white shrink-0 flex flex-wrap gap-3`}> 
                <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType?.feedPost ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => handlePostTypeClick('feedPost')} // Calls prop setter
                >
                    Feed Post
                </button>
                 <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType?.igStory ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => handlePostTypeClick('igStory')} // Calls prop setter
                >
                    IG Story
                </button>
                 <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType?.reel ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => handlePostTypeClick('reel')} // Calls prop setter
                >
                    Reel
                </button>
                 <button 
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${postType?.youtubeShorts ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'}`}
                    onClick={() => handlePostTypeClick('youtubeShorts')} // Calls prop setter
                >
                    Youtube Shorts
                </button>
            </div>

            {/* Content Display Area - Use props */}
            <div className={`flex-1 overflow-y-auto p-6 bg-white`}>
                <SocialMediaPostPreview 
                    userInitials="SC"
                    userName="Stephen Conley"
                    userHandle="@steveconley"
                    userTitle="Product Designer"
                    postTitle={postTitle}      // Use prop
                    postContent={postContent}  // Use prop
                    hashtags={postHashtags}    // Use prop
                    imageUrl={imageUrl}        // Use derived state
                    scheduledDate={displayDate} // Use local display state
                    onSchedule={handleSchedulePost}
                    onDateChange={handleDateChange}
                    hideFooter={true}
                />
            </div>

            {/* Footer with Schedule Options - Use displayDate and local state */} 
            <div className={`px-5 py-4 border-t border-gray-200 bg-white shrink-0`}>
                <div className="max-w-2xl mx-auto flex items-center justify-between flex-wrap gap-4">
                    {/* Left: Date Display & Selector */}
                    <div className="flex items-center space-x-2 relative">
                        <span className="text-sm text-gray-700">Post scheduled for:</span>
                        <div 
                            className={`flex items-center ${datePickerBg} rounded-md px-3 py-2 space-x-2 cursor-pointer hover:bg-gray-300`}
                            onClick={handleDateChange}
                        >
                            {/* Use local displayDate state */}
                            <span className={`text-sm ${datePickerText} font-medium whitespace-nowrap`}>{displayDate}</span> 
                            <CalendarTodayIcon className={`${datePickerText}`} />
                        </div>
                        
                        {/* Calendar Dropdown - uses local state (date, isCalendarOpen) */}
                        {isCalendarOpen && (
                            <div 
                                ref={calendarRef}
                                className="absolute left-0 bottom-full mb-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3" // Changed position to bottom-full
                            >
                                <div className="flex flex-col">
                                    <Calendar
                                        mode="single"
                                        selected={date} // Use local date state
                                        onSelect={handleSelectDate} // Updates local state and calls prop setter
                                        className="rounded-md border"
                                    />
                                    <div className="mt-3 border-t pt-3">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Select Time:</h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            {timeOptions.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => handleTimeSelect(time)} // Updates local state and calls prop setter
                                                    className={`text-xs py-1 px-2 rounded ${
                                                        selectedTime === time // Use local selectedTime state
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
                    
                    {/* Right: Schedule Button (remains the same) */}
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