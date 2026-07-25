import { create } from 'zustand';

export type BookingStatus = 'pending' | 'accepted' | 'declined' | 'countered' | 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  companionId: string;
  activity: string;
  venue: string;
  time: string;
  status: BookingStatus;
}

interface BookingState {
  activeBooking: Booking | null;
  draftBooking: Partial<Booking> | null;
  bookingHistory: Booking[];
  isLoading: boolean;
  setDraftBooking: (updates: Partial<Booking>) => void;
  clearDraftBooking: () => void;
  requestBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  cancelBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  activeBooking: null,
  draftBooking: null,
  bookingHistory: [],
  isLoading: false,
  setDraftBooking: (updates) => set((state) => ({ 
    draftBooking: { ...state.draftBooking, ...updates } 
  })),
  clearDraftBooking: () => set({ draftBooking: null }),
  requestBooking: (bookingData) => {
    const newBooking: Booking = { ...bookingData, id: Date.now().toString(), status: 'pending' };
    set({ activeBooking: newBooking, draftBooking: null });
  },
  cancelBooking: (id) => set((state) => ({
    activeBooking: state.activeBooking?.id === id ? null : state.activeBooking,
    bookingHistory: state.bookingHistory.map(b => b.id === id ? { ...b, status: 'cancelled' } : b)
  })),
}));
