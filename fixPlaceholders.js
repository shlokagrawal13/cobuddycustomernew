const fs = require('fs');
const path = require('path');

function toCamelCase(str) {
  return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Check if t is defined
  const hasT = content.includes('const { t } = useTranslation') || content.includes('const {t} = useTranslation') || content.includes('const { t } = useTranslation');
  
  if (!hasT) {
    // If it has placeholder or title but no t, log it
    if (content.match(/(placeholder|title)="[^"]+"/)) {
      console.log('Needs t hook:', filePath);
    }
    return;
  }

  // Replace placeholder="text" -> placeholder={t('placeholder.text', 'text')}
  content = content.replace(/placeholder="([^"]+)"/g, (match, text) => {
    // Escape single quotes in text for the fallback string
    const escapedText = text.replace(/'/g, "\\'");
    const key = toCamelCase(text) || 'text';
    return `placeholder={t('placeholder.${key}', '${escapedText}')}`;
  });

  // Replace title="text" -> title={t('title.text', 'text')}
  content = content.replace(/title="([^"]+)"/g, (match, text) => {
    const escapedText = text.replace(/'/g, "\\'");
    const key = toCamelCase(text) || 'text';
    return `title={t('title.${key}', '${escapedText}')}`;
  });

  // Replace centerLabel="text" -> centerLabel={t('centerLabel.text', 'text')}
  content = content.replace(/centerLabel="([^"]+)"/g, (match, text) => {
    const escapedText = text.replace(/'/g, "\\'");
    const key = toCamelCase(text) || 'text';
    return `centerLabel={t('centerLabel.${key}', '${escapedText}')}`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = [...walk('src/screens'), ...walk('src/components')];
files.forEach(processFile);
