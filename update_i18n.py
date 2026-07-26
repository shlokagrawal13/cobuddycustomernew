import os
import re
import json

src_dir = 'src'
i18n_path = 'src/i18n/locales/en/common.json'

with open(i18n_path, 'r', encoding='utf-8') as f:
    en_json = json.load(f)

# Regex to find t('key', 'default')
pattern = re.compile(r"t\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)")
# Also find t('key') maybe? The user specifically said t('a11yXxx', ...) with fallback.

new_keys = 0
for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = pattern.findall(content)
                for key, default_val in matches:
                    if key.startswith('a11y') and key not in en_json:
                        en_json[key] = default_val
                        new_keys += 1

with open(i18n_path, 'w', encoding='utf-8') as f:
    json.dump(en_json, f, indent=2, ensure_ascii=False)

print(f'Added {new_keys} new keys to common.json')
