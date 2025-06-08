import React, { useEffect } from 'react';
import { Route, useLocation } from 'wouter';
import { useAuthStore } from '@/store/useAuthStore';

type ProtectedRouteProps = {
  path: string;
  component: React.ComponentType;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  path, 
  component: Component 
}) => {
  const { isAuth } = useAuthStore();
  const [, navigate] = useLocation();

  // Handle redirect after render
  useEffect(() => {
    if (isAuth === false) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <Route path={path}>
      {() => (isAuth ? <Component /> : null)}
    </Route>
  );
};