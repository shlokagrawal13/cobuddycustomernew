const fs = require('fs');

const newTranslations = [
  {
    file: 'src/i18n/locales/en/onboarding/location.json',
    keys: { "a11ySkip": "Skip location permission", "a11yAllowLocation": "Allow current location", "a11yNotNow": "Not now" }
  },
  {
    file: 'src/i18n/locales/en/onboarding/notification.json',
    keys: { "a11ySkip": "Skip notification permission", "a11yEnable": "Enable notifications", "a11yNotNow": "Not now" }
  }
];

newTranslations.forEach(tr => {
  if (fs.existsSync(tr.file)) {
    const data = JSON.parse(fs.readFileSync(tr.file, 'utf8'));
    
    for (const [key, val] of Object.entries(tr.keys)) {
      if (typeof val === 'object') {
        data[key] = { ...data[key], ...val };
      } else {
        data[key] = val;
      }
    }
    fs.writeFileSync(tr.file, JSON.stringify(data, null, 2));
    console.log(`Updated ${tr.file}`);
  } else {
    console.log(`File not found: ${tr.file}`);
  }
});
