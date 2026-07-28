const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/hooks/useSmartNavigation.ts',
    replacements: [
      { search: 'navigation.navigate(routeName as never, params as never);', replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(routeName, params);' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingRequestSentScreen.tsx',
    replacements: [
      { search: 'route }: { route: RouteProp<RootStackParamList, \'BookingRequestSentScreen\'> }', replace: 'route }: { route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string> }' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingAcceptedScreen.tsx',
    replacements: [
      { search: 'route }: { route: RouteProp<RootStackParamList, \'BookingAcceptedScreen\'> }', replace: 'route }: { route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string> }' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingDeclinedScreen.tsx',
    replacements: [
      { search: 'route }: { route: RouteProp<RootStackParamList, \'BookingDeclinedScreen\'> }', replace: 'route }: { route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string> }' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
    replacements: [
      { search: 'route }: { route: RouteProp<RootStackParamList, \'BookingCounterOfferScreen\'> }', replace: 'route }: { route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string> }' }
    ]
  },
  {
    file: 'src/screens/home/CompanionProfileScreen.tsx',
    replacements: [
      { search: '  import { NativeSyntheticEvent, NativeScrollEvent } from \'react-native\';\n  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {', replace: '  const onMomentumScrollEnd = (event: import(\'react-native\').NativeSyntheticEvent<import(\'react-native\').NativeScrollEvent>) => {' }
    ]
  },
  {
    file: 'src/screens/home/NotificationsScreen.tsx',
    replacements: [
      { search: 'MOCK_NOTIFICATIONS as NotificationItem[]', replace: 'MOCK_NOTIFICATIONS as unknown as NotificationItem[]' }
    ]
  },
  {
    file: 'src/screens/profile/ProfileScreen.tsx',
    replacements: [
      { search: '} catch (error: unknown) {\n      console.error(\'Error applying updates:\', error);\n      Alert.alert(t(\'errorTitle\', \'Error\'), t(\'errorMessage\', \'Failed to apply updates. Please try again.\'));\n    }', replace: '} catch (error: unknown) {\n      console.error(\'Error applying updates:\', (error as Error).message);\n      Alert.alert(t(\'errorTitle\', \'Error\'), t(\'errorMessage\', \'Failed to apply updates. Please try again.\'));\n    }' }
    ]
  },
  {
    file: 'src/screens/wallet/AddMoneyScreen.tsx',
    replacements: [
      { search: 'useState<typeof MOCK_PAYMENT_METHODS[0]>(DEFAULT_PAYMENT as typeof MOCK_PAYMENT_METHODS[0]);', replace: 'useState<any>(DEFAULT_PAYMENT as any);' }, // fallback
      { search: 'const handleMethodPress = (method: Record<string, unknown>) => {', replace: 'const handleMethodPress = (method: any) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawMoneyScreen.tsx',
    replacements: [
      { search: 'useState<typeof MOCK_WITHDRAWAL_METHODS[0]>(DEFAULT_PAYOUT as typeof MOCK_WITHDRAWAL_METHODS[0]);', replace: 'useState<any>(DEFAULT_PAYOUT as any);' } // fallback
    ]
  },
  {
    file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\' } });', replace: 'navigation.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', type: \'card\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\', isDefault: true, isVerified: true } });' },
      { search: 'navigation.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', type: \'card\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\', isVerified: true, isDefault: true } });', replace: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', type: \'card\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\', isVerified: true, isDefault: true } });' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: typeof MOCK_PAYMENT_METHODS[0]) => {', replace: 'const handleMethodPress = (method: { id: string; type: string; icon: string; title: string; sub: string; isDefault: boolean; isVerified?: boolean; }) => {' },
      { search: 'method: { id: string; type: string; icon: string; title: string; sub: string; isDefault: boolean; isVerified?: boolean; }', replace: 'method: { id: string; type: string; icon: string; title: string; sub: string; isDefault?: boolean; isVerified?: boolean; }' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawalMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: typeof MOCK_WITHDRAWAL_METHODS[0]) => {', replace: 'const handleMethodPress = (method: { id: string; type: string; icon: string; title: string; sub: string; isVerified: boolean; }) => {' },
      { search: 'const handleMethodPress = (method: Record<string, unknown>) => {', replace: 'const handleMethodPress = (method: { id: string; type: string; icon: string; title: string; sub: string; isVerified: boolean; }) => {' }
    ]
  }
];

let totalReplaced = 0;

replacements.forEach(({ file, replacements: fileReplacements }) => {
  const fullPath = path.join('C:\\cobuddycustomernew', file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  let fileModified = false;
  
  fileReplacements.forEach(({ search, replace }) => {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fileModified = true;
      totalReplaced++;
    }
  });

  if (fileModified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Total replacements made: ${totalReplaced}`);
