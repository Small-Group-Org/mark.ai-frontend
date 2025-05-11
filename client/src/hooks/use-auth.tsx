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
  
  // Fetch currently authenticated user - Now auto-authenticates in development
  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Check for existing auth in storage first
      const storedAuthData = localStorage.getItem('autoAuthUser');
      if (storedAuthData) {
        try {
          const parsedUser = JSON.parse(storedAuthData);
          set({ 
            user: parsedUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          console.log('User restored from local storage:', parsedUser);
          return;
        } catch (err) {
          console.error('Error parsing stored user data:', err);
          localStorage.removeItem('autoAuthUser');
        }
      }
      
      // If no stored user is found, allow normal authentication flow
      // but don't force a mock user to allow for registration/login screens
      try {
        const response = await apiRequest('GET', '/api/user');
        if (response.ok) {
          const user = await response.json();
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return;
        }
      } catch (fetchError) {
        console.error('API error fetching user:', fetchError);
      }
      
      // If API failed or returned non-authenticated,
      // just set as not authenticated without error
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: null // Don't show error in development mode
      });
    }
  },
  
  // Login with email and password - Auto-authenticates users for development
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Create a default user for auto-login (bypassing server authentication)
      const mockUser: User = {
        id: 999,
        firstName: email.split('@')[0] || 'Test',
        lastName: 'User',
        email: email,
        avatarUrl: '/avatar-placeholder.png',
        createdAt: new Date().toISOString()
      };
      
      // Save user to localStorage for persistence
      localStorage.setItem('autoAuthUser', JSON.stringify(mockUser));
      
      // Set user as authenticated without making an API call
      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      console.log('Auto-logged in user:', mockUser);
      
      // No API call is made in auto-login mode
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed. Please try again.'
      });
      throw error;
    }
  },
  
  // Register a new user - Auto-authenticates users for development
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Create a mock user for auto-registration (bypassing server)
      const mockUser: User = {
        id: 888,
        firstName,
        lastName,
        email,
        avatarUrl: '/avatar-placeholder.png',
        createdAt: new Date().toISOString()
      };
      
      // Save user to localStorage for persistence
      localStorage.setItem('autoAuthUser', JSON.stringify(mockUser));
      
      // Set user as authenticated without API call
      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      console.log('Auto-registered user:', mockUser);
      
      // No API call is made in auto-registration mode
    } catch (error) {
      console.error('Registration error:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed. Please try again.'
      });
      throw error;
    }
  },
  
  // Logout the current user - Works in auto-auth mode
  logout: async () => {
    try {
      set({ isLoading: true });
      
      // Remove auto-auth user from localStorage
      localStorage.removeItem('autoAuthUser');
      
      // Try the API logout but don't worry if it fails
      try {
        await apiRequest('POST', '/api/logout');
      } catch (apiError) {
        console.log('API logout failed, but continuing with client logout');
      }
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      
      // Still try to clean up local state
      localStorage.removeItem('autoAuthUser');
      
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null // Don't show error in development mode
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