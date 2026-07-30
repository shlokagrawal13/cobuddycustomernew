const fs = require('fs');

let file = 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// Match the FIRST DEFAULT_MOCK_DATA which is outside the component
content = content.replace(/const DEFAULT_MOCK_DATA = \{[\s\S]*?\};\n\n/, '');

fs.writeFileSync(file, content);
console.log('Removed module-level DEFAULT_MOCK_DATA');
