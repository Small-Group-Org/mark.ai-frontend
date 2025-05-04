import { type PostData } from '../components/dashboard/PostPreviewPanel';

// Global function to check if we're on the create page
function isOnCreatePage(): boolean {
  if (typeof window !== 'undefined') {
    return window.location.pathname === '/create';
  }
  return false;
}

// Make sure window.updatePostPreview has a fallback if the component isn't mounted yet
if (typeof window !== 'undefined' && !window.updatePostPreview) {
  // Define a temporary function that will handle calls before the component mounts
  window.updatePostPreview = (data: PostData) => {
    // First check if we're on the correct page
    if (!isOnCreatePage()) {
      console.error('Error: updatePostPreview only works on the /create page. Please navigate to /create and try again.');
      return false;
    } else {
      console.error('Error: PostPreviewPanel is not mounted yet. Please wait for the component to load completely.');
      return false;
    }
  };
}

// Add TypeScript declaration for the window object
declare global {
  interface Window {
    updatePostPreview: (data: PostData) => void;
  }
}