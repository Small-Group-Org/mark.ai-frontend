import React, { createContext, useContext } from 'react';
import useEditPost from '@/hooks/use-edit-post';
import { Post } from '@/types/post';
import EditPost from '@/components/post/EditPost';

interface EditPostContextType {
  isOpen: boolean;
  post: Post;
  isLoading: boolean;
  onOpen: (postId?: string, postData?: Post) => void;
  onClose: () => void;
  onSave: (post: Post) => Promise<boolean>;
  onDelete: () => Promise<void>;
  onGenerate: (prompt: string) => Promise<void>;
}

// Create context
const EditPostContext = createContext<EditPostContextType | undefined>(undefined);

// Provider component
export const EditPostProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const editPost = useEditPost();
  const {isOpen, isLoading, onClose, post, onSave, onDelete, onGenerate} = editPost;

  return (
    <EditPostContext.Provider value={editPost}>
      <EditPost
        isOpen={isOpen}
        onClose={onClose}
        post={post}
        onSave={onSave}
        onDelete={onDelete}
        onGenerate={onGenerate}
        isLoading={isLoading}
      />
      {children}
    </EditPostContext.Provider>
  );
};

// Hook for consuming the context
export const useEditPostContext = () => {
  const context = useContext(EditPostContext);
  if (context === undefined) {
    throw new Error('useEditPostContext must be used within an EditPostProvider');
  }
  return context;
};

export default EditPostProvider;