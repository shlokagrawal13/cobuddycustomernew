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
const jsonFilePaths = {};
jsonFiles.forEach(f => {
  let relativePath = path.relative(localesDir, f).replace('.json', '');
  relativePath = relativePath.split(path.sep).join('.');
  try {
      localeData[relativePath] = JSON.parse(fs.readFileSync(f, 'utf8'));
      jsonFilePaths[relativePath] = f;
  } catch (e) {
      console.error('Invalid JSON:', f);
  }
});

function getNestedValue(obj, pathParts) {
    let curr = obj;
    for (let p of pathParts) {
        if (curr === undefined || curr === null) return undefined;
        curr = curr[p];
    }
    return curr;
}

function setNestedValue(obj, pathParts, value) {
    let curr = obj;
    for (let i = 0; i < pathParts.length - 1; i++) {
        const p = pathParts[i];
        if (curr[p] === undefined || curr[p] === null) {
            curr[p] = {};
        }
        curr = curr[p];
    }
    curr[pathParts[pathParts.length - 1]] = value;
}

let modifiedFiles = new Set();

// 2. Scan for t() calls
tsxFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    let defaultNs = 'common';
    const useTransMatch = content.match(/useTranslation\(\s*['"]([^'"]+)['"]\s*\)/);
    if (useTransMatch) {
        defaultNs = useTransMatch[1];
    }

    // Match t('key', 'fallback text') or t("key", "fallback")
    const tRegex = /\bt\(\s*(['"])([^'"]+)\1\s*(?:,\s*(['"])(.*?)\3)?/g;
    let match;
    while ((match = tRegex.exec(content)) !== null) {
        let keyStr = match[2];
        let fallbackStr = match[4] || keyStr.split('.').pop(); // default to last part of key
        
        let ns = defaultNs;
        let keyPath = keyStr;
        if (keyStr.includes(':')) {
            const parts = keyStr.split(':');
            ns = parts[0];
            keyPath = parts.slice(1).join(':');
        }
        
        let targetJsonNs = ns;
        if (ns === 'onboarding') targetJsonNs = 'onboarding.' + keyPath.split('.')[0];
        else if (ns === 'auth') targetJsonNs = 'auth.' + keyPath.split('.')[0];
        else if (ns === 'verify') targetJsonNs = 'verify.' + keyPath.split('.')[0];

        let actualKeyPath = keyPath;
        if (['onboarding', 'auth', 'verify'].includes(ns)) {
            actualKeyPath = keyPath.split('.').slice(1).join('.');
        }

        if (targetJsonNs === 'wallet.wallet') {
             // it maps to 'wallet.wallet' exactly.
        }

        if (localeData[targetJsonNs]) {
            const val = getNestedValue(localeData[targetJsonNs], actualKeyPath.split('.'));
            if (val === undefined && !keyStr.includes('fallback.') && !keyStr.includes('a11y')) {
                console.log(`[FIXING] ${targetJsonNs} : ${actualKeyPath} -> "${fallbackStr}"`);
                setNestedValue(localeData[targetJsonNs], actualKeyPath.split('.'), fallbackStr);
                modifiedFiles.add(targetJsonNs);
            }
        }
    }
});

modifiedFiles.forEach(ns => {
    const f = jsonFilePaths[ns];
    fs.writeFileSync(f, JSON.stringify(localeData[ns], null, 2) + '\n', 'utf8');
    console.log(`Saved ${f}`);
});
