import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen } from '../screens/WelcomeScreen';
import { PhoneLoginScreen } from '../screens/PhoneLoginScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import { LegalConsentScreen } from '../screens/LegalConsentScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="PhoneLoginScreen" component={PhoneLoginScreen} />
      <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
      <Stack.Screen name="LegalConsentScreen" component={LegalConsentScreen} />
    </Stack.Navigator>
  );
};
