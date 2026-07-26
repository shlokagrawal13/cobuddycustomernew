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

            def replace_button(m):
                full_match = m.group(0)
                
                # Check for icon
                icon_match = re.search(r'<Icon\s+name=["\']([^"\']+)["\']', full_match)
                if not icon_match:
                    icon_match = re.search(r'<Ionicons\s+name=["\']([^"\']+)["\']', full_match)
                
                label = 'Action'
                
                if icon_match:
                    name = icon_match.group(1)
                    if 'left' in name or 'back' in name: label = 'Go back'
                    elif 'right' in name or 'next' in name: label = 'Next'
                    elif 'close' in name: label = 'Close'
                    elif 'settings' in name or 'cog' in name: label = 'Settings'
                    elif 'help' in name: label = 'Help'
                    elif 'search' in name or 'magnify' in name: label = 'Search'
                    elif 'bell' in name:
                        label = 'Mute notifications' if 'off' in name else 'Notifications'
                    elif 'filter' in name or 'tune' in name: label = 'Filter'
                    elif 'edit' in name or 'pencil' in name: label = 'Edit'
                    elif 'plus' in name or 'add' in name: label = 'Add'
                    elif 'camera' in name: label = 'Camera'
                    elif 'mic' in name: label = 'Microphone'
                    elif 'phone' in name or 'call' in name: label = 'Call'
                    elif 'dots' in name or 'more' in name: label = 'More options'
                    elif 'send' in name: label = 'Send'
                    elif 'attach' in name or 'paperclip' in name: label = 'Attach'
                    elif 'check' in name: label = 'Confirm'
                    elif 'share' in name: label = 'Share'
                    elif 'bookmark' in name or 'save' in name: label = 'Save'
                    elif 'heart' in name: label = 'Like'
                    elif 'alert' in name or 'report' in name: label = 'Report Issue'
                    elif 'delete' in name or 'trash' in name: label = 'Delete'
                    elif 'account' in name or 'profile' in name: label = 'Profile'
                    elif 'star' in name: label = 'Review'
                    elif 'refresh' in name or 'sync' in name: label = 'Refresh'
                    elif 'calendar' in name or 'schedule' in name: label = 'Schedule'
                    elif 'credit-card' in name or 'payment' in name: label = 'Payment'
                    elif 'wallet' in name: label = 'Wallet'
                    elif 'map' in name or 'location' in name: label = 'Location'
                    elif 'compass' in name or 'discover' in name: label = 'Discover'
                    elif 'message' in name or 'chat' in name: label = 'Chat'
                    else: label = name.replace('-', ' ').title()
                else:
                    # check if there's text inside
                    text_match = re.search(r'<Text[^>]*>([^<]+)</Text>', full_match)
                    if text_match:
                        label = text_match.group(1).strip()
                        # clean up curly braces
                        label = re.sub(r'[\{\}]', '', label)
                    else:
                        # Try looking for navigation.navigate
                        nav_match = re.search(r'navigate\([\'"]([^\'"]+)[\'"]\)', full_match)
                        if nav_match:
                            target = nav_match.group(1)
                            label = f'Go to {target.replace("Screen", "")}'
                
                if label == 'button' or not label:
                    label = 'Action'
                
                return full_match.replace('accessibilityLabel="button"', f'accessibilityLabel="{label}"')

            # We use a greedy match from <TouchableOpacity up to closing tag, but this is risky
            # Let's split by <TouchableOpacity and </TouchableOpacity> and replace inside each block
            
            blocks = re.split(r'(<(?:TouchableOpacity|Pressable)[^>]*>)', content)
            
            for i in range(1, len(blocks), 2):
                open_tag = blocks[i]
                if 'accessibilityLabel="button"' in open_tag:
                    # Now we need to look ahead to find the inner content up to </TouchableOpacity>
                    # But it's easier to find the closing tag
                    # since we just split by opening tags, blocks[i+1] contains the inner content
                    inner_content = blocks[i+1]
                    
                    full_block = open_tag + inner_content
                    # Fake match obj
                    class Match:
                        def group(self, n): return full_block
                    
                    new_block = replace_button(Match())
                    
                    # now we need to put it back
                    # The replacement returns full_block with accessibilityLabel changed
                    # However, new_block might have altered inner_content if there was "button" there
                    # We just care about the tag. Let's just replace in the tag itself based on inner_content analysis.
                    
                    icon_match = re.search(r'<Icon\s+name=["\']([^"\']+)["\']', inner_content)
                    if not icon_match:
                        icon_match = re.search(r'<Ionicons\s+name=["\']([^"\']+)["\']', inner_content)
                    
                    label = 'Action'
                    
                    if icon_match:
                        name = icon_match.group(1)
                        if 'left' in name or 'back' in name: label = 'Go back'
                        elif 'right' in name or 'next' in name: label = 'Next'
                        elif 'close' in name: label = 'Close'
                        elif 'settings' in name or 'cog' in name: label = 'Settings'
                        elif 'help' in name: label = 'Help'
                        elif 'search' in name or 'magnify' in name: label = 'Search'
                        elif 'bell' in name:
                            label = 'Mute notifications' if 'off' in name else 'Notifications'
                        elif 'filter' in name or 'tune' in name: label = 'Filter'
                        elif 'edit' in name or 'pencil' in name: label = 'Edit'
                        elif 'plus' in name or 'add' in name: label = 'Add'
                        elif 'camera' in name: label = 'Camera'
                        elif 'mic' in name: label = 'Microphone'
                        elif 'phone' in name or 'call' in name: label = 'Call'
                        elif 'dots' in name or 'more' in name: label = 'More options'
                        elif 'send' in name: label = 'Send'
                        elif 'attach' in name or 'paperclip' in name: label = 'Attach'
                        elif 'check' in name: label = 'Confirm'
                        elif 'share' in name: label = 'Share'
                        elif 'bookmark' in name or 'save' in name: label = 'Save'
                        elif 'heart' in name: label = 'Like'
                        elif 'alert' in name or 'report' in name: label = 'Report Issue'
                        elif 'delete' in name or 'trash' in name: label = 'Delete'
                        elif 'account' in name or 'profile' in name: label = 'Profile'
                        elif 'star' in name: label = 'Review'
                        elif 'refresh' in name or 'sync' in name: label = 'Refresh'
                        elif 'calendar' in name or 'schedule' in name: label = 'Schedule'
                        elif 'credit-card' in name or 'payment' in name: label = 'Payment'
                        elif 'wallet' in name: label = 'Wallet'
                        elif 'map' in name or 'location' in name: label = 'Location'
                        elif 'compass' in name or 'discover' in name: label = 'Discover'
                        elif 'message' in name or 'chat' in name: label = 'Chat'
                        else: label = name.replace('-', ' ').title()
                    else:
                        text_match = re.search(r'<Text[^>]*>([^<]+)</Text>', inner_content)
                        if text_match:
                            label = text_match.group(1).strip()
                            label = re.sub(r'[\{\}]', '', label)
                        else:
                            nav_match = re.search(r'navigate\([\'"]([^\'"]+)[\'"]\)', open_tag)
                            if nav_match:
                                target = nav_match.group(1)
                                label = f'Go to {target.replace("Screen", "")}'
                    
                    if label == 'button' or not label: label = 'Action'
                    
                    blocks[i] = open_tag.replace('accessibilityLabel="button"', f'accessibilityLabel="{label}"')

            content = "".join(blocks)
            
            # literal replacement for remaining literal codes
            content = re.sub(r'accessibilityLabel="([a-zA-Z_]+\.[a-zA-Z_]+)"', r'accessibilityLabel={`\1`}', content)

            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed {path}")

process_files()
