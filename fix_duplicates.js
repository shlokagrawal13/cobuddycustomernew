const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the moves
const moves = [
  { from: 'src/screens/session/ActiveSessionsScreen.tsx', to: 'src/screens/settings/ActiveSessionsScreen.tsx' },
  { from: 'src/screens/settings/NotificationsScreen.tsx', to: 'src/screens/home/NotificationsScreen.tsx' }
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

  // Replace imports for ActiveSessionsScreen
  content = content.replace(/from\s+['"]([^'"]*?)session\/ActiveSessionsScreen['"]/g, "from '$1settings/ActiveSessionsScreen'");
  
  // Replace imports for NotificationsScreen
  content = content.replace(/from\s+['"]([^'"]*?)settings\/NotificationsScreen['"]/g, "from '$1home/NotificationsScreen'");

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
});
