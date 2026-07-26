import os
import re

def process_files():
    for root, _, files in os.walk('src/screens'):
        for file in files:
            if not file.endswith('.tsx'): continue
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content

            # Fix 1: literal "button" -> check inner icon
            # We'll use a regex to find TouchableOpacity / Pressable with accessibilityLabel="button"
            # and try to extract an icon name inside it.
            def replace_button(m):
                full_match = m.group(0)
                # Look for Icon name="xyz"
                icon_match = re.search(r'<Icon\s+name=["\']([^"\']+)["\']', full_match)
                label = 'button'
                if icon_match:
                    name = icon_match.group(1)
                    if name in ['arrow-left', 'chevron-left']: label = 'Go back'
                    elif name in ['close', 'window-close']: label = 'Close'
                    elif name in ['cog', 'settings-outline']: label = 'Open settings'
                    elif name == 'help-circle-outline': label = 'Help'
                    elif name == 'account-cog-outline': label = 'Account settings'
                    elif name == 'magnify': label = 'Search'
                    elif name == 'bell-outline': label = 'Notifications'
                    elif name == 'filter-variant': label = 'Filter'
                    elif name == 'pencil': label = 'Edit'
                    elif name == 'plus': label = 'Add'
                    elif name == 'camera': label = 'Camera'
                    elif name == 'microphone': label = 'Microphone'
                    elif name == 'phone': label = 'Call'
                    elif name == 'dots-vertical': label = 'More options'
                    elif name == 'send': label = 'Send'
                    elif name == 'paperclip': label = 'Attach file'
                    elif name == 'check': label = 'Confirm'
                    elif name == 'share-variant': label = 'Share'
                    elif name == 'bookmark-outline': label = 'Save'
                    elif name == 'heart-outline': label = 'Like'
                    elif name == 'shield-alert-outline': label = 'Report Safety Issue'
                    elif name == 'delete-outline': label = 'Delete'
                    elif name == 'bell-off-outline': label = 'Mute Notifications'
                    elif name == 'account-outline': label = 'View Profile'
                    elif name == 'star-outline': label = 'Add Review'
                    elif name == 'refresh': label = 'Refresh'
                    elif name == 'calendar-clock': label = 'Schedule'
                    elif name == 'credit-card-outline': label = 'Payment'
                    elif name == 'wallet-outline': label = 'Wallet'
                    elif name == 'map-marker-outline': label = 'Location'
                    elif name == 'tune-vertical': label = 'Filters'
                    elif name == 'compass-outline': label = 'Discover'
                    elif name == 'message-text-outline': label = 'Chat'
                    elif name == 'account-circle-outline': label = 'Profile'
                    else: label = name.replace('-', ' ').title()
                else:
                    # check for Ionicons or other icons
                    icon_match2 = re.search(r'<Ionicons\s+name=["\']([^"\']+)["\']', full_match)
                    if icon_match2:
                        name = icon_match2.group(1)
                        if 'back' in name: label = 'Go back'
                        elif 'close' in name: label = 'Close'
                        elif 'settings' in name: label = 'Open settings'
                        else: label = name.replace('-', ' ').title()
                
                # Replace accessibilityLabel="button" with accessibilityLabel="Found Label"
                return full_match.replace('accessibilityLabel="button"', f'accessibilityLabel="{label}"')

            # We use a regex that captures from <TouchableOpacity to </TouchableOpacity> 
            # or <Pressable to </Pressable>
            # (Note: this is a simple non-greedy match which assumes no nesting of Touchables)
            content = re.sub(r'<(TouchableOpacity|Pressable)[^>]*accessibilityLabel="button".*?</\1>', replace_button, content, flags=re.DOTALL)
            
            # Since some might be self-closing (rare for Touchables but just in case) or didn't match DOTALL properly,
            # Let's just do a simpler search for tags with accessibilityLabel="button"
            content = re.sub(r'(<(?:TouchableOpacity|Pressable)[^>]*)accessibilityLabel="button"', r'\1accessibilityLabel="Action"', content)
            
            
            # Fix 2: literal expressions
            # Find accessibilityLabel="some.expr" or accessibilityLabel="isBio ? '...' : '...'"
            # We want to find accessibilityLabel="[a-zA-Z_]*\.[a-zA-Z]*" and replace with accessibilityLabel={`...`}
            
            # ProfileScreen.tsx:222 "user.email" -> {`Email: ${user.email}`}
            if "ProfileScreen.tsx" in file:
                content = content.replace('accessibilityLabel="user.email"', 'accessibilityLabel={`Email: ${user.email}`}')
                content = content.replace('accessibilityLabel="isBioExpanded ? \'Show less\' : \'Show more\'"', 'accessibilityLabel={isBioExpanded ? \'Show less\' : \'Show more\'}')
            
            if "HomeDashboardScreen.tsx" in file:
                content = content.replace('accessibilityLabel="cat.title"', 'accessibilityLabel={cat.title}')
            
            if "BookingActivitySelectScreen.tsx" in file:
                content = content.replace('accessibilityLabel="activity.price"', 'accessibilityLabel={`Price: ${activity.price}`}')
            
            if "CompanionProfileScreen.tsx" in file:
                content = content.replace('accessibilityLabel="Report  DUMMY_PROFILE.name"', 'accessibilityLabel={`Report ${DUMMY_PROFILE.name}`}')
                content = content.replace('accessibilityLabel="Block  DUMMY_PROFILE.name"', 'accessibilityLabel={`Block ${DUMMY_PROFILE.name}`}')
            
            # General regex for any a11y labels that contain code literals
            def fix_literal_vars(m):
                full_val = m.group(1)
                if full_val in ['button', 'Action', 'Go back', 'Close']: return m.group(0) # ignore normal
                
                # if it contains a ternary or dot notation
                if '?' in full_val and ':' in full_val:
                    return f'accessibilityLabel={{{full_val}}}'
                
                # if it looks like obj.prop
                if re.match(r'^[a-zA-Z_]+\.[a-zA-Z_]+$', full_val):
                    return f'accessibilityLabel={{{full_val}}}'
                    
                # if it contains obj.prop inside text like "Report obj.name" -> {`Report ${obj.name}`}
                if re.search(r'[a-zA-Z_]+\.[a-zA-Z_]+', full_val):
                    # replace the obj.prop with ${obj.prop}
                    replaced = re.sub(r'([a-zA-Z_]+\.[a-zA-Z_]+)', r'${\1}', full_val)
                    return f'accessibilityLabel={{`{replaced}`}}'
                
                return m.group(0)
            
            content = re.sub(r'accessibilityLabel="([^"]+)"', fix_literal_vars, content)

            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed {path}")

process_files()
