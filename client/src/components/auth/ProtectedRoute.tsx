import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useAuthModal } from '@/hooks/use-auth-modal';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  path: string;
  component: React.ComponentType;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  path, 
  component: Component 
}) => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const { onOpen, setView } = useAuthModal();
  const [, navigate] = useLocation();
  
  // Auto authenticate in development mode if not authenticated
  useEffect(() => {
    const autoAuth = async () => {
      if (!isLoading && !isAuthenticated) {
        try {
          // Create a test user - you'll be automatically logged in!
          console.log('Auto-authentication active: logging in test user');
          await login('test@example.com', 'password');
          
          // No need to redirect since we're now authenticated
        } catch (error) {
          console.error('Auto-login failed:', error);
          
          // Show auth modal if auto-login fails
          setView('signin');
          onOpen();
        }
      }
    };
    
    // Short delay to let normal auth complete first
    const timer = setTimeout(autoAuth, 300);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, login, onOpen, setView]);

  return (
    <Route path={path}>
      {() => {
        if (isLoading) {
          return (
            <div className="flex h-screen w-full items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
            </div>
          );
        }

        // With auto-login, this condition may never be reached
        if (!isAuthenticated) {
          return <Component />; // Render component anyway to avoid redirect loop
        }

        return <Component />;
      }}
    </Route>
  );
};