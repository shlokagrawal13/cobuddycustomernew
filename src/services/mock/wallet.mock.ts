// MOCK: replace with API

export const MOCK_TRANSACTION_DETAILS: Record<string, any> = {
  tx_001: {
    id: 'tx_001', icon: 'wallet-plus', label: 'Money Added', category: 'Money Added',
    date: 'Oct 24, 2023', time: '14:30 IST', amount: '+ ₹1,000', positive: true, status: 'Successful',
    refId: '#CB-ADD-8829', paymentSource: 'UPI ending in 45',
    breakdown: [{ label: 'Top-up Amount', value: '₹1,000' }],
  },
  tx_002: {
    id: 'tx_002', icon: 'account-clock', label: 'Session with Maya', category: 'Spent',
    date: 'Oct 23, 2023', time: '20:15 IST', amount: '- ₹450', positive: false, status: 'Successful',
    refId: '#CB-SES-7741', paymentSource: 'CoBuddy Wallet',
    companion: 'Maya Sharma',
    duration: '60 mins',
    breakdown: [
      { label: 'Session Fee (Hourly)', value: '₹350' },
      { label: 'Platform Fee', value: '₹50' },
      { label: 'Taxes (GST 18%)', value: '₹50' },
    ],
  }
};
