import React, { useEffect } from 'react';
import { AuthModal } from './AuthModal';
import { useAuthModal } from '@/hooks/use-auth-modal';

export const AuthModalProvider: React.FC<{ children?: React.ReactNode }> = ({ 
  children 
}) => {
  const { isOpen, onClose, view, setView } = useAuthModal();

  // Handle modal state and trigger the proper tab
  useEffect(() => {
    if (isOpen && view) {
      setView(view);
    }
  }, [isOpen, view, setView]);

  return (
    <>
      <AuthModal 
        isOpen={isOpen} 
        onClose={onClose} 
      />
      {children}
    </>
  );
};