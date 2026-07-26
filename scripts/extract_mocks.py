import os
import re

MAPPINGS = {
    'companions.mock.ts': [
        ('src/screens/home/CompanionProfileScreen.tsx', 'DUMMY_PROFILE'),
        ('src/screens/home/DiscoverScreen.tsx', 'DUMMY_COMPANIONS'),
        ('src/screens/home/HomeDashboardScreen.tsx', 'DUMMY_FEATURED')
    ],
    'bookings.mock.ts': [
        ('src/screens/bookings/BookingsListScreen.tsx', 'MOCK_BOOKINGS'),
        ('src/screens/bookings/ModifyBookingScreen.tsx', 'MOCK_VENUES'),
        ('src/screens/bookings/BookingDetailScreen.tsx', 'MOCK_DETAILS')
    ],
    'activities.mock.ts': [
        ('src/screens/booking/BookingActivitySelectScreen.tsx', 'ACTIVITIES')
    ],
    'reviews.mock.ts': [
        ('src/screens/profile/MyReviewsScreen.tsx', 'MOCK_REVIEWS'),
        ('src/screens/profile/SavedProfilesScreen.tsx', 'MOCK_SAVED')
    ],
    'wallet.mock.ts': [
        ('src/screens/wallet/TransactionDetailScreen.tsx', 'MOCK_DETAILS', 'MOCK_TRANSACTION_DETAILS')
    ],
    'notifications.mock.ts': [
        ('src/screens/home/NotificationsScreen.tsx', 'MOCK_NOTIFICATIONS')
    ],
    'safety.mock.ts': [
        ('src/screens/settings/BlockedUsersScreen.tsx', 'MOCK_BLOCKED_USERS'),
        ('src/screens/safety/SafetyGuidelinesScreen.tsx', 'GUIDELINES')
    ],
    'session.mock.ts': [
        ('src/screens/session/ActiveSessionScreen.tsx', 'MOCK_COMPANION'),
        ('src/screens/session/ArrivalCheckInScreen.tsx', 'MOCK_OTP'),
        ('src/screens/session/SessionReminderScreen.tsx', 'MOCK_DATA')
    ],
    'onboarding.mock.ts': [
        ('src/screens/auth/LocationPermissionScreen.tsx', 'BENEFITS', 'LOCATION_BENEFITS'),
        ('src/screens/auth/NotificationPermissionScreen.tsx', 'BENEFITS', 'NOTIFICATION_BENEFITS')
    ],
    'profile.mock.ts': [
        ('src/screens/profile/EditProfileScreen.tsx', 'MOCK_PROFILE')
    ]
}

def extract_variable(content, var_name):
    # Match const VAR_NAME = { ... }; or [ ... ]; or "..."
    # This is tricky with regex. Let's try to match from 'const VAR_NAME =' up to the matching closing bracket or semicolon.
    match = re.search(r'const\s+' + var_name + r'\s*=\s*(.*?);(\s*\n)?', content, re.DOTALL)
    if not match:
        # Maybe it doesn't end with a semicolon?
        # Let's just find the start and balance brackets.
        start_idx = content.find(f'const {var_name} =')
        if start_idx == -1: return None, content
        
        # simple parsing
        idx = start_idx + len(f'const {var_name} =')
        while idx < len(content) and content[idx] in ' \t\n': idx += 1
        
        if content[idx] in '[{':
            open_char = content[idx]
            close_char = '}' if open_char == '{' else ']'
            depth = 0
            in_string = False
            string_char = ''
            
            end_idx = idx
            while end_idx < len(content):
                c = content[end_idx]
                
                if in_string:
                    if c == string_char and content[end_idx-1] != '\\':
                        in_string = False
                else:
                    if c in '"\'`':
                        in_string = True
                        string_char = c
                    elif c == open_char:
                        depth += 1
                    elif c == close_char:
                        depth -= 1
                        if depth == 0:
                            end_idx += 1
                            break
                end_idx += 1
            
            if end_idx < len(content) and content[end_idx] == ';':
                end_idx += 1
            
            extracted = content[start_idx:end_idx]
            new_content = content[:start_idx] + content[end_idx:]
            # clean up blank lines
            new_content = re.sub(r'\n\s*\n\s*\n', '\n\n', new_content)
            return extracted, new_content
        else:
            # It's a simple literal like 'Elena'
            end_idx = content.find(';', idx)
            if end_idx != -1:
                end_idx += 1
                extracted = content[start_idx:end_idx]
                new_content = content[:start_idx] + content[end_idx:]
                return extracted, new_content
            return None, content
    else:
        return match.group(0), content[:match.start()] + content[match.end():]

# Ensure mock directory exists
os.makedirs('src/services/mock', exist_ok=True)

# Generate barrel file
barrel_content = ""
barrel_content += "export * from './chat.mock';\n"
barrel_content += "export * from './support.mock';\n"

for mock_file, targets in MAPPINGS.items():
    mock_file_path = f'src/services/mock/{mock_file}'
    mock_content = "// MOCK: replace with API\n\n"
    
    for target in targets:
        file_path = target[0]
        var_name = target[1]
        new_var_name = target[2] if len(target) > 2 else var_name
        
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        extracted, new_content = extract_variable(content, var_name)
        
        if extracted:
            # Rename if necessary
            if new_var_name != var_name:
                extracted = extracted.replace(f'const {var_name}', f'const {new_var_name}')
                # also replace usage in the file
                new_content = new_content.replace(var_name, new_var_name)
            
            mock_content += extracted.replace('const ', 'export const ') + "\n\n"
            
            # Add import to the top of the file (after other imports)
            import_stmt = f"import {{ {new_var_name} }} from '../../services/mock';\n"
            
            # find last import
            imports_end = new_content.rfind('import ')
            if imports_end != -1:
                newline_after_import = new_content.find('\n', imports_end)
                if newline_after_import != -1:
                    new_content = new_content[:newline_after_import+1] + import_stmt + new_content[newline_after_import+1:]
                else:
                    new_content = import_stmt + new_content
            else:
                new_content = import_stmt + new_content
                
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"Extracted {var_name} from {file_path} into {mock_file}")
        else:
            print(f"Failed to extract {var_name} from {file_path}")
            
    with open(mock_file_path, 'w', encoding='utf-8') as f:
        f.write(mock_content)
        
    # add to barrel
    base_name = mock_file.replace('.ts', '')
    barrel_content += f"export * from './{base_name}';\n"

with open('src/services/mock/index.ts', 'w', encoding='utf-8') as f:
    f.write(barrel_content)

print("Done extracting mocks.")
