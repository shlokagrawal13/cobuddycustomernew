import { create } from 'zustand';

export interface Companion {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  interests: string[];
}

interface CompanionState {
  companions: Companion[];
  selectedCompanion: Companion | null;
  isLoading: boolean;
  fetchCompanions: () => Promise<void>;
  selectCompanion: (companion: Companion) => void;
}

export const useCompanionStore = create<CompanionState>((set) => ({
  companions: [],
  selectedCompanion: null,
  isLoading: false,
  fetchCompanions: async () => {
    set({ isLoading: true });
    // Mock fetch
    setTimeout(() => {
      set({ companions: [], isLoading: false });
    }, 1000);
  },
  selectCompanion: (companion) => set({ selectedCompanion: companion }),
}));
