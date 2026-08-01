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

const files = findFiles('src', ['.tsx', '.ts'], []);
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if(line.includes('t(`')) console.log(f + ':' + (i+1) + ': ' + line.trim());
  });
});
