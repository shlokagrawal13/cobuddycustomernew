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

replace_in_file('src/screens/booking/BookingSummaryScreen.tsx',
    "navigation.navigate('BookingRequestSentScreen')",
    "navigation.navigate('BookingSuccessScreen')")

replace_in_file('src/screens/bookings/BookingDetailScreen.tsx',
    "navigation.navigate('CompanionProfileScreen', { id: data.companionId })",
    "navigation.navigate('CompanionProfileScreen', { companionId: data.companionId })")

replace_in_file('src/screens/chat/ConciergeChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support', callType: 'support' })",
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support' })")

replace_in_file('src/screens/home/NotificationsScreen.tsx',
    "navigation.navigate(notification.stack as never, { screen: notification.route, params: notification.routeParams } as never);",
    "(navigation.navigate as any)(notification.stack, { screen: notification.route, params: notification.routeParams });")

replace_in_file('src/screens/home/NotificationsScreen.tsx',
    "navigation.navigate(notification.route as never, notification.routeParams as never);",
    "(navigation.navigate as any)(notification.route, notification.routeParams);")

