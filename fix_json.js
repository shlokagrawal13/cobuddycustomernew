const fs = require('fs');
const path = require('path');

const newTranslations = [
  {
    file: 'src/i18n/locales/en/auth/phone.json',
    keys: { "a11yFocusInput": "Focus phone number input" }
  },
  {
    file: 'src/i18n/locales/en/auth/location.json',
    keys: { "a11ySkip": "Skip location permission", "a11yAllowLocation": "Allow current location", "a11yNotNow": "Not now" }
  },
  {
    file: 'src/i18n/locales/en/auth/notification.json',
    keys: { "a11ySkip": "Skip notification permission", "a11yEnable": "Enable notifications", "a11yNotNow": "Not now" }
  },
  {
    file: 'src/i18n/locales/en/auth/otp.json',
    keys: { "a11yResendCode": "Resend OTP code", "a11yChangePhone": "Change phone number" }
  },
  {
    file: 'src/i18n/locales/en/onboarding/contacts.json',
    keys: { "a11yGoBack": "Go back", "a11yOptions": "More options", "a11yRemoveContact": "Remove contact", "a11yAddContact": "Add new trusted contact", "a11ySelectRel": "Select relationship" }
  },
  {
    file: 'src/i18n/locales/en/onboarding/safety.json',
    keys: { "a11yNext": "Go to next step", "a11yLearnMore": "Learn more about safety" }
  },
  {
    file: 'src/i18n/locales/en/onboarding/consent.json',
    keys: { "a11yReadDoc": "Read document" }
  },
  {
    file: 'src/i18n/locales/en/onboarding/profile.json',
    keys: { "a11yEditPhoto": "Upload or edit profile photo", "a11yGenderDropdown": "Toggle gender dropdown", "a11ySelectGender": "Select gender", "a11yChoosePhoto": "Choose photo from gallery", "a11yTakeSelfie": "Take a selfie", "a11ySkipAvatar": "Skip adding a photo for now" }
  },
  {
    file: 'src/i18n/locales/en/wallet/addPaymentMethod.json',
    keys: { "card": { "endingIn": "Card ending in {{last4}}", "expires": "Expires {{date}}" } }
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
