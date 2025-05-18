import { create } from 'zustand';
import { User } from '@/types';

interface PostState {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  userDetails?: User;
  setUserDetails: (userDetails: User) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  view: 'signin' | 'signup';
  setView: (view: 'signin' | 'signup') => void;
  token?: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create<PostState>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({isAuth}),
  setUserDetails: (userDetails: User) => set({userDetails}),
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({isOpen}),
  view: 'signin',
  setView: (view) => set({ view }),
  setToken: (token: string) => set({token}),
}));
