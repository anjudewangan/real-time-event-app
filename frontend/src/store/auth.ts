import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
