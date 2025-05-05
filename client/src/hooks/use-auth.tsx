import { create } from 'zustand';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  // In this UI-only implementation, these functions are stubs
  login: async (email: string, password: string) => {
    // This would normally make an API call to authenticate
    console.log('Mock login with:', email, password);
    
    // For UI testing, we'll simulate a successful login
    set({
      isAuthenticated: true,
      user: {
        id: 1,
        firstName: 'Demo',
        lastName: 'User',
        email: email,
      }
    });
  },
  
  register: async (firstName: string, lastName: string, email: string, password: string) => {
    // This would normally make an API call to register the user
    console.log('Mock register with:', firstName, lastName, email, password);
    
    // For UI testing, we'll simulate a successful registration
    set({
      isAuthenticated: true,
      user: {
        id: 1,
        firstName,
        lastName,
        email,
      }
    });
  },
  
  logout: () => {
    // This would normally clear authentication tokens
    set({
      user: null,
      isAuthenticated: false
    });
  }
}));