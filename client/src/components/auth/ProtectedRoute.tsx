import React from 'react';
import { Redirect, Route } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  path: string;
  component: React.ComponentType;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  path, 
  component: Component 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

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

        if (!isAuthenticated) {
          return <Redirect to="/" />;
        }

        return <Component />;
      }}
    </Route>
  );
};