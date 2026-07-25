const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
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

    const componentMatch = code.match(/export const (\w+) =/);
    if (componentMatch) {
        if (!code.includes(`useTranslation('${ns}')`) && !code.includes(`useTranslation(["${ns}"])`)) {
            code = code.replace(
                new RegExp(`export const ${componentMatch[1]} = \\(\\) => \\{`),
                `$& \n  const { t } = useTranslation('${ns}');`
            );
        }
    }

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
        file: 'src/screens/settings/AccountSettingsScreen.tsx',
        ns: 'settings.accountSettings',
        json: 'src/i18n/locales/en/settings/accountSettings.json',
        replacements: {
            '>Account Settings<': ['headerTitle', 'Account Settings'],
            '>Personal Information<': ['personalInfo', 'Personal Information'],
            '>Full Name<': ['fullName', 'Full Name'],
            '>Email Address<': ['email', 'Email Address'],
            '>Phone Number<': ['phone', 'Phone Number'],
            '>Linked Accounts<': ['linkedAccounts', 'Linked Accounts'],
            '>Google<': ['google', 'Google'],
            '>Connected<': ['connected', 'Connected'],
            '>Apple<': ['apple', 'Apple'],
            '>Not Connected<': ['notConnected', 'Not Connected'],
            '>Save Changes<': ['saveChanges', 'Save Changes']
        }
    },
    {
        file: 'src/screens/settings/ActiveSessionsScreen.tsx',
        ns: 'settings.activeSessions',
        json: 'src/i18n/locales/en/settings/activeSessions.json',
        replacements: {
            '>Active Device Sessions<': ['headerTitle', 'Active Device Sessions'],
            ">Manage where you're logged in.<": ['subTitle', "Manage where you're logged in."],
            '>Current Device<': ['currentDevice', 'Current Device'],
            '>Log Out of All Other Devices<': ['logoutOther', 'Log Out of All Other Devices']
        }
    },
    {
        file: 'src/screens/settings/AppLockScreen.tsx',
        ns: 'settings.appLock',
        json: 'src/i18n/locales/en/settings/appLock.json',
        replacements: {
            '>App Lock & Security<': ['headerTitle', 'App Lock & Security'],
            '>Require biometric authentication (Face ID / Fingerprint) to open CoBuddy.<': ['biometricDesc', 'Require biometric authentication (Face ID / Fingerprint) to open CoBuddy.'],
            '>Require PIN / Biometric when making payments or releasing escrow.<': ['paymentLockDesc', 'Require PIN / Biometric when making payments or releasing escrow.']
        }
    },
    {
        file: 'src/screens/settings/AppPermissionsScreen.tsx',
        ns: 'settings.appPermissions',
        json: 'src/i18n/locales/en/settings/appPermissions.json',
        replacements: {
            '>Device Permissions<': ['headerTitle', 'Device Permissions'],
            '>Manage how CoBuddy interacts with your device.<': ['subTitle', 'Manage how CoBuddy interacts with your device.'],
            '>Location Services<': ['location', 'Location Services'],
            '>Required for finding nearby companions and SOS features.<': ['locationDesc', 'Required for finding nearby companions and SOS features.'],
            '>Camera & Photos<': ['camera', 'Camera & Photos'],
            '>Required for KYC selfies and sharing incident evidence.<': ['cameraDesc', 'Required for KYC selfies and sharing incident evidence.'],
            '>Microphone<': ['mic', 'Microphone'],
            '>Required for secure voice calls.<': ['micDesc', 'Required for secure voice calls.']
        }
    },
    {
        file: 'src/screens/settings/BlockedUsersScreen.tsx',
        ns: 'settings.blockedUsers',
        json: 'src/i18n/locales/en/settings/blockedUsers.json',
        replacements: {
            '>Blocked Companions<': ['headerTitle', 'Blocked Companions'],
            '>No Blocked Users<': ['emptyTitle', 'No Blocked Users'],
            ">You haven't blocked any companions.<": ['emptyDesc', "You haven't blocked any companions."],
            '>Unblock<': ['unblock', 'Unblock']
        }
    },
    {
        file: 'src/screens/settings/DataCacheScreen.tsx',
        ns: 'settings.dataCache',
        json: 'src/i18n/locales/en/settings/dataCache.json',
        replacements: {
            '>Storage & Cache<': ['headerTitle', 'Storage & Cache'],
            '>Used by CoBuddy<': ['usedByApp', 'Used by CoBuddy'],
            '>Clear Image Cache<': ['clearImageCache', 'Clear Image Cache'],
            '>Frees up space without deleting data.<': ['clearImageCacheDesc', 'Frees up space without deleting data.'],
            '>Clear Offline Data<': ['clearOfflineData', 'Clear Offline Data'],
            '>Removes saved checklists and chat history.<': ['clearOfflineDataDesc', 'Removes saved checklists and chat history.']
        }
    },
    {
        file: 'src/screens/settings/DeactivateAccountScreen.tsx',
        ns: 'settings.deactivateAccount',
        json: 'src/i18n/locales/en/settings/deactivateAccount.json',
        replacements: {
            '>Deactivate Account<': ['headerTitle', 'Deactivate Account'],
            '>Take a break from CoBuddy.<': ['subTitle', 'Take a break from CoBuddy.'],
            '>  Your profile will be hidden from everyone.<': ['point1', '  Your profile will be hidden from everyone.'],
            '>  Active bookings will be cancelled.<': ['point2', '  Active bookings will be cancelled.'],
            '>  You can reactivate anytime by logging in.<': ['point3', '  You can reactivate anytime by logging in.'],
            '>Deactivate My Account<': ['deactivateBtn', 'Deactivate My Account']
        }
    },
    {
        file: 'src/screens/settings/DeleteAccountScreen.tsx',
        ns: 'settings.deleteAccount',
        json: 'src/i18n/locales/en/settings/deleteAccount.json',
        replacements: {
            '>Delete Account<': ['headerTitle', 'Delete Account'],
            '>Are you absolutely sure?<': ['warningTitle', 'Are you absolutely sure?'],
            '>  Your entire chat history<': ['point1', '  Your entire chat history'],
            '>  Your booking history and reviews<': ['point2', '  Your booking history and reviews'],
            '>  Any remaining wallet balance<': ['point3', '  Any remaining wallet balance'],
            '>  Your KYC verification status<': ['point4', '  Your KYC verification status'],
            '>To confirm, please type "DELETE" below:<': ['confirmLabel', 'To confirm, please type "DELETE" below:'],
            '>Permanently Delete My Account<': ['deleteBtn', 'Permanently Delete My Account']
        }
    },
    {
        file: 'src/screens/settings/LanguageSelectionScreen.tsx',
        ns: 'settings.languageSelection',
        json: 'src/i18n/locales/en/settings/languageSelection.json',
        replacements: {
            '>Language<': ['headerTitle', 'Language'],
            '>Select your preferred language. This will change the text across the CoBuddy app.<': ['infoText', 'Select your preferred language. This will change the text across the CoBuddy app.']
        }
    },
    {
        file: 'src/screens/settings/LegalAgreementsScreen.tsx',
        ns: 'settings.legalAgreements',
        json: 'src/i18n/locales/en/settings/legalAgreements.json',
        replacements: {
            '>Legal & Agreements<': ['headerTitle', 'Legal & Agreements'],
            '>CoBuddy Technologies<': ['brandText', 'CoBuddy Technologies'],
            '>All rights reserved.<': ['copyrightText', 'All rights reserved.']
        }
    },
    {
        file: 'src/screens/settings/NotificationPreferencesScreen.tsx',
        ns: 'settings.notificationPreferences',
        json: 'src/i18n/locales/en/settings/notificationPreferences.json',
        replacements: {
            '>Notifications<': ['headerTitle', 'Notifications'],
            '>Stay Updated<': ['heroTitle', 'Stay Updated'],
            '>BOOKING UPDATES<': ['bookingUpdates', 'BOOKING UPDATES'],
            '>Status Updates<': ['statusUpdates', 'Status Updates'],
            '>Requests accepted, companion arrivals<': ['statusUpdatesSub', 'Requests accepted, companion arrivals'],
            '>Session Reminders<': ['sessionReminders', 'Session Reminders'],
            '>"Your session starts in 1 hour"<': ['sessionRemindersSub', '"Your session starts in 1 hour"'],
            '>Email Receipts<': ['emailReceipts', 'Email Receipts'],
            '>Invoices and booking summaries<': ['emailReceiptsSub', 'Invoices and booking summaries'],
            '>COMMUNICATION & WALLET<': ['commWallet', 'COMMUNICATION & WALLET'],
            '>Chat Messages<': ['chatMessages', 'Chat Messages'],
            '>Direct messages from companions<': ['chatMessagesSub', 'Direct messages from companions'],
            '>Wallet Alerts<': ['walletAlerts', 'Wallet Alerts'],
            '>Money added, refunds processed<': ['walletAlertsSub', 'Money added, refunds processed'],
            '>Review Requests<': ['reviewRequests', 'Review Requests'],
            '>"How was your session with Sarah?"<': ['reviewRequestsSub', '"How was your session with Sarah?"'],
            '>MARKETING<': ['marketing', 'MARKETING'],
            '>Promotions & Offers<': ['promotions', 'Promotions & Offers'],
            '>Discounts, new features, and news<': ['promotionsSub', 'Discounts, new features, and news'],
            '>SAFETY & SECURITY<': ['safetySecurity', 'SAFETY & SECURITY'],
            '>SOS & Security Alerts<': ['sosAlerts', 'SOS & Security Alerts'],
            '>Critical account and safety notices<': ['sosAlertsSub', 'Critical account and safety notices'],
            '>Security alerts cannot be disabled for your safety.<': ['securityNote', 'Security alerts cannot be disabled for your safety.']
        }
    },
    {
        file: 'src/screens/settings/ReferFriendScreen.tsx',
        ns: 'settings.referFriend',
        json: 'src/i18n/locales/en/settings/referFriend.json',
        replacements: {
            '>Refer a Friend<': ['headerTitle', 'Refer a Friend'],
            '>Invite Friends<': ['heroTitle', 'Invite Friends'],
            '>SPREAD THE WORD<': ['spreadWord', 'SPREAD THE WORD'],
            '>Share Invite Link<': ['shareBtn', 'Share Invite Link'],
            '>WHY INVITE FRIENDS?<': ['whyInvite', 'WHY INVITE FRIENDS?'],
            '>Build a safer community<': ['buildSafer', 'Build a safer community'],
            '>Inviting people you trust helps keep our network safe and reliable.<': ['buildSaferSub', 'Inviting people you trust helps keep our network safe and reliable.'],
            '>Better experiences<': ['betterExperiences', 'Better experiences'],
            '>More users means more amazing companions to choose from in your city.<': ['betterExperiencesSub', 'More users means more amazing companions to choose from in your city.']
        }
    },
    {
        file: 'src/screens/settings/SpokenLanguagesScreen.tsx',
        ns: 'settings.spokenLanguages',
        json: 'src/i18n/locales/en/settings/spokenLanguages.json',
        replacements: {
            '>Spoken Languages<': ['headerTitle', 'Spoken Languages'],
            '>Done<': ['doneBtn', 'Done'],
            '>Select up to 5 languages you can fluently converse in during a meetup.<': ['infoText', 'Select up to 5 languages you can fluently converse in during a meetup.']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
