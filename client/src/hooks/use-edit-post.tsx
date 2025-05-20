import { useState, useCallback } from 'react';
import { PostData } from '@/components/EditPost';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

// Define the empty/default post structure
const DEFAULT_POST: PostData = {
  postId: '',
  userId: '',
  title: '',
  content: '',
  hashtag: '',
  hashtags: [],
  mediaUrls: [],
  socialPlatforms: {
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false
  },
  status: 'draft',
  postType: {
    post: true,
    story: false,
    reel: false,
  },
  scheduledDate: new Date().toISOString().slice(0, 16) // Current date/time in format for datetime-local input
};

export interface EditPostStore {
  isOpen: boolean;
  post: PostData;
  isLoading: boolean;
  onOpen: (postId?: number | string, postData?: PostData) => void;
  onClose: () => void;
  onSave: (post: PostData) => Promise<void>;
  onDelete: () => Promise<void>;
  onGenerate: (prompt: string) => Promise<void>;
}

export const useEditPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState<PostData>(DEFAULT_POST);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Open the edit modal with a specific post
  const onOpen = useCallback(async (postIdOrEvent?: number | string, postData?: PostData) => {
    if (postData) {
      setPost(postData);
      setIsOpen(true);
      return;
    }

    if (postIdOrEvent) {
      setIsLoading(true);
      try {
          // Check if this is a calendar event by looking for the event in our mock calendar data
          const mockEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
          const calendarEvent = mockEvents.find((event: any) => event.id === postIdOrEvent);
          
          let mockPost: PostData;
          
          if (calendarEvent) {
          // Convert calendar event to PostData format
              mockPost = {
                ...DEFAULT_POST,
            postId: postIdOrEvent,
                title: calendarEvent.title || 'Calendar Event',
                content: calendarEvent.content || 'Content from calendar event',
            hashtag: calendarEvent.hashtag || '',
            hashtags: calendarEvent.hashtags || [],
            mediaUrls: calendarEvent.mediaUrls || [],
                socialPlatforms: {
              facebook: calendarEvent.platforms?.includes('facebook') || false,
              instagram: calendarEvent.platforms?.includes('instagram') || false,
              twitter: calendarEvent.platforms?.includes('twitter') || false,
              linkedin: calendarEvent.platforms?.includes('linkedin') || false
            },
            status: calendarEvent.status || 'draft',
            scheduledDate: new Date(calendarEvent.scheduled_time).toISOString().slice(0, 16),
            postType: calendarEvent.postType || DEFAULT_POST.postType
          };
          } else {
            // Regular post, use default mock data
            mockPost = {
              ...DEFAULT_POST,
            postId: postIdOrEvent,
              title: 'Sample Post Title',
              content: 'This is a sample post content that would be loaded from the server.',
            hashtag: '#sample',
            hashtags: ['sample', 'post', 'content'],
              scheduledDate: new Date().toISOString().slice(0, 16)
            };
          }
          
          setPost(mockPost);
          setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch post', error);
        toast({
          title: 'Error',
          description: 'Failed to load post data',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } else {
      // Create a new post with default values
      setPost(DEFAULT_POST);
    }
    setIsOpen(true);
  }, [toast]);

  // Close the edit modal
  const onClose = useCallback(() => {
    setIsOpen(false);
    // Reset to default after a short delay to avoid UI flicker
    setTimeout(() => {
      setPost(DEFAULT_POST);
    }, 300);
  }, []);

  // Save the post
  const onSave = useCallback(async (updatedPost: PostData) => {
    setIsLoading(true);
    try {
      // Check if this might be a calendar event by getting saved events
      const savedEventsStr = localStorage.getItem('calendarEvents');
      if (savedEventsStr && updatedPost.postId) {
        try {
          const savedEvents = JSON.parse(savedEventsStr);
          // Look for an event with the same ID
          const eventIndex = savedEvents.findIndex((event: any) => event.id === updatedPost.postId);
          
          if (eventIndex !== -1) {
            // This is a calendar event, so update it
            const updatedEvent = {
              ...savedEvents[eventIndex],
              title: updatedPost.title,
              content: updatedPost.content,
              hashtag: updatedPost.hashtag,
              hashtags: updatedPost.hashtags,
              // Extract active platforms from socialPlatforms object
              platforms: Object.entries(updatedPost.socialPlatforms)
                .filter(([_, isActive]) => isActive)
                .map(([platform]) => platform),
              // Convert scheduledDate to ISO format for calendar
              scheduled_time: new Date(updatedPost.scheduledDate).toISOString(),
              mediaUrls: updatedPost.mediaUrls,
              status: updatedPost.status,
              postType: updatedPost.postType
            };
            
            // Update the event in the array
            savedEvents[eventIndex] = updatedEvent;
            
            // Save the updated events back to localStorage
            localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
            
            // Refresh the calendar view by dispatching a custom event
            window.dispatchEvent(new CustomEvent('calendarUpdated'));
          }
        } catch (e) {
          console.error('Error handling calendar event update', e);
        }
      }
      
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: 'Success',
        description: updatedPost.postId ? 'Post updated successfully' : 'Post created successfully',
      });
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save post', error);
      toast({
        title: 'Error',
        description: 'Failed to save post',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [toast]);

  // Delete the post
  const onDelete = useCallback(async () => {
    if (!post.postId) return;
    
    setIsLoading(true);
    try {
      // Check if this might be a calendar event
      const savedEventsStr = localStorage.getItem('calendarEvents');
      if (savedEventsStr) {
        try {
          const savedEvents = JSON.parse(savedEventsStr);
          // Look for an event with the same ID
          const eventIndex = savedEvents.findIndex((event: any) => event.id === post.postId);
          
          if (eventIndex !== -1) {
            // This is a calendar event, so remove it
            savedEvents.splice(eventIndex, 1);
            
            // Save the updated events back to localStorage
            localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
            
            // Refresh the calendar view by dispatching a custom event
            window.dispatchEvent(new CustomEvent('calendarUpdated'));
          }
        } catch (e) {
          console.error('Error handling calendar event deletion', e);
        }
      }
      
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      });
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete post', error);
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [post.postId, toast]);

  // Generate content with AI
  const onGenerate = useCallback(async (prompt: string) => {
    setIsLoading(true);
    try {
      // For now, we'll use a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockGeneratedContent = `Generated content based on: "${prompt}". This would be replaced with actual AI-generated content.`;
      
      setPost(prev => ({
        ...prev,
        content: prev.content 
          ? `${prev.content}\n\n${mockGeneratedContent}` 
          : mockGeneratedContent
      }));
      
      toast({
        title: 'Content Generated',
        description: 'AI-generated content has been added to your post',
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to generate content', error);
      toast({
        title: 'Error',
        description: 'Failed to generate content',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  }, [toast]);

  return {
    isOpen,
    post,
    isLoading,
    onOpen,
    onClose,
    onSave,
    onDelete,
    onGenerate
  };
};

export default useEditPost;