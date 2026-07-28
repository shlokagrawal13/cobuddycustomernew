import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SafetyHubScreen } from '../screens/safety/SafetyHubScreen';
import { TrustedContactsScreen } from '../screens/safety/TrustedContactsScreen';
import { IncidentReportScreen } from '../screens/safety/IncidentReportScreen';
import { SafetyGuidelinesScreen } from '../screens/safety/SafetyGuidelinesScreen';
import { SupportCenterScreen } from '../screens/support/SupportCenterScreen';
import { HelpCenterScreen } from '../screens/support/HelpCenterScreen';
import { CreateSupportTicketScreen } from '../screens/support/CreateSupportTicketScreen';
import { SupportTicketDetailScreen } from '../screens/support/SupportTicketDetailScreen';

const Stack = createStackNavigator();

export const SafetySupportStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SafetyHubScreen" component={SafetyHubScreen} />
      {/* 
        NOTE: TrustedContactsScreen is intentionally dual-registered here in SafetySupportStack 
        and OnboardingStack so it can be accessed during onboarding or from Safety Hub/Settings.
      */}
      <Stack.Screen name="TrustedContactsScreen" component={TrustedContactsScreen} />
      <Stack.Screen name="IncidentReportScreen" component={IncidentReportScreen} />
      <Stack.Screen name="SafetyGuidelinesScreen" component={SafetyGuidelinesScreen} />
      <Stack.Screen name="SupportCenterScreen" component={SupportCenterScreen} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen name="CreateSupportTicketScreen" component={CreateSupportTicketScreen} />
      <Stack.Screen name="SupportTicketDetailScreen" component={SupportTicketDetailScreen} />
    </Stack.Navigator>
  );
};
