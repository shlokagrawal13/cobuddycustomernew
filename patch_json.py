import os
import json
import re

def set_nested_value(d, key_str, value):
    keys = key_str.split('.')
    for k in keys[:-1]:
        if k not in d:
            d[k] = {}
        d = d[k]
    if keys[-1] not in d:
        d[keys[-1]] = value

# Files requested to be fixed
files_to_fix = [
    "src/screens/auth/LocationPermissionScreen.tsx",
    "src/screens/auth/NotificationPermissionScreen.tsx",
    "src/screens/auth/PhoneLoginScreen.tsx",
    "src/screens/booking/BookingActivitySelectScreen.tsx",
    "src/screens/booking/BookingSummaryScreen.tsx",
    "src/screens/booking/BookingTimeSelectScreen.tsx",
    "src/screens/booking/BookingVenueSelectScreen.tsx",
    "src/screens/booking/LocationSelectionScreen.tsx",
    "src/screens/bookings/BookingDetailScreen.tsx",
    "src/screens/bookings/DisputeRefundScreen.tsx",
    "src/screens/bookings/ModifyBookingScreen.tsx",
    "src/screens/chat/ChatListScreen.tsx",
    "src/screens/chat/CompanionChatScreen.tsx",
    "src/screens/home/CompanionProfileScreen.tsx",
    "src/screens/home/HomeDashboardScreen.tsx",
    "src/screens/home/NotificationsScreen.tsx",
    "src/screens/onboarding/BasicProfileSetupScreen.tsx",
    "src/screens/onboarding/InterestSelectionScreen.tsx",
    "src/screens/onboarding/LegalConsentScreen.tsx",
    "src/screens/safety/AddTrustedContactScreen.tsx",
    "src/screens/safety/IncidentReportScreen.tsx",
    "src/screens/safety/IncidentSubmittedScreen.tsx",
    "src/screens/safety/SafetyGuidelinesScreen.tsx",
    "src/screens/safety/SafetyHubScreen.tsx",
    "src/screens/safety/SafetySettingsScreen.tsx",
    "src/screens/safety/TrustedContactsScreen.tsx",
    "src/screens/session/ActiveSessionScreen.tsx",
    "src/screens/session/CompanionReviewScreen.tsx",
    "src/screens/session/TipGratuityScreen.tsx",
    "src/screens/settings/AccountSettingsScreen.tsx",
    "src/screens/settings/ActiveSessionsScreen.tsx",
    "src/screens/settings/AppLockScreen.tsx",
    "src/screens/settings/AppPermissionsScreen.tsx",
    "src/screens/settings/BlockedUsersScreen.tsx",
    "src/screens/settings/DataCacheScreen.tsx",
    "src/screens/settings/DeactivateAccountScreen.tsx",
    "src/screens/settings/DeleteAccountScreen.tsx",
    "src/screens/settings/NotificationPreferencesScreen.tsx",
    "src/screens/settings/ReferFriendScreen.tsx",
    "src/screens/support/CreateSupportTicketScreen.tsx",
    "src/screens/support/HelpCenterScreen.tsx",
    "src/screens/support/SupportTicketDetailScreen.tsx",
    "src/screens/system/AccountDeactivatedScreen.tsx",
    "src/screens/system/AccountReactivationRequestScreen.tsx",
    "src/screens/system/AccountSuspendedScreen.tsx",
    "src/screens/system/AccountUnderManualReviewScreen.tsx",
    "src/screens/system/ForceUpdateScreen.tsx",
    "src/screens/system/MaintenanceModeScreen.tsx",
    "src/screens/system/NetworkErrorScreen.tsx",
    "src/screens/system/PolicyViolationNoticeScreen.tsx",
    "src/screens/verify/DocumentVerificationScreen.tsx",
    "src/screens/verify/KYCIntroScreen.tsx",
    "src/screens/verify/VerificationPendingScreen.tsx",
    "src/screens/verify/VerificationProcessingScreen.tsx",
    "src/screens/verify/VerificationRejectedScreen.tsx",
    "src/screens/verify/VerificationSuccessScreen.tsx",
    "src/screens/wallet/AddBankAccountScreen.tsx",
    "src/screens/wallet/AddMoneyScreen.tsx",
    "src/screens/wallet/AddPaymentMethodScreen.tsx",
    "src/screens/wallet/PaymentMethodsScreen.tsx",
    "src/screens/wallet/TransactionDetailScreen.tsx",
    "src/screens/wallet/WalletScreen.tsx",
    "src/screens/wallet/WithdrawMoneyScreen.tsx",
    "src/screens/wallet/WithdrawalMethodsScreen.tsx",
]

report = json.load(open('missing_keys_report.json'))

# Normalize paths for Windows comparison
normalized_report = {}
for k, v in report.items():
    normalized_report[k.replace('\\\\', '/').replace('\\', '/')] = v

for file_to_fix in files_to_fix:
    if file_to_fix in normalized_report:
        info = normalized_report[file_to_fix]
        json_path = info.get('json_path')
        if not json_path or not os.path.exists(json_path):
            continue
            
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        updated = False
        for missing_key, default_val in info['missing']:
            if default_val is not None:
                # If the missing key looks like a variable placeholder, skip it if it's garbage
                if missing_key in ['c', 'shlok', 'IncidentSubmittedScreen', 'AddTrustedContactScreen']:
                    continue
                set_nested_value(data, missing_key, default_val)
                updated = True
                
        if updated:
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)

# WalletScreen special case:
wallet_json = 'src/i18n/locales/en/wallet/wallet.json'
if os.path.exists(wallet_json):
    with open(wallet_json, 'r', encoding='utf-8') as f:
        wallet_data = json.load(f)
    if 'transactionType' not in wallet_data:
        wallet_data['transactionType'] = {
            'add': 'Money Added',
            'deduct': 'Session Payment',
            'refund': 'Refund Processed'
        }
        with open(wallet_json, 'w', encoding='utf-8') as f:
            json.dump(wallet_data, f, indent=2)
            
print("Patching complete.")
