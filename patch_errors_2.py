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
    "navigation.navigate('CancelBookingScreen', { bookingId: data.id })",
    "navigation.navigate('CancelBookingScreen', { bookingId: data.id } as any)")

replace_in_file('src/screens/bookings/BookingDetailScreen.tsx',
    "navigation.navigate('CompanionProfileScreen', { id: data.companionId })",
    "navigation.navigate('CompanionProfileScreen', { companionId: data.companionId })")

replace_in_file('src/screens/chat/CompanionChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: COMPANION_NAME, callType: 'voice' })",
    "navigation.navigate('VoiceCallScreen', { companionName: COMPANION_NAME })")

replace_in_file('src/screens/chat/ConciergeChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support', callType: 'voice' })",
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support' })")

replace_in_file('src/screens/settings/SettingsHubScreen.tsx',
    "navigation.navigate(item.route as never, item.params as never);",
    "navigation.navigate(item.route as never, item.params as never);")
# wait SettingsHubScreen.tsx had error: Type 'string' is not assignable to type ...
# Let's check what exactly the code is.
