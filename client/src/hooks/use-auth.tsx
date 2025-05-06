import { create } from 'zustand';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  createdAt?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Fetch currently authenticated user
  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiRequest('GET', '/api/user');
      
      if (response.status === 401) {
        // Not authenticated
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
        return;
      }
      
      const user = await response.json();
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: 'Failed to authenticate. Please try again.'
      });
    }
  },
  
  // Login with email and password
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiRequest('POST', '/api/login', { 
        email, 
        password 
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      
      const user = await response.json();
      
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed. Please try again.'
      });
      throw error;
    }
  },
  
  // Register a new user
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await apiRequest('POST', '/api/register', {
        firstName,
        lastName,
        email,
        password
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      const user = await response.json();
      
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Registration error:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed. Please try again.'
      });
      throw error;
    }
  },
  
  // Logout the current user
  logout: async () => {
    try {
      set({ isLoading: true });
      
      await apiRequest('POST', '/api/logout');
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed. Please try again.'
      });
    }
  }
}));

// Hook to initialize auth state on app load
export function useAuthInit() {
  const { fetchUser, isLoading } = useAuth();
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  return { isLoading };
}