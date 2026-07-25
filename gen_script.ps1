import os
import json
import re

def set_nested_value(d, key_str, value):
    keys = key_str.split('.')
    for k in keys[:-1]:
        if k not in d:
            d[k] = {}
        elif not isinstance(d[k], dict):
            # should not happen but just in case
            d[k] = {}
        d = d[k]
    
    # only set if not present to avoid overwriting existing real translations
    if keys[-1] not in d:
        d[keys[-1]] = value

# Mapping from TSX file -> (JSON file, namespace base prefix to strip if needed)
# The user's prompt gave the exact JSON file for each.
# For example: LocationPermissionScreen uses useTranslation(['onboarding']) and 	('location.title')
# But the JSON file is onboarding/location.json. So the keys in the JSON file shouldn't have location. prefix?
# Wait! If index.ts maps location: onboardingLocation, then onboardingLocation JSON doesn't need location. prefix!
# Let's check onboarding/location.json
