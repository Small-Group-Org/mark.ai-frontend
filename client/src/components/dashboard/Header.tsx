import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { LogOut } from 'lucide-react';

const Header = () => {
    // Header background in Figma seems slightly darker than the Chat Panel overlay bg.
    const headerBg = 'bg-[#11132f]'; // Or potentially a slightly different dark shade
    const headerBorder = 'border-gray-700/50'; // Match figma border
    const { logout } = useAuth();

    const handleLogout = async () => {
      try {
        await logout();
        // After logout, the user will be redirected to home by the ProtectedRoute
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    return (
        <header className={`h-[70px] ${headerBg} text-white flex items-center justify-between px-6 border-b ${headerBorder} shrink-0`}>
            {/* Logo */}
            <div className="relative flex-shrink-0 w-[220px] flex items-center">
                {/* We're using a text placeholder instead of Image since we don't have the actual logo */}
                <div className="text-2xl font-bold text-white">
                    <span className="text-white">Interview</span>
                    <span className="text-blue-400">Mark</span>
                </div>
            </div>

            {/* Sign out button */}
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-md transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Sign out</span>
            </button>
        </header>
    );
};

export default Header;