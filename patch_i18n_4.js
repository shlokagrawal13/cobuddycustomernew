const fs = require('fs');

let content = fs.readFileSync('src/components/ui/CompanionCard.tsx', 'utf8');

// Replace the reviews / sessions line using regex
content = content.replace(
    /\{rating\} <Text style=\{styles\.statsMuted\}>.*\{reviews\} reviews.*\{sessions\} sessions<\/Text>/,
    "{rating} <Text style={styles.statsMuted}>{t('companionCard.statsMuted', '• {{reviews}} reviews • {{sessions}} sessions', { reviews, sessions })}</Text>"
);

// Replace the accessibilityLabel using regex
content = content.replace(
    /accessibilityLabel=\{\\$\{t\('companionCard\.viewProfile', 'View Profile'\)\} for \$\{name\}\\}/,
    "accessibilityLabel={t('companionCard.viewProfileFor', 'View Profile for {{name}}', { name })}"
);

fs.writeFileSync('src/components/ui/CompanionCard.tsx', content, 'utf8');
console.log('Patched CompanionCard.tsx');
