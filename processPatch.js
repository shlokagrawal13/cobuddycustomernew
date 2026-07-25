const fs = require('fs');

function replaceExact(file, search, replace) {
    let code = fs.readFileSync(file, 'utf8');
    code = code.split(search).join(replace);
    fs.writeFileSync(file, code);
}

replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>CORE IDENTITY (PRIVATE)<', ">{t('coreIdentity', 'CORE IDENTITY (PRIVATE)')}<");
replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>Identity verified via KYC. Contact support to update.<', ">{t('identityVerified', 'Identity verified via KYC. Contact support to update.')}<");
replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>Legal Name<', ">{t('legalName', 'Legal Name')}<");
replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>Shlok Sharma<', ">{t('mockName', 'Shlok Sharma')}<");
replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>Matches your Government ID.<', ">{t('matchesGovId', 'Matches your Government ID.')}<");
replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>Date of Birth<', ">{t('dob', 'Date of Birth')}<");
replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>15 Aug 1998<', ">{t('mockDob', '15 Aug 1998')}<");
replaceExact('src/screens/settings/AccountSettingsScreen.tsx', '>Gender Identity<', ">{t('genderIdentity', 'Gender Identity')}<");

replaceExact('src/screens/settings/DeleteAccountScreen.tsx', '>  Your entire chat history<', ">{t('chatHistory', '  Your entire chat history')}<");
replaceExact('src/screens/settings/DeleteAccountScreen.tsx', '>  Your booking history and reviews<', ">{t('bookingHistory', '  Your booking history and reviews')}<");
replaceExact('src/screens/settings/DeleteAccountScreen.tsx', '>  Any remaining wallet balance<', ">{t('walletBalance', '  Any remaining wallet balance')}<");
replaceExact('src/screens/settings/DeleteAccountScreen.tsx', '>  Your KYC verification status<', ">{t('kycStatus', '  Your KYC verification status')}<");

// Use regex for the weird character
let supportCode = fs.readFileSync('src/screens/support/SupportTicketDetailScreen.tsx', 'utf8');
supportCode = supportCode.replace(
    />Category: Payment.*Created 2 hours ago</,
    ">{t('ticketMeta', 'Category: Payment • Created 2 hours ago')}<"
);
fs.writeFileSync('src/screens/support/SupportTicketDetailScreen.tsx', supportCode);

console.log('Final patch complete');
