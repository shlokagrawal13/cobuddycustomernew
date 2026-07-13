import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const KYCStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* To be wired with specific screens */}
    </Stack.Navigator>
  );
};
