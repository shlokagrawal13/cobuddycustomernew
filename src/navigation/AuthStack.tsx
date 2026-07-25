import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { PhoneLoginScreen } from '../screens/auth/PhoneLoginScreen';
import { OTPVerificationScreen } from '../screens/auth/OTPVerificationScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="PhoneLoginScreen" component={PhoneLoginScreen} />
      <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
};
