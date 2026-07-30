// MOCK: replace with API

export const MOCK_TRANSACTION_DETAILS: Record<string, any> = {
  tx_001: {
    id: 'tx_001', icon: 'wallet-plus', label: 'Money Added', category: 'Money Added',
    date: 'Oct 24, 2026', time: '14:30 IST', amount: '+ ₹1,000', positive: true, status: 'Successful',
    refId: '#CB-ADD-8829', paymentSource: 'UPI ending in 45',
    breakdown: [{ label: 'Top-up Amount', value: '₹1,000' }],
  },
  tx_002: {
    id: 'tx_002', icon: 'account-clock', label: 'Session with Maya', category: 'Spent',
    date: 'Oct 23, 2026', time: '20:15 IST', amount: '- ₹450', positive: false, status: 'Successful',
    refId: '#CB-SES-7741', paymentSource: 'CoBuddy Wallet',
    companion: 'Maya Sharma',
    duration: '60 mins',
    breakdown: [
      { label: 'Session Fee (Hourly)', value: '₹350' },
      { label: 'Platform Fee', value: '₹50' },
      { label: 'Taxes (GST 18%)', value: '₹50' },
    ],
  },
  tx_003: {
    id: 'tx_003', icon: 'arrow-u-left-top', label: 'Refund: Session Cancelled', category: 'Refunds',
    date: 'Oct 18, 2026', time: '10:00 IST', amount: '+ ₹1,200', positive: true, status: 'Refunded',
    refId: '#CB-REF-8813', paymentSource: 'CoBuddy Wallet',
    breakdown: [{ label: 'Refund Amount', value: '₹1,200' }],
  },
  tx_004: {
    id: 'tx_004', icon: 'wallet-plus', label: 'Money Added', category: 'Money Added',
    date: 'Oct 10, 2026', time: '13:15 IST', amount: '+ ₹2,000', positive: true, status: 'Successful',
    refId: '#CB-ADD-8830', paymentSource: 'Card ending in 4242',
    breakdown: [{ label: 'Top-up Amount', value: '₹2,000' }],
  },
  tx_005: {
    id: 'tx_005', icon: 'account-clock', label: 'Session with Rahul', category: 'Spent',
    date: 'Oct 05, 2026', time: '17:00 IST', amount: '- ₹1,600', positive: false, status: 'Pending',
    refId: '#CB-SES-7756', paymentSource: 'CoBuddy Wallet',
    companion: 'Rahul Verma',
    duration: '90 mins',
    breakdown: [
      { label: 'Session Fee (Hourly)', value: '₹1,350' },
      { label: 'Platform Fee', value: '₹150' },
      { label: 'Taxes (GST 18%)', value: '₹100' },
    ],
  }
};
