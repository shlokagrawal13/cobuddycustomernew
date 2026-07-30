const fs = require('fs');
const path = require('path');

const fixes = [
  {
    file: 'src/screens/auth/PhoneLoginScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('phone\.', 'Action'\)\}/, replace: "accessibilityLabel={t('phone.a11yFocusInput', 'Focus phone number input')}" }
    ]
  },
  {
    file: 'src/screens/auth/LocationPermissionScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('location\.', 'Go to NotificationPermission'\)\}/, replace: "accessibilityLabel={t('location.a11ySkip', 'Skip location permission')}" },
      { find: /accessibilityLabel=\{t\('location\.', 'crosshairs gps'\)\}/, replace: "accessibilityLabel={t('location.a11yAllowLocation', 'Allow current location')}" },
      { find: /accessibilityLabel=\{t\('location\.', 'Go to NotificationPermission'\)\}/, replace: "accessibilityLabel={t('location.a11yNotNow', 'Not now')}" }
    ]
  },
  {
    file: 'src/screens/auth/NotificationPermissionScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('notification\.', 'Go to BasicProfileSetup'\)\}/, replace: "accessibilityLabel={t('notification.a11ySkip', 'Skip notification permission')}" },
      { find: /accessibilityLabel=\{t\('notification\.', 'Notifications'\)\}/, replace: "accessibilityLabel={t('notification.a11yEnable', 'Enable notifications')}" },
      { find: /accessibilityLabel=\{t\('notification\.', 'Go to BasicProfileSetup'\)\}/, replace: "accessibilityLabel={t('notification.a11yNotNow', 'Not now')}" }
    ]
  },
  {
    file: 'src/screens/auth/OTPVerificationScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('otp\.', 'Refresh'\)\}/, replace: "accessibilityLabel={t('otp.a11yResendCode', 'Resend OTP code')}" },
      { find: /accessibilityLabel=\{t\('otp\.', 'Action'\)\}/, replace: "accessibilityLabel={t('otp.a11yChangePhone', 'Change phone number')}" }
    ]
  },
  {
    file: 'src/screens/safety/TrustedContactsScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('contacts\.', 'Go back'\)\}/, replace: "accessibilityLabel={t('contacts.a11yGoBack', 'Go back')}" },
      { find: /accessibilityLabel=\{t\('contacts\.', 'Action'\)\}/, replace: "accessibilityLabel={t('contacts.a11yOptions', 'More options')}" },
      { find: /accessibilityLabel=\{t\('contacts\.', 'Close'\)\}/, replace: "accessibilityLabel={t('contacts.a11yRemoveContact', 'Remove contact')}" },
      { find: /accessibilityLabel=\{t\('contacts\.', 'Add'\)\}/, replace: "accessibilityLabel={t('contacts.a11yAddContact', 'Add new trusted contact')}" },
      { find: /accessibilityLabel=\{t\('contacts\.', 'Action'\)\}/, replace: "accessibilityLabel={t('contacts.a11ySelectRel', 'Select relationship')}" }
    ]
  },
  {
    file: 'src/screens/onboarding/SafetyTutorialScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('safety\.', 'Go to TrustedContacts'\)\}/, replace: "accessibilityLabel={t('safety.a11yNext', 'Go to next step')}" },
      { find: /accessibilityLabel=\{t\('safety\.', 'Action'\)\}/, replace: "accessibilityLabel={t('safety.a11yLearnMore', 'Learn more about safety')}" }
    ]
  },
  {
    file: 'src/screens/onboarding/LegalConsentScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('consent\.', 'READ\s+→'\)\}/, replace: "accessibilityLabel={t('consent.a11yReadDoc', 'Read document')}" },
      { find: /accessibilityLabel=\{t\('consent\.', 'READ   '\)\}/, replace: "accessibilityLabel={t('consent.a11yReadDoc', 'Read document')}" }
    ]
  },
  {
    file: 'src/screens/onboarding/BasicProfileSetupScreen.tsx',
    replacements: [
      { find: /accessibilityLabel=\{t\('profile\.', 'Action'\)\}/, replace: "accessibilityLabel={t('profile.a11yEditPhoto', 'Upload or edit profile photo')}" },
      { find: /accessibilityLabel=\{t\('profile\.', 'chevron down'\)\}/, replace: "accessibilityLabel={t('profile.a11yGenderDropdown', 'Toggle gender dropdown')}" },
      { find: /accessibilityLabel=\{t\('profile\.', 'g'\)\}/, replace: "accessibilityLabel={t('profile.a11ySelectGender', 'Select gender')}" },
      { find: /accessibilityLabel=\{t\('profile\.', 'Next'\)\}/, replace: "accessibilityLabel={t('profile.a11yChoosePhoto', 'Choose photo from gallery')}" },
      { find: /accessibilityLabel=\{t\('profile\.', 'Next'\)\}/, replace: "accessibilityLabel={t('profile.a11yTakeSelfie', 'Take a selfie')}" },
      { find: /accessibilityLabel=\{t\('profile\.', 'Action'\)\}/, replace: "accessibilityLabel={t('profile.a11ySkipAvatar', 'Skip adding a photo for now')}" }
    ]
  },
  {
    file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
    replacements: [
      { 
        find: /title: 'Card ending in ' \+ raw.slice\(-4\),\s*sub: 'Expires ' \+ \(expiry \|\| '12\/29'\),/, 
        replace: `title: t('card.endingIn', 'Card ending in {{last4}}', { last4: raw.slice(-4) }),\n    sub: t('card.expires', 'Expires {{date}}', { date: expiry || '12/29' }),` 
      }
    ]
  }
];

fixes.forEach(f => {
  let content = fs.readFileSync(f.file, 'utf8');
  let original = content;
  f.replacements.forEach(r => {
    content = content.replace(r.find, r.replace);
  });
  if (content !== original) {
    fs.writeFileSync(f.file, content);
    console.log(`Updated ${f.file}`);
  } else {
    console.log(`No changes made to ${f.file}`);
  }
});
