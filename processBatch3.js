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
            if (key) jsonContent[key] = fallback; // Some may not output a single key if we handle complex logic
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
        file: 'src/screens/bookings/BookingsListScreen.tsx',
        ns: 'bookings.list',
        json: 'src/i18n/locales/en/bookings/list.json',
        replacements: {
            '>My Bookings<': ['headerTitle', 'My Bookings'],
            '>Manage your upcoming and past meetups.<': ['headerSubtitle', 'Manage your upcoming and past meetups.'],
            '>No {activeTab} bookings<': ['emptyTitle', 'No {{tab}} bookings', ">{t('emptyTitle', 'No {{tab}} bookings', { tab: activeTab })}<"],
            ">You don't have any experiences scheduled in this section right now.<": ['emptyDesc', "You don't have any experiences scheduled in this section right now."],
            '>Discover Companions<': ['primaryBtnText', 'Discover Companions'],
            '>Date<': ['gridLabelDate', 'Date'],
            '>Time ({booking.duration})<': ['gridLabelTime', 'Time ({{duration}})', ">{t('gridLabelTime', 'Time ({{duration}})', { duration: booking.duration })}<"]
        }
    },
    {
        file: 'src/screens/bookings/BookingDetailScreen.tsx',
        ns: 'bookings.detail',
        json: 'src/i18n/locales/en/bookings/detail.json',
        replacements: {
            '>Booking ID: {data.id}<': ['headerTitle', 'Booking ID: {{id}}', ">{t('headerTitle', 'Booking ID: {{id}}', { id: data.id })}<"],
            '>Booking Declined<': ['statusDeclined', 'Booking Declined'],
            '>"{data.declineReason}"<': ['declineReason', '"{reason}"', ">{t('declineReason', '\"{{reason}}\"', { reason: data.declineReason })}<"],
            '>Cancel Request<': ['cancelRequest', 'Cancel Request'],
            '>Modify<': ['modify', 'Modify'],
            '>View Upcoming Meetup<': ['viewUpcoming', 'View Upcoming Meetup'],
            '>Message<': ['message', 'Message'],
            '>Cancel<': ['cancel', 'Cancel'],
            '>Find Another Companion<': ['findAnother', 'Find Another Companion'],
            '>Leave a Review<': ['leaveReview', 'Leave a Review'],
            '>Raise a Dispute<': ['raiseDispute', 'Raise a Dispute'],
            '>SOS<': ['sos', 'SOS'],
            '>STATUS TIMELINE<': ['statusTimeline', 'STATUS TIMELINE'],
            '>({data.companionReviews} reviews)<': ['reviewCount', '({{count}} reviews)', ">{t('reviewCount', '({{count}} reviews)', { count: data.companionReviews })}<"],
            '>Profile<': ['viewProfile', 'Profile'],
            '>EXPERIENCE DETAILS<': ['experienceDetails', 'EXPERIENCE DETAILS'],
            '>Activity Type<': ['activityType', 'Activity Type'],
            '>Date & Time ({data.duration})<': ['dateTimeDuration', 'Date & Time ({{duration}})', ">{t('dateTimeDuration', 'Date & Time ({{duration}})', { duration: data.duration })}<"],
            '>Meeting Venue<': ['meetingVenue', 'Meeting Venue'],
            '>Special Requests / Notes<': ['specialRequests', 'Special Requests / Notes'],
            '>PAYMENT SUMMARY<': ['paymentSummary', 'PAYMENT SUMMARY'],
            '>Refunded<': ['refunded', 'Refunded'],
            '>Protected by Escrow<': ['protectedByEscrow', 'Protected by Escrow'],
            '>Session Rate ({data.duration})<': ['sessionRate', 'Session Rate ({{duration}})', ">{t('sessionRate', 'Session Rate ({{duration}})', { duration: data.duration })}<"],
            '>Platform Fee<': ['platformFee', 'Platform Fee'],
            '>Taxes & Surcharges<': ['taxes', 'Taxes & Surcharges'],
            ">{data.status === 'Declined' ? 'Total Released' : 'Total Secured'}<": ['totalReleasedSecured', 'ignored', ">{data.status === 'Declined' ? t('totalReleased', 'Total Released') : t('totalSecured', 'Total Secured')}<"],
            '>Meetup Safety Guidelines<': ['safetyTitle', 'Meetup Safety Guidelines'],
            '>Always meet in public spaces. Never share your exact home address. Use the SOS button in case of emergency.<': ['safetyDesc', 'Always meet in public spaces. Never share your exact home address. Use the SOS button in case of emergency.']
        }
    },
    {
        file: 'src/screens/bookings/CancelBookingScreen.tsx',
        ns: 'bookings.cancel',
        json: 'src/i18n/locales/en/bookings/cancel.json',
        replacements: {
            '>Cancel Booking<': ['headerTitle', 'Cancel Booking'],
            '>Cancelling Booking: {bookingId}<': ['summaryTitle', 'Cancelling Booking: {{id}}', ">{t('summaryTitle', 'Cancelling Booking: {{id}}', { id: bookingId })}<"],
            '>Cancellation Policy<': ['warningTitle', 'Cancellation Policy'],
            '>Since you are cancelling more than 48 hours in advance, you will receive a <': ['warningDesc1', 'Since you are cancelling more than 48 hours in advance, you will receive a '],
            '>100% full refund<': ['warningDesc2', '100% full refund'],
            '>. The escrow hold will be released immediately.<': ['warningDesc3', '. The escrow hold will be released immediately.'],
            '>WHY ARE YOU CANCELLING?<': ['sectionTitle', 'WHY ARE YOU CANCELLING?'],
            '>Confirm Cancellation<': ['confirmBtn', 'Confirm Cancellation'],
            '>No, Keep Booking<': ['keepBtn', 'No, Keep Booking']
        }
    },
    {
        file: 'src/screens/bookings/DisputeRefundScreen.tsx',
        ns: 'bookings.dispute',
        json: 'src/i18n/locales/en/bookings/dispute.json',
        replacements: {
            '>Raise a Dispute<': ['headerTitle', 'Raise a Dispute'],
            '>Disputing Booking: {bookingId}<': ['summaryTitle', 'Disputing Booking: {{id}}', ">{t('summaryTitle', 'Disputing Booking: {{id}}', { id: bookingId })}<"],
            '>Escrow Frozen<': ['infoTitle', 'Escrow Frozen'],
            '>Submitting a dispute will freeze the escrow payment. Our safety team will review your claim within 24 hours.<': ['infoDesc', 'Submitting a dispute will freeze the escrow payment. Our safety team will review your claim within 24 hours.'],
            '>ISSUE CATEGORY<': ['sectionCategory', 'ISSUE CATEGORY'],
            '>DETAILED DESCRIPTION<': ['sectionDesc', 'DETAILED DESCRIPTION'],
            '>UPLOAD PROOF (OPTIONAL)<': ['sectionProof', 'UPLOAD PROOF (OPTIONAL)'],
            '>Tap to upload screenshots or photos<': ['uploadText', 'Tap to upload screenshots or photos'],
            '>Submit Dispute<': ['submitBtn', 'Submit Dispute']
        }
    },
    {
        file: 'src/screens/bookings/ModifyBookingScreen.tsx',
        ns: 'bookings.modify',
        json: 'src/i18n/locales/en/bookings/modify.json',
        replacements: {
            '>Modify Booking<': ['headerTitle', 'Modify Booking'],
            '>Modification Policy<': ['infoTitle', 'Modification Policy'],
            '>Changes must be accepted by the companion. Your original booking remains active until they accept the new proposal.<': ['infoDesc', 'Changes must be accepted by the companion. Your original booking remains active until they accept the new proposal.'],
            '>CURRENT DETAILS<': ['sectionCurrent', 'CURRENT DETAILS'],
            '>PROPOSE NEW DETAILS<': ['sectionNew', 'PROPOSE NEW DETAILS'],
            '>New Date (DD/MM/YYYY)<': ['inputDate', 'New Date (DD/MM/YYYY)'],
            '>Start Time (HH:MM)<': ['inputTime', 'Start Time (HH:MM)'],
            '>AM/PM<': ['inputAmPm', 'AM/PM'],
            '>AM<': ['am', 'AM'],
            '>PM<': ['pm', 'PM'],
            '>Duration (Hours)<': ['inputDuration', 'Duration (Hours)'],
            ">{duration} {duration === 1 ? 'Hour' : 'Hours'}<": ['durationText', '{{duration}} {{hourText}}', ">{t('durationText', '{{duration}} {{hourText}}', { duration, hourText: duration === 1 ? 'Hour' : 'Hours' })}<"],
            '>New Venue (Optional)<': ['inputVenue', 'New Venue (Optional)'],
            '>Send Modification Request<': ['sendBtn', 'Send Modification Request'],
            '>Cancel<': ['cancelBtn', 'Cancel'],
            '>Select a Safe Venue<': ['sheetTitle', 'Select a Safe Venue']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
// add additional totalReleased/totalSecured keys to detail.json
const detailJson = 'src/i18n/locales/en/bookings/detail.json';
const detail = JSON.parse(fs.readFileSync(detailJson, 'utf8'));
detail['totalReleased'] = 'Total Released';
detail['totalSecured'] = 'Total Secured';
fs.writeFileSync(detailJson, JSON.stringify(detail, null, 2));
