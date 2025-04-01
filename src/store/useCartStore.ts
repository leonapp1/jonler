import { create } from 'zustand';

interface CartStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));