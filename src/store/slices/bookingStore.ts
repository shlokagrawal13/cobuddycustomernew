import { create } from 'zustand';

export type BookingStatus = 'pending' | 'accepted' | 'declined' | 'active' | 'completed' | 'cancelled';

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
  bookingHistory: Booking[];
  isLoading: boolean;
  requestBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  cancelBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  activeBooking: null,
  bookingHistory: [],
  isLoading: false,
  requestBooking: (bookingData) => {
    const newBooking: Booking = { ...bookingData, id: Date.now().toString(), status: 'pending' };
    set({ activeBooking: newBooking });
  },
  cancelBooking: (id) => set((state) => ({
    activeBooking: state.activeBooking?.id === id ? null : state.activeBooking,
    bookingHistory: state.bookingHistory.map(b => b.id === id ? { ...b, status: 'cancelled' } : b)
  })),
}));
