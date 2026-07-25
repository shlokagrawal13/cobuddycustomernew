const i18n = require('i18next');

const resources = {
  en: {
    home: {
      dashboard: { greeting: "Hello from dashboard" },
      notifications: { title: "Notifications" }
    },
    'home.dashboard': {
      greeting: "Hello from flat home.dashboard"
    }
  }
};

i18n.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['home.dashboard', 'home']
}, () => {
  const t1 = i18n.getFixedT('en', 'home.dashboard');
  console.log("Result using 'home.dashboard' namespace:", t1('greeting'));

  const t2 = i18n.getFixedT('en', 'home');
  console.log("Result using 'home' namespace (dashboard.greeting):", t2('dashboard.greeting'));
  
  const t3 = i18n.getFixedT('en', ['home.dashboard', 'home']);
  console.log("Result using fallback array namespace:", t3('greeting'));
});
