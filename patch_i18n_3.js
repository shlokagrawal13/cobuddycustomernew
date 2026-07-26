const fs = require('fs');

function replaceInFile(filepath, oldStr, newStr) {
    let content = fs.readFileSync(filepath, 'utf8');
    if (content.includes(oldStr)) {
        content = content.replace(oldStr, newStr);
        fs.writeFileSync(filepath, content, 'utf8');
        console.log('Patched ' + filepath);
    } else {
        console.log('Skipped ' + filepath + ' (not found)');
    }
}

replaceInFile('src/screens/settings/AppLockScreen.tsx',
    'Require {biometricName}',
    "{t('requireBiometric', 'Require {{biometric}}', { biometric: biometricName })}");

replaceInFile('src/screens/support/SupportCenterScreen.tsx',
    'No {activeTab.toLowerCase()} tickets',
    "{t('noTickets', 'No {{tab}} tickets', { tab: activeTab.toLowerCase() })}");

replaceInFile('src/components/ui/CompanionCard.tsx',
    'From <Text style={styles.rateValue}>{rate}</Text>',
    "{t('companionCard.fromRate', 'From ')}<Text style={styles.rateValue}>{rate}</Text>");

replaceInFile('src/components/ui/CompanionCard.tsx',
    "accessibilityLabel={\${t('companionCard.viewProfile', 'View Profile')} for \}",
    "accessibilityLabel={t('companionCard.viewProfileFor', 'View Profile for {{name}}', { name })}");
