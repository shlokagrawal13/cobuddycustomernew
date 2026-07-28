const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/services/mock/notifications.mock.ts',
    replacements: [
      { search: 'export const MOCK_NOTIFICATIONS: any[] = [', replace: 'export const MOCK_NOTIFICATIONS: Record<string, unknown>[] = [' }
    ]
  },
  {
    file: 'src/types/navigation/index.ts',
    replacements: [
      { search: 'AddMoneyScreen: { selectedMethod?: any } | undefined;', replace: 'AddMoneyScreen: { selectedMethod?: Record<string, unknown> } | undefined;' },
      { search: 'WithdrawMoneyScreen: { selectedMethod?: any } | undefined;', replace: 'WithdrawMoneyScreen: { selectedMethod?: Record<string, unknown> } | undefined;' },
      { search: 'PaymentMethodsScreen: { mode?: \'select\'; currentId?: string; newMethod?: any } | undefined;', replace: 'PaymentMethodsScreen: { mode?: \'select\'; currentId?: string; newMethod?: Record<string, unknown> } | undefined;' },
      { search: 'WithdrawalMethodsScreen: { currentId?: string; newMethod?: any } | undefined;', replace: 'WithdrawalMethodsScreen: { currentId?: string; newMethod?: Record<string, unknown> } | undefined;' },
      { search: 'MainTabs: { screen?: string; params?: any } | undefined;', replace: 'MainTabs: { screen?: string; params?: Record<string, unknown> } | undefined;' },
      { search: 'MainTabNavigator: { screen?: string; params?: any } | undefined;', replace: 'MainTabNavigator: { screen?: string; params?: Record<string, unknown> } | undefined;' }
    ]
  },
  {
    file: 'src/navigation/MainTabNavigator.tsx',
    replacements: [
      { search: 'const getTabBarStyle = (route: any) => {', replace: 'import { RouteProp, ParamListBase } from \'@react-navigation/native\';\n\n  const getTabBarStyle = (route: RouteProp<ParamListBase, string>) => {' }
    ]
  },
  {
    file: 'src/screens/bookings/BookingsListScreen.tsx',
    replacements: [
      { search: 'const handlePressCard = (booking: any) => {', replace: 'const handlePressCard = (booking: Record<string, unknown>) => {' }
    ]
  },
  {
    file: 'src/screens/home/CompanionProfileScreen.tsx',
    replacements: [
      { search: 'export const CompanionProfileScreen = ({ route }: any) => {', replace: 'import { RouteProp } from \'@react-navigation/native\';\nimport { RootStackParamList } from \'../../types/navigation\';\n\nexport const CompanionProfileScreen = ({ route }: { route: RouteProp<RootStackParamList, \'CompanionProfileScreen\'> }) => {' },
      { search: 'const onMomentumScrollEnd = (event: any) => {', replace: 'import { NativeSyntheticEvent, NativeScrollEvent } from \'react-native\';\n  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {' }
    ]
  },
  {
    file: 'src/screens/home/DiscoverScreen.tsx',
    replacements: [
      { search: 'const CustomSlider = ({ value, onValueChange, min, max, step, prefix = \'\', suffix = \'\' }: any) => {', replace: 'const CustomSlider = ({ value, onValueChange, min, max, step, prefix = \'\', suffix = \'\' }: { value: number; onValueChange: (v: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string; }) => {' },
      { search: 'const updateValue = (e: any, isRelease = false) => {', replace: 'const updateValue = (e: import("react-native").GestureResponderEvent, isRelease = false) => {' }
    ]
  },
  {
    file: 'src/screens/profile/ProfileScreen.tsx',
    replacements: [
      { search: '} catch (error: any) {', replace: '} catch (error: unknown) {' }
    ]
  },
  {
    file: 'src/screens/profile/SavedProfilesScreen.tsx',
    replacements: [
      { search: 'const [selectedProfile, setSelectedProfile] = useState<any>(null);', replace: 'const [selectedProfile, setSelectedProfile] = useState<Record<string, unknown> | null>(null);' },
      { search: 'const openOptions = (profile: any) => {', replace: 'const openOptions = (profile: Record<string, unknown>) => {' },
      { search: 'const renderItem = ({ item }: { item: any }) => (', replace: 'const renderItem = ({ item }: { item: Record<string, unknown> }) => (' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: any) => {', replace: 'const handleMethodPress = (method: Record<string, unknown>) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/TransactionDetailScreen.tsx',
    replacements: [
      { search: '{tx.breakdown.map((item: any, i: number) => (', replace: '{tx.breakdown.map((item: Record<string, unknown>, i: number) => (' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawalMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: any) => {', replace: 'const handleMethodPress = (method: Record<string, unknown>) => {' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingAcceptedScreen.tsx',
    replacements: [
      { search: 'export const BookingAcceptedScreen = ({ route }: any) => { ', replace: 'import { RouteProp } from \'@react-navigation/native\';\nimport { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingAcceptedScreen = ({ route }: { route: RouteProp<RootStackParamList, \'BookingAcceptedScreen\'> }) => { ' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
    replacements: [
      { search: 'export const BookingCounterOfferScreen = ({ route }: any) => { ', replace: 'import { RouteProp } from \'@react-navigation/native\';\nimport { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingCounterOfferScreen = ({ route }: { route: RouteProp<RootStackParamList, \'BookingCounterOfferScreen\'> }) => { ' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingDeclinedScreen.tsx',
    replacements: [
      { search: 'export const BookingDeclinedScreen = ({ route }: any) => { ', replace: 'import { RouteProp } from \'@react-navigation/native\';\nimport { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingDeclinedScreen = ({ route }: { route: RouteProp<RootStackParamList, \'BookingDeclinedScreen\'> }) => { ' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingRequestSentScreen.tsx',
    replacements: [
      { search: 'export const BookingRequestSentScreen = ({ route }: any) => { ', replace: 'import { RouteProp } from \'@react-navigation/native\';\nimport { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingRequestSentScreen = ({ route }: { route: RouteProp<RootStackParamList, \'BookingRequestSentScreen\'> }) => { ' }
    ]
  },
  {
    file: 'src/screens/safety/SafetyGuidelinesScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'MainTabNavigator\' as any, { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } })', replace: 'navigation.navigate(\'MainTabNavigator\' as never, { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } } as never)' }
    ]
  },
  {
    file: 'src/screens/safety/SafetyHubScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'MainTabNavigator\' as any, { screen: \'ProfileTab\', params: { screen: \'SafetySettingsScreen\' } })', replace: 'navigation.navigate(\'MainTabNavigator\' as never, { screen: \'ProfileTab\', params: { screen: \'SafetySettingsScreen\' } } as never)' }
    ]
  },
  {
    file: 'src/screens/session/ArrivalCheckInScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'MainTabNavigator\' as any, {', replace: 'navigation.navigate(\'MainTabNavigator\' as never, {' }
    ]
  },
  {
    file: 'src/screens/support/HelpCenterScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'MainTabNavigator\' as any, { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } })', replace: 'navigation.navigate(\'MainTabNavigator\' as never, { screen: \'ChatTab\', params: { screen: \'ConciergeChatScreen\' } } as never)' }
    ]
  }
];

let totalReplaced = 0;

replacements.forEach(({ file, replacements: fileReplacements }) => {
  const fullPath = path.join('C:\\cobuddycustomernew', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let fileModified = false;
  
  fileReplacements.forEach(({ search, replace }) => {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fileModified = true;
      totalReplaced++;
    } else {
      console.warn(`Could not find "${search}" in ${file}`);
    }
  });

  if (fileModified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Total replacements made: ${totalReplaced}`);
