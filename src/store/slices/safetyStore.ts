import { create } from 'zustand';

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
}

interface SafetyState {
  isSOSActive: boolean;
  isSessionActive: boolean;
  trustedContacts: TrustedContact[];
  // GPS location strictly for backend/safety-team visibility. Customer/Companion cannot see each other's live location.
  lastKnownLocation: { lat: number; lng: number } | null; 
  triggerSOS: () => void;
  resolveSOS: () => void;
  setSessionActive: (active: boolean) => void;
  addTrustedContact: (contact: TrustedContact) => void;
  updateLocation: (lat: number, lng: number) => void;
}

export const useSafetyStore = create<SafetyState>((set) => ({
  isSOSActive: false,
  isSessionActive: false,
  trustedContacts: [],
  lastKnownLocation: null,
  triggerSOS: () => set({ isSOSActive: true }),
  resolveSOS: () => set({ isSOSActive: false }),
  setSessionActive: (active) => set({ isSessionActive: active }),
  addTrustedContact: (contact) => set((state) => ({ trustedContacts: [...state.trustedContacts, contact] })),
  updateLocation: (lat, lng) => set({ lastKnownLocation: { lat, lng } }),
}));
