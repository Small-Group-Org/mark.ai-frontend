import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/hooks/use-auth-modal';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface AuthButtonProps {
  mode?: 'signin' | 'signup';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  mode = 'signin',
  variant = 'default',
  className = ''
}) => {
  const { onOpen, setView } = useAuthModal();
  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => {
    if (isAuthenticated && mode === 'signin') {
      logout();
    } else {
      setView(mode);
      onOpen();
    }
  };

  // Define button text based on mode and auth state
  const buttonText = isAuthenticated && mode === 'signin' 
    ? 'Sign Out' 
    : mode === 'signin' 
      ? 'Sign In' 
      : 'Sign Up';

  // Style classes based on variant
  let variantClasses = '';
  if (variant === 'default') {
    variantClasses = mode === 'signin' 
      ? 'bg-transparent hover:bg-slate-700 text-white border border-slate-600' 
      : 'bg-cyan-500 hover:bg-cyan-600 text-white';
  } else if (variant === 'ghost') {
    variantClasses = 'bg-transparent hover:bg-slate-700 text-white';
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent hover:bg-slate-700 text-white border border-slate-600';
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(variantClasses, "rounded-lg text-sm", className)}
    >
      {buttonText}
    </Button>
  );
};

export default AuthButton;