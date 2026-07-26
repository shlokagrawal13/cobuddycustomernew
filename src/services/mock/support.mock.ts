export const MOCK_TICKETS = [
  { id: 'TKT-8921', subject: 'Refund Request for Booking #4412', status: 'Open', date: '2 hours ago', category: 'Payment' },
  { id: 'TKT-8804', subject: 'Report: Inappropriate behavior', status: 'In Progress', date: 'Yesterday', category: 'Safety' },
  { id: 'TKT-7122', subject: 'How do I change my phone number?', status: 'Closed', date: '12 May, 2026', category: 'Account' }
];

export const MOCK_THREAD = [
  { id: '1', sender: 'user', text: 'Hi, I requested a cancellation for booking #4412 because my companion did not show up. When will I get the refund?', time: '2 hours ago' },
  { id: '2', sender: 'support', text: 'Hello Shlok, we apologize for the inconvenience. We have verified that the companion was a no-show. We have initiated a full refund of ₹1500 to your original payment method.', time: '1 hour ago' },
  { id: '3', sender: 'support', text: 'Please allow 3-5 business days for the amount to reflect in your bank account.', time: '1 hour ago' },
];
