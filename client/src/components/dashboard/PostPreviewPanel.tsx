import React, { useState } from 'react';
import PlatformToggle from './PlatformToggle';
import {
    UploadIcon,
    CalendarTodayIcon
} from './IconComponents';

// Define platform names type for state management
type PlatformName = 'Bluesky' | 'Facebook' | 'Google Business' | 'Instagram' | 'X/Twitter' | 'Reddit' | 'Telegram' | 'Threads' | 'TikTok' | 'YouTube';

const PostPreviewPanel = () => {
    // State for active platforms
    const [activePlatforms, setActivePlatforms] = useState<Record<PlatformName, boolean>>({
        'Bluesky': false,
        'Facebook': false,
        'Google Business': false,
        'Instagram': true, // Default active
        'X/Twitter': true, // Default active
        'Reddit': false,
        'Telegram': false,
        'Threads': false,
        'TikTok': true,   // Default active
        'YouTube': true,  // Default active
    });

    // Handler for platform toggle
    const handlePlatformToggle = (platformName: PlatformName) => {
        setActivePlatforms(prev => ({
            ...prev,
            [platformName]: !prev[platformName],
        }));
    };

    // UI variables
    const previewPanelBg = 'bg-gray-100';
    const postPreviewCardBg = 'bg-white';
    const postPreviewBorder = 'border-gray-200';
    const postPreviewHeaderText = 'text-gray-800';
    const platformSectionBg = 'bg-gray-50';
    const activeButtonBg = 'bg-blue-500';
    const inactiveButtonText = 'text-gray-500';
    const inputBorder = 'border-gray-300';
    const inputTextColor = 'text-black';
    const scheduleButtonBg = 'bg-cyan-500';
    const datePickerBg = 'bg-gray-200';
    const datePickerText = 'text-gray-700';

    // Platform data for rows
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
                {/* Platform Row 1 */}
                <div className="flex flex-wrap gap-x-10 gap-y-3 mb-3">
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
                <div className="flex flex-wrap gap-x-10 gap-y-3">
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
            <div className={`px-5 py-3 border-b ${postPreviewBorder} ${postPreviewCardBg} shrink-0 flex flex-wrap gap-3`}>
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium ${activeButtonBg} text-white`}>Feed Post</button>
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}>IG Story</button>
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}>Reel</button>
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium bg-white border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-50 hover:border-gray-300`}>Youtube Shorts</button>
            </div>

            {/* Content Input Area */} 
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${postPreviewCardBg}">
                {/* Left Column: Text Inputs */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                        <input type="text" id="postTitle" defaultValue="AyrShare Test" className={`w-full px-3 py-1.5 border ${inputBorder} rounded-md text-sm ${inputTextColor} focus:ring-blue-500 focus:border-blue-500`} />
                    </div>
                    <div>
                        <label htmlFor="postText" className="block text-sm font-medium text-gray-700 mb-1">Post Text</label>
                        <textarea id="postText" rows={10} defaultValue="Hi This is me testing AyrShare" className={`w-full px-3 py-1.5 border ${inputBorder} rounded-md text-sm ${inputTextColor} focus:ring-blue-500 focus:border-blue-500 resize-none`}></textarea>
                    </div>
                </div>

                {/* Right Column: Image/Video Upload */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Add Images or a Video</label>
                        {/* Upload Area */}
                        <div className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed ${inputBorder} rounded-lg text-center ${platformSectionBg} hover:bg-gray-100 cursor-pointer relative`}>
                            {/* Hidden file input */} 
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <div className={`w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mb-2`}>
                                <UploadIcon className="text-gray-500 w-5 h-5" />
                            </div>
                            <p className="text-sm">
                                <span className="font-semibold text-blue-600">Click to Upload</span>
                                <span className="text-gray-600"> or Drag & Drop</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1 px-4">PNG, JPG, GIF, WEBP, MP4, MOV or AVI up to 25 MB - API supports larger files</p>
                        </div>
                    </div>
                    {/* Image Preview Placeholder */}
                    <div>
                        <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                            Preview will appear here
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className={`h-[73px] px-5 py-4 border-t ${postPreviewBorder} ${postPreviewCardBg} shrink-0 flex items-center justify-between flex-wrap gap-4`}>
                <div className="flex items-center space-x-3">
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 border ${postPreviewBorder} ${inactiveButtonText} hover:bg-gray-200`}>Preview</button>
                    {/* Date Picker Placeholder */}
                    <div className={`flex items-center ${datePickerBg} rounded-md px-3 py-2 space-x-2 cursor-pointer hover:bg-gray-300`}>
                        <span className={`text-sm ${datePickerText} font-medium whitespace-nowrap`}>06/24/2021 - 06/24/2021</span>
                        <CalendarTodayIcon className={`${datePickerText}`} />
                    </div>
                </div>
                <button className={`px-6 py-2 rounded-lg text-sm font-medium ${scheduleButtonBg} text-white hover:bg-cyan-600 whitespace-nowrap`}>Schedule Post</button>
            </div>
        </div>
    );
};

export default PostPreviewPanel;