const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Add Import
    if (!code.includes("useTranslation")) {
        code = code.replace(
            "import { useNavigation",
            "import { useTranslation } from 'react-i18next';\nimport { useNavigation"
        );
        if (!code.includes("useTranslation")) {
            code = code.replace(
                "import React",
                "import { useTranslation } from 'react-i18next';\nimport React"
            );
        }
    }

    // Add Hook
    const componentMatch = code.match(/export const (\w+) =/);
    if (componentMatch) {
        const compName = componentMatch[1];
        if (!code.includes(`const { t } = useTranslation('${ns}');`)) {
            code = code.replace(
                new RegExp(`export const ${compName} = \\([^)]*\\) => \\{`),
                `$& \n  const { t } = useTranslation('${ns}');`
            );
        }
    }

    // Replacements
    let jsonContent = {};
    for (const [search, [key, fallback, replacementStr]] of Object.entries(replacements)) {
        if (replacementStr) {
            code = code.split(search).join(replacementStr);
            if (key) jsonContent[key] = fallback;
        } else {
            code = code.split(search).join(`>{t('${key}', '${fallback.replace(/'/g, "\\'")}')}<`);
            jsonContent[key] = fallback;
        }
    }

    // Save json
    let existingJson = {};
    if (fs.existsSync(jsonPath)) {
        try { existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch(e){}
    }
    const finalJson = { ...existingJson, ...jsonContent };
    
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(jsonPath, JSON.stringify(finalJson, null, 2));

    fs.writeFileSync(filePath, code);
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/profile/EditProfileScreen.tsx',
        ns: 'profile.edit',
        json: 'src/i18n/locales/en/profile/edit.json',
        replacements: {
            '>Gender<': ['gender', 'Gender'],
            '>Age<': ['age', 'Age'],
            '>These details are locked for safety after KYC verification. Contact support to change.<': ['lockedNotice', 'These details are locked for safety after KYC verification. Contact support to change.']
        }
    },
    {
        file: 'src/screens/profile/MyReviewsScreen.tsx',
        ns: 'profile.reviews',
        json: 'src/i18n/locales/en/profile/reviews.json',
        replacements: {
            '>My Trust Profile<': ['headerTitle', 'My Trust Profile'],
            '>OVERALL TRUST SCORE<': ['overallScore', 'OVERALL TRUST SCORE'],
            '>A high trust score makes it 3x more likely for your booking requests to be accepted!<': ['trustBanner', 'A high trust score makes it 3x more likely for your booking requests to be accepted!'],
            '>RECENT REVIEWS<': ['recentReviews', 'RECENT REVIEWS'],
            '>No reviews yet<': ['emptyTitle', 'No reviews yet'],
            '>Book a meetup with a companion. After your session, their review will appear here.<': ['emptySub', 'Book a meetup with a companion. After your session, their review will appear here.']
        }
    },
    {
        file: 'src/screens/profile/ProfileScreen.tsx',
        ns: 'profile.main',
        json: 'src/i18n/locales/en/profile/main.json',
        replacements: {
            '>Active Session Ongoing<': ['activeSessionTitle', 'Active Session Ongoing'],
            '>Tap to return to your live meetup.<': ['activeSessionSub', 'Tap to return to your live meetup.'],
            '>Identity Verified<': ['kycVerified', 'Identity Verified'],
            '>Trust Score<': ['trustScoreTitle', 'Trust Score'],
            '>Session Completion<': ['sessionCompletion', 'Session Completion'],
            '>Safety Rating<': ['safetyRating', 'Safety Rating'],
            '>Identity & Contact<': ['identityContactTitle', 'Identity & Contact'],
            '>Profile Completeness<': ['profileCompleteness', 'Profile Completeness'],
            '>Phone Number<': ['phoneNumber', 'Phone Number'],
            '>Government ID<': ['govId', 'Government ID'],
            '>Live Selfie<': ['liveSelfie', 'Live Selfie'],
            '>Wallet & Activity<': ['walletActivityTitle', 'Wallet & Activity'],
            '>Safety Settings<': ['safetySettingsTitle', 'Safety Settings'],
            '>Open Safety Hub<': ['openSafetyHub', 'Open Safety Hub'],
            '>Preferences & Legal<': ['prefsLegalTitle', 'Preferences & Legal']
        }
    },
    {
        file: 'src/screens/profile/SavedProfilesScreen.tsx',
        ns: 'profile.saved',
        json: 'src/i18n/locales/en/profile/saved.json',
        replacements: {
            '>No Saved Checklists<': ['emptyTitle', 'No Saved Checklists'],
            '>When you find a companion you like, tap the bookmark icon to save their profile here.<': ['emptySub', 'When you find a companion you like, tap the bookmark icon to save their profile here.'],
            '>Explore Companions<': ['exploreBtn', 'Explore Companions'],
            '>Saved Checklists<': ['headerTitle', 'Saved Checklists'],
            '>View Full Profile<': ['viewProfile', 'View Full Profile'],
            '>Remove from Saved<': ['removeSaved', 'Remove from Saved']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
