import re

def replace_in_file(filepath, old, new):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)
        print(f"Patched {filepath}")

replace_in_file('src/types/navigation/index.ts',
    "BookingVenueSelectScreen: { activity?: any } | undefined;",
    "BookingVenueSelectScreen: { activity?: import('./booking.types').BookingActivity } | undefined;")

replace_in_file('src/types/navigation/index.ts',
    "BookingTimeSelectScreen: { activity?: any; venue?: any } | undefined;",
    "BookingTimeSelectScreen: { activity?: import('./booking.types').BookingActivity; venue?: import('./booking.types').BookingVenue } | undefined;")

replace_in_file('src/types/navigation/index.ts',
    "BookingSummaryScreen: { activity?: any; venue?: any; date?: any; time?: string; duration?: number; bookingId?: string } | undefined;",
    "BookingSummaryScreen: { activity?: import('./booking.types').BookingActivity; venue?: import('./booking.types').BookingVenue; date?: string; time?: string; duration?: number; bookingId?: string } | undefined;")

old_bottom = """  MainTabs: NavigatorScreenParams<any> | undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList> | undefined;
  DiscoverTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  BookingsTab: NavigatorScreenParams<BookingStackParamList> | undefined;
  ChatTab: NavigatorScreenParams<ChatStackParamList> | undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList> | undefined;
  BookingFlowStack: NavigatorScreenParams<BookingStackParamList> | undefined;
  KYCStack: NavigatorScreenParams<VerifyStackParamList> | undefined;
  SafetyTutorialScreen: undefined;

  SafetySupportStack: NavigatorScreenParams<SafetyStackParamList & SupportStackParamList> | undefined;
  LiveSessionStack: NavigatorScreenParams<SessionStackParamList> | undefined;
  SystemStateStack: NavigatorScreenParams<SystemStackParamList> | undefined;
};"""

new_bottom = """  MainTabs: NavigatorScreenParams<any> | undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList> | undefined;
  DiscoverTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  BookingsTab: NavigatorScreenParams<BookingStackParamList> | undefined;
  ChatTab: NavigatorScreenParams<ChatStackParamList> | undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList> | undefined;
  BookingFlowStack: NavigatorScreenParams<BookingStackParamList> | undefined;
  KYCStack: NavigatorScreenParams<VerifyStackParamList> | undefined;
  SafetyTutorialScreen: undefined;

  SafetySupportStack: NavigatorScreenParams<SafetyStackParamList> | undefined;
  SupportStack: NavigatorScreenParams<SupportStackParamList> | undefined;
  LiveSessionStack: NavigatorScreenParams<SessionStackParamList> | undefined;
  SystemStateStack: NavigatorScreenParams<SystemStackParamList> | undefined;
};"""

replace_in_file('src/types/navigation/index.ts', old_bottom, new_bottom)

