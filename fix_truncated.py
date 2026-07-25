import os
import json
import re

def fix_json(filepath, json_file):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    ns_match = re.search(r"useTranslation\(\[\s*['\"]([^'\"]+)['\"]\s*\]\)", content)
    is_array_ns = bool(ns_match)
    
    # regex for: t('key', 'default_string')
    # handling single or double quotes for default_string
    pattern = r"t\(\s*['\"]([\w.]+)['\"]\s*,\s*(['\"])(.*?)(?<!\\)\2"
    matches = re.findall(pattern, content, flags=re.DOTALL)
    
    if not matches: return
    if not os.path.exists(json_file): return
    
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    changed = False
    
    for match in matches:
        key = match[0]
        # properly unescape the extracted default text
        default_val = match[2].replace("\\'", "'").replace('\\"', '"').replace('\\\\', '\\')
        
        prefix = os.path.splitext(os.path.basename(json_file))[0]
        if is_array_ns and key.startswith(prefix + '.'):
            key = key[len(prefix)+1:]
            
        keys = key.split('.')
        d = data
        valid = True
        for k in keys[:-1]:
            if k in d and isinstance(d[k], dict):
                d = d[k]
            else:
                valid = False
                break
        
        if valid and keys[-1] in d and isinstance(d[keys[-1]], str):
            json_val = d[keys[-1]]
            # If the current JSON value is heavily truncated (length differs significantly)
            # or ends with weird characters like backslash or space where it shouldn't.
            # Actually we can just unconditionally overwrite because default_val is the correct source of truth.
            if default_val != json_val:
                print(f"Fixing {key} in {json_file}")
                # print(f"  Old: {json_val}")
                # print(f"  New: {default_val}")
                d[keys[-1]] = default_val
                changed = True
                
    if changed:
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

files_map = {
    'src/screens/auth/OTPVerificationScreen.tsx': 'src/i18n/locales/en/auth/otp.json',
    'src/screens/booking/BookingAcceptedScreen.tsx': 'src/i18n/locales/en/booking/accepted.json',
    'src/screens/booking/BookingCounterOfferScreen.tsx': 'src/i18n/locales/en/booking/counterOffer.json',
    'src/screens/booking/BookingDeclinedScreen.tsx': 'src/i18n/locales/en/booking/declined.json',
    'src/screens/booking/BookingSummaryScreen.tsx': 'src/i18n/locales/en/booking/summary.json',
    'src/screens/bookings/CancelBookingScreen.tsx': 'src/i18n/locales/en/bookings/cancel.json',
    'src/screens/bookings/BookingDetailScreen.tsx': 'src/i18n/locales/en/bookings/detail.json',
    'src/screens/onboarding/WelcomeScreen.tsx': 'src/i18n/locales/en/onboarding/welcome.json',
    'src/screens/safety/SafetyGuidelinesScreen.tsx': 'src/i18n/locales/en/safety/guidelines.json',
    'src/screens/session/ArrivalMeetupScreen.tsx': 'src/i18n/locales/en/session/arrival.json',
    'src/screens/session/SessionReminderScreen.tsx': 'src/i18n/locales/en/session/reminder.json',
    'src/screens/settings/ActiveSessionsScreen.tsx': 'src/i18n/locales/en/settings/activeSessions.json',
    'src/screens/settings/AppLockScreen.tsx': 'src/i18n/locales/en/settings/appLock.json',
    'src/screens/settings/BlockedUsersScreen.tsx': 'src/i18n/locales/en/settings/blockedUsers.json',
    'src/screens/settings/DeleteAccountScreen.tsx': 'src/i18n/locales/en/settings/deleteAccount.json',
    'src/screens/settings/NotificationPreferencesScreen.tsx': 'src/i18n/locales/en/settings/notificationPreferences.json',
    'src/screens/system/AccountDeactivatedScreen.tsx': 'src/i18n/locales/en/system/deactivated.json',
    'src/screens/system/MaintenanceModeScreen.tsx': 'src/i18n/locales/en/system/maintenance.json',
    'src/screens/system/NetworkErrorScreen.tsx': 'src/i18n/locales/en/system/networkError.json',
    'src/screens/wallet/PaymentMethodsScreen.tsx': 'src/i18n/locales/en/wallet/paymentMethods.json',
    'src/screens/wallet/WithdrawalMethodsScreen.tsx': 'src/i18n/locales/en/wallet/withdrawalMethods.json'
}

for tsx, json_file in files_map.items():
    fix_json(tsx, json_file)

