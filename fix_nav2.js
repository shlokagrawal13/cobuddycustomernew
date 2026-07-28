const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/screens/safety/SafetyGuidelinesScreen.tsx',
    search: 'navigation.navigate(\'MainTabNavigator\' as never, { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } } as never)',
    replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } })'
  },
  {
    file: 'src/screens/safety/SafetyHubScreen.tsx',
    search: 'navigation.navigate(\'MainTabNavigator\' as never, { screen: \'ProfileTab\', params: { screen: \'SafetySettingsScreen\' } } as never)',
    replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ProfileTab\', params: { screen: \'SafetySettingsScreen\' } })'
  },
  {
    file: 'src/screens/session/ArrivalCheckInScreen.tsx',
    search: 'navigation.navigate(\'MainTabNavigator\' as never, {',
    replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void };\n              nav.navigate(\'MainTabNavigator\', {'
  },
  {
    file: 'src/screens/support/HelpCenterScreen.tsx',
    search: 'navigation.navigate(\'MainTabNavigator\' as never, { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } } as never)',
    replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } })'
  },
  {
    file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
    search: 'navigation.navigate(\'MainTabNavigator\' as any, { \r\n      screen: \'BookingsTab\' \r\n    })',
    replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void };\n    nav.navigate(\'MainTabNavigator\', { screen: \'BookingsTab\' })'
  },
  {
    file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
    search: 'navigation.navigate(\'MainTabNavigator\' as any, { \n      screen: \'BookingsTab\' \n    })',
    replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void };\n    nav.navigate(\'MainTabNavigator\', { screen: \'BookingsTab\' })'
  }
];

replacements.forEach(({ file, search, replace }) => {
  const fullPath = path.join('C:\\cobuddycustomernew', file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes(search)) {
    content = content.replace(search, replace);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else if (file.includes('CounterOffer')) {
    // manual fallback for whitespace issues
    content = content.replace(/navigation\.navigate\('MainTabNavigator' as any, \{\s*screen: 'BookingsTab'\s*\}\)/, 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void };\n    nav.navigate(\'MainTabNavigator\', { screen: \'BookingsTab\' })');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file} via regex`);
  }
});
