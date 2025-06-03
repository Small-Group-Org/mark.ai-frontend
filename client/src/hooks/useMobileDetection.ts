import { useAuthStore } from '@/store/useAuthStore';

/**
 * Custom hook to detect if the current view is mobile
 * Uses the centralized mobile detection from useAuthStore
 * 
 * @returns {boolean} isMobileView - true if mobile view, false if desktop
 */
export const useMobileDetection = () => {
  const isMobileView = useAuthStore((state) => state.isMobileView);
  
  return {
    isMobileView,
    isMobile: isMobileView, // Alias for convenience
    isDesktop: !isMobileView
  };
}; 