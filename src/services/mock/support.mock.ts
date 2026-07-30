export const MOCK_TICKETS = [
  { id: 'TKT-8921', subject: 'Refund Request for Booking #4412', status: 'Open', date: '2 hours ago', category: 'Payment' },
  { id: 'TKT-8804', subject: 'Report: Inappropriate behavior', status: 'In Progress', date: 'Yesterday', category: 'Safety' },
  { id: 'TKT-7122', subject: 'How do I change my phone number?', status: 'Closed', date: '12 May, 2026', category: 'Account' }
];

export const MOCK_THREADS: Record<string, { id: string; sender: string; text: string; time: string }[]> = {
  'TKT-8921': [
    { id: '1', sender: 'user', text: 'Hi, I requested a cancellation for booking #4412 because my companion did not show up. When will I get the refund?', time: '2 hours ago' },
    { id: '2', sender: 'support', text: 'Hello Shlok, we apologize for the inconvenience. We have verified that the companion was a no-show. We have initiated a full refund of ₹1500 to your original payment method.', time: '1 hour ago' },
    { id: '3', sender: 'support', text: 'Please allow 3-5 business days for the amount to reflect in your bank account.', time: '1 hour ago' },
  ],
  'TKT-8804': [
    { id: '1', sender: 'user', text: 'I want to report inappropriate behavior from my last session. Can someone look into this?', time: 'Yesterday' },
    { id: '2', sender: 'support', text: 'We take these reports very seriously. Our Trust & Safety team is reviewing the details you provided and will follow up within 24 hours.', time: 'Yesterday' },
  ],
  'TKT-7122': [
    { id: '1', sender: 'user', text: 'Hi, how do I update the phone number linked to my account?', time: '12 May, 2026' },
    { id: '2', sender: 'support', text: 'You can update it from Settings > Account Settings > Phone Number. Let us know if you run into any issues!', time: '12 May, 2026' },
    { id: '3', sender: 'user', text: 'Got it, thank you!', time: '12 May, 2026' },
  ],
};

export const MOCK_THREAD = MOCK_THREADS['TKT-8921'];
