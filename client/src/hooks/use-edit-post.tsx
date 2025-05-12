import { useState, useCallback } from 'react';
import { PostData } from '@/components/EditPost';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

// Define the empty/default post structure
const DEFAULT_POST: PostData = {
  title: '',
  content: '',
  hashtags: [],
  mediaUrl: [],
  socialPlatforms: {
    'Instagram': false,
    'Facebook': false,
    'TikTok': false,
    'X/Twitter': false,
    'Reddit': false,
    'Telegram': false,
    'Threads': false,
    'YouTube': false,
    'Bluesky': false,
    'Google Business': false
  },
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
  onOpen: (postId?: number | string) => void;
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
  const onOpen = useCallback(async (postId?: number | string) => {
    if (postId) {
      setIsLoading(true);
      try {
        // In a real app, you would fetch the post data from your API
        // const response = await axios.get(`/api/posts/${postId}`);
        // setPost(response.data);
        
        // For now, we'll use a mock implementation
        // In the future, replace this with actual API calls
        setTimeout(() => {
          const mockPost: PostData = {
            ...DEFAULT_POST,
            id: postId,
            title: 'Sample Post Title',
            content: 'This is a sample post content that would be loaded from the server.',
            hashtags: ['#sample', '#post', '#content'],
            scheduledDate: new Date().toISOString().slice(0, 16)
          };
          setPost(mockPost);
          setIsLoading(false);
        }, 500);
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
      // In a real app, you would send the updated post to your API
      // if (updatedPost.id) {
      //   await axios.put(`/api/posts/${updatedPost.id}`, updatedPost);
      // } else {
      //   await axios.post('/api/posts', updatedPost);
      // }
      
      // For now, we'll use a mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: 'Success',
        description: updatedPost.id ? 'Post updated successfully' : 'Post created successfully',
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
    if (!post.id) return;
    
    setIsLoading(true);
    try {
      // In a real app, you would send a delete request to your API
      // await axios.delete(`/api/posts/${post.id}`);
      
      // For now, we'll use a mock implementation
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
  }, [post.id, toast]);

  // Generate content with AI
  const onGenerate = useCallback(async (prompt: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would send the prompt to your AI generation API
      // const response = await axios.post('/api/generate', { prompt });
      // const generatedContent = response.data.content;
      
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