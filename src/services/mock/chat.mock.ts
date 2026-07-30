export const getMockChatMessages = (companionName: string) => [
  { id: 'sys1', type: 'system', text: 'Booking Accepted! You can now chat securely.', time: '11:30 AM' },
  { id: '1', type: 'text', text: 'Hi! Looking forward to our meetup today.', sender: 'them', time: '11:32 AM' },
  { id: '2', type: 'text', text: `Hi ${companionName.split(' ')[0]}! Me too. Are we still meeting at the Starbucks in Connaught Place?`, sender: 'me', time: '11:35 AM' },
  { id: '3', type: 'text', text: 'Yes, exactly! See you there.', sender: 'them', time: '11:36 AM' },
  { id: 'sys2', type: 'system', text: `${companionName.split(' ')[0]} arrived at the venue.`, time: '12:45 PM' },
  { id: '4', type: 'text', text: 'I have arrived at the cafe. See you soon!', sender: 'them', time: '12:45 PM' },
];

export const MOCK_CHAT_LIST = [
      {
        id: 'CB-REQ-8829',
        name: 'Elena Vasquez',
        companionId: 'c1',
        lastMessage: 'I have arrived at the cafe. See you soon!',
        time: '12:45 PM',
        unread: 1,
        isOnline: true,
        isTyping: false,
        readReceipt: 'none', 
      },
      {
        id: 'CB-REQ-7711',
        name: 'Aisha Sharma',
        companionId: 'c2',
        lastMessage: 'Thank you for the amazing session yesterday.',
        time: 'Yesterday',
        unread: 0,
        isOnline: false,
        isTyping: false,
        readReceipt: 'read', 
      },
    ];

