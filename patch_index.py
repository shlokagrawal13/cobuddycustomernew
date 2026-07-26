import re

with open('src/types/navigation/index.ts', 'r', encoding='utf8') as f:
    content = f.read()

# Add import
if 'NavigatorScreenParams' not in content:
    content = "import { NavigatorScreenParams } from '@react-navigation/native';\n" + content

# Replace loose types
replacements = {
    'AuthStack': 'NavigatorScreenParams<AuthStackParamList>',
    'BookingStack': 'NavigatorScreenParams<BookingStackParamList>',
    'KYCStack': 'NavigatorScreenParams<VerifyStackParamList>',
    'HomeTab': 'NavigatorScreenParams<HomeStackParamList>',
    'DiscoverTab': 'NavigatorScreenParams<HomeStackParamList>',
    'BookingsTab': 'NavigatorScreenParams<BookingStackParamList>',
    'ChatTab': 'NavigatorScreenParams<ChatStackParamList>',
    'ProfileTab': 'NavigatorScreenParams<ProfileStackParamList>',
}

for stack, repl in replacements.items():
    content = re.sub(
        rf'{stack}:\s*{{[^}}]+}}\s*\|\s*undefined;',
        f'{stack}: {repl} | undefined;',
        content
    )

# Also add SafetySupportStack, LiveSessionStack, SystemStateStack if they don't exist
# We will just append them before the final closing brace.
extra = "\n  SafetySupportStack: NavigatorScreenParams<SafetyStackParamList & SupportStackParamList> | undefined;"
extra += "\n  LiveSessionStack: NavigatorScreenParams<SessionStackParamList> | undefined;"
extra += "\n  SystemStateStack: NavigatorScreenParams<SystemStackParamList> | undefined;"

if 'SafetySupportStack:' not in content:
    content = content.replace('\n};', extra + '\n};')

with open('src/types/navigation/index.ts', 'w', encoding='utf8') as f:
    f.write(content)
