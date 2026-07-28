const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/types/navigation/index.ts',
    replacements: [
      { search: 'selectedMethod?: Record<string, unknown>', replace: 'selectedMethod?: { id: string; type: string; title: string; sub: string; icon: string; }' },
      { search: 'newMethod?: Record<string, unknown>', replace: 'newMethod?: { id: string; type: string; title: string; sub: string; icon: string; isVerified?: boolean; }' }
    ]
  },
  {
    file: 'src/screens/bookings/BookingsListScreen.tsx',
    replacements: [
      { search: 'const handlePressCard = (booking: Record<string, unknown>) => {', replace: 'const handlePressCard = (booking: { id: string; [key: string]: unknown }) => {' }
    ]
  },
  {
    file: 'src/screens/profile/SavedProfilesScreen.tsx',
    replacements: [
      { search: 'const [selectedProfile, setSelectedProfile] = useState<Record<string, unknown> | null>(null);', replace: 'const [selectedProfile, setSelectedProfile] = useState<{ id: string; [key: string]: unknown } | null>(null);' },
      { search: 'const openOptions = (profile: Record<string, unknown>) => {', replace: 'const openOptions = (profile: { id: string; [key: string]: unknown }) => {' },
      { search: 'const renderItem = ({ item }: { item: Record<string, unknown> }) => (', replace: 'const renderItem = ({ item }: { item: { id: string; name: string; age: number; type: string; image: string; rating: number; reviews: number; hourlyRate: number; } }) => (' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: Record<string, unknown>) => {', replace: 'const handleMethodPress = (method: { id: string; type: string; icon: string; title: string; sub: string; isDefault: boolean; }) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/WithdrawalMethodsScreen.tsx',
    replacements: [
      { search: 'const handleMethodPress = (method: Record<string, unknown>) => {', replace: 'const handleMethodPress = (method: { id: string; type: string; icon: string; title: string; sub: string; isVerified: boolean; }) => {' }
    ]
  },
  {
    file: 'src/screens/wallet/TransactionDetailScreen.tsx',
    replacements: [
      { search: '{tx.breakdown.map((item: Record<string, unknown>, i: number) => (', replace: '{tx.breakdown.map((item: { label: string; amount: number; isDeduction?: boolean; }, i: number) => (' }
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
