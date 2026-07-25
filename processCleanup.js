const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Add Import if not exists
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
        if (!code.includes(`useTranslation('${ns}')`) && !code.includes(`useTranslation(["${ns}"])`)) {
            // Already might have useTranslation with different ns, we assume it's correctly mapped or we just do replacements
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

    if (jsonPath) {
        let existingJson = {};
        if (fs.existsSync(jsonPath)) {
            try { existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch(e){}
        }
        const finalJson = { ...existingJson, ...jsonContent };
        const dir = path.dirname(jsonPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(jsonPath, JSON.stringify(finalJson, null, 2));
    }
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/session/ActiveSessionScreen.tsx',
        ns: 'session.active',
        json: 'src/i18n/locales/en/session/active.json',
        replacements: {
            '>LIVE SESSION<': ['liveSession', 'LIVE SESSION'],
            '>SOS / EMERGENCY<': ['sosEmergency', 'SOS / EMERGENCY'],
            '>Etiquette Reminder<': ['etiquetteReminder', 'Etiquette Reminder'],
            '>Started: 7:00 PM<': ['mockStarted', 'Started: 7:00 PM'],
            '>Ends: 9:00 PM<': ['mockEnds', 'Ends: 9:00 PM'],
            '>View Full Profile<': ['viewFullProfile', 'View Full Profile'],
            '>View Booking Details<': ['viewBookingDetails', 'View Booking Details'],
            '>Extend Session<': ['extendSession', 'Extend Session'],
            '>Add more time<': ['addMoreTime', 'Add more time'],
            '>Pro-rata charges<': ['proRataCharges', 'Pro-rata charges'],
            '>How much longer would you like to extend this session?<': ['extendModalDesc', 'How much longer would you like to extend this session?'],
            '>+ 30 Mins<': ['plus30Mins', '+ 30 Mins'],
            '>+ 1 Hour<': ['plus1Hour', '+ 1 Hour'],
            '>End Session Early?<': ['endSessionEarly', 'End Session Early?'],
            '>Time completed<': ['timeCompleted', 'Time completed'],
            '>1 hr 15 mins<': ['mockTimeCompleted', '1 hr 15 mins'],
            '>Escrow to be released<': ['escrowReleased', 'Escrow to be released'],
            '>Refund to you<': ['refundToYou', 'Refund to you'],
            '>Confirm & End Session<': ['confirmEndSession', 'Confirm & End Session'],
            '>Keep Session Active<': ['keepSessionActive', 'Keep Session Active'],
            '>Booking Details<': ['bookingDetails', 'Booking Details'],
            '>Activity<': ['activityLabel', 'Activity'],
            '>Fine Dining & Drinks<': ['mockActivity', 'Fine Dining & Drinks'],
            '>Date & Time<': ['dateTimeLabel', 'Date & Time'],
            '>Today, 7:00 PM - 9:00 PM<': ['mockDateTime', 'Today, 7:00 PM - 9:00 PM'],
            '>Your Special Note<': ['specialNoteLabel', 'Your Special Note'],
            '>Back to Session<': ['backToSession', 'Back to Session'],
            ">[MOCK] Time's Up / Auto End<": ['mockTimesUp', "[MOCK] Time's Up / Auto End"]
        }
    },
    {
        file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
        ns: 'wallet.addPaymentMethod',
        json: 'src/i18n/locales/en/wallet/addPaymentMethod.json',
        replacements: {
            '>CARDHOLDER<': ['cardholderUpper', 'CARDHOLDER'],
            '>EXPIRY<': ['expiryUpper', 'EXPIRY'],
            '>Cardholder Name<': ['cardholderName', 'Cardholder Name'],
            '>Expiry<': ['expiry', 'Expiry'],
            '>Set as Default Card<': ['setDefault', 'Set as Default Card'],
            '>Use this card automatically for session bookings<': ['setDefaultSub', 'Use this card automatically for session bookings'],
            '>Card data is never stored on our servers. Information is tokenised by our PCI-DSS Level 1 payment partner.<': ['securityNote', 'Card data is never stored on our servers. Information is tokenised by our PCI-DSS Level 1 payment partner.'],
            '>Save Card Securely<': ['saveCard', 'Save Card Securely']
        }
    },
    {
        file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
        ns: 'wallet.paymentMethods',
        json: 'src/i18n/locales/en/wallet/paymentMethods.json',
        replacements: {
            '>Secure & Encrypted<': ['secureTitle', 'Secure & Encrypted'],
            ">We don't store your full card details. All transactions are PCI-DSS compliant.<": ['secureDesc', "We don't store your full card details. All transactions are PCI-DSS compliant."]
        }
    },
    {
        file: 'src/screens/safety/SafetyHubScreen.tsx',
        ns: 'safety.hub',
        json: 'src/i18n/locales/en/safety/hub.json',
        replacements: {
            '>Safety Guidelines<': ['safetyGuidelines', 'Safety Guidelines']
        }
    },
    {
        file: 'src/screens/safety/TrustedContactsScreen.tsx',
        ns: 'onboarding',
        json: null, // Don't write to json, it uses onboarding namespace and likely fallback is fine for now
        replacements: {
            '>Emergency Contacts<': ['contacts.headerTitle', 'Emergency Contacts']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
