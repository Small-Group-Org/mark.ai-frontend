import { create } from 'zustand';

type AuthModalStore = {
  isOpen: boolean;
  view: 'signin' | 'signup';
  onOpen: () => void;
  onClose: () => void;
  setView: (view: 'signin' | 'signup') => void;
};

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: 'signin',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setView: (view) => set({ view })
}));