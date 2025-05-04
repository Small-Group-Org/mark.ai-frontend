import React, { useState } from 'react';
import PlatformToggle from './PlatformToggle';
import { CalendarTodayIcon } from './IconComponents';
import SocialMediaPostPreview from '../ui/social-media-post-preview';

// Define platform names type for state management
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

const PostPreviewPanel = () => {
    const [activePlatforms, setActivePlatforms] = useState<Record<PlatformName, boolean>>({
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
    
    // State for managing selected date
    const [scheduledDate, setScheduledDate] = useState("May 5, 2025 • 9:00 AM");
    
    // Function to handle date change - in a real app, this would open a date picker
    const handleDateChange = () => {
        // For demonstration purposes, we'll cycle through a few dates
        const dates = [
            "May 5, 2025 • 9:00 AM",
            "May 6, 2025 • 10:30 AM", 
            "May 7, 2025 • 2:15 PM",
            "May 8, 2025 • 5:45 PM"
        ];
        
        const currentIndex = dates.indexOf(scheduledDate);
        const nextIndex = (currentIndex + 1) % dates.length;
        setScheduledDate(dates[nextIndex]);
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
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium ${activeButtonBg} text-white`}>Feed Post</button>
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}>IG Story</button>
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}>Reel</button>
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}>Youtube Shorts</button>
            </div>

            {/* Content Display Area with Social Media Post Preview Component */} 
            <div className={`flex-1 overflow-y-auto p-6 ${postPreviewCardBg}`}>
                <SocialMediaPostPreview 
                    userInitials="SC"
                    userName="Stephen Conley"
                    userHandle="@steveconley"
                    userTitle="Product Designer"
                    postTitle="New Product Launch"
                    postContent="We're excited to announce our newest product line! After months of development, we're proud to bring you the most innovative solution for your needs."
                    hashtags={['productlaunch', 'innovation', 'technology']}
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
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">Post scheduled for:</span>
                        {/* Date Picker Component */}
                        <div 
                            className={`flex items-center ${datePickerBg} rounded-md px-3 py-2 space-x-2 cursor-pointer hover:bg-gray-300`}
                            onClick={handleDateChange}
                        >
                            <span className={`text-sm ${datePickerText} font-medium whitespace-nowrap`}>{scheduledDate}</span>
                            <CalendarTodayIcon className={`${datePickerText}`} />
                        </div>
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