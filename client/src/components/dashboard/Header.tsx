import React from 'react';
import { ChevronDownIcon } from './IconComponents';

const Header = () => {
    // Header background in Figma seems slightly darker than the Chat Panel overlay bg.
    const headerBg = 'bg-[#11132f]'; // Or potentially a slightly different dark shade
    const headerBorder = 'border-gray-700/50'; // Match figma border
    const userProfileBg = 'bg-indigo-800/60'; // Match figma

    return (
        <header className={`h-[86px] ${headerBg} text-white flex items-center justify-between px-6 border-b ${headerBorder} shrink-0`}>
            {/* Logo */}
            <div className="relative flex-shrink-0 w-[220px] h-[57px] flex items-center">
                {/* We're using a text placeholder instead of Image since we don't have the actual logo */}
                <div className="text-2xl font-bold text-white">Mark.ai</div>
            </div>

            {/* User Profile Section */}
            <div className={`flex items-center ${userProfileBg} rounded-xl p-1 pr-3 space-x-2 cursor-pointer`}>
                {/* User avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    SC
                </div>
                <span className="text-sm font-medium">Stephen Conley</span>
                <ChevronDownIcon className="text-white/70" />
            </div>
        </header>
    );
};

export default Header;