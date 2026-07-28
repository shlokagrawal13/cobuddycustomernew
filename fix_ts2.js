const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/screens/booking/alerts/BookingAcceptedScreen.tsx',
    replacements: [
      { search: 'import { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingAcceptedScreen', replace: '\nexport const BookingAcceptedScreen' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
    replacements: [
      { search: 'import { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingCounterOfferScreen', replace: '\nexport const BookingCounterOfferScreen' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingDeclinedScreen.tsx',
    replacements: [
      { search: 'import { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingDeclinedScreen', replace: '\nexport const BookingDeclinedScreen' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingRequestSentScreen.tsx',
    replacements: [
      { search: 'import { RootStackParamList } from \'../../../types/navigation\';\n\nexport const BookingRequestSentScreen', replace: '\nexport const BookingRequestSentScreen' }
    ]
  },
  {
    file: 'src/screens/home/CompanionProfileScreen.tsx',
    replacements: [
      { search: 'id\' does not exist', replace: '' } // manual fix needed
    ]
  },
  {
    file: 'src/navigation/MainTabNavigator.tsx',
    replacements: [
      { search: 'import { RouteProp, ParamListBase } from \'@react-navigation/native\';\n\n  const getTabBarStyle', replace: '  const getTabBarStyle' },
      { search: 'import { createBottomTabNavigator } from \'@react-navigation/bottom-tabs\';', replace: 'import { createBottomTabNavigator } from \'@react-navigation/bottom-tabs\';\nimport { RouteProp, ParamListBase } from \'@react-navigation/native\';' }
    ]
  },
  {
    file: 'src/screens/bookings/BookingsListScreen.tsx',
    replacements: [
      { search: 'const handlePressCard = (booking: { id: string; [key: string]: unknown }) => {', replace: 'const handlePressCard = (booking: { id: string; companionName: string; date: string; time: string; type: string; displayStatus: string; }) => {' }
    ]
  },
  {
    file: 'src/screens/profile/SavedProfilesScreen.tsx',
    replacements: [
      { search: 'const renderItem = ({ item }: { item: { id: string; name: string; age: number; type: string; image: string; rating: number; reviews: number; hourlyRate: number; } }) => (', replace: 'const renderItem = ({ item }: { item: { id: string; name: string; age: number; type: string; image: string; rating: number; reviews: number; rate: string; location: string; tags: string[]; } }) => (' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'method: { id: string; type: string; icon: string; title: string; sub: string; isDefault: boolean; }', replace: 'method: { id: string; type: string; icon: string; title: string; sub: string; isDefault: boolean; isVerified?: boolean; }' },
      { search: 'isVerified?: boolean | undefined;', replace: 'isVerified?: boolean; isDefault?: boolean;' }
    ]
  },
  {
    file: 'src/screens/wallet/TransactionDetailScreen.tsx',
    replacements: [
      { search: 'item: { label: string; amount: number; isDeduction?: boolean; }', replace: 'item: { label: string; amount: string; isDeduction?: boolean; value?: string; }' }
    ]
  },
  {
    file: 'src/types/navigation/index.ts',
    replacements: [
      { search: 'newMethod?: { id: string; type: string; title: string; sub: string; icon: string; isVerified?: boolean; }', replace: 'newMethod?: { id: string; type: string; title: string; sub: string; icon: string; isVerified?: boolean; isDefault?: boolean; }' }
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
