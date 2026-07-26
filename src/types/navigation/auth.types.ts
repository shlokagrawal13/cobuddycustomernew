export type AuthStackParamList = {
  WelcomeScreen: undefined;
  PhoneLoginScreen: { isUpdate?: boolean } | undefined;
  OTPVerificationScreen: { phone?: string; isUpdate?: boolean } | undefined;
  LocationPermissionScreen: undefined;
  NotificationPermissionScreen: undefined;
};
