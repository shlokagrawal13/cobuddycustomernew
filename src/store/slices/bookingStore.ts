import { create } from 'zustand';

export type RequestStatus = 'pending' | 'accepted' | 'declined' | 'expired' | 'counter_proposed' | 'cancelled';
export type SessionStatus = 'upcoming' | 'pre_arrival' | 'checked_in' | 'active' | 'extending' | 'completed' | 'cancelled' | 'no_show' | 'disputed';

export interface Booking {
  id: string;
  companionId: string;
  activity: string;
  venue: string;
  time: string;
  requestStatus: RequestStatus;
  sessionStatus?: SessionStatus;
}

export interface BookingState {
  activeBooking: Booking | null;
  draftBooking: Partial<Booking> | null;
  bookingHistory: Booking[];
  isLoading: boolean;
  setDraftBooking: (updates: Partial<Booking>) => void;
  clearDraftBooking: () => void;
  requestBooking: (booking: Omit<Booking, 'id' | 'requestStatus' | 'sessionStatus'>) => void;
  cancelBooking: (id: string) => void;
  clearActiveBooking: () => void;
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
    const newBooking: Booking = { ...bookingData, id: Date.now().toString(), requestStatus: 'pending' };
    set({ activeBooking: newBooking, draftBooking: null });
  },
  cancelBooking: (id) => set((state) => {
    const isMatched = state.activeBooking?.id === id;
    let newStatusObj: Partial<Booking> = { requestStatus: 'cancelled' };
    // If it was already accepted, then it's a session cancellation
    if (state.activeBooking?.requestStatus === 'accepted') {
       newStatusObj = { requestStatus: 'accepted', sessionStatus: 'cancelled' };
    }
    
    return {
      activeBooking: isMatched ? null : state.activeBooking,
      bookingHistory: state.bookingHistory.map(b => {
        if (b.id === id) {
          if (b.requestStatus === 'accepted') {
            return { ...b, requestStatus: 'accepted', sessionStatus: 'cancelled' };
          }
          return { ...b, requestStatus: 'cancelled' };
        }
        return b;
      })
    };
  }),
  clearActiveBooking: () => set({ activeBooking: null }),
}));
