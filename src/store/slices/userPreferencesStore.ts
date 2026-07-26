import { create } from 'zustand';

export interface UserPreferencesState {
  interests: string[];
  setInterests: (interests: string[]) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>((set) => ({
  interests: [],
  setInterests: (interests) => set({ interests }),
  addInterest: (interest) => set((state) => ({ interests: [...state.interests, interest] })),
  removeInterest: (interest) => set((state) => ({ interests: state.interests.filter(i => i !== interest) })),
}));
