import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { ForceUpdateScreen } from '../screens/system/ForceUpdateScreen';
import { MaintenanceModeScreen } from '../screens/system/MaintenanceModeScreen';
import { NetworkErrorScreen } from '../screens/system/NetworkErrorScreen';

import { AuthStack } from './AuthStack';
import { OnboardingStack } from './OnboardingStack';
import { MainTabNavigator } from './MainTabNavigator';
import { SystemStateStack } from './SystemStateStack';
import { BookingFlowStack } from './BookingFlowStack';
import { KYCStack } from './KYCStack';
import { LiveSessionStack } from './LiveSessionStack';
import { SafetySupportStack } from './SafetySupportStack';

import { useAuthStore } from '../store/slices/authStore';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isAuthenticated, isOnboardingComplete } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Artificial delay to show the Splash Screen for 1.5s as requested
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isReady ? (
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      ) : !isAuthenticated ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : !isOnboardingComplete ? (
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      ) : (
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      )}
      
      {/* System state and modal screens can be pushed here or kept detached if needed */}
      <Stack.Screen name="ForceUpdateScreen" component={ForceUpdateScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="MaintenanceModeScreen" component={MaintenanceModeScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="NetworkErrorScreen" component={NetworkErrorScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="SystemStateStack" component={SystemStateStack} options={{ presentation: 'modal' }} />
      <Stack.Screen name="BookingFlowStack" component={BookingFlowStack} options={{ presentation: 'modal' }} />
      <Stack.Screen name="KYCStack" component={KYCStack} options={{ presentation: 'modal' }} />
      <Stack.Screen name="LiveSessionStack" component={LiveSessionStack} options={{ presentation: 'modal' }} />
      <Stack.Screen name="SafetySupportStack" component={SafetySupportStack} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};
