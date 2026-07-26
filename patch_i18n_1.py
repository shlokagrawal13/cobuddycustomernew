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

replace_in_file('src/screens/safety/SafetyHubScreen.tsx',
    "Alert.alert('Cancel SOS', 'Are you sure you want to cancel the SOS?', [",
    "Alert.alert(t('alertTitleCancelSOS', 'Cancel SOS'), t('alertMsgAreYouSureYouWantToCancel', 'Are you sure you want to cancel the SOS?'), [")

replace_in_file('src/screens/safety/SafetyHubScreen.tsx',
    "{ text: 'No', style: 'cancel' },",
    "{ text: t('no', 'No'), style: 'cancel' },")

replace_in_file('src/screens/safety/SafetyHubScreen.tsx',
    "{ text: 'Cancel', style: 'cancel' },",
    "{ text: t('cancel', 'Cancel'), style: 'cancel' },")

replace_in_file('src/screens/safety/SafetyHubScreen.tsx',
    "text: 'ACTIVATE SOS',",
    "text: t('activateSOS', 'ACTIVATE SOS'),")

with open('src/i18n/locales/en/safety/hub.json', 'r', encoding='utf8') as f:
    data = json.load(f)

data['alertTitleCancelSOS'] = "Cancel SOS"
data['alertMsgAreYouSureYouWantToCancel'] = "Are you sure you want to cancel the SOS?"
data['no'] = "No"
data['cancel'] = "Cancel"
data['activateSOS'] = "ACTIVATE SOS"

with open('src/i18n/locales/en/safety/hub.json', 'w', encoding='utf8') as f:
    json.dump(data, f, indent=2)

print("Updated hub.json")
