import { AuthStackParamList } from './auth.types';
import { BookingStackParamList } from './booking.types';
import { ChatStackParamList } from './chat.types';
import { SafetyStackParamList } from './safety.types';
import { WalletStackParamList } from './wallet.types';
import { ProfileStackParamList } from './profile.types';
import { SupportStackParamList } from './support.types';
import { HomeStackParamList } from './home.types';
import { VerifyStackParamList } from './verify.types';
import { SessionStackParamList } from './session.types';
import { SystemStackParamList } from './system.types';
import { SettingsStackParamList } from './settings.types';

export type RootStackParamList = AuthStackParamList &
  BookingStackParamList &
  ChatStackParamList &
  SafetyStackParamList &
  WalletStackParamList &
  ProfileStackParamList &
  SupportStackParamList &
  HomeStackParamList &
  VerifyStackParamList &
  SessionStackParamList &
  SystemStackParamList &
  SettingsStackParamList & {
    // Nested Stack Navigators
    AuthStack: undefined;
    MainTabs: undefined;
    MainTabNavigator: undefined;
    DiscoverTab: undefined;
    BookingStack: undefined;
    SafetySupportStack: { screen?: string; params?: any } | undefined;
    KYCStack: undefined;
    LiveSessionStack: { screen?: string; params?: any } | undefined;
    SystemStateStack: { screen?: string; params?: any } | undefined;
  };
