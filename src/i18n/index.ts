import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from './locales/en/common.json';
import auth from './locales/en/auth.json';
import onboarding from './locales/en/onboarding.json';
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
    auth,
    onboarding,
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
