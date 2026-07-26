export interface AuthStackParamList {
  WelcomeScreen: undefined;
  PhoneLoginScreen: { isUpdate?: boolean } | undefined;
  OTPVerificationScreen: { phone?: string; isUpdate?: boolean } | undefined;
  LocationPermissionScreen: undefined;
  NotificationPermissionScreen: undefined;
  BasicProfileSetupScreen: undefined;
};
