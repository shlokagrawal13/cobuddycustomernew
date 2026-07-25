import json
import sys

def update_file(path, new_keys):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print('Error reading', path, e)
        return
    data.update(new_keys)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

updates = [
    ('src/i18n/locales/en/profile/main.json', {"langEnglish": "English", "langHindi": "Hindi", "logoutTitle": "Log Out", "logoutMessage": "Are you sure you want to log out of CoBuddy?", "logoutCancel": "Cancel", "logoutConfirm": "Log Out", "loggedOutTitle": "Logged Out", "loggedOutMessage": "Successfully logged out.", "shareProfileTitle": "Share Profile", "comingSoonMessage": "Coming soon!"}),
    ('src/i18n/locales/en/profile/edit.json', {"title": "Edit Profile","saveBtn": "Save","changePhoto": "Tap to change photo","basicInfo": "BASIC INFO","displayName": "Display Name","shortBio": "Short Bio","currentCity": "Current City","languagesSpoken": "LANGUAGES SPOKEN","lockedDemographics": "LOCKED DEMOGRAPHICS","kycVerified": "KYC Verified","interestsActivities": "INTERESTS & ACTIVITIES", "errorTitle": "Error", "errorEmptyName": "Display name cannot be empty.", "successTitle": "Success", "successProfileUpdate": "Profile updated successfully!", "ok": "OK"}),
    ('src/i18n/locales/en/home/dashboard.json', {"exploreActivities": "Explore Activities", "featuredCompanions": "Featured Companions", "viewAll": "View All", "appName": "CoBuddy"}),
    ('src/i18n/locales/en/home/discover.json', {"title": "Discover", "noCompanions": "No companions found", "clearFilters": "Clear Filters", "filtersTitle": "Filters", "filterActivityType": "Activity Type", "filterGender": "Gender", "filterMaxHourlyRate": "Maximum Hourly Rate", "filterMinRating": "Minimum Rating", "filterMaxDistance": "Maximum Distance", "clearAll": "Clear All", "applyFilters": "Apply Filters"}),
    ('src/i18n/locales/en/home/companionProfile.json', {"statSessions": "Sessions", "statResponse": "Response", "servicesPricing": "Services & Pricing", "availabilityRules": "Availability & Rules", "trustVerifications": "Trust & Verifications", "reviewSeeAll": "See All", "punctuality": "Punctuality", "communication": "Communication", "behavior": "Behavior", "shareProfile": "Share Profile"}),
    ('src/i18n/locales/en/onboarding/profile.json', {"dobLabel": "Date of Birth", "uploadPhoto": "Upload Photo", "uploadPhotoDesc": "Choose from your photo library", "takeSelfie": "Take Selfie", "takeSelfieDesc": "Use your front camera", "skipForNow": "Skip For Now"}),
    ('src/i18n/locales/en/onboarding/safety.json', {"verifiedVenue": "VERIFIED VENUE"}),
    ('src/i18n/locales/en/bookings/cancel.json', {"reasonChange": "Change of plans / Schedule conflict", "reasonAnother": "Found another companion", "reasonMistake": "Booked by mistake", "reasonEmergency": "Personal emergency", "reasonOther": "Other"}),
]

for path, keys in updates:
    update_file(path, keys)
    print('Updated', path)
