const fs = require('fs');
const glob = require('glob');

glob('src/i18n/locales/en/**/*.json', (err, files) => {
    let count = 0;
    files.forEach(file => {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (data[''] !== undefined) {
            delete data[''];
            fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
            console.log('Fixed', file);
            count++;
        }
    });
    console.log('Fixed', count, 'files');
});
