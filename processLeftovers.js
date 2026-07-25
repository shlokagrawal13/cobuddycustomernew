const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
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
            '>Male<': ['genderMale', 'Male'],
            '>CONTACT & RECOVERY<': ['contactRecovery', 'CONTACT & RECOVERY'],
            '>+91 98****1234<': ['mockPhone', '+91 98****1234'],
            '>Verified. Change requires OTP.<': ['verifiedOtp', 'Verified. Change requires OTP.'],
            '>Save<': ['save', 'Save'],
            '>Used for booking receipts and support.<': ['emailHelper', 'Used for booking receipts and support.'],
            '>DATA & PRIVACY<': ['dataPrivacy', 'DATA & PRIVACY'],
            '>Download Account Info<': ['downloadInfo', 'Download Account Info'],
            '>Request a copy of your CoBuddy data<': ['downloadSub', 'Request a copy of your CoBuddy data']
        }
    },
    {
        file: 'src/screens/settings/ActiveSessionsScreen.tsx',
        ns: 'settings.activeSessions',
        json: 'src/i18n/locales/en/settings/activeSessions.json',
        replacements: {
            '>THIS DEVICE<': ['thisDeviceBadge', 'THIS DEVICE'],
            '>Log Out Device<': ['logOutDevice', 'Log Out Device'],
            '>Active Sessions<': ['activeSessions', 'Active Sessions'],
            '>Manage Devices<': ['manageDevices', 'Manage Devices'],
            '>CURRENT SESSION<': ['currentSession', 'CURRENT SESSION'],
            '>OTHER LOGGED-IN DEVICES<': ['otherDevices', 'OTHER LOGGED-IN DEVICES'],
            '>Account Secure<': ['accountSecure', 'Account Secure'],
            '>You are only logged in on this device.<': ['accountSecureSub', 'You are only logged in on this device.'],
            '>Security Tip<': ['securityTip', 'Security Tip']
        }
    },
    {
        file: 'src/screens/settings/AppLockScreen.tsx',
        ns: 'settings.appLock',
        json: 'src/i18n/locales/en/settings/appLock.json',
        replacements: {
            '>App Lock<': ['appLock', 'App Lock'],
            '>Enhanced Security<': ['enhancedSec', 'Enhanced Security'],
            '>APP ACCESS<': ['appAccess', 'APP ACCESS'],
            '>Use your device credentials to unlock the app.<': ['appAccessDesc', 'Use your device credentials to unlock the app.'],
            '>AUTO-LOCK TIME<': ['autoLockTime', 'AUTO-LOCK TIME'],
            '>PRIVACY<': ['privacy', 'PRIVACY'],
            '>Hide Screen in App Switcher<': ['hideScreen', 'Hide Screen in App Switcher'],
            '>Blur the app content when viewing recent apps to prevent shoulder surfing.<': ['hideScreenDesc', 'Blur the app content when viewing recent apps to prevent shoulder surfing.']
        }
    },
    {
        file: 'src/screens/settings/AppPermissionsScreen.tsx',
        ns: 'settings.appPermissions',
        json: 'src/i18n/locales/en/settings/appPermissions.json',
        replacements: {
            '>REQUIRED<': ['requiredBadge', 'REQUIRED'],
            '>App Permissions<': ['appPermissions', 'App Permissions'],
            '>Privacy Control<': ['privacyControl', 'Privacy Control'],
            '>CORE PERMISSIONS<': ['corePermissions', 'CORE PERMISSIONS'],
            '>MEDIA & COMMUNICATION<': ['mediaComm', 'MEDIA & COMMUNICATION'],
            '>OPTIONAL<': ['optional', 'OPTIONAL']
        }
    },
    {
        file: 'src/screens/settings/BlockedUsersScreen.tsx',
        ns: 'settings.blockedUsers',
        json: 'src/i18n/locales/en/settings/blockedUsers.json',
        replacements: {
            '>Blocked Users<': ['blockedUsersHeader', 'Blocked Users']
        }
    },
    {
        file: 'src/screens/settings/DataCacheScreen.tsx',
        ns: 'settings.dataCache',
        json: 'src/i18n/locales/en/settings/dataCache.json',
        replacements: {
            '>Data & Storage<': ['dataStorage', 'Data & Storage'],
            '>Storage Usage<': ['storageUsage', 'Storage Usage'],
            '>Cache<': ['cacheLegend', 'Cache'],
            '>Media<': ['mediaLegend', 'Media'],
            '>Free<': ['freeLegend', 'Free'],
            '>2.4 GB<': ['mockFreeSpace', '2.4 GB'],
            '>MANAGE STORAGE<': ['manageStorage', 'MANAGE STORAGE'],
            '>Clear Cache<': ['clearCache', 'Clear Cache'],
            '>Free up space by removing temp files<': ['clearCacheSub', 'Free up space by removing temp files'],
            '>Clear Downloaded Media<': ['clearMedia', 'Clear Downloaded Media'],
            '>Remove saved photos and chat files<': ['clearMediaSub', 'Remove saved photos and chat files'],
            '>MEDIA PREFERENCES<': ['mediaPrefs', 'MEDIA PREFERENCES'],
            '>Auto-Download Media<': ['autoDownload', 'Auto-Download Media'],
            '>Automatically download photos on Wi-Fi<': ['autoDownloadSub', 'Automatically download photos on Wi-Fi'],
            '>Photo Upload Quality<': ['uploadQuality', 'Photo Upload Quality'],
            '>Adjust quality for profile & chat uploads<': ['uploadQualitySub', 'Adjust quality for profile & chat uploads'],
            '>High Quality uses more mobile data and storage.<': ['qualityHelper', 'High Quality uses more mobile data and storage.']
        }
    },
    {
        file: 'src/screens/settings/DeactivateAccountScreen.tsx',
        ns: 'settings.deactivateAccount',
        json: 'src/i18n/locales/en/settings/deactivateAccount.json',
        replacements: {
            '>Take a break from CoBuddy<': ['breakTitle', 'Take a break from CoBuddy'],
            '>Profile hidden<': ['profileHidden', 'Profile hidden'],
            '>No one will be able to see your profile or book you.<': ['profileHiddenSub', 'No one will be able to see your profile or book you.'],
            '>Pending bookings<': ['pendingBookings', 'Pending bookings'],
            '>Any active or upcoming bookings will remain active. You must complete or cancel them.<': ['pendingBookingsSub', 'Any active or upcoming bookings will remain active. You must complete or cancel them.'],
            '>Easy reactivation<': ['easyReactivation', 'Easy reactivation'],
            '>Simply log back in at any time to automatically reactivate your account.<': ['easyReactivationSub', 'Simply log back in at any time to automatically reactivate your account.']
        }
    },
    {
        file: 'src/screens/settings/DeleteAccountScreen.tsx',
        ns: 'settings.deleteAccount',
        json: 'src/i18n/locales/en/settings/deleteAccount.json',
        replacements: {
            '>  Your entire chat history<': ['chatHistory', '  Your entire chat history'],
            '>  Your booking history and reviews<': ['bookingHistory', '  Your booking history and reviews'],
            '>  Any remaining wallet balance<': ['walletBalance', '  Any remaining wallet balance'],
            '>  Your KYC verification status<': ['kycStatus', '  Your KYC verification status']
        }
    },
    {
        file: 'src/screens/support/SupportTicketDetailScreen.tsx',
        ns: 'support.ticketDetail',
        json: 'src/i18n/locales/en/support/ticketDetail.json',
        replacements: {
            '>Category: Payment  •  Created 2 hours ago<': ['ticketMeta', 'Category: Payment  •  Created 2 hours ago']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
