import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SessionReminderScreen } from '../screens/session/SessionReminderScreen';
import { ArrivalCheckInScreen } from '../screens/session/ArrivalCheckInScreen';
import { ActiveSessionScreen } from '../screens/session/ActiveSessionScreen';
import { SessionCompleteScreen } from '../screens/session/SessionCompleteScreen';
import { PostSessionFeedbackScreen } from '../screens/session/PostSessionFeedbackScreen';
import { CompanionReviewScreen } from '../screens/session/CompanionReviewScreen';
import { TipGratuityScreen } from '../screens/session/TipGratuityScreen';

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
