import os
import json
import re

user_instructions = '''
src/screens/auth/LocationPermissionScreen.tsx (onboarding/location.json)
src/screens/auth/NotificationPermissionScreen.tsx (onboarding/notification.json)
src/screens/auth/PhoneLoginScreen.tsx (auth/phone.json)
src/screens/booking/BookingActivitySelectScreen.tsx (booking/activitySelect.json)
src/screens/booking/BookingSummaryScreen.tsx (booking/summary.json)
src/screens/booking/BookingTimeSelectScreen.tsx (booking/timeSelect.json)
src/screens/booking/BookingVenueSelectScreen.tsx (booking/venueSelect.json)
src/screens/booking/LocationSelectionScreen.tsx (booking/locationSelection.json)
src/screens/bookings/BookingDetailScreen.tsx (bookings/detail.json)
src/screens/bookings/DisputeRefundScreen.tsx (bookings/dispute.json)
src/screens/bookings/ModifyBookingScreen.tsx (bookings/modify.json)
src/screens/chat/ChatListScreen.tsx (chat/list.json)
src/screens/chat/CompanionChatScreen.tsx (chat/companion.json)
src/screens/home/CompanionProfileScreen.tsx (home/companionProfile.json)
src/screens/home/HomeDashboardScreen.tsx (home/dashboard.json)
src/screens/home/NotificationsScreen.tsx (home/notifications.json)
src/screens/onboarding/BasicProfileSetupScreen.tsx (onboarding/profile.json)
src/screens/onboarding/InterestSelectionScreen.tsx (onboarding/interests.json)
src/screens/onboarding/LegalConsentScreen.tsx (onboarding/consent.json)
src/screens/safety/AddTrustedContactScreen.tsx (onboarding/contacts.json)
src/screens/safety/IncidentReportScreen.tsx (safety/report.json)
src/screens/safety/IncidentSubmittedScreen.tsx (safety/report.json)
src/screens/safety/SafetyGuidelinesScreen.tsx (safety/guidelines.json)
src/screens/safety/SafetyHubScreen.tsx (safety/hub.json)
src/screens/safety/SafetySettingsScreen.tsx (safety/settings.json)
src/screens/safety/TrustedContactsScreen.tsx (onboarding/contacts.json)
src/screens/session/ActiveSessionScreen.tsx (session/active.json)
src/screens/session/CompanionReviewScreen.tsx (session/companionReview.json)
src/screens/session/TipGratuityScreen.tsx (session/tip.json)
src/screens/settings/AccountSettingsScreen.tsx (settings/accountSettings.json)
src/screens/settings/ActiveSessionsScreen.tsx (settings/activeSessions.json)
src/screens/settings/AppLockScreen.tsx (settings/appLock.json)
src/screens/settings/AppPermissionsScreen.tsx (settings/appPermissions.json)
src/screens/settings/BlockedUsersScreen.tsx (settings/blockedUsers.json)
src/screens/settings/DataCacheScreen.tsx (settings/dataCache.json)
src/screens/settings/DeactivateAccountScreen.tsx (settings/deactivateAccount.json)
src/screens/settings/DeleteAccountScreen.tsx (settings/deleteAccount.json)
src/screens/settings/NotificationPreferencesScreen.tsx (settings/notificationPreferences.json)
src/screens/settings/ReferFriendScreen.tsx (settings/referFriend.json)
src/screens/support/CreateSupportTicketScreen.tsx (support/createTicket.json)
src/screens/support/HelpCenterScreen.tsx (support/helpCenter.json)
src/screens/support/SupportTicketDetailScreen.tsx (support/ticketDetail.json)
src/screens/system/AccountDeactivatedScreen.tsx (system/deactivated.json)
src/screens/system/AccountReactivationRequestScreen.tsx (system/reactivationReq.json)
src/screens/system/AccountSuspendedScreen.tsx (system/suspended.json)
src/screens/system/AccountUnderManualReviewScreen.tsx (system/manualReview.json)
src/screens/system/ForceUpdateScreen.tsx (system/forceUpdate.json)
src/screens/system/MaintenanceModeScreen.tsx (system/maintenance.json)
src/screens/system/NetworkErrorScreen.tsx (system/networkError.json)
src/screens/system/PolicyViolationNoticeScreen.tsx (system/policyViolation.json)
src/screens/verify/DocumentVerificationScreen.tsx (verify/document.json)
src/screens/verify/KYCIntroScreen.tsx (verify/kycIntro.json)
src/screens/verify/VerificationPendingScreen.tsx (verify/pending.json)
src/screens/verify/VerificationProcessingScreen.tsx (verify/processing.json)
src/screens/verify/VerificationRejectedScreen.tsx (verify/rejected.json)
src/screens/verify/VerificationSuccessScreen.tsx (verify/success.json)
src/screens/wallet/AddBankAccountScreen.tsx (wallet/addBankAccount.json)
src/screens/wallet/AddMoneyScreen.tsx (wallet/addMoney.json)
src/screens/wallet/AddPaymentMethodScreen.tsx (wallet/addPaymentMethod.json)
src/screens/wallet/PaymentMethodsScreen.tsx (wallet/paymentMethods.json)
src/screens/wallet/TransactionDetailScreen.tsx (wallet/transactionDetail.json)
src/screens/wallet/WalletScreen.tsx (wallet/wallet.json)
src/screens/wallet/WithdrawMoneyScreen.tsx (wallet/withdrawMoney.json)
src/screens/wallet/WithdrawalMethodsScreen.tsx (wallet/withdrawalMethods.json)
'''

