import json
import os

common_json_path = 'src/i18n/locales/en/common.json'

with open(common_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

keys_to_keep = [
    'appName', 
    'chatInput', 
    'companionCard', 
    'stepCounter',
    'tabHome', 
    'tabDiscover', 
    'tabBookings', 
    'tabMessages', 
    'tabProfile'
]

# Keep a11y* keys
for k in data.keys():
    if k.startswith('a11y'):
        keys_to_keep.append(k)

print(f"Total keys to keep: {len(keys_to_keep)}")
print(f"Keeping keys: {keys_to_keep}")

new_data = {k: data[k] for k in keys_to_keep if k in data}

with open(common_json_path, 'w', encoding='utf-8') as f:
    json.dump(new_data, f, indent=2)

print("Saved common.json")
