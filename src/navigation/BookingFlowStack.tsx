import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BookingActivitySelectScreen } from '../screens/booking/BookingActivitySelectScreen';
import { BookingVenueSelectScreen } from '../screens/booking/BookingVenueSelectScreen';
import { BookingTimeSelectScreen } from '../screens/booking/BookingTimeSelectScreen';
import { BookingSummaryScreen } from '../screens/booking/BookingSummaryScreen';
import { BookingRequestSentScreen } from '../screens/booking/BookingRequestSentScreen';
import { BookingAcceptedScreen } from '../screens/booking/BookingAcceptedScreen';
import { BookingDeclinedScreen } from '../screens/booking/BookingDeclinedScreen';
import { BookingCounterOfferScreen } from '../screens/booking/BookingCounterOfferScreen';

const Stack = createNativeStackNavigator();

export const BookingFlowStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingActivitySelectScreen" component={BookingActivitySelectScreen} />
      <Stack.Screen name="BookingVenueSelectScreen" component={BookingVenueSelectScreen} />
      <Stack.Screen name="BookingTimeSelectScreen" component={BookingTimeSelectScreen} />
      <Stack.Screen name="BookingSummaryScreen" component={BookingSummaryScreen} />
      <Stack.Screen name="BookingRequestSentScreen" component={BookingRequestSentScreen} />
      <Stack.Screen name="BookingAcceptedScreen" component={BookingAcceptedScreen} />
      <Stack.Screen name="BookingDeclinedScreen" component={BookingDeclinedScreen} />
      <Stack.Screen name="BookingCounterOfferScreen" component={BookingCounterOfferScreen} />
    </Stack.Navigator>
  );
};
