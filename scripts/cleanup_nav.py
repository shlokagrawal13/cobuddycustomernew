import re

filepath = 'src/navigation/MainTabNavigator.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to remove these screens ONLY from ProfileTabStack, as they belong to SafetySupportStack, AuthStack, OnboardingStack etc.
screens_to_remove = [
    'PhoneLoginScreen',
    'OTPVerificationScreen',
    'InterestSelectionScreen',
    'SafetyHubScreen',
    'IncidentReportScreen',
    'SafetyGuidelinesScreen',
    'HelpCenterScreen',
    'SupportCenterScreen',
    'CreateSupportTicketScreen',
    'SupportTicketDetailScreen',
    'TrustedContactsScreen'
]

# We also need to remove ConciergeChatScreen from ProfileTabStack, but keep it in ChatTabStack.
# CompanionProfileScreen is in DiscoverTabStack and ProfileTabStack. Keep it in ProfileTabStack? Wait, it makes more sense in Discover or Root. Let's keep it in Discover.

for screen in screens_to_remove:
    # Remove the import
    content = re.sub(rf"import \{{ {screen} \}\} from '[^']+';\n", "", content)
    # Remove the Stack.Screen declaration
    content = re.sub(rf"\s*<Stack\.Screen name=\"{screen}\" component=\{{{screen}\}\} />\n", "\n", content)

# Remove ConciergeChatScreen from ProfileTabStack ONLY.
# We will do a generic replacement for imports if there are unused ones, but let's just let TS tell us if they are unused.

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
