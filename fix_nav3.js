const fs = require('fs');
const path = require('path');
const file = path.join('C:\\cobuddycustomernew', 'src/hooks/useSmartNavigation.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace('navigation.navigate(routeName as any, params);', 'navigation.navigate(routeName as never, params as never);');
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed useSmartNavigation');
