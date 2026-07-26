import os
import re

files_to_check = [
    'src/components/onboarding/OnboardingHeader.tsx',
    'src/components/ui/AppBottomSheet.tsx',
    'src/components/ui/Button.tsx',
    'src/components/ui/GlassCard.tsx',
    'src/components/ui/Input.tsx',
    'src/components/ui/OTPInput.tsx',
    'src/components/ui/SmartHeader.tsx'
]

for filepath in files_to_check:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        matches = re.findall(r'accessibilityLabel=([^\s>]+|"[^"]+"|\{[^\}]+\})', content)
        print(f'\n--- {filepath} ---')
        for m in matches:
            print(f'  {m}')
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
