import os
import re
from collections import defaultdict

# 1. Map screen name -> list of navigator files that register it
screen_to_navigators = defaultdict(list)
nav_files = []
for root, _, files in os.walk('src/navigation'):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            path = os.path.join(root, f)
            nav_files.append(path)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
                matches = re.findall(r'<(?:Stack|Tab)\.Screen\s+name=[\"\']([^\"\']+)[\"\']', content)
                for match in matches:
                    screen_to_navigators[match].append(path)

# 2. Top-level stack names (registered in index.ts which exports RootNavigator, or RootNavigator itself)
top_level_stacks = set(['AuthStack', 'MainTabNavigator', 'OnboardingStack', 'SafetySupportStack', 'BookingFlowStack', 'KYCStack', 'LiveSessionStack', 'SystemStateStack'])

main_tab_registered = set(s for s, navs in screen_to_navigators.items() if any('MainTabNavigator' in n for n in navs))

# Screen to its own navigators
def get_caller_navigators(caller_screen_name):
    # If caller_screen_name is registered in some navs, return them
    return screen_to_navigators.get(caller_screen_name, [])

# 3. Find flat navigate('X') or replace('X') or push('X') calls in screens
flags = []
for root, _, files in os.walk('src/screens'):
    for f in files:
        if f.endswith('.tsx'):
            path = os.path.join(root, f)
            caller_screen_name = f.replace('.tsx', '')
            caller_navs = get_caller_navigators(caller_screen_name)
            
            with open(path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
                for i, line in enumerate(lines):
                    # match navigation.navigate('ScreenName'...) or replace or push
                    matches = re.findall(r'navigation\.(?:navigate|replace|push)\s*\(\s*[\"\']([^\"\']+)[\"\']', line)
                    for target in matches:
                        # Rule 4:
                        # (a) Not a top-level stack name
                        if target in top_level_stacks:
                            continue
                        
                        # (b) Target not registered in the same navigator as caller
                        target_navs = screen_to_navigators.get(target, [])
                        shared_navs = set(caller_navs).intersection(set(target_navs))
                        if shared_navs:
                            continue
                        
                        # (c) Not registered in MainTabNavigator
                        if target in main_tab_registered:
                            continue
                        
                        # Also, maybe it's just 'goBack' or not a screen?
                        if target == 'goBack': continue
                        
                        flags.append(f"{path}:{i+1} -> {target}")

for flag in flags:
    print("FLAGGED:", flag)

if not flags:
    print("0 FLAGGED ISSUES FOUND!")
