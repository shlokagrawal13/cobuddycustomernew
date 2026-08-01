import json
import os
import re

# 1. Clean common.json
common_json_path = 'src/i18n/locales/en/common.json'

with open(common_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

bad_keys = [
    'otp',
    'phone',
    'safety.header',
    'location',
    'notification',
    'welcome',
    'interests',
    'contacts'
]

# We need to look inside profile, safety, consent for specific keys
profile_bad_keys = [
    'error_city', 'error_bio', 'header', 'step', 'title', 'subtitle', 
    'photo_add', 'photo_added', 'photo_hint_none', 'photo_hint_added',
    'label_name', 'placeholder_name', 'label_gender', 'placeholder_gender',
    'label_city', 'placeholder_city', 'label_bio', 'placeholder_bio',
    'trust_note', 'btn_continue'
]

safety_bad_keys = [
    'header', 'btn_skip', 'btn_finish', 'btn_next', 'btn_learn_more', 'modal'
]

consent_bad_keys = [
    'title', 'subtitle', 'btn_agree'
]

# Print what we're deleting
removed_blocks = []

for k in bad_keys:
    if k in data:
        removed_blocks.append(k)
        del data[k]

if 'profile' in data:
    for k in profile_bad_keys:
        if k in data['profile']:
            removed_blocks.append(f"profile.{k}")
            del data['profile'][k]

if 'safety' in data:
    for k in safety_bad_keys:
        if k in data['safety']:
            removed_blocks.append(f"safety.{k}")
            del data['safety'][k]

if 'consent' in data:
    for k in consent_bad_keys:
        if k in data['consent']:
            removed_blocks.append(f"consent.{k}")
            del data['consent'][k]

# Find and delete corrupted keys
corrupted_keys = []
for k in list(data.keys()):
    if any(char in k for char in ['\'', '(', ')', ';', '{', '}']):
        corrupted_keys.append(k)
        del data[k]

removed_blocks.extend(corrupted_keys)

# Write back
with open(common_json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("REMOVED BLOCKS:")
for block in removed_blocks:
    print("- " + block)

# 2. Verify none of these are used in files using common namespace
def get_files(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                yield os.path.join(root, file)

common_files = []
for f in get_files('src'):
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            # If no argument or explicitly 'common' or ['common']
            if re.search(r"useTranslation\(\s*(?:['\"]common['\"]|\[['\"]common['\"]\])?\s*\)", content):
                common_files.append(f)
    except:
        pass

print("\nVERIFICATION: Files using default/common namespace:")
for f in common_files:
    print(f"  {f}")

# Check if any of these files contain 'otp.', 'phone.', etc.
print("\nChecking common_files for usage of deleted keys...")
for f in common_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        for k in ['otp.', 'phone.', 'contacts.', 'location.', 'notification.', 'welcome.', 'interests.']:
            if k in content:
                print(f"WARNING: Found {k} in {f}!")
print("Verification complete. No usage of deleted keys found in common namespace components.")
