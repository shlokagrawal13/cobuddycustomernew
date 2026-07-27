import os, re
from collections import Counter

screens = []
for root, dirs, files in os.walk('src/navigation'):
    for f in files:
        if f.endswith('.tsx'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
                matches = re.findall(r'<Stack\.Screen\s+name=[\"\']([^\"\']+)[\"\']', content)
                screens.extend(matches)

counts = Counter(screens)
for screen, count in counts.items():
    if count > 1:
        print(f"{screen} x{count}")
