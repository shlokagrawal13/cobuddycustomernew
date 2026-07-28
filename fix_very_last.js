const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/hooks/useSmartNavigation.ts',
    replacements: [
      { search: 'import { useNavigation } from \'@react-navigation/native\';', replace: 'import { useNavigation } from \'@react-navigation/native\';\nimport { NativeStackNavigationProp } from \'@react-navigation/native-stack\';\nimport { RootStackParamList } from \'../types/navigation\';' }
    ]
  },
  {
    file: 'src/screens/wallet/AddMoneyScreen.tsx',
    replacements: [
      { search: 'import { MOCK_WALLET } from \'../../services/mock\';', replace: '' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawMoneyScreen.tsx',
    replacements: [
      { search: 'import { MOCK_WALLET } from \'../../services/mock\';', replace: '' }
    ]
  },
  {
    file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', type: \'card\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\', isVerified: true, isDefault: true } as any);', replace: 'navigation.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', type: \'card\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\', isVerified: true, isDefault: true } as any });' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'AddMoneyScreen\' as any, { selectedMethod: method });', replace: 'navigation.navigate(\'AddMoneyScreen\' as any, { selectedMethod: method as any });' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawalMethodsScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'WithdrawMoneyScreen\' as any, { selectedMethod: method });', replace: 'navigation.navigate(\'WithdrawMoneyScreen\' as any, { selectedMethod: method as any });' },
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
