import re

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

replace_in_file('src/navigation/MainTabNavigator.tsx',
    "<Stack.Screen name=\"SupportTicketDetailScreen\" component={SupportTicketDetailScreen} />",
    "<Stack.Screen name=\"SupportTicketDetailScreen\" component={SupportTicketDetailScreen} />\n        <Stack.Screen name=\"ConciergeChatScreen\" component={ConciergeChatScreen} />")
