import React, { useEffect, useState, useRef, useMemo } from "react";
import { LogOut, Menu, X, MessageCircle, FileText } from "lucide-react";
import markAiLogo from "../../assets/logo.png";
import markPng from "../../assets/mark.png";
import { AYRSHARE } from "@/commons/constant";
import ConnectSocialIcon from "../ui/ConnectSocialIcon";
import { Link } from "wouter";
import { useAuthStore } from "@/store/useAuthStore";
import { generateAyrshareToken, getAyrshareSocialHandles } from "@/services/ayrShareServices";
import { PlatformType } from "@/types";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import { usePostStore } from "@/store/usePostStore";
import useEditPost from "@/hooks/use-edit-post";
import { getSortedPlatforms } from "@/commons/utils";

const headerBg = "bg-[#11132f]";
const headerBorder = "border-gray-700/50";

interface HeaderProps {
  mobileView?: 'chat' | 'content';
  setMobileView?: (view: 'chat' | 'content') => void;
}

const Header: React.FC<HeaderProps> = ({ mobileView = 'chat', setMobileView }) => {
  const { logout, updatePlatformConnection, getEnabledPlatforms } = useAuthStore();
  const {updatePostHandler} = useEditPost();
  const { livePost } = usePostStore();
  const { platform: currentPlatforms = [] } = livePost;

  const [loadingPlatforms, setLoadingPlatforms] = useState<string[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const enabledPlatforms = getEnabledPlatforms();
  const { isMobileView } = useMobileDetection();

  // Sort platforms using useMemo to prevent unnecessary re-sorting
  const sortedPlatforms = useMemo(() => {
    return getSortedPlatforms(enabledPlatforms);
  }, [enabledPlatforms]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    console.log("[Touch end]");
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && setMobileView) {
      setMobileView('content');
    } else if (isRightSwipe && setMobileView) {
      setMobileView('chat');
    }
  };

  useEffect(() => {
    handleAyrshareSocialHandles();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

  const handleAyrshareSocialHandles = async () => {
     try{
      const socialMediaHandles = await getAyrshareSocialHandles();
      
      Object.entries(socialMediaHandles).forEach(([platform, isConnected]) => {
        updatePlatformConnection(platform, isConnected as boolean);
      });
      
     } catch(error){
      console.error(error)
     }
  }

  const handleAyrshareConnection = async (platform: PlatformType) => {
    try {
        setLoadingPlatforms(prev => [...prev, platform]);
        const response = await generateAyrshareToken([platform] as PlatformType[]);
        const currentUrl = encodeURIComponent(window.location.href);
        const hasSourceParam = window.location.href.includes(`source=${AYRSHARE}`);
        
        const url = `${response.url}&redirect=${currentUrl}${hasSourceParam ? '' : `?source=${AYRSHARE}`}`;
        window.open(url, "_self");
        setShowMobileMenu(false); // Close menu after connection
    } catch (error) {
        console.error('Failed to connect social media:', error);
        setLoadingPlatforms(prev => prev.filter(p => p !== platform));
    }
  };

  const handlePlatformToggle = async (platformName: PlatformType, isActive: boolean) => {
    const newPlatforms = isActive
      ? [...currentPlatforms, platformName]
      : currentPlatforms.filter((p) => p !== platformName);
    
    setLoadingPlatforms(prev => [...prev, platformName]);
    await updatePostHandler("platform", newPlatforms);
    setLoadingPlatforms(prev => prev.filter(p => p !== platformName));
  };

  return (
    <header
      className={`h-[70px] ${headerBg} text-white flex items-center justify-between px-4 border-b ${headerBorder} shrink-0 relative`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Link
        href="/"
        className="relative flex-shrink-0 flex items-center cursor-pointer"
      >
        {/* Mark PNG - only visible on mobile */}
        {isMobileView && (
          <img
            src={markPng}
            alt="Mark AI"
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
        )}
        
        {/* Main Logo */}
        <img
          src={markAiLogo}
          alt="Mark.ai Logo"
          className="h-[65px] object-contain"
        />
      </Link>

      {/* Chat/Content Toggle - only on mobile */}
      {isMobileView && setMobileView && (
        <div className="flex items-center ${headerBg} rounded-lg p-1">
          <button
            onClick={() => setMobileView('chat')}
            className={`flex items-center justify-center p-2 rounded-md transition-colors ${
              mobileView === 'chat' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <MessageCircle size={16} />
          </button>
          <button
            onClick={() => setMobileView('content')}
            className={`flex items-center justify-center p-2 rounded-md transition-colors ${
              mobileView === 'content' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <FileText size={16} />
          </button>
        </div>
      )}

      {/* Social Media Icons - hidden on mobile, shown on desktop */}
      {!isMobileView && (
      <div className="flex items-center gap-4 h-[50px]">
        {sortedPlatforms.map((platform) => (
          <ConnectSocialIcon
            key={platform.value}
            handleAyrshareConnection={handleAyrshareConnection}
            loadingPlatforms={loadingPlatforms}
            isToggleOn={currentPlatforms.includes(platform.value)}
            onToggle={handlePlatformToggle}
            platform={platform}
          />
        ))}
      </div>
      )}

      {/* Mobile menu and sign out */}
      <div className="flex items-center gap-2" ref={mobileMenuRef}>
        {/* Mobile menu button */}
        {isMobileView && (
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`flex items-center justify-center ${headerBg} hover:bg-slate-700 text-white p-2 rounded-md transition-colors`}
          >
            {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}

        {/* Sign out button - only on desktop */}
        {!isMobileView && (
          <button
            onClick={logout}
            className={`flex items-center justify-center gap-2 ${headerBg} hover:bg-slate-700 text-white px-3 py-2 rounded-md transition-colors text-sm border border-gray-700`}
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        )}

        {/* Mobile dropdown menu */}
        {showMobileMenu && isMobileView && (
          <div className="absolute top-full right-0 max-w-[80%] w-full border border-gray-700/50 rounded-lg shadow-lg z-30 mt-2 mr-2" style={{ backgroundColor: '#11132f' }}>
            <div className="p-4">
              <h3 className="text-l font-medium text-gray-300 mb-3">Connect Social Media</h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {sortedPlatforms.map((platform) => (
                  <div key={platform.value} className="w-10 h-10">
                    <ConnectSocialIcon
                      platform={platform}
                      handleAyrshareConnection={handleAyrshareConnection}
                      loadingPlatforms={loadingPlatforms}
                      isToggleOn={currentPlatforms.includes(platform.value)}
                      onToggle={handlePlatformToggle}
                    />
                  </div>
                ))}
              </div>
              
              {/* Sign out button in mobile menu */}
              <div className="border-t border-gray-600 pt-3">
                <button
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-md transition-colors text-xs border border-gray-700"
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
