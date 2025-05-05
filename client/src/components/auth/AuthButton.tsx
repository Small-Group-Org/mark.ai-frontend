import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/hooks/use-auth-modal';

export const AuthButton = () => {
  const { onOpen, setView } = useAuthModal();

  const handleSignIn = () => {
    setView('signin');
    onOpen();
  };

  return (
    <Button
      onClick={handleSignIn}
      className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm"
    >
      Sign In
    </Button>
  );
};

export default AuthButton;