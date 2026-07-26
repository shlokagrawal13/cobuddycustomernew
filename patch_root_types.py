import re

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

replace_in_file('src/types/navigation/index.ts',
    "BookingSuccessScreen: undefined;",
    "BookingSuccessScreen: undefined;\n  BookingRequestSentScreen: undefined;\n  BookingAcceptedScreen: undefined;\n  BookingDeclinedScreen: undefined;\n  BookingCounterOfferScreen: { bookingId?: string; companionName?: string } | undefined;")
