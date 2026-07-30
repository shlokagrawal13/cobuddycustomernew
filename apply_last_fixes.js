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

// 1. SafetySettingsScreen
replaceInFile('src/screens/safety/SafetySettingsScreen.tsx', [
  { 
    find: /<CustomSwitch value=\{verifiedOnly\} onValueChange=\{setVerifiedOnly\} \/>/g, 
    replace: "<CustomSwitch value={verifiedOnly} onValueChange={setVerifiedOnly} label={t('a11yVerifiedOnly', 'Toggle Verified Users Only')} />" 
  },
  { 
    find: /<CustomSwitch value=\{contactShare\} onValueChange=\{setContactShare\} \/>/g, 
    replace: "<CustomSwitch value={contactShare} onValueChange={setContactShare} label={t('a11yContactShare', 'Toggle Trusted Contact Sharing')} />" 
  },
  { 
    find: /<CustomSwitch value=\{liveMonitor\} onValueChange=\{setLiveMonitor\} \/>/g, 
    replace: "<CustomSwitch value={liveMonitor} onValueChange={setLiveMonitor} label={t('a11yLiveMonitor', 'Toggle Live Safety Monitoring')} />" 
  }
]);

// 2. AppLockScreen
replaceInFile('src/screens/settings/AppLockScreen.tsx', [
  {
    find: /const biometricName = Platform\.OS === 'ios' \? 'Face ID' : 'Biometric Lock';/g,
    replace: "const biometricName = Platform.OS === 'ios' ? 'Face ID' : t('biometricLockName', 'Biometric Lock');"
  }
]);


function updateJson(file, newKeys) {
  let content = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [key, value] of Object.entries(newKeys)) {
    const parts = key.split('.');
    let current = content;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  fs.writeFileSync(file, JSON.stringify(content, null, 2) + '\n');
  console.log(`Updated JSON: ${file}`);
}

updateJson('src/i18n/locales/en/safety/settings.json', {
  'a11yVerifiedOnly': 'Toggle Verified Users Only',
  'a11yContactShare': 'Toggle Trusted Contact Sharing',
  'a11yLiveMonitor': 'Toggle Live Safety Monitoring'
});

updateJson('src/i18n/locales/en/settings/appLock.json', {
  'biometricLockName': 'Biometric Lock'
});
