import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
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
import { TransactionHistoryScreen } from '../screens/TransactionHistoryScreen';
import { TransactionDetailScreen } from '../screens/TransactionDetailScreen';
import { PaymentMethodsScreen } from '../screens/PaymentMethodsScreen';
import { AddPaymentMethodScreen } from '../screens/AddPaymentMethodScreen';
import { AddMoneyScreen } from '../screens/AddMoneyScreen';
import { WithdrawMoneyScreen } from '../screens/WithdrawMoneyScreen';
import { WithdrawalMethodsScreen } from '../screens/WithdrawalMethodsScreen';
import { AddBankAccountScreen } from '../screens/AddBankAccountScreen';
import { SettingsHubScreen } from '../screens/SettingsHubScreen';
import { NotificationPreferencesScreen } from '../screens/NotificationPreferencesScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { AccountSettingsScreen } from '../screens/AccountSettingsScreen';
import { DeleteAccountScreen } from '../screens/DeleteAccountScreen';
import { LegalAgreementsScreen } from '../screens/LegalAgreementsScreen';
import { InterestSelectionScreen } from '../screens/InterestSelectionScreen';
import { SpokenLanguagesScreen } from '../screens/SpokenLanguagesScreen';
import { LocationSelectionScreen } from '../screens/LocationSelectionScreen';
import { AppPermissionsScreen } from '../screens/AppPermissionsScreen';
import { AppLockScreen } from '../screens/AppLockScreen';
import { BlockedUsersScreen } from '../screens/BlockedUsersScreen';
import { SafetySettingsScreen } from '../screens/SafetySettingsScreen';
import { DataCacheScreen } from '../screens/DataCacheScreen';
import { HelpCenterScreen } from '../screens/HelpCenterScreen';
import { SupportCenterScreen } from '../screens/SupportCenterScreen';
import { CreateSupportTicketScreen } from '../screens/CreateSupportTicketScreen';
import { SupportTicketDetailScreen } from '../screens/SupportTicketDetailScreen';
import { PhoneLoginScreen } from '../screens/PhoneLoginScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import { DeactivateAccountScreen } from '../screens/DeactivateAccountScreen';
import { ActiveSessionsScreen } from '../screens/ActiveSessionsScreen';
import { SavedProfilesScreen } from '../screens/SavedProfilesScreen';
import { TrustedContactsScreen } from '../screens/TrustedContactsScreen';
import { AddTrustedContactScreen } from '../screens/AddTrustedContactScreen';
import { ReferFriendScreen } from '../screens/ReferFriendScreen';
import { SafetyHubScreen } from '../screens/SafetyHubScreen';
import { IncidentReportScreen } from '../screens/IncidentReportScreen';
import { SafetyGuidelinesScreen } from '../screens/SafetyGuidelinesScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { NotificationsScreen } from '../screens/NotificationsScreen';

const HomeTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeDashboardScreen" component={HomeDashboardScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
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
      <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
      <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
      <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
      <Stack.Screen name="AddPaymentMethodScreen" component={AddPaymentMethodScreen} />
      <Stack.Screen name="AddMoneyScreen" component={AddMoneyScreen} />
      <Stack.Screen name="WithdrawMoneyScreen" component={WithdrawMoneyScreen} />
      <Stack.Screen name="WithdrawalMethodsScreen" component={WithdrawalMethodsScreen} />
      <Stack.Screen name="AddBankAccountScreen" component={AddBankAccountScreen} />
      <Stack.Screen name="SettingsHubScreen" component={SettingsHubScreen} />
      <Stack.Screen name="NotificationPreferencesScreen" component={NotificationPreferencesScreen} />
      <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
      <Stack.Screen name="AccountSettingsScreen" component={AccountSettingsScreen} />
      <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
      <Stack.Screen name="LegalAgreementsScreen" component={LegalAgreementsScreen} />
      <Stack.Screen name="InterestSelectionScreen" component={InterestSelectionScreen} />
      <Stack.Screen name="SpokenLanguagesScreen" component={SpokenLanguagesScreen} />
      <Stack.Screen name="LocationSelectionScreen" component={LocationSelectionScreen} />
      <Stack.Screen name="AppPermissionsScreen" component={AppPermissionsScreen} />
      <Stack.Screen name="AppLockScreen" component={AppLockScreen} />
      <Stack.Screen name="BlockedUsersScreen" component={BlockedUsersScreen} />
      <Stack.Screen name="SafetySettingsScreen" component={SafetySettingsScreen} />
      <Stack.Screen name="DataCacheScreen" component={DataCacheScreen} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen name="SupportCenterScreen" component={SupportCenterScreen} />
      <Stack.Screen name="CreateSupportTicketScreen" component={CreateSupportTicketScreen} />
      <Stack.Screen name="SupportTicketDetailScreen" component={SupportTicketDetailScreen} />
      <Stack.Screen name="PhoneLoginScreen" component={PhoneLoginScreen} />
      <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
      <Stack.Screen name="DeactivateAccountScreen" component={DeactivateAccountScreen} />
      <Stack.Screen name="ActiveSessionsScreen" component={ActiveSessionsScreen} />
      <Stack.Screen name="SavedProfilesScreen" component={SavedProfilesScreen} />
      <Stack.Screen name="TrustedContactsScreen" component={TrustedContactsScreen} />
      <Stack.Screen name="AddTrustedContactScreen" component={AddTrustedContactScreen} />
      <Stack.Screen name="CompanionProfileScreen" component={CompanionProfileScreen} />
      <Stack.Screen name="ReferFriendScreen" component={ReferFriendScreen} />
      <Stack.Screen name="SafetyHubScreen" component={SafetyHubScreen} />
      <Stack.Screen name="IncidentReportScreen" component={IncidentReportScreen} />
      <Stack.Screen name="SafetyGuidelinesScreen" component={SafetyGuidelinesScreen} />
      <Stack.Screen name="ConciergeChatScreen" component={ConciergeChatScreen} />
  </Stack.Navigator>
);

export const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'help-circle-outline';

          if (route.name === 'HomeTab') {
            iconName = 'home-outline';
          } else if (route.name === 'DiscoverTab') {
            iconName = 'compass-outline';
          } else if (route.name === 'BookingsTab') {
            iconName = 'calendar-clock-outline';
          } else if (route.name === 'ChatTab') {
            iconName = 'message-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeTabStack} options={{ title: 'Home' }} />
      <Tab.Screen name="DiscoverTab" component={DiscoverTabStack} options={{ title: 'Discover' }} />
      <Tab.Screen name="BookingsTab" component={BookingsTabStack} options={{ title: 'Bookings' }} />
      <Tab.Screen name="ChatTab" component={ChatTabStack} options={{ title: 'Messages' }} />
      <Tab.Screen name="ProfileTab" component={ProfileTabStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};
