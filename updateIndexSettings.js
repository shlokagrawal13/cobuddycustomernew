const fs = require('fs');

let code = fs.readFileSync('src/i18n/index.ts', 'utf8');

const newImports = `
import settingsHub from './locales/en/settings/hub.json';
import settingsAccountSettings from './locales/en/settings/accountSettings.json';
import settingsActiveSessions from './locales/en/settings/activeSessions.json';
import settingsAppLock from './locales/en/settings/appLock.json';
import settingsAppPermissions from './locales/en/settings/appPermissions.json';
import settingsBlockedUsers from './locales/en/settings/blockedUsers.json';
import settingsDataCache from './locales/en/settings/dataCache.json';
import settingsDeactivateAccount from './locales/en/settings/deactivateAccount.json';
import settingsDeleteAccount from './locales/en/settings/deleteAccount.json';
import settingsLanguageSelection from './locales/en/settings/languageSelection.json';
import settingsLegalAgreements from './locales/en/settings/legalAgreements.json';
import settingsNotificationPreferences from './locales/en/settings/notificationPreferences.json';
import settingsReferFriend from './locales/en/settings/referFriend.json';
import settingsSpokenLanguages from './locales/en/settings/spokenLanguages.json';
`;

code = code.replace(
    "import authPhone from './locales/en/auth/phone.json';",
    newImports + "\nimport authPhone from './locales/en/auth/phone.json';"
);

const newResources = `
    settings: {
      hub: settingsHub,
      accountSettings: settingsAccountSettings,
      activeSessions: settingsActiveSessions,
      appLock: settingsAppLock,
      appPermissions: settingsAppPermissions,
      blockedUsers: settingsBlockedUsers,
      dataCache: settingsDataCache,
      deactivateAccount: settingsDeactivateAccount,
      deleteAccount: settingsDeleteAccount,
      languageSelection: settingsLanguageSelection,
      legalAgreements: settingsLegalAgreements,
      notificationPreferences: settingsNotificationPreferences,
      referFriend: settingsReferFriend,
      spokenLanguages: settingsSpokenLanguages
    },
`;

code = code.replace(
    "    common,",
    "    common,\n" + newResources
);

fs.writeFileSync('src/i18n/index.ts', code);
console.log('index.ts updated');
