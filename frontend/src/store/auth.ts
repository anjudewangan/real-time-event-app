import { create } from 'zustand';

export const useAuthStore = create(() => ({
  token: 'testtoken',
  user: {
    id: 'user1',
    name: 'Test User',
    email: 'test@example.com'
  }
}));
