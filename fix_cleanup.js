const fs = require('fs');

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

replaceInFile('src/screens/wallet/AddBankAccountScreen.tsx', [
  { find: /title:\s*'Verified Bank',/g, replace: "title: t('bank.verifiedTitle', 'Verified Bank')," },
  { find: /sub:\s*'Account ending in '\s*\+\s*accNumber\.slice\(-4\),/g, replace: "sub: t('bank.endingIn', 'Account ending in {{last4}}', { last4: accNumber.slice(-4) })," }
]);

replaceInFile('src/screens/wallet/PaymentMethodsScreen.tsx', [
  { find: /title:\s*'UPI ID',/g, replace: "title: t('upi.title', 'UPI ID')," }
]);

replaceInFile('src/screens/wallet/WithdrawalMethodsScreen.tsx', [
  { find: /title:\s*'UPI ID',/g, replace: "title: t('upi.title', 'UPI ID')," }
]);

replaceInFile('src/screens/bookings/CancelBookingScreen.tsx', [
  { find: /\|\|\s*'Companion'/g, replace: "|| t('fallbackCompanion', 'Companion')" }
]);

replaceInFile('src/screens/bookings/ModifyBookingScreen.tsx', [
  { find: /placeholder="Search safe public venue\.\.\."/g, replace: "placeholder={t('searchVenuePlaceholder', 'Search safe public venue...')}" }
]);

replaceInFile('src/screens/home/DiscoverScreen.tsx', [
  { find: /\]\}\s*>\s*\{g\}\s*<\/Text>/g, replace: "]}>\n                        {g === 'Any' ? t('filter.any', 'Any') : g === 'Male' ? t('filter.male', 'Male') : t('filter.female', 'Female')}\n                      </Text>" }
]);

replaceInFile('src/screens/profile/EditProfileScreen.tsx', [
  { find: /\{form\.city\s*\|\|\s*'Select Location'\}/g, replace: "{form.city || t('selectLocation', 'Select Location')}" },
  { find: /\{form\.languages\.length\s*>\s*0\s*\?\s*form\.languages\.join\(', '\)\s*:\s*'Select Languages'\}/g, replace: "{form.languages.length > 0 ? form.languages.join(', ') : t('selectLanguages', 'Select Languages')}" }
]);

replaceInFile('src/screens/settings/AccountSettingsScreen.tsx', [
  { find: /\{appleConnected\s*\?\s*'Connected'\s*:\s*'Connect'\}/g, replace: "{appleConnected ? t('actions.connected', 'Connected') : t('actions.connect', 'Connect')}" },
  { find: /\{googleConnected\s*\?\s*'Connected'\s*:\s*'Connect'\}/g, replace: "{googleConnected ? t('actions.connected', 'Connected') : t('actions.connect', 'Connect')}" }
]);

replaceInFile('src/screens/verify/DocumentVerificationScreen.tsx', [
  { find: /"Image accepted"/g, replace: "t('imageAccepted', 'Image accepted')" },
  { find: /"Tap to select image"/g, replace: "t('tapToSelectImage', 'Tap to select image')" }
]);

replaceInFile('src/screens/verify/VerificationProcessingScreen.tsx', [
  { find: /'COMPLETED'/g, replace: "t('status.completed', 'COMPLETED')" },
  { find: /'PROCESSING'/g, replace: "t('status.processing', 'PROCESSING')" },
  { find: /'PENDING'/g, replace: "t('status.pending', 'PENDING')" }
]);
