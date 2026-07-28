const fs = require('fs');
const path = require('path');

const file = path.join('C:\\cobuddycustomernew', 'src/screens/settings/SettingsHubScreen.tsx');
let content = fs.readFileSync(file, 'utf8');

// Regex to remove the DEV_TEST_SCREENS array declaration
content = content.replace(/const DEV_TEST_SCREENS = \[[\s\S]*?\];\s*/, '');

// Regex to remove the DEV ZONE UI section
content = content.replace(/\{\/\*\s*DEV ZONE FOR TESTING SYSTEM SCREENS\s*\*\/\}[\s\S]*?(?=\s*<\/ScrollView>)/, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Removed DEV_TEST_SCREENS from SettingsHubScreen.tsx');
