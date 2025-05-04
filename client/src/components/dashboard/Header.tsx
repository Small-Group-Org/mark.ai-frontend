import React from 'react';
import { ChevronDownIcon } from './IconComponents';

const Header = () => {
    // Header background in Figma seems slightly darker than the Chat Panel overlay bg.
    const headerBg = 'bg-[#11132f]'; // Custom color matching Figma
    const headerBorder = 'border-gray-700/50'; // Match figma border
    const userProfileBg = 'bg-indigo-800/60'; // Match figma

    return (
        <header className={`h-[86px] ${headerBg} text-white flex items-center justify-between px-6 border-b ${headerBorder} shrink-0`}>
            {/* Logo */}
            <div className="relative flex-shrink-0 flex items-center">
                <span className="font-bold text-xl">Mark</span>
                <span className="text-blue-500 text-xl">.ai</span>
            </div>

            {/* User Profile Section */}
            <div className={`flex items-center ${userProfileBg} rounded-xl p-1 pr-3 space-x-2 cursor-pointer`}>
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                    SC
                </div>
                <span className="text-sm font-medium">Stephen Conley</span>
                <ChevronDownIcon className="text-white/70" />
            </div>
        </header>
    );
};

export default Header;