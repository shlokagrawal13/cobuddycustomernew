const fs = require('fs');
const path = require('path');

const navDir = path.join(__dirname, 'src', 'navigation');
if(!fs.existsSync(navDir)) fs.mkdirSync(navDir, { recursive: true });

const navigators = [
  'RootNavigator', 'AuthStack', 'OnboardingStack', 'MainTabNavigator',
  'BookingFlowStack', 'KYCStack', 'LiveSessionStack', 'SafetySupportStack', 'SystemStateStack'
];

navigators.forEach(nav => {
  const content = `import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const ${nav} = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* To be wired with specific screens */}
    </Stack.Navigator>
  );
};
`;
  fs.writeFileSync(path.join(navDir, `${nav}.tsx`), content);
});

console.log('Navigators generated');
