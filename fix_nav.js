const fs = require('fs');
const path = require('path');

const filePath = path.join('C:\\cobuddycustomernew', 'src/screens/home/NotificationsScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  'navigation.navigate(notification.stack as never, { screen: notification.route, params: notification.routeParams } as never);',
  'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void };\n      nav.navigate(notification.stack, { screen: notification.route, params: notification.routeParams });'
);
content = content.replace(
  'navigation.navigate(notification.route as never, notification.routeParams as never);',
  'const nav = navigation as unknown as { navigate: (route: string, params?: unknown) => void };\n      nav.navigate(notification.route, notification.routeParams);'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed NotificationsScreen');
