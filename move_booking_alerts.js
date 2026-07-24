const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const alertsDir = 'src/screens/booking/alerts';
if (!fs.existsSync(alertsDir)) {
  fs.mkdirSync(alertsDir, { recursive: true });
}

const moves = [
  { from: 'src/screens/booking/BookingAcceptedScreen.tsx', to: 'src/screens/booking/alerts/BookingAcceptedScreen.tsx' },
  { from: 'src/screens/booking/BookingDeclinedScreen.tsx', to: 'src/screens/booking/alerts/BookingDeclinedScreen.tsx' },
  { from: 'src/screens/booking/BookingRequestSentScreen.tsx', to: 'src/screens/booking/alerts/BookingRequestSentScreen.tsx' },
  { from: 'src/screens/booking/BookingCounterOfferScreen.tsx', to: 'src/screens/booking/alerts/BookingCounterOfferScreen.tsx' }
];

moves.forEach(m => {
  try {
    execSync(`git mv ${m.from} ${m.to}`);
    console.log(`Moved ${m.from} to ${m.to}`);
  } catch (e) {
    console.error(`Error moving ${m.from}:`, e.message);
  }
});

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/from\s+['"]([^'"]*?)booking\/BookingAcceptedScreen['"]/g, "from '$1booking/alerts/BookingAcceptedScreen'");
  content = content.replace(/from\s+['"]([^'"]*?)booking\/BookingDeclinedScreen['"]/g, "from '$1booking/alerts/BookingDeclinedScreen'");
  content = content.replace(/from\s+['"]([^'"]*?)booking\/BookingRequestSentScreen['"]/g, "from '$1booking/alerts/BookingRequestSentScreen'");
  content = content.replace(/from\s+['"]([^'"]*?)booking\/BookingCounterOfferScreen['"]/g, "from '$1booking/alerts/BookingCounterOfferScreen'");

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
});
