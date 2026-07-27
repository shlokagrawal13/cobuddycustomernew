import os, glob, re, json

def build_i18n_tree(base_dir):
    tree = {}
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            if f.endswith('.json'):
                path = os.path.relpath(os.path.join(root, f), base_dir)
                parts = path.replace('\\', '/').replace('.json', '').split('/')
                
                # Load JSON
                try:
                    data = json.load(open(os.path.join(root, f), 'r', encoding='utf-8'))
                except:
                    data = {}
                
                # Insert into tree
                curr = tree
                for part in parts[:-1]:
                    if part not in curr:
                        curr[part] = {}
                    curr = curr[part]
                curr[parts[-1]] = data
    return tree

def resolve_key(tree, namespace, key):
    # tree is like {'common': {...}, 'settings': {'activeSessions': {...}}, 'onboarding': {'location': {...}}}
    # namespace might be 'settings.activeSessions' or 'onboarding'
    
    ns_parts = namespace.split('.')
    curr = tree
    for part in ns_parts:
        if part in curr:
            curr = curr[part]
        else:
            return False # namespace not found
            
    # Now look up key inside the resolved namespace
    key_parts = key.split('.')
    for part in key_parts:
        if part in curr:
            curr = curr[part]
        else:
            return False
            
    return True

tree = build_i18n_tree('src/i18n/locales/en')
missing_count = 0

for filepath in glob.glob('src/screens/**/*.tsx', recursive=True):
    content = open(filepath, 'r', encoding='utf-8', errors='ignore').read()
    
    # Extract useTranslation namespaces
    ns_matches = re.findall(r'useTranslation\(\s*(?:\[([^\]]+)\]|\'([^\']+)\'|\"([^\"]+)\")\s*\)', content)
    namespaces = []
    for match in ns_matches:
        if match[0]: # Array
            arr = match[0].replace('\"', '').replace('\'', '').split(',')
            namespaces.extend([n.strip() for n in arr])
        elif match[1]:
            namespaces.append(match[1])
        elif match[2]:
            namespaces.append(match[2])
            
    if not namespaces:
        namespaces = ['common'] # Default if not specified but t() is used somehow
        
    # Extract all t('key') calls
    t_calls = re.findall(r't\(\s*[\'\"]([^\'\"]+)[\'\"]', content)
    
    for key in t_calls:
        # Check if it has a namespace prefix like common:cancelBtn
        if ':' in key:
            ns, actual_key = key.split(':', 1)
            if not resolve_key(tree, ns, actual_key):
                print(f"{filepath}: missing {key}")
                missing_count += 1
        else:
            # Check in provided namespaces
            found = False
            for ns in namespaces:
                if resolve_key(tree, ns, key):
                    found = True
                    break
            if not found:
                print(f"{filepath}: missing {key} in namespaces {namespaces}")
                missing_count += 1

if missing_count == 0:
    print("0 MISSING KEYS FOUND!")
else:
    print(f"{missing_count} MISSING KEYS FOUND!")
