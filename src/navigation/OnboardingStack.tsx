import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LocationPermissionScreen } from '../screens/LocationPermissionScreen';
import { NotificationPermissionScreen } from '../screens/NotificationPermissionScreen';
import { BasicProfileSetupScreen } from '../screens/BasicProfileSetupScreen';
import { InterestSelectionScreen } from '../screens/InterestSelectionScreen';
import { SafetyTutorialScreen } from '../screens/SafetyTutorialScreen';
import { TrustedContactsScreen } from '../screens/TrustedContactsScreen';

const Stack = createNativeStackNavigator();

export const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} />
      <Stack.Screen name="NotificationPermissionScreen" component={NotificationPermissionScreen} />
      <Stack.Screen name="BasicProfileSetupScreen" component={BasicProfileSetupScreen} />
      <Stack.Screen name="InterestSelectionScreen" component={InterestSelectionScreen} />
      <Stack.Screen name="SafetyTutorialScreen" component={SafetyTutorialScreen} />
      <Stack.Screen name="TrustedContactsScreen" component={TrustedContactsScreen} />
    </Stack.Navigator>
  );
};
