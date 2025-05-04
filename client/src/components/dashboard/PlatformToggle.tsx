import React from 'react';
import {
    FacebookIcon,
    YouTubeIcon
} from './IconComponents';

interface PlatformToggleProps {
    label: string;
    icon: string; // Could be actual icon component or simple text/emoji
    active: boolean;
    onToggle: () => void;
}

const PlatformToggle: React.FC<PlatformToggleProps> = ({ label, icon, active, onToggle }) => {
    const platformIconBg = 'bg-gray-200';
    const platformIconInnerBg = 'bg-white';
    const platformActiveIconBg = 'bg-blue-500';
    const platformTextColor = 'text-gray-500';
    const platformActiveTextColor = 'text-black';
    const platformIconColor = 'text-gray-400';

    // Active icon colors for different platforms
    const instagramColor = 'text-[#C13584]';
    const twitterColor = 'text-black';
    const tikTokColor = 'text-[#69C9D0]';
    const youtubeColor = 'text-red-600';

    let IconComponent: React.ElementType | null = null;
    let iconColorClass = platformIconColor;

    // Map icon identifiers to actual icon components
    if (icon === 'f') IconComponent = FacebookIcon;
    if (icon === '▶') IconComponent = YouTubeIcon;

    // Set appropriate color based on platform name
    if (active) {
        switch (label) {
            case 'Instagram': iconColorClass = instagramColor; break;
            case 'X/Twitter': iconColorClass = twitterColor; break;
            case 'TikTok': iconColorClass = tikTokColor; break;
            case 'YouTube': iconColorClass = youtubeColor; break;
            default: iconColorClass = platformActiveTextColor;
        }
    }

    return (
        <div className="flex items-center space-x-2 cursor-pointer group" onClick={onToggle}>
            {/* Toggle Switch */}
            <button
                type="button"
                className={`${active ? platformActiveIconBg : platformIconBg
                    } relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none`}
                aria-pressed={active}
            >
                <span className="sr-only">Enable {label}</span>
                <span
                    className={`${active ? 'translate-x-5' : 'translate-x-1'
                        } inline-block w-3.5 h-3.5 transform ${platformIconInnerBg} rounded-full transition-transform`}
                />
            </button>

            {/* Platform Icon */}
            <div className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded-sm ${active ? iconColorClass : platformIconColor}`}>
                {IconComponent ? <IconComponent className="w-4 h-4" /> : <span>{icon}</span>}
            </div>

            {/* Label */}
            <span className={`text-sm font-medium ${active ? platformActiveTextColor : platformTextColor} group-hover:text-gray-800`}>{label}</span>
        </div>
    );
}

export default PlatformToggle;