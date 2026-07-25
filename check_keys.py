import os
import re
import json

# 1. Parse index.ts to get namespace -> JSON mapping
namespaces = {}
with open('src/i18n/index.ts', 'r', encoding='utf-8') as f:
    content = f.read()
    
    # Extract imports
    # e.g. import bookingActivitySelect from './locales/en/booking/activitySelect.json';
    import_map = {}
    for match in re.finditer(r"import\s+(\w+)\s+from\s+['\"]([^'\"]+)['\"]", content):
        import_name = match.group(1)
        import_path = match.group(2)
        import_map[import_name] = import_path
        
    # Extract resources mapping
    # e.g. 'booking.activitySelect': bookingActivitySelect,
    for match in re.finditer(r"['\"]?([\w.]+)['\"]?:\s*(\w+),?", content):
        ns = match.group(1)
        import_name = match.group(2)
        if import_name in import_map:
            # resolve path relative to src/i18n/
            rel_path = import_map[import_name].replace('./', '')
            abs_path = os.path.join('src', 'i18n', rel_path)
            namespaces[ns] = abs_path

# fallback for common and onboarding if they are not explicitly mapped cleanly
if 'common' not in namespaces: namespaces['common'] = 'src/i18n/locales/en/common.json'
if 'onboarding' not in namespaces: namespaces['onboarding'] = 'src/i18n/locales/en/onboarding.json'

print("Namespace mapping:", len(namespaces), "namespaces found.")

# 2. Extract t() calls from all .tsx files
missing_keys_per_file = {}
total_missing = 0

def get_nested_value(d, keys):
    for k in keys:
        if isinstance(d, dict) and k in d:
            d = d[k]
        else:
            return None
    return d

for root, _, files in os.walk('src/screens'):
    for file in files:
        if not file.endswith('.tsx'): continue
        filepath = os.path.join(root, file)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            ts_content = f.read()
            
        # Find namespace used in this file
        ns_match = re.search(r"useTranslation\(\[\s*['\"]([^'\"]+)['\"]\s*\]\)", ts_content)
        if not ns_match:
            ns_match = re.search(r"useTranslation\(\s*['\"]([^'\"]+)['\"]\s*\)", ts_content)
        
        ns = ns_match.group(1) if ns_match else 'common'
        
        # Load JSON for this namespace
        json_path = namespaces.get(ns)
        json_data = {}
        if json_path and os.path.exists(json_path):
            with open(json_path, 'r', encoding='utf-8') as jf:
                try:
                    json_data = json.load(jf)
                except:
                    pass
                    
        # Find all t('key', 'default') calls
        # We need to handle t('key') and t('key', 'default') and t('key', { ... })
        # Actually just matching t('key' or t("key"
        # Regex to match t('some.key' ... )
        t_calls = re.finditer(r"t\(\s*['\"]([^'\"]+)['\"]\s*(?:,\s*['\"](.*?)['\"])?", ts_content, re.DOTALL)
        
        missing_in_this_file = []
        for match in t_calls:
            key = match.group(1)
            default_val = match.group(2)
            
            # check if key exists in json_data
            key_parts = key.split('.')
            val = get_nested_value(json_data, key_parts)
            if val is None:
                missing_in_this_file.append((key, default_val))
                
        if missing_in_this_file:
            missing_keys_per_file[filepath] = {
                'ns': ns,
                'json_path': json_path,
                'missing': missing_in_this_file
            }
            total_missing += len(missing_in_this_file)

print(f"Found {total_missing} missing keys across {len(missing_keys_per_file)} files.")
with open('missing_keys_report.json', 'w', encoding='utf-8') as f:
    json.dump(missing_keys_per_file, f, indent=2)

