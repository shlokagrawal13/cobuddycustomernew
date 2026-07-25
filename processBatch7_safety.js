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
        file: 'src/screens/safety/IncidentReportScreen.tsx',
        ns: 'safety.report',
        json: 'src/i18n/locales/en/safety/report.json',
        replacements: {
            '>Report Incident<': ['headerTitle', 'Report Incident'],
            '>WHAT HAPPENED?<': ['whatHappened', 'WHAT HAPPENED?'],
            '>BOOKING REFERENCE OR USERNAME (OPTIONAL)<': ['refLabel', 'BOOKING REFERENCE OR USERNAME (OPTIONAL)'],
            '>INCIDENT DETAILS (REQUIRED)<': ['detailsLabel', 'INCIDENT DETAILS (REQUIRED)'],
            '>EVIDENCE (OPTIONAL)<': ['evidenceLabel', 'EVIDENCE (OPTIONAL)'],
            '>Max file size: 10MB<': ['maxFile', 'Max file size: 10MB'],
            '>Submit Confidential Report<': ['submitBtn', 'Submit Confidential Report']
        }
    },
    {
        file: 'src/screens/safety/SafetyGuidelinesScreen.tsx',
        ns: 'safety.guidelines',
        json: 'src/i18n/locales/en/safety/guidelines.json',
        replacements: {
            '>Safety Guidelines<': ['headerTitle', 'Safety Guidelines'],
            '>Your Safety is our Priority<': ['heroTitle', 'Your Safety is our Priority'],
            '>Contact Trust & Safety Team<': ['contactBtn', 'Contact Trust & Safety Team']
        }
    },
    {
        file: 'src/screens/safety/SafetyHubScreen.tsx',
        ns: 'safety.hub',
        json: 'src/i18n/locales/en/safety/hub.json',
        replacements: {
            '>Safety Hub<': ['headerTitle', 'Safety Hub'],
            '>Live Protection Active<': ['statusText', 'Live Protection Active'],
            '>SOS<': ['sosBtn', 'SOS'],
            '>Press and hold in an emergency<': ['sosSub', 'Press and hold in an emergency'],
            '>QUICK ACTIONS<': ['quickActions', 'QUICK ACTIONS'],
            '>Trusted Contacts<': ['trustedContacts', 'Trusted Contacts'],
            '>Manage who receives your live location and emergency alerts.<': ['trustedContactsSub', 'Manage who receives your live location and emergency alerts.'],
            '>Report an Incident<': ['reportIncident', 'Report an Incident'],
            '>Report inappropriate behavior, fake profiles, or no-shows.<': ['reportIncidentSub', 'Report inappropriate behavior, fake profiles, or no-shows.'],
            '>RESOURCES<': ['resources', 'RESOURCES'],
            '>24/7 Safety Support<': ['support247', '24/7 Safety Support']
        }
    },
    {
        file: 'src/screens/safety/SafetySettingsScreen.tsx',
        ns: 'safety.settings',
        json: 'src/i18n/locales/en/safety/settings.json',
        replacements: {
            '>Safety Center<': ['headerTitle', 'Safety Center'],
            '>Your Safety First<': ['heroTitle', 'Your Safety First'],
            '>PROFILE VISIBILITY<': ['profileVisibility', 'PROFILE VISIBILITY'],
            '>Incognito Mode<': ['incognitoMode', 'Incognito Mode'],
            '>Hide your profile from Discover. Only people you message can see you.<': ['incognitoModeSub', 'Hide your profile from Discover. Only people you message can see you.'],
            '>INTERACTIONS & CHAT<': ['interactionsChat', 'INTERACTIONS & CHAT'],
            '>Safe Chat Filter<': ['safeChat', 'Safe Chat Filter'],
            '>Automatically blur explicit images and flag offensive words in messages.<': ['safeChatSub', 'Automatically blur explicit images and flag offensive words in messages.'],
            '>Verified Users Only<': ['verifiedUsers', 'Verified Users Only'],
            '>Only allow users with KYC verified profiles to send you booking requests.<': ['verifiedUsersSub', 'Only allow users with KYC verified profiles to send you booking requests.'],
            '>EMERGENCY FEATURES<': ['emergencyFeatures', 'EMERGENCY FEATURES'],
            '>Emergency Contacts (SOS)<': ['emergencyContacts', 'Emergency Contacts (SOS)'],
            ">Add up to 3 trusted contacts. We'll share your live location with them if you trigger an SOS.<": ['emergencyContactsSub', "Add up to 3 trusted contacts. We'll share your live location with them if you trigger an SOS."],
            '>LIVE SAFETY MONITORING<': ['liveSafety', 'LIVE SAFETY MONITORING'],
            '>Trusted Contact Sharing<': ['contactSharing', 'Trusted Contact Sharing'],
            '>Automatically share your active session details and live location with your trusted contacts.<': ['contactSharingSub', 'Automatically share your active session details and live location with your trusted contacts.'],
            '>Live Safety Monitoring<': ['liveMonitoring', 'Live Safety Monitoring'],
            '>Enable active tracking and anomaly detection during your meetup sessions.<': ['liveMonitoringSub', 'Enable active tracking and anomaly detection during your meetup sessions.'],
            '>Open Safety Hub<': ['openSafetyHub', 'Open Safety Hub']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
