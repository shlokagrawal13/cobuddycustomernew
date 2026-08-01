import type { AuthState } from '../slices/authStore';

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectIsOnboardingComplete = (state: AuthState) => state.isOnboardingComplete;
export const selectKycStatus = (state: AuthState) => state.kycStatus;
export const selectCompleteOnboarding = (state: AuthState) => state.completeOnboarding;
