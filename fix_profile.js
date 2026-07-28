const fs = require('fs');
const path = require('path');
const file = path.join('C:\\cobuddycustomernew', 'src/screens/profile/ProfileScreen.tsx');
let content = fs.readFileSync(file, 'utf8');
content = content.replace('} catch (error: unknown) {\n      console.error(\'Error applying updates:\', error);\n      Alert.alert(t(\'errorTitle\', \'Error\'), t(\'errorMessage\', \'Failed to apply updates. Please try again.\'));\n    }', '} catch (error: unknown) {\n      console.error(\'Error applying updates:\', (error as Error).message);\n      Alert.alert(t(\'errorTitle\', \'Error\'), t(\'errorMessage\', \'Failed to apply updates. Please try again.\'));\n    }');
// Let's use regex in case whitespace is off
content = content.replace(/catch\s*\(error:\s*unknown\)\s*\{\s*console\.error\('Error applying updates:',\s*error\);/g, 'catch (error: unknown) { console.error(\'Error applying updates:\', (error as Error).message);');
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed ProfileScreen');
