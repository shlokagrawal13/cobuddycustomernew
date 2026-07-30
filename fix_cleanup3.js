const fs = require('fs');

let content = fs.readFileSync('src/screens/booking/alerts/BookingCounterOfferScreen.tsx', 'utf8');

const mockDataBlock = `const DEFAULT_MOCK_DATA = {
  bookingId: 'CB-REQ-8830',
  companionName: 'Aisha Sharma',
  activity: 'Shopping Companion',
  venue: 'DLF Promenade, Vasant Kunj',
  date: 'Sun, 26 Oct 2026',
  
  originalTime: '5:00 PM - 8:00 PM',
  newTime: '6:00 PM - 9:00 PM',
  originalAmount: '₹4,000',
  newAmount: '₹4,500', 
  
  message: "Hi! I have another engagement that runs late. Can we shift by 1 hour? Also due to weekend peak rates, I have slightly adjusted the price. Let me know if this works!",
};
`;

// Remove original MOCK DATA
content = content.replace(/const DEFAULT_MOCK_DATA = \{[\s\S]*?\};\n\n/, '');
content = content.replace(/message:\s*t\('defaultMessage',\s*'[^']+'\),/g, ''); // just in case the node script replaced it previously and it was checked in, but checkout restored it to my FIRST replace script from earlier!

// wait, since I checked it out from git, the file has the original content where it WAS NOT translated.
// Wait, my first node script in THIS run modified it.
// Let's just do a reliable replace using string manipulation.

content = fs.readFileSync('src/screens/booking/alerts/BookingCounterOfferScreen.tsx', 'utf8');
content = content.replace(/const DEFAULT_MOCK_DATA = \{[\s\S]*?\};\n/, '');

content = content.replace(
  /export const BookingCounterOfferScreen = \(\{ route \}: \{ route: any \}\) => \{ \n  const \{ t \} = useTranslation\('booking.counterOffer'\);/,
  `export const BookingCounterOfferScreen = ({ route }: { route: any }) => { 
  const { t } = useTranslation('booking.counterOffer');

  const DEFAULT_MOCK_DATA = {
    bookingId: 'CB-REQ-8830',
    companionName: 'Aisha Sharma',
    activity: 'Shopping Companion',
    venue: 'DLF Promenade, Vasant Kunj',
    date: 'Sun, 26 Oct 2026',
    
    originalTime: '5:00 PM - 8:00 PM',
    newTime: '6:00 PM - 9:00 PM',
    originalAmount: '₹4,000',
    newAmount: '₹4,500', 
    
    message: t('defaultMessage', 'Hi! I have another engagement that runs late. Can we shift by 1 hour? Also due to weekend peak rates, I have slightly adjusted the price. Let me know if this works!'),
  };`
);

fs.writeFileSync('src/screens/booking/alerts/BookingCounterOfferScreen.tsx', content);
console.log("Updated BookingCounterOfferScreen");
