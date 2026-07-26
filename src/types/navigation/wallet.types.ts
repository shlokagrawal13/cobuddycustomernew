export type WalletStackParamList = {
  WalletScreen: undefined;
  AddMoneyScreen: { selectedMethod?: any } | undefined;
  WithdrawMoneyScreen: { selectedMethod?: any } | undefined;
  PaymentMethodsScreen: { mode?: 'select'; currentId?: string; newMethod?: any } | undefined;
  WithdrawalMethodsScreen: { currentId?: string; newMethod?: any } | undefined;
  TransactionHistoryScreen: undefined;
  TransactionDetailScreen: { transactionId?: string } | undefined;
  AddBankAccountScreen: undefined;
  AddPaymentMethodScreen: undefined;
};
