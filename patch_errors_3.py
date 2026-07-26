import re
import os

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

replace_in_file('src/screens/chat/CompanionChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: companionName, callType: 'companion' });",
    "navigation.navigate('VoiceCallScreen', { companionName: companionName });")

replace_in_file('src/screens/chat/ConciergeChatScreen.tsx',
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support', callType: 'support' });",
    "navigation.navigate('VoiceCallScreen', { companionName: 'Support' });")

replace_in_file('src/screens/settings/SettingsHubScreen.tsx',
    "navigation.navigate('SystemStateStack', { screen: item.route });",
    "navigation.navigate('SystemStateStack', { screen: item.route as any });")

