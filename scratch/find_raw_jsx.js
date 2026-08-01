const fs = require('fs');
const path = require('path');

function findFiles(dir, exts, arr) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    if(fs.statSync(full).isDirectory()) findFiles(full, exts, arr);
    else if(exts.includes(path.extname(full))) arr.push(full);
  });
  return arr;
}

const files = findFiles('src', ['.tsx'], []);
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Simple regex to find >text< that has alphabetical characters
  const rawTextRegex = />([^<\{]+)</g;
  let match;
  while ((match = rawTextRegex.exec(content)) !== null) {
      let text = match[1].trim();
      // exclude pure symbols or empty
      if (text.length > 0 && /[A-Za-z]/.test(text)) {
          // Exclude some common icons/mock data
          console.log(`[RAW JSX] ${path.basename(f)}: "${text}"`);
      }
  }
});
