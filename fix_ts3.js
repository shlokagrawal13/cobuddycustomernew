const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/screens/profile/SavedProfilesScreen.tsx',
    replacements: [
      { search: 'const renderItem = ({ item }: { item: { id: string; name: string; age: number; type: string; image: string; rating: number; reviews: number; rate: string; location: string; tags: string[]; } }) => (', replace: 'const renderItem = ({ item }: { item: typeof MOCK_SAVED[0] }) => (' },
      { search: 'const [selectedProfile, setSelectedProfile] = useState<{ id: string; [key: string]: unknown } | null>(null);', replace: 'const [selectedProfile, setSelectedProfile] = useState<typeof MOCK_SAVED[0] | null>(null);' },
      { search: 'const openOptions = (profile: { id: string; [key: string]: unknown }) => {', replace: 'const openOptions = (profile: typeof MOCK_SAVED[0]) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: { id: string; type: string; icon: string; title: string; sub: string; isDefault: boolean; isVerified?: boolean; }) => {', replace: 'const handleMethodPress = (method: typeof MOCK_PAYMENT_METHODS[0]) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawalMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: { id: string; type: string; icon: string; title: string; sub: string; isVerified: boolean; }) => {', replace: 'const handleMethodPress = (method: typeof MOCK_WITHDRAWAL_METHODS[0]) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawMoneyScreen.tsx',
    replacements: [
      { search: 'const [selectedMethod, setSelectedMethod] = useState<Record<string, unknown> | null>(null);', replace: 'const [selectedMethod, setSelectedMethod] = useState<typeof MOCK_WITHDRAWAL_METHODS[0] | null>(null);' }
    ]
  },
  {
    file: 'src/screens/wallet/AddMoneyScreen.tsx',
    replacements: [
      { search: 'const [selectedMethod, setSelectedMethod] = useState<Record<string, unknown> | null>(null);', replace: 'const [selectedMethod, setSelectedMethod] = useState<typeof MOCK_PAYMENT_METHODS[0] | null>(null);' }
    ]
  },
  {
    file: 'src/screens/bookings/BookingsListScreen.tsx',
    replacements: [
      { search: 'const handlePressCard = (booking: { id: string; companionName: string; date: string; time: string; type: string; displayStatus: string; }) => {', replace: 'const handlePressCard = (booking: typeof MOCK_BOOKINGS[0]) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/TransactionDetailScreen.tsx',
    replacements: [
      { search: 'item: { label: string; amount: string; isDeduction?: boolean; value?: string; }', replace: 'item: typeof tx.breakdown[0]' }
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
