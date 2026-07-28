const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/screens/wallet/AddPaymentMethodScreen.tsx',
    replacements: [
      { search: 'navigation.navigate(\'PaymentMethodsScreen\', { newMethod: newCard });', replace: 'navigation.navigate(\'PaymentMethodsScreen\' as any, { newMethod: newCard as any });' }
    ]
  },
  {
    file: 'src/screens/wallet/PaymentMethodsScreen.tsx',
    replacements: [
      { search: 'isDefault?: boolean | undefined;', replace: 'isDefault?: boolean;' }, // this probably didn't do anything before
      { search: 'isVerified?: boolean | undefined;', replace: 'isVerified?: boolean;' }
    ]
  }
];

let totalReplaced = 0;

replacements.forEach(({ file, replacements: fileReplacements }) => {
  const fullPath = path.join('C:\\cobuddycustomernew', file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  let fileModified = false;
  
  fileReplacements.forEach(({ search, replace }) => {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fileModified = true;
      totalReplaced++;
    }
  });

  if (fileModified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Total replacements made: ${totalReplaced}`);
