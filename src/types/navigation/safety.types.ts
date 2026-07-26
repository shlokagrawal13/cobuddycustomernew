export type SafetyStackParamList = {
  SafetyHubScreen: undefined;
  SafetyGuidelinesScreen: undefined;
  IncidentReportScreen: { companionName?: string; bookingId?: string; companionId?: string } | undefined;
  TrustedContactsScreen: { fromSettings?: boolean } | undefined;
  SafetySettingsScreen: undefined;
};
