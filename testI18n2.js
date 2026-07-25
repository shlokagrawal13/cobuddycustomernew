const i18n = require('i18next');

const resources = {
  en: {
    'home.dashboard': { greeting: "Hello dashboard" },
    onboarding: { welcome: { title: "Hello welcome" } }
  }
};

i18n.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['home.dashboard', 'onboarding']
}, () => {
  const t1 = i18n.getFixedT('en', 'home.dashboard');
  console.log("t1('greeting') ->", t1('greeting')); // Should print "Hello dashboard"

  const t2 = i18n.getFixedT('en', 'onboarding');
  console.log("t2('welcome.title') ->", t2('welcome.title')); // Should print "Hello welcome"
});
