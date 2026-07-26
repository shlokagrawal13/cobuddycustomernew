import re

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

new_screens = """<Stack.Screen name="LegalAgreementsScreen" component={LegalAgreementsScreen} />
        <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
        <Stack.Screen name="SupportCenterScreen" component={SupportCenterScreen} />
        <Stack.Screen name="CreateSupportTicketScreen" component={CreateSupportTicketScreen} />
        <Stack.Screen name="SupportTicketDetailScreen" component={SupportTicketDetailScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="TrustedContactsScreen" component={TrustedContactsScreen} />
        <Stack.Screen name="SafetyHubScreen" component={SafetyHubScreen} />
        <Stack.Screen name="IncidentReportScreen" component={IncidentReportScreen} />
        <Stack.Screen name="SafetyGuidelinesScreen" component={SafetyGuidelinesScreen} />"""

replace_in_file('src/navigation/MainTabNavigator.tsx',
    "<Stack.Screen name=\"LegalAgreementsScreen\" component={LegalAgreementsScreen} />",
    new_screens)
