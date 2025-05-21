import { useState, useCallback } from 'react';
import { Post, PlatformType, PostStatus } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

// Define the empty/default post structure
const DEFAULT_POST: Post = {
  _id: undefined,
  userId: '',
  title: '',
  content: '',
  hashtag: '',
  mediaUrl: [],
  platform: [],
  postType: 'post',
  status: 'draft',
  scheduleDate: new Date(),
  publish: '',
  platformId: undefined,
  createdAt: new Date(),
  ayrshareId: '',
};

export interface EditPostStore {
  isOpen: boolean;
  post: Post;
  isLoading: boolean;
  onOpen: (postId?: string, postData?: Post) => void;
  onClose: () => void;
  onSave: (post: Post) => Promise<void>;
  onDelete: () => Promise<void>;
  onGenerate: (prompt: string) => Promise<void>;
}

export const useEditPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState<Post>(DEFAULT_POST);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Open the edit modal with a specific post
  const onOpen = useCallback(async (postId?: string, postData?: Post) => {
    if (postData) {
      setPost(postData);
      setIsOpen(true);
      return;
    }

    if (postId) {
      setIsLoading(true);
      try {
        // Try to load from localStorage mock (calendarEvents)
        const mockEvents = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
        const calendarEvent = mockEvents.find((event: any) => event._id === postId);
        let mockPost: Post;
        if (calendarEvent) {
          mockPost = {
            ...DEFAULT_POST,
            _id: calendarEvent._id,
            userId: calendarEvent.userId || '',
            title: calendarEvent.title || 'Calendar Event',
            content: calendarEvent.content || 'Content from calendar event',
            hashtag: calendarEvent.hashtag || '',
            mediaUrl: calendarEvent.mediaUrl || [],
            platform: calendarEvent.platform || [],
            postType: calendarEvent.postType || 'post',
            status: calendarEvent.status || 'draft',
            scheduleDate: calendarEvent.scheduleDate ? new Date(calendarEvent.scheduleDate) : new Date(),
            publish: calendarEvent.publish || '',
            platformId: calendarEvent.platformId,
            createdAt: calendarEvent.createdAt ? new Date(calendarEvent.createdAt) : new Date(),
            ayrshareId: calendarEvent.ayrshareId || '',
          };
        } else {
          // Regular post, use default mock data
          mockPost = {
            ...DEFAULT_POST,
            _id: postId,
            title: 'Sample Post Title',
            content: 'This is a sample post content that would be loaded from the server.',
            hashtag: '#sample',
            scheduleDate: new Date(),
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
  const onSave = useCallback(async (updatedPost: Post) => {
    setIsLoading(true);
    try {
      // Check if this might be a calendar event by getting saved events
      const savedEventsStr = localStorage.getItem('calendarEvents');
      if (savedEventsStr && updatedPost._id) {
        try {
          const savedEvents = JSON.parse(savedEventsStr);
          // Look for an event with the same ID
          const eventIndex = savedEvents.findIndex((event: any) => event._id === updatedPost._id);
          if (eventIndex !== -1) {
            // This is a calendar event, so update it
            const updatedEvent = {
              ...savedEvents[eventIndex],
              title: updatedPost.title,
              content: updatedPost.content,
              hashtag: updatedPost.hashtag,
              platform: updatedPost.platform,
              scheduleDate: updatedPost.scheduleDate,
              mediaUrl: updatedPost.mediaUrl,
              status: updatedPost.status,
              postType: updatedPost.postType,
              publish: updatedPost.publish,
              platformId: updatedPost.platformId,
              createdAt: updatedPost.createdAt,
              ayrshareId: updatedPost.ayrshareId,
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
        description: updatedPost._id ? 'Post updated successfully' : 'Post created successfully',
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
    if (!post._id) return;
    setIsLoading(true);
    try {
      // Check if this might be a calendar event
      const savedEventsStr = localStorage.getItem('calendarEvents');
      if (savedEventsStr) {
        try {
          const savedEvents = JSON.parse(savedEventsStr);
          // Look for an event with the same ID
          const eventIndex = savedEvents.findIndex((event: any) => event._id === post._id);
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
  }, [post._id, toast]);

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