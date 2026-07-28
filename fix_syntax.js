const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/screens/safety/SafetyGuidelinesScreen.tsx',
    search: 'onPress={() => const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } })}',
    replace: 'onPress={() => { const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } }); }}'
  },
  {
    file: 'src/screens/safety/SafetyHubScreen.tsx',
    search: 'onPress={() => const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ProfileTab\', params: { screen: \'SafetySettingsScreen\' } })}',
    replace: 'onPress={() => { const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ProfileTab\', params: { screen: \'SafetySettingsScreen\' } }); }}'
  },
  {
    file: 'src/screens/support/HelpCenterScreen.tsx',
    search: 'onPress={() => const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } })}',
    replace: 'onPress={() => { const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\', { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } }); }}'
  },
  {
    file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
    search: 'navigation.navigate(\'MainTabNavigator\' as any',
    replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'MainTabNavigator\''
  },
  {
    file: 'src/services/mock/notifications.mock.ts',
    search: 'export const MOCK_NOTIFICATIONS: any[] = [',
    replace: 'export const MOCK_NOTIFICATIONS: Record<string, unknown>[] = ['
  },
  {
    file: 'src/screens/home/NotificationsScreen.tsx',
    search: 'const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);',
    replace: 'const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS as NotificationItem[]);'
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
  } else {
    console.log(`Not found in ${file}`);
  }
});
