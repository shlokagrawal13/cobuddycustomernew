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

    fs.writeFileSync(filePath, code);

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
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/session/ActiveSessionScreen.tsx',
        ns: 'session.active',
        json: 'src/i18n/locales/en/session/active.json',
        replacements: {
            '>Active Meetup<': ['headerTitle', 'Active Meetup'],
            '>Time Remaining<': ['timeRemainingLabel', 'Time Remaining'],
            '>{COMPANION_NAME}<': ['companionName', '{{name}}', ">{t('companionName', '{{name}}', { name: COMPANION_NAME })}<"],
            '>SOS<': ['sos', 'SOS'],
            '>Extend Time<': ['extendTime', 'Extend Time'],
            '>End Early<': ['endEarly', 'End Early'],
            '>Simulate Session End<': ['devEnd', 'Simulate Session End']
        }
    },
    {
        file: 'src/screens/session/ArrivalCheckInScreen.tsx',
        ns: 'session.arrival',
        json: 'src/i18n/locales/en/session/arrival.json',
        replacements: {
            '>Meetup Day<': ['headerTitle', 'Meetup Day'],
            "Meeting at <Text": ["venuePrefix", "Meeting at ", "{t('venuePrefix', 'Meeting at ')}<Text"],
            "Starbucks, Connaught Place</Text></Text>": ["venueName", "Starbucks, Connaught Place", "{t('venueName', 'Starbucks, Connaught Place')}</Text></Text>"],
            '>GPS Tracking Active<': ['gpsActive', 'GPS Tracking Active'],
            '>Are you at the venue?<': ['otpTitle1', 'Are you at the venue?'],
            '>Please confirm you have physically arrived at the meeting location to unlock your Escrow OTP.<': ['otpDesc1', 'Please confirm you have physically arrived at the meeting location to unlock your Escrow OTP.'],
            ">I'm at the Venue (Check-In)<": ['checkInBtn', "I'm at the Venue (Check-In)"],
            '>Escrow Unlock OTP<': ['otpTitle2', 'Escrow Unlock OTP'],
            "Share this 4-digit code with <Text": ["otpSharePrefix", "Share this 4-digit code with ", "{t('otpSharePrefix', 'Share this 4-digit code with ')}<Text"],
            " to start the session.</Text>": ["otpShareSuffix", " to start the session.", "{t('otpShareSuffix', ' to start the session.')}</Text>"],
            ">Can't find your companion?<": ['commTitle', "Can't find your companion?"],
            '>Call Securely<': ['commCall', 'Call Securely'],
            '>Message<': ['commMessage', 'Message'],
            ">Companion didn't show up or looks different? Report Issue<": ['reportText', "Companion didn't show up or looks different? Report Issue"],
            '>[MOCK] Companion entered OTP<': ['mockOtp', '[MOCK] Companion entered OTP']
        }
    },
    {
        file: 'src/screens/session/CompanionReviewScreen.tsx',
        ns: 'session.companionReview',
        json: 'src/i18n/locales/en/session/companionReview.json',
        replacements: {
            '>Leave a Review<': ['headerTitle', 'Leave a Review'],
            '>Rate your time with {COMPANION_NAME}<': ['questionRate', 'Rate your time with {{name}}', ">{t('questionRate', 'Rate your time with {{name}}', { name: COMPANION_NAME })}<"],
            '>Public Review<': ['inputPublicTitle', 'Public Review'],
            ">This will appear on {COMPANION_NAME}'s profile.<": ['inputPublicDesc', "This will appear on {{name}}'s profile.", ">{t('inputPublicDesc', \"This will appear on {{name}}'s profile.\", { name: COMPANION_NAME })}<"],
            '>Private Feedback (Optional)<': ['inputPrivateTitle', 'Private Feedback (Optional)'],
            '>Share anything with the CoBuddy Safety Team. The companion will NOT see this.<': ['inputPrivateDesc', 'Share anything with the CoBuddy Safety Team. The companion will NOT see this.'],
            '>Submit & Finish<': ['submitBtn', 'Submit & Finish']
        }
    },
    {
        file: 'src/screens/session/PostSessionFeedbackScreen.tsx',
        ns: 'session.postFeedback',
        json: 'src/i18n/locales/en/session/postFeedback.json',
        replacements: {
            '>Quick Feedback<': ['headerTitle', 'Quick Feedback'],
            '>Skip<': ['skipBtn', 'Skip'],
            '>How was your session with Elena?<': ['questionRate', 'How was your session with Elena?'],
            '>What stood out?<': ['tagsTitle', 'What stood out?'],
            '>Continue<': ['continueBtn', 'Continue']
        }
    },
    {
        file: 'src/screens/session/SessionCompleteScreen.tsx',
        ns: 'session.complete',
        json: 'src/i18n/locales/en/session/complete.json',
        replacements: {
            '>Session Complete!<': ['title', 'Session Complete!'],
            '>We hope you had a fantastic time with Elena.<': ['subtitle', 'We hope you had a fantastic time with Elena.'],
            '>FINAL RECEIPT<': ['cardTitle', 'FINAL RECEIPT'],
            '>Base Session (2 Hrs)<': ['labelBase', 'Base Session (2 Hrs)'],
            '>Platform Fee (5%)<': ['labelPlatform', 'Platform Fee (5%)'],
            '>Taxes (18% GST)<': ['labelTaxes', 'Taxes (18% GST)'],
            '>Escrow Released<': ['labelEscrow', 'Escrow Released'],
            '>Continue to Feedback<': ['primaryBtnText', 'Continue to Feedback']
        }
    },
    {
        file: 'src/screens/session/SessionReminderScreen.tsx',
        ns: 'session.reminder',
        json: 'src/i18n/locales/en/session/reminder.json',
        replacements: {
            '>Meetup Reminder<': ['headerTitle', 'Meetup Reminder'],
            "Your session with ": ["alertPrefix", "Your session with ", "{t('alertPrefix', 'Your session with ')}"],
            " starts in <Text": ["alertMid", " starts in ", "{t('alertMid', ' starts in ')}<Text"],
            ">2 hours<": ["alertHours", "2 hours", ">{t('alertHours', '2 hours')}<"],
            ".</Text>": ["alertSuffix", ".", "{t('alertSuffix', '.')}</Text>"],
            '>Meetup Details<': ['cardTitle', 'Meetup Details'],
            '>Map View Placeholder<': ['mapPlaceholder', 'Map View Placeholder'],
            '>Get Directions<': ['getDirections', 'Get Directions'],
            '>Safety Checklist<': ['safetyTitle', 'Safety Checklist'],
            '>Only confirm arrival when you are physically at the venue.<': ['bottomHint', 'Only confirm arrival when you are physically at the venue.'],
            '>Simulate Arrival at Venue<': ['primaryBtnText', 'Simulate Arrival at Venue']
        }
    },
    {
        file: 'src/screens/session/TipGratuityScreen.tsx',
        ns: 'session.tip',
        json: 'src/i18n/locales/en/session/tip.json',
        replacements: {
            '>Add a Tip<': ['headerTitle', 'Add a Tip'],
            '>Skip<': ['skipBtn', 'Skip'],
            '>Show your appreciation<': ['title', 'Show your appreciation'],
            '>Did Elena go above and beyond? A small tip can make their day.<': ['subtitle', 'Did Elena go above and beyond? A small tip can make their day.'],
            '>Custom<': ['customTip', 'Custom'],
            '>100% of your tip goes directly to the companion. CoBuddy takes zero commission.<': ['trustText', '100% of your tip goes directly to the companion. CoBuddy takes zero commission.']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
