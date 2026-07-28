const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/screens/wallet/AddMoneyScreen.tsx',
    replacements: [
      { search: 'const [selectedMethod, setSelectedMethod] = useState(DEFAULT_PAYMENT);', replace: 'const [selectedMethod, setSelectedMethod] = useState<any>(DEFAULT_PAYMENT);' },
      { search: 'import { MOCK_WALLET } from \'../../services/mock\';', replace: 'import { MOCK_WALLET, MOCK_PAYMENT_METHODS } from \'../../services/mock\';' },
      { search: 'useState<any>(DEFAULT_PAYMENT);', replace: 'useState<typeof MOCK_PAYMENT_METHODS[0]>(DEFAULT_PAYMENT as typeof MOCK_PAYMENT_METHODS[0]);' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawMoneyScreen.tsx',
    replacements: [
      { search: 'const [selectedMethod, setSelectedMethod] = useState(DEFAULT_PAYOUT);', replace: 'const [selectedMethod, setSelectedMethod] = useState<any>(DEFAULT_PAYOUT);' },
      { search: 'import { MOCK_WALLET } from \'../../services/mock\';', replace: 'import { MOCK_WALLET, MOCK_WITHDRAWAL_METHODS } from \'../../services/mock\';' },
      { search: 'useState<any>(DEFAULT_PAYOUT);', replace: 'useState<typeof MOCK_WITHDRAWAL_METHODS[0]>(DEFAULT_PAYOUT as typeof MOCK_WITHDRAWAL_METHODS[0]);' }
    ]
  },
  {
    file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\' } });', replace: 'navigation.navigate(\'PaymentMethodsScreen\', { mode: \'select\', newMethod: { id: \'npm\', icon: \'credit-card\', title: \'Credit Card ending in 4242\', sub: \'Expiry 12/26\', type: \'card\', isVerified: true, isDefault: true } });' }
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
