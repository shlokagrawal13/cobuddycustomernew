import { NavigatorScreenParams } from '@react-navigation/native';
import { SafetyStackParamList } from './src/types/navigation/safety.types';
import { SupportStackParamList } from './src/types/navigation/support.types';

export type RootStackParamList = {
  SafetySupportStack: NavigatorScreenParams<SafetyStackParamList & SupportStackParamList> | undefined;
};

// Check if TS compiles this when we try to navigate
declare function navigate<RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ? [screen: RouteName] | [screen: RouteName, params: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
): void;

navigate('SafetySupportStack', { screen: 'IncidentReportScreen', params: { companionName: 'Alice' } });
navigate('SafetySupportStack', { screen: 'SupportCenterScreen' });
