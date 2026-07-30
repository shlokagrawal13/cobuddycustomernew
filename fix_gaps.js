const fs = require('fs');
const path = require('path');

// 1. AppPermissionsScreen.tsx edits
let permsFile = 'src/screens/settings/AppPermissionsScreen.tsx';
let permsContent = fs.readFileSync(permsFile, 'utf8');

permsContent = permsContent.replace(
  /description="Get instantly notified about booking requests and messages\."/g,
  "description={t('desc.PushNotificatio', 'Stay updated on booking requests, messages, and safety alerts.')}"
);

permsContent = permsContent.replace(
  /description="Required for KYC verification and taking profile pictures\."/g,
  "description={t('desc.Camera', 'Needed for live verification and capturing photos during sessions.')}"
);

permsContent = permsContent.replace(
  /description="Allows you to upload ID documents and send photos in chat\."/g,
  "description={t('desc.PhotoLibrary', 'Required to upload profile pictures and share photos in chat.')}"
);

permsContent = permsContent.replace(
  /description="Used for voice calls and sending voice notes in chat\."/g,
  "description={t('desc.Microphone', 'Used for voice messages and in-app secure calls.')}"
);

permsContent = permsContent.replace(
  /description="Automatically add your upcoming CoBuddy sessions to your calendar\."/g,
  "description={t('desc.CalendarSync', 'Automatically add upcoming bookings to your device calendar.')}"
);

permsContent = permsContent.replace(
  /description="Find friends who are already using CoBuddy\."/g,
  "description={t('desc.Contacts', 'Easily invite friends or set up trusted contacts for safety.')}"
);

fs.writeFileSync(permsFile, permsContent);
console.log('Updated AppPermissionsScreen.tsx');

// 2. verify/processing.json edits
let verifyFile = 'src/i18n/locales/en/verify/processing.json';
let verifyContent = JSON.parse(fs.readFileSync(verifyFile, 'utf8'));

if (!verifyContent.processing) {
  verifyContent.processing = {};
}
verifyContent.processing.statusCompleted = "COMPLETED";
verifyContent.processing.statusProcessing = "PROCESSING";
verifyContent.processing.statusPending = "PENDING";

fs.writeFileSync(verifyFile, JSON.stringify(verifyContent, null, 2) + '\n');
console.log('Updated verify/processing.json');

