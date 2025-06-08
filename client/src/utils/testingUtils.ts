/* ========================================
 * TESTING UTILITIES - REMOVE BEFORE PRODUCTION
 * ======================================== 
 * 
 * This file contains testing functions that should be completely
 * removed before deploying to production. These functions are used
 * for development and testing purposes only.
 * 
 * TO REMOVE FOR PRODUCTION:
 * 1. Delete this entire file
 * 2. Remove all imports of this file from components
 * 3. Remove any references to these functions
 * ======================================== */

import { usePostStore } from '@/store/usePostStore';

/**
 * TESTING ONLY - Demo function to test info messages
 * Creates sample info messages to test navigation functionality
 */
export const testInfoMessages = () => {
  const { addInfoMessage } = usePostStore.getState();
  
  // Test navigate to create
  setTimeout(() => {
    addInfoMessage(
      "Hey! I'm creating your post, checkout the preview here",
      "navigate-create"
    );
  }, 2000);

  // Test navigate to calendar with post
  setTimeout(() => {
    addInfoMessage(
      "Hey! I have scheduled your post, you can edit it here",
      "navigate-calendar",
      "test-post-id-123",
      new Date().toISOString()
    );
  }, 5000);
};

/**
 * TESTING ONLY - Function to create post scheduled info messages
 * Used for testing the info message system
 */
export const createPostScheduledInfoMessage = (
  postId: string, 
  scheduleDate: string, 
  action: "schedule" | "draft"
) => {
  const { addInfoMessage } = usePostStore.getState();
  const actionText = action === "schedule" ? "scheduled" : "drafted";
  
  addInfoMessage(
    `Hey! I have ${actionText} your post, you can edit it here`,
    "navigate-calendar",
    postId,
    scheduleDate
  );
};

/**
 * TESTING ONLY - Exposes testing functions globally
 * This should be called from components during development
 */
export const exposeTestingFunctions = () => {
  (window as any).testInfoMessages = testInfoMessages;
  (window as any).createPostScheduledInfoMessage = createPostScheduledInfoMessage;
};

/**
 * TESTING ONLY - Cleans up global testing functions
 * This should be called in cleanup functions
 */
export const cleanupTestingFunctions = () => {
  delete (window as any).testInfoMessages;
  delete (window as any).createPostScheduledInfoMessage;
}; 