const fs = require('fs');
let file = 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

let startIndex = content.indexOf('const DEFAULT_MOCK_DATA = {');
let endIndex = content.indexOf('};', startIndex) + 2;

if (startIndex !== -1 && startIndex < content.indexOf('export const BookingCounterOfferScreen')) {
  content = content.substring(0, startIndex) + content.substring(endIndex).trimStart();
  fs.writeFileSync(file, content);
  console.log('Removed FIRST DEFAULT_MOCK_DATA successfully.');
} else {
  console.log('Could not find the first DEFAULT_MOCK_DATA before the component export.');
}
