const fs = require('fs');
const path = require('path');
function findTextNodes(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findTextNodes(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('useTranslation') && !content.includes('// i18n-ignore')) {
        const matches = [...content.matchAll(/<Text[^>]*>([^<{}]+)<\/Text>/g)];
        const validMatches = matches.map(m => m[1].trim()).filter(t => t.length > 0 && /[a-zA-Z]/.test(t));
        if (validMatches.length > 0) {
          console.log(fullPath);
          console.log(validMatches);
        }
      }
    }
  }
}
findTextNodes('src/screens');
