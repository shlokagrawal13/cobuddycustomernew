export interface HomeStackParamList {
  HomeScreen: undefined;
  CompanionProfileScreen: { companionId?: string } | undefined;
  DiscoverScreen: { category?: string } | undefined;
  NotificationsScreen: undefined;
  ActiveBookingsScreen: undefined;
  PastBookingsScreen: undefined;
};
