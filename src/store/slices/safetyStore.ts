import { create } from 'zustand';

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
}

interface SafetyState {
  isSOSActive: boolean;
  trustedContacts: TrustedContact[];
  // GPS location strictly for backend/safety-team visibility. Customer/Companion cannot see each other's live location.
  lastKnownLocation: { lat: number; lng: number } | null; 
  triggerSOS: () => void;
  resolveSOS: () => void;
  addTrustedContact: (contact: TrustedContact) => void;
  updateLocation: (lat: number, lng: number) => void;
}

export const useSafetyStore = create<SafetyState>((set) => ({
  isSOSActive: false,
  trustedContacts: [],
  lastKnownLocation: null,
  triggerSOS: () => set({ isSOSActive: true }),
  resolveSOS: () => set({ isSOSActive: false }),
  addTrustedContact: (contact) => set((state) => ({ trustedContacts: [...state.trustedContacts, contact] })),
  updateLocation: (lat, lng) => set({ lastKnownLocation: { lat, lng } }),
}));
