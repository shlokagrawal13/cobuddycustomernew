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

replace_in_file('src/screens/home/CompanionProfileScreen.tsx',
    "navigation.navigate('BookingStack')",
    "navigation.navigate('BookingFlowStack')")

replace_in_file('src/screens/bookings/BookingsListScreen.tsx',
    "navigation.navigate as any)('BookingStack'",
    "navigation.navigate as any)('BookingFlowStack'")

replace_in_file('src/types/navigation/index.ts',
    "BookingStack: NavigatorScreenParams<BookingStackParamList> | undefined;",
    "BookingFlowStack: NavigatorScreenParams<BookingStackParamList> | undefined;")

