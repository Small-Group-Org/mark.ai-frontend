import React, { createContext, useContext, useEffect } from 'react';
import useEditPost, { EditPostStore } from '@/hooks/use-edit-post';
import EditPost from '@/components/EditPost';
import { verifyToken } from '@/services/authServices';
import { getValue, STORAGE_KEYS } from '@/commons/storage';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/store/useAuthStore';

// Create context
export const EditPostContext = createContext<EditPostStore | null>(null);

// Provider component
export const EditPostProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const editPostStore = useEditPost();
  const token = getValue(STORAGE_KEYS.TOKEN) || "";
  const [, navigate] = useLocation();
  const { setIsAuth, setUserDetails } = useAuthStore()

  useEffect(() => {
    if(token){
      checkUserAuthentication();
    }
  }, []);

  const checkUserAuthentication = async () => {
    try{
      const response = await verifyToken(token);
      setUserDetails(response.user);
      setIsAuth(true);
      navigate("/dashboard");
    } catch (error){
      setIsAuth(false);
      navigate("/");
    }
  }

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