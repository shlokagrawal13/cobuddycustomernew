import os
import json
import re

# 1. Parse index.ts
with open('src/i18n/index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

import_map = {}
for match in re.finditer(r"import\s+(\w+)\s+from\s+['\"]([^'\"]+)['\"]", content):
    import_map[match.group(1)] = match.group(2)

# Find resources block
resources_match = re.search(r"resources:\s*\{\s*en:\s*\{([^}]+)\}", content)
if not resources_match:
    print("Could not find resources block")
    exit(1)

resources_str = resources_match.group(1)
namespaces = {}

# We need to parse nested like:
# onboarding: {
#   welcome: onboardingWelcome,
#   ...
# }
# and top-level like:
# 'booking.summary': bookingSummary,

# First, handle top-level string keys:
for match in re.finditer(r"['\"]([\w.]+)['\"]:\s*(\w+)", resources_str):
    ns = match.group(1)
    var = match.group(2)
    namespaces[ns] = var

# Now handle nested objects (simple parser for this specific structure)
for match in re.finditer(r"(\w+):\s*\{([^}]+)\}", resources_str):
    parent = match.group(1)
    children_str = match.group(2)
    for child_match in re.finditer(r"(\w+):\s*(\w+)", children_str):
        child = child_match.group(1)
        var = child_match.group(2)
        # in i18next, a nested object means the namespace is parent and the key starts with child.!
        # wait, if the namespace is parent, then 	('child.something') maps to ar.something!
        # This is a bit tricky to represent.
        # We can represent it as namespace mappings with prefixes.
        ns_key = f"{parent}::{child}"
        namespaces[ns_key] = var

def get_nested_value(d, keys):
    for k in keys:
        if isinstance(d, dict) and k in d:
            d = d[k]
        else:
            return None
    return d

missing = 0
for root, _, files in os.walk('src/screens'):
    for file in files:
        if not file.endswith('.tsx'): continue
        filepath = os.path.join(root, file)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            ts_content = f.read()
            
        # Get namespace
        ns_match = re.search(r"useTranslation\(\[\s*['\"]([^'\"]+)['\"]\s*\]\)", ts_content)
        if not ns_match:
            ns_match = re.search(r"useTranslation\(\s*['\"]([^'\"]+)['\"]\s*\)", ts_content)
            
        ns = ns_match.group(1) if ns_match else 'common'
        
        t_calls = re.finditer(r"t\(\s*['\"]([^'\"]+)['\"]\s*(?:,\s*['\"](.*?)['\"])?", ts_content, re.DOTALL)
        
        for match in t_calls:
            key = match.group(1)
            default_val = match.group(2)
            
            if default_val is None:
                # User asked to check keys that *fall back to hardcoded default (2nd arg)*
                # Keys without 2nd args were not part of the 215 problem, but we should still check them.
                # Actually, we don't need to report them if we assume they are correct, but let's check all.
                pass
                
            # Resolve JSON file
            json_file = None
            key_in_json = key
            
            if ns in namespaces:
                var = namespaces[ns]
                json_file = import_map.get(var)
            else:
                # check if it's a nested namespace like onboarding
                # key is like location.title
                first_part = key.split('.')[0]
                ns_key = f"{ns}::{first_part}"
                if ns_key in namespaces:
                    var = namespaces[ns_key]
                    json_file = import_map.get(var)
                    key_in_json = key[len(first_part)+1:]
            
            if not json_file:
                # common
                json_file = './locales/en/common.json'
                
            json_path = os.path.join('src/i18n', json_file.replace('./', ''))
            
            val = None
            if os.path.exists(json_path):
                with open(json_path, 'r', encoding='utf-8') as jf:
                    try:
                        data = json.load(jf)
                        val = get_nested_value(data, key_in_json.split('.'))
                    except:
                        pass
                        
            if val is None:
                if default_val is not None:
                    # ONLY report missing keys if they have a default value!
                    # This matches the user's audit condition of 215 keys.
                    print(f"MISSING: {filepath} | NS: {ns} | Key: {key}")
                    missing += 1
                
print(f"Total Missing: {missing}")
