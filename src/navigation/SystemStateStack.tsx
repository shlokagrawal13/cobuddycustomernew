import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountSuspendedScreen } from '../screens/AccountSuspendedScreen';
import { AccountUnderManualReviewScreen } from '../screens/AccountUnderManualReviewScreen';
import { AccountReactivationRequestScreen } from '../screens/AccountReactivationRequestScreen';
import { PolicyViolationNoticeScreen } from '../screens/PolicyViolationNoticeScreen';
import { AccountDeactivatedScreen } from '../screens/AccountDeactivatedScreen';

const Stack = createNativeStackNavigator();

export const SystemStateStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountSuspendedScreen" component={AccountSuspendedScreen} />
      <Stack.Screen name="AccountUnderManualReviewScreen" component={AccountUnderManualReviewScreen} />
      <Stack.Screen name="AccountReactivationRequestScreen" component={AccountReactivationRequestScreen} />
      <Stack.Screen name="PolicyViolationNoticeScreen" component={PolicyViolationNoticeScreen} />
      <Stack.Screen name="AccountDeactivatedScreen" component={AccountDeactivatedScreen} />
    </Stack.Navigator>
  );
};
