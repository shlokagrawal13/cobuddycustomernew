const fs = require('fs');
const path = require('path');

const filePath = path.join('C:\\cobuddycustomernew', 'src/screens/home/CompanionProfileScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The file had `import { RootStackParamList } from '../../types/navigation';` duplicated.
// Let's just remove one of them.
let firstIndex = content.indexOf('import { RootStackParamList } from \'../../types/navigation\';');
if (firstIndex !== -1) {
  let secondIndex = content.indexOf('import { RootStackParamList } from \'../../types/navigation\';', firstIndex + 1);
  if (secondIndex !== -1) {
    content = content.substring(0, secondIndex) + content.substring(secondIndex + 'import { RootStackParamList } from \'../../types/navigation\';'.length);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Removed duplicate RootStackParamList in CompanionProfileScreen.tsx');
  }
}
