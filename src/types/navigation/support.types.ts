export interface SupportStackParamList {
  HelpCenterScreen: undefined;
  SupportCenterScreen: undefined;
  CreateSupportTicketScreen: { category?: string } | undefined;
  SupportTicketDetailScreen: { ticketId?: string } | undefined;
};
