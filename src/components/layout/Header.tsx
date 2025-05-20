import React from 'react';
import { LogOut } from 'lucide-react';
import markAiLogo from '../../assets/logo.png'; // Corrected file name to logo.png
import { socialMedia } from '@/commons/constant';
import ConnectSocialIcon from '../ui/ConnectSocialIcon';
import { Link } from 'wouter';
import { useAuthStore } from '@/store/useAuthStore';

const Header = () => {
    const headerBg = 'bg-[#11132f]'; 
    const headerBorder = 'border-gray-700/50';
    const { logout } = useAuthStore();

    return (
        <header className={`h-[70px] ${headerBg} text-white flex items-center justify-between px-4 border-b ${headerBorder} shrink-0`}>
            <Link href='/' className="relative flex-shrink-0 w-[220px] flex items-center cursor-pointer">
                <img
                    src={markAiLogo}
                    alt="Mark.ai Logo"
                    style={{ height: '65px', objectFit: 'contain' }}
                />
            </Link>

            <div className="flex items-center gap-4 h-[50px]">
              {socialMedia.map(({img, isConnected}, idx) => (
                <ConnectSocialIcon key={img + idx} image={img} isConnected={isConnected} />
              ))}
            </div>

            <button 
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-md transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Sign out</span>
            </button>
        </header>
    );
};

export default Header;