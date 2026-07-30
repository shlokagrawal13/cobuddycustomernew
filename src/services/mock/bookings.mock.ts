// MOCK: replace with API

export const MOCK_BOOKINGS = [
  { 
    id: 'CB-REQ-8829', 
    type: 'pending', 
    displayStatus: 'Awaiting Reply', 
    companionName: 'Elena Vasquez',
    companionId: 'c1', 
    rating: '4.9',
    activity: 'Fine Dining & Drinks',
    date: 'Fri, 24 Oct 2026', 
    time: '7:00 PM - 9:00 PM', 
    duration: '2 Hours',
    price: '₹3,000',
    venue: 'Blue Tokai Coffee, CP'
  },
  { 
    id: 'CB-REQ-8830', 
    type: 'pending', 
    displayStatus: 'Counter-Proposed', 
    companionName: 'Aisha Sharma',
    companionId: 'c2',
    rating: '5.0', 
    activity: 'Shopping Companion',
    date: 'Sun, 26 Oct 2026', 
    time: '5:00 PM - 8:00 PM',
    duration: '3 Hours', 
    price: '₹4,500',
    venue: 'DLF Promenade'
  },
  { 
    id: 'CB-ACC-1102', 
    type: 'accepted', 
    displayStatus: 'Accepted', 
    companionName: 'Marcus Chen',
    companionId: 'c3', 
    rating: '4.8',
    activity: 'Art Exhibition Tour',
    date: 'Sat, 25 Oct 2026', 
    time: '2:00 PM - 4:00 PM', 
    duration: '2 Hours',
    price: '₹2,500',
    venue: 'National Gallery of Modern Art'
  },
  { 
    id: 'CB-HIS-9921', 
    type: 'history', 
    displayStatus: 'Completed', 
    companionName: 'Natasha',
    companionId: 'c4', 
    rating: '4.9',
    activity: 'Cafe Hopping',
    date: 'Wed, 10 Oct 2026', 
    time: '1:00 PM - 3:00 PM',
    duration: '2 Hours', 
    price: '₹2,000',
    venue: 'Cyber Hub, Gurugram'
  },
  { 
    id: 'CB-DEC-5510', 
    type: 'history', 
    displayStatus: 'Declined', 
    companionName: 'Sophia Patel',
    companionId: 'c5', 
    rating: '4.7',
    activity: 'Movie Premiere',
    date: 'Mon, 12 Oct 2026', 
    time: '8:00 PM - 11:00 PM',
    duration: '3 Hours', 
    price: '₹5,000',
    venue: 'PVR Director Cut'
  },
];



export const MOCK_VENUES = ['Blue Tokai Coffee, CP', 'Starbucks, Hauz Khas', 'DLF Promenade Mall', 'Keep Original Venue'];



export const MOCK_DETAILS = {
  id: 'CB-REQ-8829',
  status: 'Accepted', // 'Awaiting Reply', 'Accepted', 'Counter-Proposed', 'Completed'
  createdAt: 'Oct 23, 10:15 AM',
  companionName: 'Elena Vasquez',
  companionId: 'c1',
  companionRating: '4.9',
  companionReviews: '128',
  activity: 'Fine Dining & Drinks',
  date: 'Friday, 24 Oct 2026',
  time: '7:00 PM - 9:00 PM',
  duration: '2 Hours',
  venue: 'Blue Tokai Coffee',
  address: 'Connaught Place, Inner Circle, New Delhi, 110001',
  sessionRate: '₹3,000',
  platformFee: '₹150',
  taxes: '₹54',
  total: '₹3,204',
  notes: 'I prefer sitting near the window. Please wear smart casuals.',
  declineReason: 'I am so sorry, but I just got booked for a full-day event on this date.',
};



