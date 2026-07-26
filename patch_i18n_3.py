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
    else:
        print(f"Skipped {filepath} (not found)")

replace_in_file('src/screens/settings/AppLockScreen.tsx',
    "Require {biometricName}",
    "{t('requireBiometric', 'Require {{biometric}}', { biometric: biometricName })}")

replace_in_file('src/screens/support/SupportCenterScreen.tsx',
    "No {activeTab.toLowerCase()} tickets",
    "{t('noTickets', 'No {{tab}} tickets', { tab: activeTab.toLowerCase() })}")

replace_in_file('src/components/ui/CompanionCard.tsx',
    "A {reviews} reviews A {sessions} sessions",
    "{t('companionCard.statsMuted', '• {{reviews}} reviews • {{sessions}} sessions', { reviews, sessions })}")

replace_in_file('src/components/ui/CompanionCard.tsx',
    "From <Text style={styles.rateValue}>{rate}</Text>",
    "{t('companionCard.fromRate', 'From ')}<Text style={styles.rateValue}>{rate}</Text>")

replace_in_file('src/components/ui/CompanionCard.tsx',
    "accessibilityLabel={${t('companionCard.viewProfile', 'View Profile')} for }",
    "accessibilityLabel={t('companionCard.viewProfileFor', 'View Profile for {{name}}', { name })}")
