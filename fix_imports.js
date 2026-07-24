const fs = require('fs');
const files = [
  'src/screens/booking/alerts/BookingAcceptedScreen.tsx',
  'src/screens/booking/alerts/BookingCounterOfferScreen.tsx',
  'src/screens/booking/alerts/BookingDeclinedScreen.tsx',
  'src/screens/booking/alerts/BookingRequestSentScreen.tsx'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/from '\.\.\/\.\.\/theme'/g, "from '../../../theme'");
  fs.writeFileSync(f, content);
});
