import { create } from 'zustand';

interface User {
  id: string;
  phone: string;
  name?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isOnboardingComplete: false,
  login: (token, user) => set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false, isOnboardingComplete: false }),
  completeOnboarding: () => set({ isOnboardingComplete: true }),
}));
