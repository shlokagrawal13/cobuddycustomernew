const fs = require('fs');

let file = 'src/screens/safety/SafetyHubScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// Also check if accessibilityLabel has it on the same button
content = content.replace(/\{isSOSActive \? "SAFE" : t\('sosBtn', 'SOS'\)\}/g, "{isSOSActive ? t('sosBtnSafe', 'SAFE') : t('sosBtn', 'SOS')}");
// Wait, is it "SAFE" in the accessibilityLabel too? Let's check visually later or just replace globally.
content = content.replace(/accessibilityLabel=\{isSOSActive \? 'SAFE' : t\('sosBtn', 'SOS'\)\}/g, "accessibilityLabel={isSOSActive ? t('sosBtnSafe', 'SAFE') : t('sosBtn', 'SOS')}");

fs.writeFileSync(file, content);
console.log('Fixed SafetyHubScreen.tsx');

let jsonFile = 'src/i18n/locales/en/safety/hub.json';
let jsonContent = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
jsonContent['sosBtnSafe'] = 'SAFE';
fs.writeFileSync(jsonFile, JSON.stringify(jsonContent, null, 2) + '\n');
console.log('Updated hub.json');
