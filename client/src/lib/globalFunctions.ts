import { type PostData } from '../components/dashboard/PostPreviewPanel';

// Global function to check if we're on the create page
function isOnCreatePage(): boolean {
  if (typeof window !== 'undefined') {
    return window.location.pathname === '/create';
  }
  return false;
}

// Store for global functions
const globalFunctions: {
  updatePostPreview?: (data: PostData) => any;
} = {};

// Export a function to register the updatePostPreview function
export function registerUpdatePostPreview(fn: (data: PostData) => any) {
  globalFunctions.updatePostPreview = fn;
}

// Export the function for use in other components
export function getUpdatePostPreview(): ((data: PostData) => any) | undefined {
  return globalFunctions.updatePostPreview;
}

// Make sure window.updatePostPreview always works from the console
if (typeof window !== 'undefined') {
  // Define the function on the window object
  window.updatePostPreview = (data: PostData) => {
    // First check if we're on the correct page
    if (!isOnCreatePage()) {
      console.error('Error: updatePostPreview only works on the /create page. Please navigate to /create and try again.');
      return false;
    }
    
    // Then check if the function is registered
    if (globalFunctions.updatePostPreview) {
      // Call the function and return its result (could be Promise or boolean)
      return globalFunctions.updatePostPreview(data);
    } else {
      console.error('Error: PostPreviewPanel is not mounted yet. Please wait for the component to load completely.');
      return false;
    }
  };
}

// Add TypeScript declaration for the window object
declare global {
  interface Window {
    updatePostPreview: (data: PostData) => any;
  }
}