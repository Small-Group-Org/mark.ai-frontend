import { type PostData } from '../components/dashboard/PostPreviewPanel';

// Store for global functions
const globalFunctions: {
  updatePostPreview?: (data: PostData) => boolean;
} = {};

// Export a function to register the updatePostPreview function
export function registerUpdatePostPreview(fn: (data: PostData) => boolean) {
  globalFunctions.updatePostPreview = fn;
  
  // Also expose it on the window object for direct console access
  (window as any).updatePostPreview = fn;
}

// Export the function for use in other components
export function getUpdatePostPreview(): ((data: PostData) => boolean) | undefined {
  return globalFunctions.updatePostPreview;
}

// Make sure window.updatePostPreview always works from the console
if (typeof window !== 'undefined') {
  (window as any).updatePostPreview = (data: PostData) => {
    if (globalFunctions.updatePostPreview) {
      return globalFunctions.updatePostPreview(data);
    } else {
      console.error('updatePostPreview function is not registered yet');
      return false;
    }
  };
}