def set_nested_value(d, key_str, value):
    keys = key_str.split('.')
    for k in keys[:-1]:
        if k not in d:
            d[k] = {}
        elif not isinstance(d[k], dict):
            # should not happen but just in case
            d[k] = {}
        d = d[k]
    
    # only set if not present to avoid overwriting existing real translations
    if keys[-1] not in d:
        d[keys[-1]] = value

for line in user_instructions.strip().split('\n'):
    if not line.strip(): continue
    parts = line.split(' (')
    tsx_file = parts[0].strip()
    json_rel = parts[1].split(' ')[0].strip(')')
    json_path = os.path.join('src/i18n/locales/en', json_rel)
    
    if not os.path.exists(tsx_file):
        print(f"Skipping missing tsx: {tsx_file}")
        continue
        
    with open(tsx_file, 'r', encoding='utf-8') as f:
        ts_content = f.read()
        
    # Get namespace usage
    ns_match = re.search(r"useTranslation\(\[\s*['\"]([^'\"]+)['\"]\s*\]\)", ts_content)
    is_array_ns = bool(ns_match)
    
    # Find all t('key', 'default') calls
    t_calls = re.finditer(r"t\(\s*['\"]([^'\"]+)['\"]\s*(?:,\s*['\"](.*?)['\"])?", ts_content, re.DOTALL)
    
    missing_in_this_file = []
    for match in t_calls:
        key = match.group(1)
        default_val = match.group(2)
        if default_val is not None:
            # Skip junk
            if key in ['c', 'shlok', 'IncidentSubmittedScreen', 'AddTrustedContactScreen']:
                continue
                
            # If array NS like ['onboarding'], keys often have prefix e.g. location.title
            # The JSON file is onboarding/location.json, so we strip location. 
            if is_array_ns:
                # get the prefix from the json filename (e.g. location.json -> location)
                prefix = os.path.splitext(os.path.basename(json_path))[0]
                if key.startswith(prefix + '.'):
                    key = key[len(prefix)+1:]
                    
            missing_in_this_file.append((key, default_val))
            
    if missing_in_this_file:
        if not os.path.exists(json_path):
            os.makedirs(os.path.dirname(json_path), exist_ok=True)
            data = {}
        else:
            with open(json_path, 'r', encoding='utf-8') as jf:
                try:
                    data = json.load(jf)
                except:
                    data = {}
                    
        for key, default_val in missing_in_this_file:
            set_nested_value(data, key, default_val)
            
        with open(json_path, 'w', encoding='utf-8') as jf:
            json.dump(data, jf, indent=2)

# Special wallet requirement
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

print("Batch processing complete.")
