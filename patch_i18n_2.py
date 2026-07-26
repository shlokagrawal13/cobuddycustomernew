import re
import json

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

replace_in_file('src/screens/home/CompanionProfileScreen.tsx',
    "accessibilityLabel={Report }",
    "accessibilityLabel={t('reportName', 'Report {{name}}', { name: DUMMY_PROFILE.name })}")

replace_in_file('src/screens/home/CompanionProfileScreen.tsx',
    "<Text style={styles.sheetRowText}>Report {DUMMY_PROFILE.name}</Text>",
    "<Text style={styles.sheetRowText}>{t('reportName', 'Report {{name}}', { name: DUMMY_PROFILE.name })}</Text>")
