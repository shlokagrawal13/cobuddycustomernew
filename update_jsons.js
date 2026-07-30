const fs = require('fs');

function updateJson(file, newKeys) {
  let content = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  for (const [key, value] of Object.entries(newKeys)) {
    const parts = key.split('.');
    let current = content;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  
  fs.writeFileSync(file, JSON.stringify(content, null, 2) + '\n');
  console.log(`Updated JSON: ${file}`);
}

updateJson('src/i18n/locales/en/wallet/addBankAccount.json', {
  'bank.verifiedTitle': 'Verified Bank',
  'bank.endingIn': 'Account ending in {{last4}}'
});

updateJson('src/i18n/locales/en/wallet/paymentMethods.json', {
  'upi.title': 'UPI ID'
});

updateJson('src/i18n/locales/en/wallet/withdrawalMethods.json', {
  'upi.title': 'UPI ID'
});

updateJson('src/i18n/locales/en/bookings/cancel.json', {
  'fallbackCompanion': 'Companion'
});

updateJson('src/i18n/locales/en/bookings/modify.json', {
  'searchVenuePlaceholder': 'Search safe public venue...'
});

updateJson('src/i18n/locales/en/home/discover.json', {
  'filter.any': 'Any',
  'filter.male': 'Male',
  'filter.female': 'Female'
});

updateJson('src/i18n/locales/en/profile/edit.json', {
  'selectLocation': 'Select Location',
  'selectLanguages': 'Select Languages'
});

updateJson('src/i18n/locales/en/settings/accountSettings.json', {
  'actions.connected': 'Connected',
  'actions.connect': 'Connect'
});

updateJson('src/i18n/locales/en/verify/document.json', {
  'imageAccepted': 'Image accepted',
  'tapToSelectImage': 'Tap to select image'
});

updateJson('src/i18n/locales/en/verify/processing.json', {
  'status.completed': 'COMPLETED',
  'status.processing': 'PROCESSING',
  'status.pending': 'PENDING'
});
