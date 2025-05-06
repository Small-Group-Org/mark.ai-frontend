import React from 'react';

const Header = () => {
    // Header background in Figma seems slightly darker than the Chat Panel overlay bg.
    const headerBg = 'bg-[#11132f]'; // Or potentially a slightly different dark shade
    const headerBorder = 'border-gray-700/50'; // Match figma border

    return (
        <header className={`h-[86px] ${headerBg} text-white flex items-center justify-between px-6 border-b ${headerBorder} shrink-0`}>
            {/* Logo */}
            <div className="relative flex-shrink-0 w-[220px] h-[57px] flex items-center">
                {/* We're using a text placeholder instead of Image since we don't have the actual logo */}
                <div className="text-2xl font-bold text-white">
                    <span className="text-white">Interview</span>
                    <span className="text-cyan-400">Mark</span>
                </div>
            </div>

            {/* Page title or subtitle can go here */}
            <div className="text-sm text-gray-300 font-medium">
                Social Growth Expert
            </div>
        </header>
    );
};

export default Header;