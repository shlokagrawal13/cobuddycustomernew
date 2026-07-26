import os
import re

files_to_check = [
    'ProfileScreen.tsx', 'BookingSummaryScreen.tsx', 'CompanionChatScreen.tsx',
    'ConciergeChatScreen.tsx', 'SettingsHubScreen.tsx', 'ActiveSessionScreen.tsx',
    'ArrivalCheckInScreen.tsx', 'HomeDashboardScreen.tsx',
    'NotificationsScreen.tsx', 'CompanionProfileScreen.tsx',
    'AccountDeactivatedScreen.tsx', 'PolicyViolationNoticeScreen.tsx',
    'AccountUnderManualReviewScreen.tsx', 'AccountSuspendedScreen.tsx',
    'BookingsListScreen.tsx', 'BookingDetailScreen.tsx',
    'VerificationProcessingScreen.tsx'
]

for root, _, files in os.walk('src/screens'):
    for file in files:
        if file in files_to_check:
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf8') as f:
                content = f.read()
            
            # replace "(navigation as any).navigate" with "navigation.navigate"
            new_content = content.replace('(navigation as any).navigate', 'navigation.navigate')
            
            if new_content != content:
                with open(path, 'w', encoding='utf8') as f:
                    f.write(new_content)
                print(f"Patched {path}")
