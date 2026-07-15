import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from './locales/en/common.json';
import authPhone from './locales/en/auth/phone.json';
import authOtp from './locales/en/auth/otp.json';
import onboardingWelcome from './locales/en/onboarding/welcome.json';
import onboardingConsent from './locales/en/onboarding/consent.json';
import onboardingLocation from './locales/en/onboarding/location.json';
import onboardingNotification from './locales/en/onboarding/notification.json';
import onboardingProfile from './locales/en/onboarding/profile.json';
import onboardingInterests from './locales/en/onboarding/interests.json';
import onboardingSafety from './locales/en/onboarding/safety.json';
import onboardingContacts from './locales/en/onboarding/contacts.json';

// Main App Namespaces
import home from './locales/en/home.json';
import discover from './locales/en/discover.json';
import companionProfile from './locales/en/companionProfile.json';
import booking from './locales/en/booking.json';
import chat from './locales/en/chat.json';
import safety from './locales/en/safety.json';
import profile from './locales/en/profile.json';
import systemStates from './locales/en/systemStates.json';

const resources = {
  en: {
    common,
    auth: {
      phone: authPhone,
      otp: authOtp
    },
    onboarding: {
      welcome: onboardingWelcome,
      consent: onboardingConsent,
      location: onboardingLocation,
      notification: onboardingNotification,
      profile: onboardingProfile,
      interests: onboardingInterests,
      safety: onboardingSafety,
      contacts: onboardingContacts
    },
    home,
    discover,
    companionProfile,
    booking,
    chat,
    safety,
    profile,
    systemStates
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
