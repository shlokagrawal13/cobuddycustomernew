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
        } else {
            code = code.split(search).join(`>{t('${key}', '${fallback.replace(/'/g, "\\'")}')}<`);
        }
        jsonContent[key] = fallback;
    }

    fs.writeFileSync(filePath, code);

    // Save json
    let existingJson = {};
    if (fs.existsSync(jsonPath)) {
        try { existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch(e){}
    }
    const finalJson = { ...existingJson, ...jsonContent };
    
    // Ensure dir exists
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(jsonPath, JSON.stringify(finalJson, null, 2));
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/booking/BookingActivitySelectScreen.tsx',
        ns: 'booking.activitySelect',
        json: 'src/i18n/locales/en/booking/activitySelect.json',
        replacements: {
            '>Step 1 of 4<': ['headerTitle', 'Step 1 of 4'],
            '>What would you like to do?<': ['title', 'What would you like to do?'],
            '>Select an activity for your booking request.<': ['subtitle', 'Select an activity for your booking request.']
        }
    },
    {
        file: 'src/screens/booking/BookingSummaryScreen.tsx',
        ns: 'booking.summary',
        json: 'src/i18n/locales/en/booking/summary.json',
        replacements: {
            '>Step 4 of 4<': ['headerTitle', 'Step 4 of 4'],
            '>Review your Request<': ['title', 'Review your Request'],
            '>Please confirm the details below before sending your request.<': ['subtitle', 'Please confirm the details below before sending your request.'],
            '>Activity<': ['summaryLabelActivity', 'Activity'],
            ">{activity?.title || 'Coffee Meetup'}<": ['defaultActivity', 'Coffee Meetup', ">{activity?.title || t('defaultActivity', 'Coffee Meetup')}<"],
            ">{activity?.price || '₹500/hr'}<": ['defaultPrice', '₹500/hr', ">{activity?.price || t('defaultPrice', '₹500/hr')}<"],
            '>Venue<': ['summaryLabelVenue', 'Venue'],
            ">{venue?.name || 'Custom Venue'}<": ['defaultVenue', 'Custom Venue', ">{venue?.name || t('defaultVenue', 'Custom Venue')}<"],
            '>Date & Time<': ['summaryLabelDate', 'Date & Time'],
            ">{time} ({duration} {duration === 1 ? 'hour' : 'hours'})<": ['durationText', '{{time}} ({{duration}} {{hourText}})', ">{t('durationText', '{{time}} ({{duration}} {{hourText}})', { time, duration, hourText: duration === 1 ? 'hour' : 'hours' })}<"],
            '>Special Instructions<': ['specialInstructions', 'Special Instructions'],
            '>Payment Summary<': ['paymentSummary', 'Payment Summary'],
            ">Base Fare (₹{baseRate} x {duration} hr)<": ['baseFare', 'Base Fare (₹{{baseRate}} x {{duration}} hr)', ">{t('baseFare', 'Base Fare (₹{{baseRate}} x {{duration}} hr)', { baseRate, duration })}<"],
            '>Safety & Service Fee<': ['serviceFee', 'Safety & Service Fee'],
            '>Estimated Total<': ['estimatedTotal', 'Estimated Total'],
            '>Payment is processed only after the companion accepts.<': ['totalDisclaimer', 'Payment is processed only after the companion accepts.'],
            '>[Dev] Simulate KYC Status<': ['devTitle', '[Dev] Simulate KYC Status'],
            '>KYC Verified?<': ['devText', 'KYC Verified?'],
            '>Send Request<': ['nextBtnText', 'Send Request']
        }
    },
    {
        file: 'src/screens/booking/BookingTimeSelectScreen.tsx',
        ns: 'booking.timeSelect',
        json: 'src/i18n/locales/en/booking/timeSelect.json',
        replacements: {
            '>Step 3 of 4<': ['headerTitle', 'Step 3 of 4'],
            '>When do you want to meet?<': ['title', 'When do you want to meet?'],
            '>Select a date and time for your booking.<': ['subtitle', 'Select a date and time for your booking.'],
            '>Select Date<': ['sectionTitleDate', 'Select Date'],
            '>Select Time<': ['sectionTitleTime', 'Select Time'],
            '>Duration<': ['sectionTitleDuration', 'Duration']
        }
    },
    {
        file: 'src/screens/booking/BookingVenueSelectScreen.tsx',
        ns: 'booking.venueSelect',
        json: 'src/i18n/locales/en/booking/venueSelect.json',
        replacements: {
            '>Step 2 of 4<': ['headerTitle', 'Step 2 of 4'],
            '>Where do you want to meet?<': ['title', 'Where do you want to meet?'],
            ">Select a safe public venue for {activity?.title || 'this session'}.<": ['subtitle', 'Select a safe public venue for {{activity}}.', ">{t('subtitle', 'Select a safe public venue for {{activity}}.', { activity: activity?.title || 'this session' })}<"],
            '>Curated Safe Venues<': ['sectionTitle', 'Curated Safe Venues']
        }
    },
    {
        file: 'src/screens/booking/LocationSelectionScreen.tsx',
        ns: 'booking.locationSelection',
        json: 'src/i18n/locales/en/booking/locationSelection.json',
        replacements: {
            '>Select Location<': ['headerTitle', 'Select Location'],
            '>Use Current Location<': ['gpsTitle', 'Use Current Location'],
            '>Enable GPS for accurate meetups<': ['gpsSub', 'Enable GPS for accurate meetups'],
            '>RECENT & SAVED<': ['sectionTitle', 'RECENT & SAVED'],
            '>Tap to select this location<': ['tapToSelect', 'Tap to select this location']
        }
    },
    {
        file: 'src/screens/booking/alerts/BookingAcceptedScreen.tsx',
        ns: 'booking.accepted',
        json: 'src/i18n/locales/en/booking/accepted.json',
        replacements: {
            '>Booking Confirmed!<': ['title', 'Booking Confirmed!'],
            "Get ready! <Text": ["acceptedMsg1", "Get ready! ", "{t('acceptedMsg1', 'Get ready! ')}<Text"],
            " has accepted your request. Your payment is securely held in escrow.": ["acceptedMsg2", " has accepted your request. Your payment is securely held in escrow.", "{t('acceptedMsg2', ' has accepted your request. Your payment is securely held in escrow.')}"],
            '>CONFIRMED ITINERARY<': ['cardHeader', 'CONFIRMED ITINERARY'],
            '>Activity<': ['detailLabelActivity', 'Activity'],
            '>Date & Time<': ['detailLabelDate', 'Date & Time'],
            '>Venue<': ['detailLabelVenue', 'Venue'],
            '>Total Secured<': ['detailLabelTotal', 'Total Secured'],
            '>Protected by Escrow<': ['escrowNote', 'Protected by Escrow'],
            '>Message {bookingData.companionName}<': ['messageCompanion', 'Message {{name}}', ">{t('messageCompanion', 'Message {{name}}', { name: bookingData.companionName })}<"],
            '>View Booking Details<': ['secondaryBtnText', 'View Booking Details']
        }
    },
    {
        file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
        ns: 'booking.counterOffer',
        json: 'src/i18n/locales/en/booking/counterOffer.json',
        replacements: {
            '>Counter Offer<': ['headerTitle', 'Counter Offer'],
            '>Action Required<': ['title', 'Action Required'],
            " proposed an adjustment to your {bookingData.activity} booking.": ["proposedAdjustment", " proposed an adjustment to your {{activity}} booking.", " {t('proposedAdjustment', ' proposed an adjustment to your {{activity}} booking.', { activity: bookingData.activity })}"],
            '>Message from Companion<': ['messageTitle', 'Message from Companion'],
            '>"{bookingData.message}"<': ['messageText', '"{msg}"', ">{t('messageText', '\"{{msg}}\"', { msg: bookingData.message })}<"],
            '>PROPOSED CHANGES<': ['sectionTitle', 'PROPOSED CHANGES'],
            '>Date<': ['detailLabelDate', 'Date'],
            '>Venue<': ['detailLabelVenue', 'Venue'],
            '>Time<': ['changeLabelTime', 'Time'],
            '>Rate<': ['changeLabelRate', 'Rate'],
            '>If accepted, your Escrow hold will be updated securely.<': ['escrowNoteText', 'If accepted, your Escrow hold will be updated securely.'],
            '>Accept New Offer<': ['primaryBtnText', 'Accept New Offer'],
            '>Message Back<': ['secondaryBtnText', 'Message Back'],
            '>Decline Booking<': ['ghostBtnText', 'Decline Booking']
        }
    },
    {
        file: 'src/screens/booking/alerts/BookingDeclinedScreen.tsx',
        ns: 'booking.declined',
        json: 'src/i18n/locales/en/booking/declined.json',
        replacements: {
            '>Booking Declined<': ['title', 'Booking Declined'],
            '>Reason given:<': ['reasonLabel', 'Reason given:'],
            '>"{bookingData.reason}"<': ['reasonText', '"{reason}"', ">{t('reasonText', '\"{{reason}}\"', { reason: bookingData.reason })}<"],
            '>Any pre-authorized holds on your payment method have been released instantly.<': ['noteText', 'Any pre-authorized holds on your payment method have been released instantly.'],
            '>Find Another Companion<': ['primaryBtnText', 'Find Another Companion'],
            '>Return to Home<': ['secondaryBtnText', 'Return to Home']
        }
    },
    {
        file: 'src/screens/booking/alerts/BookingRequestSentScreen.tsx',
        ns: 'booking.requestSent',
        json: 'src/i18n/locales/en/booking/requestSent.json',
        replacements: {
            '>Request Sent!<': ['title', 'Request Sent!'],
            '>REQUEST SNAPSHOT<': ['cardHeader', 'REQUEST SNAPSHOT'],
            '>Escrow Amount Held<': ['detailLabel', 'Escrow Amount Held'],
            '>View Request Details<': ['primaryBtnText', 'View Request Details'],
            '>Return to Home<': ['secondaryBtnText', 'Return to Home']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
