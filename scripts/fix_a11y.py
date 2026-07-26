import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all accessibilityLabel="Some String"
    # We want to replace it with accessibilityLabel={t('a11ySomeString', 'Some String')}
    
    def replacer(match):
        text = match.group(1)
        # Create a key by removing non-alphanumeric and capitalizing words
        key = 'a11y' + ''.join(word.capitalize() for word in re.split(r'[^a-zA-Z0-9]', text) if word)
        # return the replacement
        return f"accessibilityLabel={{t('{key}', '{text}')}}"

    new_content, count = re.subn(r'accessibilityLabel="([^"]+)"', replacer, content)

    if count > 0:
        # Check if we need to add useTranslation
        if 'useTranslation' not in new_content:
            # Add import
            import_statement = "import { useTranslation } from 'react-i18next';\n"
            # Try to add it after other imports
            last_import = new_content.rfind("import ")
            if last_import != -1:
                end_of_import = new_content.find('\n', last_import)
                new_content = new_content[:end_of_import+1] + import_statement + new_content[end_of_import+1:]
            else:
                new_content = import_statement + new_content

            # Add const { t } = useTranslation(); inside the component
            # This is tricky with regex. Let's look for `export const ComponentName = ` or `export default function ` or `const ComponentName = `
            # A simple approach: find the first `return (` or `return <` or `  return (` and insert before it.
            return_match = re.search(r'(\s+)return\s*[<\(]', new_content)
            if return_match:
                indent = return_match.group(1)
                hook_statement = f"{indent}const {{ t }} = useTranslation();"
                new_content = new_content[:return_match.start()] + hook_statement + new_content[return_match.start():]
            else:
                print(f"Warning: Could not find return statement in {filepath} to inject useTranslation hook")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath} ({count} replacements)")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
