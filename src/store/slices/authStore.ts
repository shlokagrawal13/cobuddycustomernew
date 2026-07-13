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
  kycStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  login: (token: string, user: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
  setKycStatus: (status: 'unverified' | 'pending' | 'verified' | 'rejected') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isOnboardingComplete: false,
  kycStatus: 'unverified',
  login: (token, user) => set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false, isOnboardingComplete: false, kycStatus: 'unverified' }),
  completeOnboarding: () => set({ isOnboardingComplete: true }),
  setKycStatus: (status) => set({ kycStatus: status }),
}));
