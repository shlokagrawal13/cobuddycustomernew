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

replace_in_file('src/screens/bookings/BookingDetailScreen.tsx',
    "navigation.navigate('DiscoverTab', { screen: 'CompanionProfileScreen', params: { id: data.companionId } })",
    "navigation.navigate('DiscoverTab', { screen: 'CompanionProfileScreen', params: { companionId: data.companionId } })")

replace_in_file('src/types/navigation/booking.types.ts',
    "BookingCounterOfferScreen: { bookingId?: string } | undefined;",
    "BookingCounterOfferScreen: { bookingId?: string; companionName?: string } | undefined;")

replace_in_file('src/screens/chat/ConciergeChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: 'CoBuddy Concierge', callType: 'support' })",
    "navigation.navigate('VoiceCallScreen', { companionName: 'CoBuddy Concierge' })")

