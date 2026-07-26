export interface BookingStackParamList {
  LocationSelectionScreen: undefined;
  BookingActivitySelectScreen: undefined;
  BookingVenueSelectScreen: { activity?: any } | undefined;
  BookingTimeSelectScreen: { activity?: any; venue?: any } | undefined;
  BookingSummaryScreen: { activity?: any; venue?: any; date?: any; time?: string; duration?: number; bookingId?: string } | undefined;
  BookingSuccessScreen: undefined;
  BookingDetailScreen: { bookingId?: string; status?: string } | undefined;
  CancelBookingScreen: { bookingId?: string } | undefined;
  ModifyBookingScreen: { bookingId?: string } | undefined;
  DisputeRefundScreen: { bookingId?: string } | undefined;
};
