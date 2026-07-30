const fs = require('fs');
const path = require('path');

// 1. Fix CustomSwitch in 5 files
const switchFiles = [
  'src/screens/safety/SafetySettingsScreen.tsx',
  'src/screens/settings/AppLockScreen.tsx',
  'src/screens/settings/NotificationPreferencesScreen.tsx',
  'src/screens/settings/AppPermissionsScreen.tsx',
  'src/screens/settings/DataCacheScreen.tsx'
];

switchFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add label prop to CustomSwitch definition
  content = content.replace(
    /const CustomSwitch = \(\{ value, onValueChange \}: \{ value: boolean, onValueChange: \(val: boolean\) => void \}\) => \{/,
    'const CustomSwitch = ({ value, onValueChange, label }: { value: boolean, onValueChange: (val: boolean) => void, label?: string }) => {'
  );
  // Replace a11yAction with label prop inside CustomSwitch
  content = content.replace(
    /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/,
    "accessibilityLabel={label || 'Toggle switch'}"
  );
  
  fs.writeFileSync(file, content);
});

// Update specific call sites for CustomSwitch
function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  replacements.forEach(r => {
    content = content.replace(r.find, r.replace);
  });
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}

replaceInFile('src/screens/safety/SafetySettingsScreen.tsx', [
  { find: /<CustomSwitch value=\{incognito\} onValueChange=\{setIncognito\} \/>/, replace: "<CustomSwitch value={incognito} onValueChange={setIncognito} label={t('a11yIncognitoMode', 'Toggle incognito mode')} />" },
  { find: /<CustomSwitch value=\{safeChat\} onValueChange=\{setSafeChat\} \/>/, replace: "<CustomSwitch value={safeChat} onValueChange={setSafeChat} label={t('a11ySafeChat', 'Toggle safe chat mode')} />" },
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yTrustedContacts', 'Manage trusted contacts')}" } // This is for line 123
]);

replaceInFile('src/screens/settings/AppLockScreen.tsx', [
  { find: /<CustomSwitch value=\{appLockEnabled\} onValueChange=\{setAppLockEnabled\} \/>/, replace: "<CustomSwitch value={appLockEnabled} onValueChange={setAppLockEnabled} label={t('a11yAppLockToggle', 'Toggle app lock')} />" },
  { find: /<CustomSwitch value=\{hideScreenEnabled\} onValueChange=\{setHideScreenEnabled\} \/>/, replace: "<CustomSwitch value={hideScreenEnabled} onValueChange={setHideScreenEnabled} label={t('a11yHideScreenToggle', 'Toggle hide screen in app switcher')} />" }
]);

replaceInFile('src/screens/settings/NotificationPreferencesScreen.tsx', [
  { find: /<CustomSwitch value=\{prefs\.bookingPush\} onValueChange=\{[^\}]+\} \/>/, replace: "<CustomSwitch value={prefs.bookingPush} onValueChange={() => togglePref('bookingPush')} label={t('a11yToggleBookingPush', 'Toggle booking push notifications')} />" },
  { find: /<CustomSwitch value=\{prefs\.bookingReminders\} onValueChange=\{[^\}]+\} \/>/, replace: "<CustomSwitch value={prefs.bookingReminders} onValueChange={() => togglePref('bookingReminders')} label={t('a11yToggleBookingReminders', 'Toggle session reminders')} />" },
  { find: /<CustomSwitch value=\{prefs\.bookingEmail\} onValueChange=\{[^\}]+\} \/>/, replace: "<CustomSwitch value={prefs.bookingEmail} onValueChange={() => togglePref('bookingEmail')} label={t('a11yToggleBookingEmail', 'Toggle email receipts')} />" },
  { find: /<CustomSwitch value=\{prefs\.chatPush\} onValueChange=\{[^\}]+\} \/>/, replace: "<CustomSwitch value={prefs.chatPush} onValueChange={() => togglePref('chatPush')} label={t('a11yToggleChatPush', 'Toggle chat message notifications')} />" },
  { find: /<CustomSwitch value=\{prefs\.walletPush\} onValueChange=\{[^\}]+\} \/>/, replace: "<CustomSwitch value={prefs.walletPush} onValueChange={() => togglePref('walletPush')} label={t('a11yToggleWalletPush', 'Toggle wallet alerts')} />" },
  { find: /<CustomSwitch value=\{prefs\.reviewPush\} onValueChange=\{[^\}]+\} \/>/, replace: "<CustomSwitch value={prefs.reviewPush} onValueChange={() => togglePref('reviewPush')} label={t('a11yToggleReviewPush', 'Toggle review requests')} />" },
  { find: /<CustomSwitch value=\{prefs\.promoPush\} onValueChange=\{[^\}]+\} \/>/, replace: "<CustomSwitch value={prefs.promoPush} onValueChange={() => togglePref('promoPush')} label={t('a11yTogglePromoPush', 'Toggle promotions and offers')} />" },
  { find: /<CustomSwitch value=\{true\} disabled=\{true\} \/>/, replace: "<CustomSwitch value={true} disabled={true} label={t('a11ySOSAlertsStatus', 'SOS alerts cannot be disabled')} />" }
]);

replaceInFile('src/screens/settings/AppPermissionsScreen.tsx', [
  { find: /<CustomSwitch value=\{isGranted\} onValueChange=\{onToggle\} \/>/, replace: "const { t } = useTranslation('settings.appPermissions');\n            <CustomSwitch value={isGranted} onValueChange={onToggle} label={t('a11yTogglePermission', 'Toggle {{permission}} permission', { permission: title })} />" }
]);
// Wait, we need to inject `const { t } = useTranslation();` into `PermissionRow` if it doesn't exist, since it's a separate component.
// Let's refine `AppPermissionsScreen.tsx` replacing logic.
let appPermContent = fs.readFileSync('src/screens/settings/AppPermissionsScreen.tsx', 'utf8');
if (!appPermContent.includes("label={t('a11yTogglePermission'")) {
  appPermContent = appPermContent.replace(
    /const PermissionRow = \(\{ icon, title, description, isRequired, isGranted, onToggle \}: any\) => \(\s*<View/,
    "const PermissionRow = ({ icon, title, description, isRequired, isGranted, onToggle }: any) => {\n  const { t } = useTranslation('settings.appPermissions');\n  return (\n    <View"
  );
  appPermContent = appPermContent.replace(
    /<CustomSwitch value=\{isGranted\} onValueChange=\{onToggle\} \/>/,
    "<CustomSwitch value={isGranted} onValueChange={onToggle} label={t('a11yTogglePermission', 'Toggle {{permission}} permission', { permission: title })} />"
  );
  appPermContent = appPermContent.replace(
    /        <\/View>\n    \)\};/,
    "        </View>\n  )};" // fix return closure
  );
  fs.writeFileSync('src/screens/settings/AppPermissionsScreen.tsx', appPermContent);
}

replaceInFile('src/screens/settings/DataCacheScreen.tsx', [
  { find: /<CustomSwitch value=\{autoDownload\} onValueChange=\{setAutoDownload\} \/>/, replace: "<CustomSwitch value={autoDownload} onValueChange={setAutoDownload} label={t('a11yAutoDownloadToggle', 'Toggle auto-download media on Wi-Fi')} />" },
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yPhotoUploadQuality', 'Change photo upload quality')}" }
]);

// 2. Everything else
const fileReplacements = [
  { file: 'src/screens/profile/ProfileScreen.tsx', find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yViewActiveSession', 'View your active session')}" }, // active booking banner (approx line 97)
  // Need to be careful with ProfileScreen, multiple matches for Next and Action
];
