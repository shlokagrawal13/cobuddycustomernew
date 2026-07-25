import os
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for 2 arguments
    pattern = r"Alert\.alert\(\s*(['\"])(.*?)\1\s*,\s*(['\"])(.*?)\3"
    def replacer(match):
        title = match.group(2)
        msg = match.group(4)
        t_key = re.sub(r'[^a-zA-Z0-9]', '', title)[:15]
        m_key = re.sub(r'[^a-zA-Z0-9]', '', msg)[:20]
        # Notice the closing ')' for t(msg) below
        return f"Alert.alert(t('alertTitle{t_key}', '{title}'), t('alertMsg{m_key}', '{msg}')"

    new_content = re.sub(pattern, replacer, content)
    
    # Pattern for 1 argument
    pattern2 = r"Alert\.alert\(\s*(['\"])(.*?)\1\s*\)"
    def replacer2(match):
        title = match.group(2)
        t_key = re.sub(r'[^a-zA-Z0-9]', '', title)[:15]
        return f"Alert.alert(t('alertTitle{t_key}', '{title}'))"
        
    new_content = re.sub(pattern2, replacer2, new_content)

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {path}")

# Specifically only target the 20 files that we reverted, to ensure we don't mess up ProfileScreen etc again
files_to_update = [
    'src/screens/auth/LocationPermissionScreen.tsx',
    'src/screens/auth/NotificationPermissionScreen.tsx',
    'src/screens/booking/LocationSelectionScreen.tsx',
    'src/screens/chat/CompanionChatScreen.tsx',
    'src/screens/safety/IncidentReportScreen.tsx',
    'src/screens/safety/SafetyHubScreen.tsx',
    'src/screens/settings/AccountSettingsScreen.tsx',
    'src/screens/settings/ActiveSessionsScreen.tsx',
    'src/screens/settings/AppPermissionsScreen.tsx',
    'src/screens/settings/DataCacheScreen.tsx',
    'src/screens/settings/DeactivateAccountScreen.tsx',
    'src/screens/settings/DeleteAccountScreen.tsx',
    'src/screens/support/CreateSupportTicketScreen.tsx',
    'src/screens/wallet/AddBankAccountScreen.tsx',
    'src/screens/wallet/AddPaymentMethodScreen.tsx',
    'src/screens/wallet/PaymentMethodsScreen.tsx',
    'src/screens/wallet/TransactionDetailScreen.tsx',
    'src/screens/wallet/WalletScreen.tsx',
    'src/screens/wallet/WithdrawalMethodsScreen.tsx',
    'src/screens/wallet/WithdrawMoneyScreen.tsx'
]

for path in files_to_update:
    if os.path.exists(path):
        process_file(path)
