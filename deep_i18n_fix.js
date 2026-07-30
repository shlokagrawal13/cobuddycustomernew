const fs = require('fs');
const path = require('path');

function updateJson(file, newKeys) {
  let filepath = path.join('src/i18n/locales/en', file);
  if (!fs.existsSync(filepath)) {
      console.log(`File not found: ${filepath}, creating it.`);
      fs.writeFileSync(filepath, '{}');
  }
  let content = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  
  for (const [key, value] of Object.entries(newKeys)) {
    const parts = key.split('.');
    let current = content;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  
  fs.writeFileSync(filepath, JSON.stringify(content, null, 2) + '\n');
  console.log(`Updated JSON: ${filepath}`);
}

// 1. AppPermissionsScreen.tsx edits
let permsFile = 'src/screens/settings/AppPermissionsScreen.tsx';
let permsContent = fs.readFileSync(permsFile, 'utf8');

permsContent = permsContent.replace(
  /title=\{t\('title\.LocationAccess', 'Location Access'\)\}\s*description="Used to find nearby buddies and track active sessions for safety\."/,
  "title={t('title.LocationAccess', 'Location Access')}\n            description={t('desc.LocationAccess', 'Used to find nearby buddies and track active sessions for safety.')}"
);
permsContent = permsContent.replace(
  /title=\{t\('title\.PushNotificatio', 'Push Notifications'\)\}\s*description="Stay updated on booking requests, messages, and safety alerts\."/,
  "title={t('title.PushNotificatio', 'Push Notifications')}\n            description={t('desc.PushNotificatio', 'Stay updated on booking requests, messages, and safety alerts.')}"
);
permsContent = permsContent.replace(
  /title=\{t\('title\.Camera', 'Camera'\)\}\s*description="Needed for live verification and capturing photos during sessions\."/,
  "title={t('title.Camera', 'Camera')}\n            description={t('desc.Camera', 'Needed for live verification and capturing photos during sessions.')}"
);
permsContent = permsContent.replace(
  /title=\{t\('title\.PhotoLibrary', 'Photo Library'\)\}\s*description="Required to upload profile pictures and share photos in chat\."/,
  "title={t('title.PhotoLibrary', 'Photo Library')}\n            description={t('desc.PhotoLibrary', 'Required to upload profile pictures and share photos in chat.')}"
);
permsContent = permsContent.replace(
  /title=\{t\('title\.Microphone', 'Microphone'\)\}\s*description="Used for voice messages and in-app secure calls\."/,
  "title={t('title.Microphone', 'Microphone')}\n            description={t('desc.Microphone', 'Used for voice messages and in-app secure calls.')}"
);
permsContent = permsContent.replace(
  /title=\{t\('title\.CalendarSync', 'Calendar Sync'\)\}\s*description="Automatically add upcoming bookings to your device calendar\."/,
  "title={t('title.CalendarSync', 'Calendar Sync')}\n            description={t('desc.CalendarSync', 'Automatically add upcoming bookings to your device calendar.')}"
);
permsContent = permsContent.replace(
  /title=\{t\('title\.Contacts', 'Contacts'\)\}\s*description="Easily invite friends or set up trusted contacts for safety\."/,
  "title={t('title.Contacts', 'Contacts')}\n            description={t('desc.Contacts', 'Easily invite friends or set up trusted contacts for safety.')}"
);
fs.writeFileSync(permsFile, permsContent);
console.log('Updated AppPermissionsScreen.tsx');


// JSON UPDATES (159+ keys)

// App Permissions
updateJson('settings/appPermissions.json', {
    'desc.LocationAccess': 'Used to find nearby buddies and track active sessions for safety.',
    'desc.PushNotificatio': 'Stay updated on booking requests, messages, and safety alerts.',
    'desc.Camera': 'Needed for live verification and capturing photos during sessions.',
    'desc.PhotoLibrary': 'Required to upload profile pictures and share photos in chat.',
    'desc.Microphone': 'Used for voice messages and in-app secure calls.',
    'desc.CalendarSync': 'Automatically add upcoming bookings to your device calendar.',
    'desc.Contacts': 'Easily invite friends or set up trusted contacts for safety.'
});

// Profile Reviews
updateJson('profile/reviews.json', {
    'reviews.basedOn': 'Based on ',
    'reviews.fromCompanions': 'reviews from companions'
});

// Edit Profile
updateJson('profile/edit.json', {
    'profile.charactersLimit': '/150 characters',
    'profile.selectLocation': 'Select Location',
    'profile.selectLanguages': 'Select Languages',
    'units.yrs': 'yrs',
    'a11ySelectLocation': 'Select Location',
    'a11ySelectLanguages': 'Select Languages'
});

// Saved Profiles
updateJson('profile/saved.json', {
    'reviews.count': 'reviews'
});

// Main Profile
updateJson('profile/main.json', {
    'memberSince': 'Member since',
    'statusVerified': 'Verified',
    'kycAadhaarVerified': 'Aadhaar Verified',
    'kycPending': 'Pending - Required for booking',
    'kycBiometricMatched': 'Biometric matched',
    'a11yKycVerified': 'KYC Verified',
    'a11yKycUnverified': 'Complete KYC verification',
    'kycViewDetails': 'View Identity Details',
    'kycComplete': 'Complete KYC Verification',
    'stats.myWallet': 'My Wallet',
    'walletBalance': 'Balance: {{balance}}',
    'stats.myReviews': 'My Reviews',
    'ratingsReceived': '{{count}} Ratings received',
    'stats.savedChecklists': 'Saved Checklists',
    'stats.savedChecklistsSub': 'Your favorite companions',
    'stats.referAFriend': 'Refer a Friend',
    'stats.referAFriendSub': 'Invite trusted members',
    'safety.trustedContact': 'Trusted Contact Sharing',
    'safety.trustedContactSub': 'Auto-share session details.',
    'safety.liveSafety': 'Live Safety Monitoring',
    'safety.liveSafetySub': 'Active tracking during sessions.',
    'profile.settingsHub': 'Settings Hub',
    'profile.settingsHubSub': 'Account, Notifications, Language',
    'profile.supportCenter': 'Support Center',
    'profile.supportCenterSub': 'Get help or report an issue',
    'profile.legalAgreements': 'Legal Agreements',
    'profile.legalAgreementsSub': 'Terms of Service & Privacy'
});

// Booking Time Select
updateJson('booking/timeSelect.json', {
    'units.hr': 'hr',
    'units.hrs': 'hrs'
});

// Booking Activity Select
updateJson('booking/activitySelect.json', {
    'a11yPrice': 'Price: {{price}}'
});

// Booking Declined
updateJson('booking/declined.json', {
    'bookingDeclined.body': "Unfortunately, {{name}} is unavailable for {{date}} at {{time}}. Don't worry, there are many other great companions available!"
});

// Booking Request Sent
updateJson('booking/requestSent.json', {
    'bookingRequestSent.body': "We've notified {{name}}. They have 24 hours to review your request, but companions usually respond within a few hours."
});

// Safety Hub
updateJson('safety/hub.json', {
    'safety.toggleLocationMock': 'Toggle background location service mocking.'
});

// Safety Report
updateJson('safety/report.json', {
    'incident.inappropriateBehavior': 'Inappropriate Behavior or Harassment',
    'incident.identityMismatch': 'Identity Mismatch (Fake Profile)',
    'incident.companionNoShow': 'Companion No-Show / Scam',
    'incident.otherSafetyConcern': 'Other Safety Concern'
});

// Wallet Withdraw Money
updateJson('wallet/withdrawMoney.json', {
    'withdraw.upiNotice': 'UPI transfers are usually instant, but can take up to 2 hours.',
    'withdraw.impsNotice': 'Standard IMPS/NEFT transfer takes up to 2-3 business days.'
});

// Wallet Screen
updateJson('wallet/wallet.json', {
    'txTypes.moneyAdded': 'Money Added',
    'txTypes.sessionPayment': 'Session Payment',
    'txTypes.refundProcessed': 'Refund Processed',
    'wallet.pendingRefunds': 'Pending Refunds: ₹',
    'wallet.heldInEscrow': 'Held in Escrow: ₹'
});

// Wallet Payment Methods
updateJson('wallet/paymentMethods.json', {
    'payment.selectMethod': 'Select Payment Method',
    'payment.methods': 'Payment Methods'
});

// Wallet Add Payment Method
updateJson('wallet/addPaymentMethod.json', {
    'card.yourName': 'YOUR NAME',
    'card.mmYy': 'MM/YY'
});

// Wallet Transaction History
updateJson('wallet/transactionHistory.json', {
    'txTypes.moneyAdded': 'Money Added'
});

// Wallet Transaction Detail
updateJson('wallet/transactionDetail.json', {
    'txDetail.date': 'Date',
    'txDetail.time': 'Time',
    'txDetail.category': 'Category',
    'txDetail.paymentSource': 'Payment Source'
});

// Chat Incoming Call
updateJson('chat/incomingCall.json', {
    'secureCallNotice': 'Calls are secured and masked by CoBuddy.'
});

// Chat Companion
updateJson('chat/companion.json', {
    'botMsg.gotIt': 'Got it, see you shortly!',
    'sysMsg.bookingAccepted': 'Booking Accepted! You can now chat securely.'
});

// Chat Concierge
updateJson('chat/concierge.json', {
    'quickAction.cancelBooking': 'Cancel Booking',
    'quickAction.refundStatus': 'Refund Status',
    'quickAction.reportSafety': 'Report Safety Issue',
    'quickAction.generalHelp': 'General Help',
    'botMsg.hi': 'Hi! I am the CoBuddy Support Bot. How can I help you today?',
    'botMsg.emergency': 'If you have an emergency, please use the SOS button on the home screen or type your issue below.',
    'botMsg.assistShortly': 'Our team will assist you shortly. Please hold on.'
});

// Settings Deactivate Account
updateJson('settings/deactivateAccount.json', {
    'confirmDeactivate': 'Yes, Deactivate'
});

// Settings App Lock
updateJson('settings/appLock.json', {
    'timeout.immediately': 'Immediately',
    'timeout.after1min': 'After 1 minute',
    'timeout.after5min': 'After 5 minutes',
    'timeout.after15min': 'After 15 minutes'
});

// Settings Delete Account
updateJson('settings/deleteAccount.json', {
    'confirmDelete': 'Yes, Delete'
});

// Settings Legal Agreements
updateJson('settings/legalAgreements.json', {
    'legal.terms': 'Terms of Service',
    'legal.termsSub': 'Last updated: June 2026',
    'legal.privacy': 'Privacy Policy',
    'legal.privacySub': 'Last updated: June 2026',
    'legal.community': 'Community Guidelines',
    'legal.communitySub': 'Rules for a safe environment',
    'legal.refund': 'Refund Policy',
    'legal.refundSub': 'Cancellation and escrow rules'
});

// Session Reminder
updateJson('session/reminder.json', {
    'safetyTip.public': 'Meet in a public place with good lighting.',
    'safetyTip.personal': 'Do not share your personal address or last name.',
    'safetyTip.phone': 'Keep your phone charged and handy.',
    'safetyTip.boundaries': 'Respect boundaries and CoBuddy etiquette.'
});

// Session Complete
updateJson('session/complete.json', {
    'invoiceNotice': 'An official invoice has been sent to your registered email.'
});

// Session Arrival Check In
updateJson('session/arrival.json', {
    'arrival.neverShareOtp': 'Never share this OTP over phone or chat. Only share it in person when you meet.'
});

// Home Dashboard
updateJson('home/dashboard.json', {
    'categories.coffeeMeetups': 'Coffee Meetups',
    'categories.movieBuffs': 'Movie Buffs',
    'categories.cityWalk': 'City Walk',
    'categories.studyBuddy': 'Study Buddy'
});

// Support Help Center
updateJson('support/helpCenter.json', {
    'help.bookings': 'Bookings & Meetups',
    'help.payments': 'Payments & Refunds',
    'help.trustSafety': 'Trust & Safety',
    'help.account': 'Account Settings',
    'help.searchResults': 'SEARCH RESULTS',
    'help.categoryFaqs': 'CATEGORY FAQS',
    'help.frequentlyAsked': 'FREQUENTLY ASKED QUESTIONS'
});

// Support Create Ticket
updateJson('support/createTicket.json', {
    'ticket.paymentRefunds': 'Payment & Refunds',
    'ticket.bookingIssue': 'Booking Issue',
    'ticket.safetyConcern': 'Report a Safety Concern',
    'ticket.techSupport': 'Account & Tech Support',
    'ticket.screenshotAttached': 'Screenshot Attached (Tap to remove)',
    'ticket.uploadScreenshot': 'Upload Screenshot or Photo'
});

// Bookings Modify
updateJson('bookings/modify.json', {
    'fallback.date1': 'Friday, 24 Oct 2026',
    'fallback.time1': '7:00 PM - 9:00 PM',
    'fallback.venue': 'Blue Tokai Coffee, CP'
});

// Bookings Dispute
updateJson('bookings/dispute.json', {
    'fallback.companionName': 'Companion',
    'fallback.date2': 'Fri, 24 Oct 2026'
});

// Bookings Detail
updateJson('bookings/detail.json', {
    'timeline.requested': 'Requested',
    'timeline.accepted': 'Accepted',
    'timeline.meetup': 'Meetup',
    'escrow.released': 'The escrow hold has been fully released.',
    'escrow.held': 'Held safely until session ends.'
});

// Verify Processing
updateJson('verify/processing.json', {
    'steps.documentVerification': 'Document Verification',
    'steps.selfieLiveness': 'Selfie & Liveness Check',
    'steps.profileReview': 'Profile Review',
    'steps.bookingAuthorization': 'Booking Authorization',
    'processing.profileTrusted': 'Your profile is now trusted.',
    'processing.reviewingDetails': 'Reviewing verification details...'
});

// Verify Document
updateJson('verify/document.json', {
    'docType.aadhaar': 'Aadhaar',
    'docType.pan': 'PAN Card',
    'docType.passport': 'Passport',
    'docType.dl': 'Driving License',
    'docVerify.clearLighting': 'Use clear lighting',
    'docVerify.cornersVisible': 'Keep all corners visible',
    'docVerify.noBlurry': 'No blurry or cropped images',
    'doc.frontUploaded': 'Front Side Uploaded',
    'doc.processing': 'Processing...',
    'doc.uploadFront': 'Upload Front Side',
    'doc.imageAccepted': 'Image accepted',
    'doc.tapToSelect': 'Tap to select image',
    'doc.backUploaded': 'Back Side Uploaded',
    'doc.uploadBack': 'Upload Back Side'
});

// Verify Pending
updateJson('verify/pending.json', {
    'steps.documentVerification': 'Document Verification',
    'steps.selfieLiveness': 'Selfie & Liveness Check',
    'steps.profileReview': 'Profile Review',
    'steps.bookingAuthorization': 'Booking Authorization',
    'actions.goBack': 'Go Back',
    'actions.continue': 'Continue',
    'actions.continueToApp': 'Continue to App'
});

// Verify Selfie
updateJson('verify/selfie.json', {
    'selfie.faceVisible': 'Ensure your face is clearly visible and not blurry.',
    'selfie.removeGlasses': 'Please remove any glasses or hats, and ensure you are in a well-lit area.'
});

// Verify Rejected
updateJson('verify/rejected.json', {
    'steps.documentVerification': 'Document Verification',
    'steps.selfieLiveness': 'Selfie & Liveness Check',
    'steps.profileReview': 'Profile Review',
    'steps.bookingAuthorization': 'Booking Authorization'
});

// Verify Success
updateJson('verify/success.json', {
    'actions.continue': 'Continue',
    'actions.startExploring': 'Start Exploring'
});

// Verify Liveness
updateJson('verify/liveness.json', {
    'liveness.holdStill': 'Please hold your phone still...',
    'liveness.blinkEyes': 'Now, blink your eyes slowly.'
});

// Remove unused JSON files
['onboarding.json', 'booking.json', 'companionProfile.json'].forEach(file => {
    let filepath = path.join('src/i18n/locales/en', file);
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        console.log(`Deleted unused JSON file: ${filepath}`);
    }
});

console.log("All JSON updates completed successfully.");
