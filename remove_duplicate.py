import re

with open('src/navigation/MainTabNavigator.tsx', 'r', encoding='utf8') as f:
    content = f.read()

# Remove the import and the component registration
content = re.sub(r"import \{ TrustedContactsScreen \} from '../screens/safety/TrustedContactsScreen';\n?", "", content)
content = re.sub(r"      <Stack\.Screen name=\"TrustedContactsScreen\" component=\{TrustedContactsScreen\} />\n?", "", content)

# Remove the comment mentioning dual registration for TrustedContactsScreen
content = content.replace("NOTE: TrustedContactsScreen and OTPVerificationScreen are intentionally dual-registered here in ProfileTabStack.", "NOTE: OTPVerificationScreen is intentionally dual-registered here in ProfileTabStack.")

with open('src/navigation/MainTabNavigator.tsx', 'w', encoding='utf8') as f:
    f.write(content)
print("Removed TrustedContactsScreen from MainTabNavigator")
