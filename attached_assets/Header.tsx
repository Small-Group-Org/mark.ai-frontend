import React from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from './IconComponents';

const Header = () => {
    // Header background in Figma seems slightly darker than the Chat Panel overlay bg.
    // Let's use bg-black/20 or a custom near-black like #101010 if needed.
    // Using the Chat Panel overlay for now for consistency unless specified otherwise.
    const headerBg = 'bg-[#11132f]'; // Or potentially a slightly different dark shade
    const headerBorder = 'border-gray-700/50'; // Match figma border
    const userProfileBg = 'bg-white/10'; // Match figma

    return (
        <header className={`h-[86px] ${headerBg} text-white flex items-center justify-between px-6 border-b ${headerBorder} shrink-0`}>
            {/* Logo */}
            <div className="relative flex-shrink-0" style={{ width: '220.77px', height: '57px' }}>
                <Image
                    src="/logo.png" // Use the correct logo path
                    alt="Mark.ai Logo"
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            {/* User Profile Section */}
            <div className={`flex items-center bg-indigo-800/60 rounded-xl p-1 pr-3 space-x-2 cursor-pointer`}>
                <Image
                    src="/placeholder-avatar.jpg" // Replace with actual user avatar path
                    alt="User Avatar"
                    width={48} // Slightly smaller to fit padding
                    height={48}
                    className="rounded-full border-2 border-transparent" // Border was in figma but inside the container, visually achieved by padding
                />
                <span className="text-sm font-medium">Stephen Conley</span>
                <ChevronDownIcon className="text-white/70" />
            </div>
        </header>
    );
};

export default Header; 