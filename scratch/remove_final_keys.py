import json

common_json_path = 'src/i18n/locales/en/common.json'

with open(common_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

keys_to_remove = [
    'a11yAction',
    'a11yPrice',
    'a11yKycVerified',
    'a11yKycUnverified'
]

for k in keys_to_remove:
    if k in data:
        del data[k]

with open(common_json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Removed final 4 orphaned keys.")
