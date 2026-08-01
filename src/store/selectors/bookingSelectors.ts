import type { BookingState } from '../slices/bookingStore';

export const selectActiveBooking = (state: BookingState) => state.activeBooking;
export const selectDraftBooking = (state: BookingState) => state.draftBooking;
export const selectBookingHistory = (state: BookingState) => state.bookingHistory;
export const selectIsLoadingBooking = (state: BookingState) => state.isLoading;
export const selectSetDraftBooking = (state: BookingState) => state.setDraftBooking;
