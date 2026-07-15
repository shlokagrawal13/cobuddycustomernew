const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/screens');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let updated = false;
  
  if (content.includes("t('onboarding.")) {
    content = content.replace(/t\('onboarding\./g, "t('");
    updated = true;
  }
  
  if (file !== 'PhoneLoginScreen.tsx' && file !== 'OTPVerificationScreen.tsx') {
    if (content.includes("useTranslation(['common'])")) {
      content = content.replace(/useTranslation\(\['common'\]\)/g, "useTranslation(['onboarding'])");
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', file);
  }
}
