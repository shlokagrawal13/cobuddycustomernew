const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const srcDir = path.join(process.cwd(), 'src');
const tsxFiles = getAllFiles(srcDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

// 1. Map all JSON files
const localesDir = path.join(srcDir, 'i18n', 'locales', 'en');
const jsonFiles = getAllFiles(localesDir).filter(f => f.endsWith('.json'));

const localeData = {};
jsonFiles.forEach(f => {
  // on windows path.relative gives 'wallet\\wallet.json'
  let relativePath = path.relative(localesDir, f).replace('.json', '');
  relativePath = relativePath.split(path.sep).join('.'); // 'wallet.wallet'
  
  // Note: some namespaces in index.ts don't match the path perfectly!
  // e.g. home/dashboard -> 'home.dashboard'
  // onboarding/contacts -> 'onboarding' (but the content is inside the onboarding namespace object... Wait, in index.ts:
  // onboarding is just a big object { welcome, consent, contacts... }
  try {
      localeData[relativePath] = JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch (e) {
      console.error('Invalid JSON:', f);
  }
});

// Since index.ts maps them to custom strings, let's just parse index.ts to get the exact mappings
const indexTs = fs.readFileSync(path.join(srcDir, 'i18n', 'index.ts'), 'utf8');
const resourcesMatch = indexTs.match(/const resources = \{[\s\S]*?\}\s*;/);

function getNestedValue(obj, pathParts) {
    let curr = obj;
    for (let p of pathParts) {
        if (curr === undefined || curr === null) return undefined;
        curr = curr[p];
    }
    return curr;
}

// 2. Scan for t() calls
let staticMissing = 0;
tsxFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Extract useTranslation
    let defaultNs = 'common';
    const useTransMatch = content.match(/useTranslation\(\s*['"]([^'"]+)['"]\s*\)/);
    if (useTransMatch) {
        defaultNs = useTransMatch[1];
    }

    // Extract all t( calls
    const tRegex = /\bt\(\s*(`[^`]+`|'[^']+'|"[^"]+")/g;
    let match;
    while ((match = tRegex.exec(content)) !== null) {
        let keyStr = match[1];
        let isDynamic = keyStr.startsWith('`') && keyStr.includes('${');
        if (!isDynamic) {
            keyStr = keyStr.slice(1, -1); // remove quotes
            let ns = defaultNs;
            let keyPath = keyStr;
            if (keyStr.includes(':')) {
                const parts = keyStr.split(':');
                ns = parts[0];
                keyPath = parts.slice(1).join(':');
            }
            
            // if ns is 'onboarding', we look in locales/en/onboarding/*.json
            // wait, if ns is onboarding, then keyPath is 'contacts.rel_family'
            // so file is 'onboarding/contacts.json' and key is 'rel_family'
            let val;
            if (ns === 'onboarding') {
                 const firstPart = keyPath.split('.')[0];
                 const rest = keyPath.split('.').slice(1);
                 const jsonNs = 'onboarding.' + firstPart;
                 if (localeData[jsonNs]) val = getNestedValue(localeData[jsonNs], rest);
                 else val = undefined;
            } else if (ns === 'auth') {
                 const firstPart = keyPath.split('.')[0];
                 const rest = keyPath.split('.').slice(1);
                 const jsonNs = 'auth.' + firstPart;
                 if (localeData[jsonNs]) val = getNestedValue(localeData[jsonNs], rest);
                 else val = undefined;
            } else if (ns === 'verify') {
                 const firstPart = keyPath.split('.')[0];
                 const rest = keyPath.split('.').slice(1);
                 const jsonNs = 'verify.' + firstPart;
                 if (localeData[jsonNs]) val = getNestedValue(localeData[jsonNs], rest);
                 else val = undefined;
            } else {
                 if (localeData[ns]) val = getNestedValue(localeData[ns], keyPath.split('.'));
                 else val = undefined;
            }

            if (val === undefined && ns !== 'common' && !keyStr.includes('fallback.') && !keyStr.includes('a11y')) {
                console.log(`[STATIC MISSING] ${path.basename(file)}: t('${keyStr}') -> resolved ${ns}:${keyPath} but NOT FOUND`);
                staticMissing++;
            }
        }
    }
});
console.log('Total static missing:', staticMissing);
