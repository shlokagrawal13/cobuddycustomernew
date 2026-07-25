import os
import re
import json

def camel_case(s):
    # Remove non-alphanumeric characters except spaces
    s = re.sub(r'[^a-zA-Z0-9 ]', '', s)
    words = s.split()
    if not words:
        return 'textKey'
    return words[0].lower() + ''.join(w.capitalize() for w in words[1:5])

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'useTranslation' not in content:
        return

    # find namespace
    ns_match = re.search(r"useTranslation\(\['([^']+)'\]\)", content)
    if not ns_match:
        ns_match = re.search(r"useTranslation\('([^']+)'\)", content)
    
    namespace = ns_match.group(1) if ns_match else 'common'

    json_path = f'src/i18n/locales/en/{namespace}.json'
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            try:
                ns_data = json.load(f)
            except:
                ns_data = {}
    else:
        ns_data = {}

    modified = False
    
    # regex to find <Text ...>...</Text> that has no {t(
    def repl(m):
        nonlocal modified, ns_data
        full_tag = m.group(0)
        inner_text = m.group(1).strip()
        
        # if it contains {} it's probably dynamic, skip
        if '{' in inner_text or '}' in inner_text:
            return full_tag
            
        # if no alphabet chars, skip
        if not re.search(r'[a-zA-Z]', inner_text):
            return full_tag

        # Generate key
        key = camel_case(inner_text)
        
        # ensure unique key
        original_key = key
        counter = 1
        while key in ns_data and ns_data[key] != inner_text:
            key = f"{original_key}{counter}"
            counter += 1
            
        ns_data[key] = inner_text
        modified = True
        
        # Construct replacement
        # replace inner text with {t('key', 'inner_text')}
        new_inner = f"{{t('{key}', '{inner_text}')}}"
        return full_tag.replace('>' + m.group(1) + '<', '>' + new_inner + '<')
        
    # Replace single line <Text>...</Text>
    new_content = re.sub(r'<Text[^>]*>([^<]+)</Text>', repl, content)
    
    # Also catch multiline Text blocks
    # <Text style={styles.foo}>\n   Bar\n</Text>
    new_content = re.sub(r'<Text[^>]*>\s*([\w\s.,!?\'"-]+?)\s*</Text>', repl, new_content)

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(ns_data, f, indent=2)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src/screens'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

