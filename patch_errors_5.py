import re
import os

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

replace_in_file('src/types/navigation/session.types.ts',
    "CompanionReviewScreen: undefined;",
    "CompanionReviewScreen: { bookingId?: string } | undefined;")

replace_in_file('src/types/navigation/booking.types.ts',
    "BookingSuccessScreen: undefined;",
    "BookingSuccessScreen: undefined;\n  BookingCounterOfferScreen: { bookingId?: string } | undefined;")

replace_in_file('src/screens/bookings/BookingsListScreen.tsx',
    "navigation.navigate('BookingStack', { screen: 'BookingCounterOfferScreen', params: { bookingId: booking.id, companionName: booking.companionName } })",
    "(navigation.navigate as any)('BookingStack', { screen: 'BookingCounterOfferScreen', params: { bookingId: booking.id, companionName: booking.companionName } })")

replace_in_file('src/screens/bookings/BookingDetailScreen.tsx',
    "navigation.navigate('CompanionProfileScreen', { id: data.companionId } as any)",
    "navigation.navigate('CompanionProfileScreen', { companionId: data.companionId } as any)")

replace_in_file('src/screens/bookings/BookingDetailScreen.tsx',
    "navigation.navigate('CancelBookingScreen', { bookingId: data.id } as any)",
    "navigation.navigate('CancelBookingScreen', { bookingId: data.id })")

