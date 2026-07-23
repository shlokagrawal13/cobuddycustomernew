import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SessionReminderScreen } from '../screens/SessionReminderScreen';
import { ArrivalCheckInScreen } from '../screens/ArrivalCheckInScreen';
import { ActiveSessionScreen } from '../screens/ActiveSessionScreen';
import { SessionCompleteScreen } from '../screens/SessionCompleteScreen';
import { PostSessionFeedbackScreen } from '../screens/PostSessionFeedbackScreen';
import { CompanionReviewScreen } from '../screens/CompanionReviewScreen';
import { TipGratuityScreen } from '../screens/TipGratuityScreen';

const Stack = createNativeStackNavigator();

export const LiveSessionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SessionReminderScreen" component={SessionReminderScreen} />
      <Stack.Screen name="ArrivalCheckInScreen" component={ArrivalCheckInScreen} />
      <Stack.Screen name="ActiveSessionScreen" component={ActiveSessionScreen} />
      <Stack.Screen name="SessionCompleteScreen" component={SessionCompleteScreen} />
      <Stack.Screen name="PostSessionFeedbackScreen" component={PostSessionFeedbackScreen} />
      <Stack.Screen name="CompanionReviewScreen" component={CompanionReviewScreen} />
      <Stack.Screen name="TipGratuityScreen" component={TipGratuityScreen} />
    </Stack.Navigator>
  );
};
