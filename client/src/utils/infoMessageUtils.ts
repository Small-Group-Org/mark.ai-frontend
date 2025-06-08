/**
 * Utility functions for handling info messages in the chat system
 */

export interface PostDetails {
  postId?: string;
  scheduleDate?: string;
  action?: "navigate-create" | "navigate-calendar";
}

/**
 * Extracts post details from chat message text
 * Expected format: <postId:123,scheduleDate:2024-01-01,action:navigate-calendar>
 */
export const extractPostDetailsFromMessage = (messageText: string): PostDetails | null => {
  const postDetailsMatch = messageText.match(/<([^>]+)>/);
  if (!postDetailsMatch) return null;

  try {
    const postDetailsString = postDetailsMatch[1];
    const details: any = {};
    const pairs = postDetailsString.split(',');
    
    pairs.forEach(pair => {
      const [key, value] = pair.split(':');
      if (key && value) {
        details[key.trim()] = value.trim();
      }
    });

    return {
      postId: details.postId,
      scheduleDate: details.scheduleDate,
      action: details.action as "navigate-create" | "navigate-calendar"
    };
  } catch (error) {
    console.error('Error parsing post details:', error);
    return null;
  }
};

/**
 * Removes post details markup from message text for display
 */
export const cleanMessageText = (messageText: string): string => {
  return messageText.replace(/<[^>]+>/g, '').trim();
};

/**
 * Sets navigation state for Calendar component (wouter compatibility)
 */
export const setCalendarNavigationState = (postId: string, scheduleDate: string) => {
  (window as any).__calendarNavState = {
    editPostId: postId,
    scheduleDate: scheduleDate
  };
};

/**
 * Gets and clears navigation state for Calendar component
 */
export const getAndClearCalendarNavigationState = (): { editPostId?: string; scheduleDate?: string } | null => {
  const globalNavState = (window as any).__calendarNavState;
  if (globalNavState) {
    delete (window as any).__calendarNavState;
    return globalNavState;
  }
  return null;
}; 