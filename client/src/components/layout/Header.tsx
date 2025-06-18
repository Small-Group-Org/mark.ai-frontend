import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { LogOut, Menu, X, MessageCircle, FileText, CircleUser } from "lucide-react";
import UserProfileDialog from "@/components/ui/UserProfileDialog";
import markAiLogo from "../../assets/logo.png";
import markPng from "../../assets/mark.png";
import { AYRSHARE } from "@/commons/constant";
import ConnectSocialIcon from "../ui/ConnectSocialIcon";
import { Link } from "wouter";
import { useAuthStore } from "@/store/useAuthStore";
import { generateAyrshareToken, getAyrshareSocialHandles } from "@/services/ayrShareServices";
import { PlatformType } from "@/types";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import { getSortedPlatforms } from "@/commons/utils";
import { updatePlatforms } from "@/services/authServices";
import { syncPostsFromDB } from "@/utils/postSync";

// Constants
const HEADER_STYLES = {
  bg: "bg-[#11132f]",
  border: "border-gray-700/50",
  height: "h-[70px]",
} as const;

const MIN_SWIPE_DISTANCE = 50;

interface HeaderProps {
  mobileView?: 'chat' | 'content';
  setMobileView?: (view: 'chat' | 'content') => void;
}

const Header: React.FC<HeaderProps> = ({ mobileView = 'chat', setMobileView }) => {
  // Hooks
  const { logout, updatePlatformConnection, getEnabledPlatforms, updatePlatformToggleStatus, socialPlatforms, getActivePlatforms } = useAuthStore();
  const { isMobileView } = useMobileDetection();

  // State
  const [loadingPlatforms, setLoadingPlatforms] = useState<string[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Refs
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Derived state
  const enabledPlatforms = getEnabledPlatforms();
  const sortedPlatforms = useMemo(() => getSortedPlatforms(enabledPlatforms), [enabledPlatforms]);
  const activePlatforms = getActivePlatforms();

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !setMobileView) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      setMobileView('content');
    } else if (isRightSwipe) {
      setMobileView('chat');
    }
  }, [touchStart, touchEnd, setMobileView]);

  // Platform handlers
  const handleAyrshareSocialHandles = useCallback(async () => {
    try {
      const socialMediaHandles = await getAyrshareSocialHandles();
      Object.entries(socialMediaHandles).forEach(([platform, isConnected]) => {
        updatePlatformConnection(platform, isConnected as boolean);
      });
    } catch (error) {
      console.error('Failed to fetch social handles:', error);
    }
  }, [updatePlatformConnection]);

  const handleAyrshareConnection = useCallback(async (platform: PlatformType) => {
    try {
      setLoadingPlatforms(prev => [...prev, platform]);
      const response = await generateAyrshareToken([platform] as PlatformType[]);
      const currentUrl = encodeURIComponent(window.location.href);
      const hasSourceParam = window.location.href.includes(`source=${AYRSHARE}`);
      
      const url = `${response.url}&redirect=${currentUrl}${hasSourceParam ? '' : `?source=${AYRSHARE}`}`;
      window.open(url, "_self");
      setShowMobileMenu(false);
    } catch (error) {
      console.error('Failed to connect social media:', error);
      setLoadingPlatforms(prev => prev.filter(p => p !== platform));
    }
  }, []);

  const handlePlatformToggle = useCallback(async (platformName: PlatformType, isActive: boolean) => {    
    try {
      setLoadingPlatforms(prev => [...prev, platformName]);
      
      // Update local state first
      updatePlatformToggleStatus(platformName, isActive);
      
      // Get current active platforms and create updated payload
      const currentActivePlatforms = socialPlatforms.reduce((acc, platform) => {
        acc[platform.value as PlatformType] = platform.toggleStatus;
        return acc;
      }, {} as Record<PlatformType, boolean>);
      
      // Update with the new toggle status
      const updatedActivePlatforms = {
        ...currentActivePlatforms,
        [platformName]: isActive
      };
      
      // Call API to update user's active platforms
      await updatePlatforms(updatedActivePlatforms);
      
      // Sync posts from DB (platform filtering handled automatically)
      await syncPostsFromDB();
      
    } catch (error) {
      console.error('Failed to update platform toggle:', error);
      // Revert local state on error
      updatePlatformToggleStatus(platformName, !isActive);
    } finally {
      setLoadingPlatforms(prev => prev.filter(p => p !== platformName));
    }
  }, [updatePlatformToggleStatus, socialPlatforms]);

  // Effects
  useEffect(() => {
    handleAyrshareSocialHandles();
  }, [handleAyrshareSocialHandles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileMenu]);

  // Render helpers
  const renderMobileToggle = () => (
    isMobileView && setMobileView && (
      <div className="flex items-center bg-[#11132f] rounded-lg p-1">
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
    )
  );

  const renderSocialIcons = () => (
    !isMobileView && (
      <div className="flex items-center gap-4 h-[50px]">
        {sortedPlatforms.map((platform) => (
          <ConnectSocialIcon
            key={platform.value}
            handleAyrshareConnection={handleAyrshareConnection}
            loadingPlatforms={loadingPlatforms}
            isToggleOn={activePlatforms.includes(platform.value)}
            onToggle={handlePlatformToggle}
            platform={platform}
          />
        ))}
      </div>
    )
  );

  const renderMobileMenu = () => (
    showMobileMenu && isMobileView && (
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
                  isToggleOn={activePlatforms.includes(platform.value)}
                  onToggle={handlePlatformToggle}
                />
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-600 pt-3 flex gap-2">
            <button
              onClick={() => {
                setShowUserProfile(true);
                setShowMobileMenu(false);
              }}
              className="flex items-center justify-center gap-2 flex-1 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-md transition-colors text-xs border border-gray-700"
            >
              <CircleUser size={16} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                logout();
                setShowMobileMenu(false);
              }}
              className="flex items-center justify-center gap-2 flex-1 bg-slate-800 hover:bg-slate-700 text-white px-2 py-2 rounded-md transition-colors text-xs border border-gray-700"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <header
      className={`${HEADER_STYLES.height} ${HEADER_STYLES.bg} text-white flex items-center justify-between px-4 border-b ${HEADER_STYLES.border} shrink-0 relative`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Link href="/" className="relative flex-shrink-0 flex items-center cursor-pointer">
        {isMobileView && (
          <img
            src={markPng}
            alt="Mark AI"
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
        )}
        <img
          src={markAiLogo}
          alt="Mark.ai Logo"
          className="h-[65px] object-contain"
        />
      </Link>

      {renderMobileToggle()}
      {renderSocialIcons()}

      <div className="flex items-center gap-2" ref={mobileMenuRef}>
        {isMobileView && (
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`flex items-center justify-center ${HEADER_STYLES.bg} hover:bg-slate-700 text-white p-2 rounded-md transition-colors`}
          >
            {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}

        {!isMobileView && (
          <button
            onClick={logout}
            className={`flex items-center justify-center gap-2 ${HEADER_STYLES.bg} hover:bg-slate-700 text-white px-3 py-2 rounded-md transition-colors text-sm border border-gray-700`}
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        )}

        {renderMobileMenu()}
      </div>

      {/* User Profile Dialog */}
      <UserProfileDialog 
        open={showUserProfile} 
        onOpenChange={setShowUserProfile} 
      />
    </header>
  );
};

export default Header;
