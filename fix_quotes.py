import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find {t('someKey', 'text')} and fix the text part if it has unescaped apostrophes
    # It's tricky because the text part might have already broken the regex.
    # Actually, we know what the python script did: it output {t('key', 'text')}
    # We can match {t('([^']*)', '(.*?)')} but since the text might contain ', it's harder.
    
    # Alternative: we can just match {t('key', '...')} where ... goes until )}
    def repl(m):
        key = m.group(1)
        text = m.group(2)
        # Escape single quotes in text if they aren't already escaped
        # but wait, text might end at the first ' if we use .*?, which is wrong.
        # It's better to capture everything until ')}
        
        # text is what's inside the second argument.
        fixed_text = text.replace("'", "\\'")
        # remove double escapes
        fixed_text = fixed_text.replace("\\\\'", "\\'")
        return f"{{t('{key}', '{fixed_text}')}}"

    # Regex to match {t('key', 'TEXT_WITH_POSSIBLE_UNESCAPED_QUOTES')}
    # We match {t('key', ' followed by anything until ')}
    new_content = re.sub(r"\{t\('([^']+)',\s*'((?:.*?))'\)\}", repl, content, flags=re.DOTALL)
    
    # Wait, the regex above will just stop at the first ')} which is correct because our script added exactly ')} at the end.
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

for root, _, files in os.walk('src/screens'):
    for file in files:
        if file.endswith('.tsx'):
            fix_file(os.path.join(root, file))
