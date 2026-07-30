const fs = require('fs');

let bookingDetailFile = 'src/screens/bookings/BookingDetailScreen.tsx';
let content = fs.readFileSync(bookingDetailFile, 'utf8');

content = content.replace(
  /import \{ MOCK_DETAILS \} from '\.\.\/\.\.\/services\/mock';/,
  "import { MOCK_DETAILS, MOCK_BOOKINGS } from '../../services/mock';"
);

// We need to replace these three lines specifically
const oldLines = `  const bookingId = route.params?.bookingId || MOCK_DETAILS.id;
  const bookingStatus = route.params?.status || MOCK_DETAILS.status;
  const data = { ...MOCK_DETAILS, id: bookingId, status: bookingStatus };`;

const newLines = `  const bookingId = route.params?.bookingId;
  const matchedBooking = MOCK_BOOKINGS.find(b => b.id === bookingId);
  const data = matchedBooking
    ? { ...MOCK_DETAILS, ...matchedBooking, status: route.params?.status || matchedBooking.displayStatus }
    : { ...MOCK_DETAILS, id: bookingId || MOCK_DETAILS.id, status: route.params?.status || MOCK_DETAILS.status };`;

// Normalize line endings to do a reliable replace
content = content.replace(/\r\n/g, '\n');
content = content.replace(oldLines.replace(/\r\n/g, '\n'), newLines);

fs.writeFileSync(bookingDetailFile, content);
console.log('Updated BookingDetailScreen.tsx');
