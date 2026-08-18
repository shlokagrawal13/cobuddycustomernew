// MOCK: replace with API

export const MOCK_BOOKINGS = [
  { 
    id: 'CB-REQ-8829', 
    requestStatus: 'pending', 
    companionName: 'Elena Vasquez',
    companionId: 'c1', 
    rating: '4.9',
    activity: 'Fine Dining & Drinks',
    date: 'Fri, 24 Oct 2026', 
    scheduledStart: '7:00 PM',
    scheduledEnd: '9:00 PM',
    sessionPassCode: '1234',
    matchScore: 92,
    safetyTimerActive: false,
    earningsBreakdown: { base: 2800, tip: 200, total: 3000 },
    duration: '2 Hours',
    price: '₹3,000',
    venue: {
      venueId: 'v1',
      area: 'CP',
      city: 'New Delhi',
      isApproved: true,
      meetingPoint: 'Blue Tokai Coffee, CP'
    }
  },
  { 
    id: 'CB-REQ-8830', 
    requestStatus: 'counter_proposed', 
    companionName: 'Aisha Sharma',
    companionId: 'c2',
    rating: '5.0', 
    activity: 'Shopping Companion',
    date: 'Sun, 26 Oct 2026', 
    scheduledStart: '5:00 PM',
    scheduledEnd: '8:00 PM',
    sessionPassCode: '5678',
    matchScore: 88,
    safetyTimerActive: false,
    earningsBreakdown: { base: 4500, tip: 0, total: 4500 },
    duration: '3 Hours', 
    price: '₹4,500',
    venue: {
      venueId: 'v2',
      area: 'Vasant Kunj',
      city: 'New Delhi',
      isApproved: true,
      meetingPoint: 'DLF Promenade'
    }
  },
  { 
    id: 'CB-ACC-1102', 
    requestStatus: 'accepted',
    sessionStatus: 'upcoming', 
    companionName: 'Marcus Chen',
    companionId: 'c3', 
    rating: '4.8',
    activity: 'Art Exhibition Tour',
    date: 'Sat, 25 Oct 2026', 
    scheduledStart: '2:00 PM',
    scheduledEnd: '4:00 PM',
    sessionPassCode: '1122',
    matchScore: 95,
    safetyTimerActive: true,
    earningsBreakdown: { base: 2500, tip: 0, total: 2500 },
    duration: '2 Hours',
    price: '₹2,500',
    venue: {
      venueId: 'v3',
      area: 'India Gate',
      city: 'New Delhi',
      isApproved: true,
      meetingPoint: 'National Gallery of Modern Art'
    }
  },
  { 
    id: 'CB-HIS-9921', 
    requestStatus: 'accepted',
    sessionStatus: 'completed', 
    companionName: 'Natasha',
    companionId: 'c4', 
    rating: '4.9',
    activity: 'Cafe Hopping',
    date: 'Wed, 10 Oct 2026', 
    scheduledStart: '1:00 PM',
    scheduledEnd: '3:00 PM',
    sessionPassCode: '9988',
    matchScore: 80,
    safetyTimerActive: false,
    earningsBreakdown: { base: 2000, tip: 0, total: 2000 },
    duration: '2 Hours', 
    price: '₹2,000',
    venue: {
      venueId: 'v4',
      area: 'Cyber Hub',
      city: 'Gurugram',
      isApproved: true,
      meetingPoint: 'Cyber Hub, Gurugram'
    }
  },
  { 
    id: 'CB-DEC-5510', 
    requestStatus: 'declined', 
    companionName: 'Sophia Patel',
    companionId: 'c5', 
    rating: '4.7',
    activity: 'Movie Premiere',
    date: 'Mon, 12 Oct 2026', 
    scheduledStart: '8:00 PM',
    scheduledEnd: '11:00 PM',
    sessionPassCode: '0000',
    matchScore: 75,
    safetyTimerActive: false,
    earningsBreakdown: { base: 5000, tip: 0, total: 5000 },
    duration: '3 Hours', 
    price: '₹5,000',
    venue: { venueId: 'v5', name: 'Promenade PVR', area: 'Vasant Kunj', city: 'New Delhi', isApproved: true, venueType: 'movie_theater', meetingPoint: 'PVR Director Cut', landmark: 'Food Court' }
  },
];



export const MOCK_VENUES = [
  { venueId: 'v1', name: 'Blue Tokai', area: 'CP', city: 'New Delhi', isApproved: true, venueType: 'cafe', meetingPoint: 'Blue Tokai Coffee, CP', landmark: 'Inner Circle' },
  { venueId: 'v2', name: 'HKV Starbucks', area: 'Hauz Khas', city: 'New Delhi', isApproved: true, venueType: 'cafe', meetingPoint: 'Starbucks, Hauz Khas', landmark: 'Near Deer Park' },
  { venueId: 'v3', name: 'Promenade Mall', area: 'Vasant Kunj', city: 'New Delhi', isApproved: true, venueType: 'shopping_mall', meetingPoint: 'DLF Promenade Mall', landmark: 'Main Gate' }
];



export const MOCK_DETAILS = {
  id: 'CB-REQ-8829',
  requestStatus: 'accepted',
  sessionStatus: 'upcoming', // Matches previous 'Accepted' state
  createdAt: 'Oct 23, 10:15 AM',
  companionName: 'Elena Vasquez',
  companionId: 'c1',
  companionRating: '4.9',
  companionReviews: '128',
  activity: 'Fine Dining & Drinks',
  date: 'Friday, 24 Oct 2026',
  scheduledStart: '7:00 PM',
  scheduledEnd: '9:00 PM',
  sessionPassCode: '1234',
  matchScore: 92,
  safetyTimerActive: false,
  earningsBreakdown: { base: 2800, tip: 200, total: 3000 },
  duration: '2 Hours',
  venue: {
    venueId: 'v1',
    area: 'CP',
    city: 'New Delhi',
    isApproved: true,
    meetingPoint: 'Blue Tokai Coffee'
  },
  address: 'Connaught Place, Inner Circle, New Delhi, 110001',
  sessionRate: '₹3,000',
  platformFee: '₹150',
  taxes: '₹54',
  total: '₹3,204',
  notes: 'I prefer sitting near the window. Please wear smart casuals.',
  declineReason: 'I am so sorry, but I just got booked for a full-day event on this date.',
};
