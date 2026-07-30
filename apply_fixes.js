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

// 1. AccountSettingsScreen
replaceInFile('src/screens/settings/AccountSettingsScreen.tsx', [
  { 
    find: /accessibilityLabel=\{appleConnected \? 'Connected' : t\('actions.connect', 'Connect'\)\}/g, 
    replace: "accessibilityLabel={appleConnected ? t('actions.connected', 'Connected') : t('actions.connect', 'Connect')}" 
  },
  { 
    find: /accessibilityLabel=\{googleConnected \? 'Connected' : t\('actions.connect', 'Connect'\)\}/g, 
    replace: "accessibilityLabel={googleConnected ? t('actions.connected', 'Connected') : t('actions.connect', 'Connect')}" 
  }
]);

// 2. ProfileScreen
replaceInFile('src/screens/profile/ProfileScreen.tsx', [
  {
    find: /accessibilityLabel=\{isBioExpanded \? t\('actions\.showLess', 'Show less'\) : 'Show more'\}/g,
    replace: "accessibilityLabel={isBioExpanded ? t('actions.showLess', 'Show less') : t('actions.showMore', 'Show more')}"
  },
  {
    find: /<Text style=\{styles\.readMoreText\}>\{isBioExpanded \? 'Show less' : t\('actions\.readMore', 'Read more'\)\}<\/Text>/g,
    replace: "<Text style={styles.readMoreText}>{isBioExpanded ? t('actions.showLess', 'Show less') : t('actions.readMore', 'Read more')}</Text>"
  }
]);

// 3. TrustedContactsScreen
replaceInFile('src/screens/safety/TrustedContactsScreen.tsx', [
  {
    find: /title=\{isFromSettings \? 'Save Contacts' : t\('contacts\.btn_complete'\)\}/g,
    replace: "title={isFromSettings ? t('contacts.saveContacts', 'Save Contacts') : t('contacts.btn_complete')}"
  }
]);

// 4. BookingCounterOfferScreen
let counterOfferContent = fs.readFileSync('src/screens/booking/alerts/BookingCounterOfferScreen.tsx', 'utf8');
counterOfferContent = counterOfferContent.replace(/const DEFAULT_MOCK_DATA = \{[\s\S]*?\};\n\n/, '');

const componentDeclaration = `export const BookingCounterOfferScreen = ({ route }: { route: any }) => { \n  const { t } = useTranslation('booking.counterOffer');`;
const newComponentDeclaration = `export const BookingCounterOfferScreen = ({ route }: { route: any }) => { 
  const { t } = useTranslation('booking.counterOffer');

  const DEFAULT_MOCK_DATA = {
    bookingId: 'CB-REQ-8830',
    companionName: 'Aisha Sharma',
    activity: 'Shopping Companion',
    venue: 'DLF Promenade, Vasant Kunj',
    date: 'Sun, 26 Oct 2026',
    
    originalTime: '5:00 PM - 8:00 PM',
    newTime: '6:00 PM - 9:00 PM',
    originalAmount: '₹4,000',
    newAmount: '₹4,500', 
    
    message: t('defaultMessage', 'Hi! I have another engagement that runs late. Can we shift by 1 hour? Also due to weekend peak rates, I have slightly adjusted the price. Let me know if this works!'),
  };`;

counterOfferContent = counterOfferContent.replace(componentDeclaration, newComponentDeclaration);
fs.writeFileSync('src/screens/booking/alerts/BookingCounterOfferScreen.tsx', counterOfferContent);
console.log('Updated BookingCounterOfferScreen.tsx');

// JSON updates
function updateJson(file, newKeys) {
  let content = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [key, value] of Object.entries(newKeys)) {
    const parts = key.split('.');
    let current = content;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  fs.writeFileSync(file, JSON.stringify(content, null, 2) + '\n');
  console.log(`Updated JSON: ${file}`);
}

updateJson('src/i18n/locales/en/profile/main.json', {
  'actions.showLess': 'Show less',
  'actions.showMore': 'Show more',
  'actions.readMore': 'Read more'
});

updateJson('src/i18n/locales/en/onboarding.json', {
  'contacts.saveContacts': 'Save Contacts'
});
