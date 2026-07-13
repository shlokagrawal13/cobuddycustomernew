import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeDashboardScreen } from '../screens/HomeDashboardScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { CompanionProfileScreen } from '../screens/CompanionProfileScreen';
import { BookingsListScreen } from '../screens/BookingsListScreen';
import { BookingDetailScreen } from '../screens/BookingDetailScreen';
import { CancelBookingScreen } from '../screens/CancelBookingScreen';
import { ModifyBookingScreen } from '../screens/ModifyBookingScreen';
import { DisputeRefundScreen } from '../screens/DisputeRefundScreen';
import { ChatListScreen } from '../screens/ChatListScreen';
import { ConciergeChatScreen } from '../screens/ConciergeChatScreen';
import { CompanionChatScreen } from '../screens/CompanionChatScreen';
import { VoiceCallScreen } from '../screens/VoiceCallScreen';
import { IncomingCallScreen } from '../screens/IncomingCallScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { MyReviewsScreen } from '../screens/MyReviewsScreen';
import { WalletScreen } from '../screens/WalletScreen';
import { TransactionDetailScreen } from '../screens/TransactionDetailScreen';
import { PaymentMethodsScreen } from '../screens/PaymentMethodsScreen';
import { AddPaymentMethodScreen } from '../screens/AddPaymentMethodScreen';
import { SettingsHubScreen } from '../screens/SettingsHubScreen';
import { NotificationPreferencesScreen } from '../screens/NotificationPreferencesScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { AccountSettingsScreen } from '../screens/AccountSettingsScreen';
import { DeleteAccountScreen } from '../screens/DeleteAccountScreen';
import { LegalAgreementsScreen } from '../screens/LegalAgreementsScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeDashboardScreen" component={HomeDashboardScreen} />
  </Stack.Navigator>
);

const DiscoverTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <Stack.Screen name="CompanionProfileScreen" component={CompanionProfileScreen} />
  </Stack.Navigator>
);

const BookingsTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsListScreen" component={BookingsListScreen} />
      <Stack.Screen name="BookingDetailScreen" component={BookingDetailScreen} />
      <Stack.Screen name="CancelBookingScreen" component={CancelBookingScreen} />
      <Stack.Screen name="ModifyBookingScreen" component={ModifyBookingScreen} />
      <Stack.Screen name="DisputeRefundScreen" component={DisputeRefundScreen} />
  </Stack.Navigator>
);

const ChatTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
      <Stack.Screen name="ConciergeChatScreen" component={ConciergeChatScreen} />
      <Stack.Screen name="CompanionChatScreen" component={CompanionChatScreen} />
      <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} />
      <Stack.Screen name="IncomingCallScreen" component={IncomingCallScreen} />
  </Stack.Navigator>
);

const ProfileTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="MyReviewsScreen" component={MyReviewsScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
      <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
      <Stack.Screen name="AddPaymentMethodScreen" component={AddPaymentMethodScreen} />
      <Stack.Screen name="SettingsHubScreen" component={SettingsHubScreen} />
      <Stack.Screen name="NotificationPreferencesScreen" component={NotificationPreferencesScreen} />
      <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
      <Stack.Screen name="AccountSettingsScreen" component={AccountSettingsScreen} />
      <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
      <Stack.Screen name="LegalAgreementsScreen" component={LegalAgreementsScreen} />
  </Stack.Navigator>
);

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeTabStack} />
      <Tab.Screen name="DiscoverTab" component={DiscoverTabStack} />
      <Tab.Screen name="BookingsTab" component={BookingsTabStack} />
      <Tab.Screen name="ChatTab" component={ChatTabStack} />
      <Tab.Screen name="ProfileTab" component={ProfileTabStack} />
    </Tab.Navigator>
  );
};
