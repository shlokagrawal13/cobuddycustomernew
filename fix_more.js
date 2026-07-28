const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/screens/bookings/CancelBookingScreen.tsx',
    replacements: [
      { search: '{booking?.companion?.name || \'Companion\'}', replace: '{booking?.companionName || \'Companion\'}' }
    ]
  },
  {
    file: 'src/screens/bookings/ModifyBookingScreen.tsx',
    replacements: [
      { search: '{booking?.venue?.name || \'Blue Tokai Coffee, CP\'}', replace: '{booking?.venue || \'Blue Tokai Coffee, CP\'}' }
    ]
  },
  {
    file: 'src/screens/bookings/DisputeRefundScreen.tsx',
    replacements: [
      { search: '{booking?.companion?.name || \'Companion\'}', replace: '{booking?.companionName || \'Companion\'}' }
    ]
  },
  {
    file: 'src/screens/home/CompanionProfileScreen.tsx',
    replacements: [
      { search: 'import { RootStackParamList } from \'../../types/navigation\';', replace: '' },
      { search: 'import { RouteProp } from \'@react-navigation/native\';\n\n\nexport const CompanionProfileScreen = ({ route }: { route: RouteProp<RootStackParamList, \'CompanionProfileScreen\'> }) => {', replace: 'import { RouteProp } from \'@react-navigation/native\';\nimport { RootStackParamList } from \'../../types/navigation\';\n\nexport const CompanionProfileScreen = ({ route }: { route: RouteProp<RootStackParamList, \'CompanionProfileScreen\'> }) => {' }
    ]
  },
  {
    file: 'src/screens/home/NotificationsScreen.tsx',
    replacements: [
      { search: 'export const MOCK_NOTIFICATIONS: Record<string, unknown>[] = [', replace: 'export const MOCK_NOTIFICATIONS: any[] = [' } // I will just revert mock.ts to any[] for now, or wait, MOCK_NOTIFICATIONS isn't defined here.
    ]
  },
  {
    file: 'src/services/mock/notifications.mock.ts',
    replacements: [
      { search: 'export const MOCK_NOTIFICATIONS: Record<string, unknown>[] = [', replace: 'export const MOCK_NOTIFICATIONS: any[] = [' } // The easiest way to fix "missing properties" error in NotificationsScreen since it's just a mock.
    ]
  }
];

let totalReplaced = 0;

replacements.forEach(({ file, replacements: fileReplacements }) => {
  const fullPath = path.join('C:\\cobuddycustomernew', file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
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
