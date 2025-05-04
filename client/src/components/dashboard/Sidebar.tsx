import React from 'react';
import {
    DashboardIcon,
    CreateIcon,
    CalendarIcon,
    MindIcon,
    SettingsIcon
} from './IconComponents';

const Sidebar = () => {
    const sidebarBg = 'bg-[#0E2D60]'; // Custom color matching Figma

    return (
        <aside className={`w-[90px] ${sidebarBg} text-white flex flex-col items-center py-5 space-y-10 fixed left-0 top-0 bottom-0 h-screen z-10`}>
            {/* Logo placeholder - Replace with actual logo if available */}
            <div className="w-16 h-16 bg-white/10 rounded-full mb-6 flex items-center justify-center text-xs flex-shrink-0">
                LOGO
            </div>

            {/* Navigation Icons */}
            <nav className="flex flex-col items-center space-y-7 flex-grow w-full">
                {/* Dashboard Item */}
                <a href="/dashboard" className="flex flex-col items-center text-center group text-gray-300 hover:text-white w-full py-1">
                    <div className="p-3 rounded-lg mb-1 group-hover:bg-white/5">
                        <DashboardIcon />
                    </div>
                    <span className="text-xs font-medium">Dashboard</span>
                </a>

                {/* Create Item - Active state */}
                <a href="/create" className="flex flex-col items-center text-center group relative w-full py-1">
                    {/* Active indicator bar */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r-sm"></div>
                    {/* Icon background */}
                    <div className="p-3 bg-white/10 rounded-lg mb-1">
                        <CreateIcon className="text-white" />
                    </div>
                    <span className="text-xs font-medium">Create</span>
                </a>
                <a href="/calendar" className="flex flex-col items-center text-center group text-gray-300 hover:text-white w-full py-1">
                    <div className="p-3 rounded-lg mb-1 group-hover:bg-white/5">
                        <CalendarIcon />
                    </div>
                    <span className="text-xs font-medium">Calendar</span>
                </a>
                <a href="/mind" className="flex flex-col items-center text-center group text-gray-300 hover:text-white w-full py-1">
                    <div className="p-3 rounded-lg mb-1 group-hover:bg-white/5">
                        <MindIcon />
                    </div>
                    <span className="text-xs font-medium">Mind</span>
                </a>
            </nav>

            {/* Settings Icon at bottom */}
            <a href="#" className="mt-auto group text-gray-300 hover:text-white flex-shrink-0 pb-4">
                <div className="p-3 rounded-lg group-hover:bg-white/5">
                    <SettingsIcon />
                </div>
            </a>
        </aside>
    );
};

export default Sidebar;