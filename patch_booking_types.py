import re
import json

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

new_content = '''export interface BookingActivity {
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
  BookingCounterOfferScreen: { bookingId?: string; companionName?: string } | undefined;
  BookingDetailScreen: { bookingId?: string; status?: string } | undefined;
  CancelBookingScreen: { bookingId?: string } | undefined;
  ModifyBookingScreen: { bookingId?: string } | undefined;
  DisputeRefundScreen: { bookingId?: string } | undefined;
};
'''

with open('src/types/navigation/booking.types.ts', 'w', encoding='utf8') as f:
    f.write(new_content)
print("Updated booking.types.ts")
