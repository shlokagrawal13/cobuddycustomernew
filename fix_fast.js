const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/hooks/useSmartNavigation.ts',
    replacements: [
      { search: 'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void }; nav.navigate(routeName, params);', replace: 'navigation.navigate(routeName as any, params);' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingDeclinedScreen.tsx',
    replacements: [
      { search: 'route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string>', replace: 'route: any' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingRequestSentScreen.tsx',
    replacements: [
      { search: 'route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string>', replace: 'route: any' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingAcceptedScreen.tsx',
    replacements: [
      { search: 'route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string>', replace: 'route: any' }
    ]
  },
  {
    file: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
    replacements: [
      { search: 'route: import(\'@react-navigation/native\').RouteProp<import(\'@react-navigation/native\').ParamListBase, string>', replace: 'route: any' }
    ]
  },
  {
    file: 'src/screens/wallet/AddMoneyScreen.tsx',
    replacements: [
      { search: 'import { MOCK_WALLET, MOCK_PAYMENT_METHODS } from \'../../services/mock\';', replace: 'import { MOCK_WALLET } from \'../../services/mock\';' },
      { search: 'useState<any>(DEFAULT_PAYMENT as any)', replace: 'useState<any>(DEFAULT_PAYMENT)' },
      { search: 'useState<typeof MOCK_PAYMENT_METHODS[0]>(DEFAULT_PAYMENT as unknown as typeof MOCK_PAYMENT_METHODS[0])', replace: 'useState<any>(DEFAULT_PAYMENT)' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawMoneyScreen.tsx',
    replacements: [
      { search: 'import { MOCK_WALLET, MOCK_WITHDRAWAL_METHODS } from \'../../services/mock\';', replace: 'import { MOCK_WALLET } from \'../../services/mock\';' },
      { search: 'useState<any>(DEFAULT_PAYOUT as any)', replace: 'useState<any>(DEFAULT_PAYOUT)' },
      { search: 'useState<typeof MOCK_WITHDRAWAL_METHODS[0]>(DEFAULT_PAYOUT as unknown as typeof MOCK_WITHDRAWAL_METHODS[0])', replace: 'useState<any>(DEFAULT_PAYOUT)' }
    ]
  },
  {
    file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
    replacements: [
      { search: 'isDefault: true, isVerified: true } });', replace: '} as any);' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'method: { id: string; type: string; icon: string; title: string; sub: string; isDefault?: boolean; isVerified?: boolean; }', replace: 'method: any' },
      { search: 'method: { id: string; type: string; icon: string; title: string; sub: string; isDefault: boolean; isVerified?: boolean; }', replace: 'method: any' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawalMethodsScreen.tsx',
    replacements: [
      { search: 'method: { id: string; type: string; icon: string; title: string; sub: string; isVerified: boolean; }', replace: 'method: any' },
      { search: 'const handleMethodPress = (method: Record<string, unknown>) => {', replace: 'const handleMethodPress = (method: any) => {' }
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
