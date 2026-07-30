const fs = require('fs');

function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  replacements.forEach(r => {
    content = content.replace(r.find, r.replace);
  });
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}

replaceInFile('src/screens/booking/BookingVenueSelectScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction',\s*'Action'\)\}/g, replace: "accessibilityLabel={t('a11ySelectVenue', 'Select {{venue}}', { venue: venue.name })}" }
]);

replaceInFile('src/screens/booking/LocationSelectionScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yNext',\s*'Next'\)\}/g, replace: "accessibilityLabel={t('a11yUseCurrentLocation', 'Use current location')}" }
]);
