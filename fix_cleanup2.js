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

replaceInFile('src/screens/booking/alerts/BookingCounterOfferScreen.tsx', [
  { find: /message:\s*"Hi! I have another engagement that runs late\. Can we shift by 1 hour\? Also due to weekend peak rates, I have slightly adjusted the price\. Let me know if this works!",/g, replace: "message: t('defaultMessage', 'Hi! I have another engagement that runs late. Can we shift by 1 hour? Also due to weekend peak rates, I have slightly adjusted the price. Let me know if this works!')," }
]);

replaceInFile('src/screens/wallet/TransactionHistoryScreen.tsx', [
  { find: /label:\s*'Refund: Session Cancelled'/g, replace: "label: t('txTypes.refundCancelled', 'Refund: Session Cancelled')" }
]);

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

updateJson('src/i18n/locales/en/booking/counterOffer.json', {
  'defaultMessage': 'Hi! I have another engagement that runs late. Can we shift by 1 hour? Also due to weekend peak rates, I have slightly adjusted the price. Let me know if this works!'
});

updateJson('src/i18n/locales/en/wallet/transactionHistory.json', {
  'txTypes.refundCancelled': 'Refund: Session Cancelled'
});
