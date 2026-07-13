const fs = require('fs');
const path = require('path');

const screens = [
  'SplashScreen', 'ForceUpdateScreen', 'MaintenanceModeScreen', 'NetworkErrorScreen',
  'WelcomeScreen', 'PhoneLoginScreen', 'OTPVerificationScreen', 'LegalConsentScreen',
  'LocationPermissionScreen', 'NotificationPermissionScreen', 'BasicProfileSetupScreen',
  'InterestSelectionScreen', 'SafetyTutorialScreen', 'TrustedContactsScreen',
  'HomeDashboardScreen', 'DiscoverScreen', 'CompanionProfileScreen',
  'BookingsListScreen', 'BookingDetailScreen', 'CancelBookingScreen', 'ModifyBookingScreen', 'DisputeRefundScreen',
  'ChatListScreen', 'ConciergeChatScreen', 'CompanionChatScreen', 'VoiceCallScreen', 'IncomingCallScreen',
  'ProfileScreen', 'EditProfileScreen', 'MyReviewsScreen', 'WalletScreen', 'TransactionDetailScreen',
  'PaymentMethodsScreen', 'AddPaymentMethodScreen', 'SettingsHubScreen', 'NotificationPreferencesScreen',
  'LanguageSelectionScreen', 'AccountSettingsScreen', 'DeleteAccountScreen', 'LegalAgreementsScreen',
  'BookingActivitySelectScreen', 'BookingVenueSelectScreen', 'BookingTimeSelectScreen',
  'BookingSummaryScreen', 'BookingRequestSentScreen', 'BookingAcceptedScreen', 'BookingDeclinedScreen', 'BookingCounterOfferScreen',
  'KYCIntroScreen', 'AadhaarUploadScreen', 'SelfieCaptureScreen', 'LivenessDetectionScreen',
  'VerificationProcessingScreen', 'VerificationPendingScreen', 'VerificationRejectedScreen',
  'ArrivalCheckInScreen', 'ActiveSessionScreen', 'SessionCompleteScreen', 'PostSessionFeedbackScreen',
  'CompanionReviewScreen', 'TipGratuityScreen',
  'SafetyHubScreen', 'AddTrustedContactScreen', 'IncidentReportScreen', 'IncidentSubmittedScreen',
  'SafetyGuidelinesScreen', 'SupportCenterScreen', 'CreateSupportTicketScreen', 'SupportTicketDetailScreen',
  'AccountSuspendedScreen', 'AccountUnderManualReviewScreen', 'AccountReactivationRequestScreen',
  'PolicyViolationNoticeScreen', 'AccountDeactivatedScreen'
];

const screensDir = path.join(__dirname, 'src', 'screens');
if(!fs.existsSync(screensDir)) fs.mkdirSync(screensDir, { recursive: true });

screens.forEach(screen => {
  const content = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../theme';

export const ${screen} = () => {
  const { t } = useTranslation(['common']);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('${screen}', '${screen} Placeholder')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.h3,
  },
});
`;
  fs.writeFileSync(path.join(screensDir, `${screen}.tsx`), content);
});

console.log(`Generated ${screens.length} placeholder screens.`);
