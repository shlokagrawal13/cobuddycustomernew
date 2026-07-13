import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { ForceUpdateScreen } from '../screens/ForceUpdateScreen';
import { MaintenanceModeScreen } from '../screens/MaintenanceModeScreen';
import { NetworkErrorScreen } from '../screens/NetworkErrorScreen';

import { AuthStack } from './AuthStack';
import { OnboardingStack } from './OnboardingStack';
import { MainTabNavigator } from './MainTabNavigator';
import { SystemStateStack } from './SystemStateStack';
import { BookingFlowStack } from './BookingFlowStack';
import { KYCStack } from './KYCStack';
import { LiveSessionStack } from './LiveSessionStack';
import { SafetySupportStack } from './SafetySupportStack';


const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ForceUpdateScreen" component={ForceUpdateScreen} />
      <Stack.Screen name="MaintenanceModeScreen" component={MaintenanceModeScreen} />
      <Stack.Screen name="NetworkErrorScreen" component={NetworkErrorScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen name="SystemStateStack" component={SystemStateStack} />
      <Stack.Screen name="BookingFlowStack" component={BookingFlowStack} />
      <Stack.Screen name="KYCStack" component={KYCStack} />
      <Stack.Screen name="LiveSessionStack" component={LiveSessionStack} />
      <Stack.Screen name="SafetySupportStack" component={SafetySupportStack} />
    </Stack.Navigator>
  );
};
