// MOCK: replace with API

export const DUMMY_PROFILE = {
  id: 'c1',
  name: 'Sarah',
  age: 26,
  photos: [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  ],
  trustScore: 98,
  location: 'Mumbai, Maharashtra',
  bio: "Hi! I love exploring new cafes in the city and talking about art, literature, and movies. Let's hang out in a nice public spot and have a great conversation!",
  languages: ['English (Fluent)', 'Spanish (Basic)'],
  personality: ['Introvert', 'Good Listener', 'Foodie'],
  hobbies: ['Photography', 'Anime', 'Reading'],
  pronouns: 'She/Her',
  lastActive: 'Online now',
  responseTime: '< 1 hour',
  responseRate: '95%',
  memberSince: '2024',
  completedSessions: 154,
  distance: '2.5 km away',
  travelPreference: 'Willing to travel up to 10 km',
  pricing: [
    { activity: 'Coffee / Dining', price: '₹500/hr', icon: 'coffee-outline' },
    { activity: 'Movies / Events', price: '₹800/hr', icon: 'ticket-outline' },
    { activity: 'City Tour', price: '₹1000/hr', icon: 'city-variant-outline' },
  ],
  schedule: 'Available Today: 4 PM - 9 PM',
  cancellationPolicy: 'Free cancellation up to 24 hours before the session.',
  rules: [
    'Public places only',
    'No smoking during sessions',
    'Please book 24 hours in advance'
  ],
  verifications: [
    { label: 'ID Verified', icon: 'badge-account-horizontal-outline', color: '#10B981' },
    { label: 'Phone Verified', icon: 'phone-check-outline', color: '#10B981' },
    { label: 'Background Checked', icon: 'file-document-check-outline', color: '#10B981' },
  ],
  reviews: {
    average: 4.9,
    count: 24,
    categories: { punctuality: 5.0, communication: 4.8, behavior: 4.9 },
    items: [
      { id: 'r1', author: 'Alex', date: 'Oct 2026', activity: 'Coffee / Dining', text: 'Sarah was a great listener and knew the best cafe in town. Really enjoyed our conversation.' },
      { id: 'r2', author: 'Jamie', date: 'Sep 2026', activity: 'City Tour', text: 'Super friendly and polite. Showed me some hidden gems in the city. Felt very safe and comfortable.' },
    ]
  }
};



export const DUMMY_COMPANIONS = [
  {
    id: 'c1',
    name: 'Elena Vasquez',
    initials: 'EV',
    title: 'City guide & local experiences expert',
    activities: ['Fine Dining', 'Art & Culture', 'Networking'],
    trustScore: 98,
    rating: 4.97,
    reviews: 124,
    sessions: 312,
    rate: '₹500 /hr',
    distance: '2.5 km away',
    isOnline: true,
    category: 'conversation',
    gender: 'Female',
  },
  {
    id: 'c2',
    name: 'Marcus Chen',
    initials: 'MC',
    title: 'Art historian & cultural explorer',
    activities: ['Art & Culture', 'Architecture', 'Wellness'],
    trustScore: 96,
    rating: 4.92,
    reviews: 89,
    sessions: 205,
    rate: '₹450 /hr',
    distance: '4.0 km away',
    isOnline: true,
    category: 'movie',
    gender: 'Male',
  },
  {
    id: 'c3',
    name: 'Sophia Laurent',
    initials: 'SL',
    title: 'Coffee enthusiast & deep conversations',
    activities: ['Coffee', 'Networking', 'Study Buddy'],
    trustScore: 99,
    rating: 4.99,
    reviews: 210,
    sessions: 512,
    rate: '₹600 /hr',
    distance: '1.2 km away',
    isOnline: false,
    category: 'coffee',
    gender: 'Female',
  },
];



export const DUMMY_FEATURED = [
  {
    id: 'f1',
    name: 'Elena Vasquez',
    initials: 'EV',
    title: 'City guide & local experiences expert',
    activities: ['Fine Dining', 'Art & Culture'],
    trustScore: 98,
    rating: 4.97,
    reviews: 124,
    sessions: 312,
    rate: '₹500 /hr',
    distance: '2.5 km away',
    isOnline: true,
  },
  {
    id: 'f2',
    name: 'Marcus Chen',
    initials: 'MC',
    title: 'Art historian & cultural explorer',
    activities: ['Art & Culture', 'Architecture'],
    trustScore: 96,
    rating: 4.92,
    reviews: 89,
    sessions: 205,
    rate: '₹450 /hr',
    distance: '4.0 km away',
    isOnline: true,
  },
];



