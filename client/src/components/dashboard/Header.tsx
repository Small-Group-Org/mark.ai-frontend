import React from 'react';
import { ChevronDownIcon } from './IconComponents';
import { useAuth } from '@/hooks/use-auth';
import { useAuthModal } from '@/hooks/use-auth-modal';
import { Button } from '@/components/ui/button';
import { AuthButton } from '@/components/auth/AuthButton';

const Header = () => {
    // Get auth state and functions from our hooks
    const { isAuthenticated, user, logout } = useAuth();
    const { onOpen, setView } = useAuthModal();

    // Header background in Figma seems slightly darker than the Chat Panel overlay bg.
    const headerBg = 'bg-[#11132f]'; // Or potentially a slightly different dark shade
    const headerBorder = 'border-gray-700/50'; // Match figma border
    const userProfileBg = 'bg-indigo-800/60'; // Match figma

    // Handle authentication button clicks
    const handleSignIn = () => {
        setView('signin');
        onOpen();
    };

    const handleSignUp = () => {
        setView('signup');
        onOpen();
    };

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

            {/* Auth Section */}
            {isAuthenticated ? (
                // User Profile Section (when authenticated)
                <div className={`flex items-center ${userProfileBg} rounded-xl p-1 pr-3 space-x-2 cursor-pointer group relative`}>
                    {/* User avatar with initials */}
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {user?.firstName?.[0]}{user?.lastName?.[0] || 'U'}
                    </div>
                    <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                    <ChevronDownIcon className="text-white/70" />
                    
                    {/* Dropdown menu (appears on hover) */}
                    <div className="absolute hidden group-hover:block top-full right-0 mt-2 bg-slate-800 rounded-lg shadow-lg overflow-hidden z-10 w-48">
                        <div className="py-1">
                            <button 
                                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-slate-700" 
                                onClick={() => {/* Profile action */}}
                            >
                                Profile Settings
                            </button>
                            <button 
                                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-slate-700" 
                                onClick={logout}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                // Auth buttons (when not authenticated)
                <div className="flex items-center space-x-4">
                    <AuthButton 
                        mode="signin" 
                        variant="ghost" 
                        className="text-gray-200 hover:text-white"
                    />
                    <AuthButton 
                        mode="signup" 
                        variant="default"
                    />
                </div>
            )}
        </header>
    );
};

export default Header;