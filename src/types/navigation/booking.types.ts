export interface BookingActivity {
  id: string;
  titleKey: string;
  defaultTitle: string;
  icon: string;
  price: string;
  descKey: string;
  defaultDesc: string;
}

export interface BookingVenue {
  id?: string;
  name: string;
  address: string;
  icon?: string;
}

export interface BookingStackParamList {
  LocationSelectionScreen: undefined;
  BookingActivitySelectScreen: undefined;
  BookingVenueSelectScreen: { activity?: BookingActivity } | undefined;
  BookingTimeSelectScreen: { activity?: BookingActivity; venue?: BookingVenue } | undefined;
  BookingSummaryScreen: { activity?: BookingActivity; venue?: BookingVenue; date?: string; time?: string; duration?: number; bookingId?: string } | undefined;
  BookingSuccessScreen: undefined;
  BookingRequestSentScreen: undefined;
  BookingAcceptedScreen: undefined;
  BookingDeclinedScreen: undefined;
  BookingCounterOfferScreen: { bookingId?: string; companionName?: string } | undefined;
  BookingDetailScreen: { bookingId?: string; status?: string } | undefined;
  CancelBookingScreen: { bookingId?: string } | undefined;
  ModifyBookingScreen: { bookingId?: string } | undefined;
  DisputeRefundScreen: { bookingId?: string } | undefined;
};
