import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LegalConsentScreen } from '../screens/onboarding/LegalConsentScreen';
import { LocationPermissionScreen } from '../screens/auth/LocationPermissionScreen';
import { NotificationPermissionScreen } from '../screens/auth/NotificationPermissionScreen';
import { BasicProfileSetupScreen } from '../screens/onboarding/BasicProfileSetupScreen';
import { InterestSelectionScreen } from '../screens/onboarding/InterestSelectionScreen';
import { SafetyTutorialScreen } from '../screens/onboarding/SafetyTutorialScreen';
import { TrustedContactsScreen } from '../screens/safety/TrustedContactsScreen';

const Stack = createStackNavigator();

export const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LegalConsentScreen">
      <Stack.Screen name="LegalConsentScreen" component={LegalConsentScreen} />
      <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} />
      <Stack.Screen name="NotificationPermissionScreen" component={NotificationPermissionScreen} />
      <Stack.Screen name="BasicProfileSetupScreen" component={BasicProfileSetupScreen} />
      <Stack.Screen name="InterestSelectionScreen" component={InterestSelectionScreen} />
      <Stack.Screen name="SafetyTutorialScreen" component={SafetyTutorialScreen} />
      <Stack.Screen name="TrustedContactsScreen" component={TrustedContactsScreen} />
    </Stack.Navigator>
  );
};
