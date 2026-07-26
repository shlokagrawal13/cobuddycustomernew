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

# 1. BookingDetailScreen.tsx
replace_in_file('src/screens/bookings/BookingDetailScreen.tsx',
    "navigation.navigate('CancelBookingScreen', { bookingId: booking.id })",
    "navigation.navigate('CancelBookingScreen', { bookingId: booking.id } as any)")

replace_in_file('src/screens/bookings/BookingDetailScreen.tsx',
    "navigation.navigate('CompanionProfileScreen', { id: booking.companionId })",
    "navigation.navigate('CompanionProfileScreen', { companionId: booking.companionId })")

# 2. BookingsListScreen.tsx
replace_in_file('src/screens/bookings/BookingsListScreen.tsx',
    "navigation.navigate('BookingFlowStack', {",
    "navigation.navigate('BookingStack', {")

# 3. CompanionChatScreen.tsx & ConciergeChatScreen.tsx
replace_in_file('src/screens/chat/CompanionChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: companionName, callType: 'voice' })",
    "navigation.navigate('VoiceCallScreen', { companionName: companionName })")

replace_in_file('src/screens/chat/ConciergeChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support', callType: 'voice' })",
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support' })")

# 4. CompanionProfileScreen.tsx
replace_in_file('src/screens/home/CompanionProfileScreen.tsx',
    "navigation.navigate('BookingFlowStack')",
    "navigation.navigate('BookingStack')")

# 5. HomeDashboardScreen.tsx
replace_in_file('src/screens/home/HomeDashboardScreen.tsx',
    "navigation.navigate('ProfileTab', { screen: 'SafetyHubScreen' })",
    "navigation.navigate('SafetySupportStack', { screen: 'SafetyHubScreen' })")

# 6. NotificationsScreen.tsx
replace_in_file('src/screens/home/NotificationsScreen.tsx',
    "navigation.navigate(notification.stack, { screen: notification.route, params: notification.routeParams });",
    "navigation.navigate(notification.stack as never, { screen: notification.route, params: notification.routeParams } as never);")

replace_in_file('src/screens/home/NotificationsScreen.tsx',
    "navigation.navigate(notification.route, notification.routeParams);",
    "navigation.navigate(notification.route as never, notification.routeParams as never);")

# 7. SettingsHubScreen.tsx
replace_in_file('src/screens/settings/SettingsHubScreen.tsx',
    "navigation.navigate(item.route, item.params);",
    "navigation.navigate(item.route as never, item.params as never);")

