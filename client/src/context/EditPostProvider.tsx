import React, { createContext, useContext } from 'react';
import useEditPost, { EditPostStore } from '@/hooks/use-edit-post';
import EditPost from '@/components/EditPost';

// Create context
export const EditPostContext = createContext<EditPostStore | null>(null);

// Provider component
export const EditPostProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const editPostStore = useEditPost();

  return (
    <EditPostContext.Provider value={editPostStore}>
      <EditPost 
        isOpen={editPostStore.isOpen}
        onClose={editPostStore.onClose}
        post={editPostStore.post}
        onSave={editPostStore.onSave}
        onDelete={editPostStore.onDelete}
        onGenerate={editPostStore.onGenerate}
      />
      {children}
    </EditPostContext.Provider>
  );
};

// Hook for consuming the context
export const useEditPostContext = () => {
  const context = useContext(EditPostContext);
  if (!context) {
    throw new Error('useEditPostContext must be used within an EditPostProvider');
  }
  return context;
};

export default EditPostProvider;