import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafetyHubScreen } from '../screens/safety/SafetyHubScreen';
import { TrustedContactsScreen } from '../screens/safety/TrustedContactsScreen';
import { AddTrustedContactScreen } from '../screens/safety/AddTrustedContactScreen';
import { IncidentReportScreen } from '../screens/safety/IncidentReportScreen';
import { IncidentSubmittedScreen } from '../screens/safety/IncidentSubmittedScreen';
import { SafetyGuidelinesScreen } from '../screens/safety/SafetyGuidelinesScreen';
import { SupportCenterScreen } from '../screens/support/SupportCenterScreen';
import { CreateSupportTicketScreen } from '../screens/support/CreateSupportTicketScreen';
import { SupportTicketDetailScreen } from '../screens/support/SupportTicketDetailScreen';

const Stack = createNativeStackNavigator();

export const SafetySupportStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SafetyHubScreen" component={SafetyHubScreen} />
      <Stack.Screen name="TrustedContactsScreen" component={TrustedContactsScreen} />
      <Stack.Screen name="AddTrustedContactScreen" component={AddTrustedContactScreen} />
      <Stack.Screen name="IncidentReportScreen" component={IncidentReportScreen} />
      <Stack.Screen name="IncidentSubmittedScreen" component={IncidentSubmittedScreen} />
      <Stack.Screen name="SafetyGuidelinesScreen" component={SafetyGuidelinesScreen} />
      <Stack.Screen name="SupportCenterScreen" component={SupportCenterScreen} />
      <Stack.Screen name="CreateSupportTicketScreen" component={CreateSupportTicketScreen} />
      <Stack.Screen name="SupportTicketDetailScreen" component={SupportTicketDetailScreen} />
    </Stack.Navigator>
  );
};
