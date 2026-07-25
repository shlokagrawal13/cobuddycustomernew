const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath, isAlreadyTranslated) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
    if (isAlreadyTranslated) {
        // Just update the namespace
        code = code.replace(
            /useTranslation\(['"][^'"]+['"]\)/,
            `useTranslation('${ns}')`
        );
    } else {
        // Add Import
        if (!code.includes("useTranslation")) {
            code = code.replace(
                "import { useNavigation",
                "import { useTranslation } from 'react-i18next';\nimport { useNavigation"
            );
            if (!code.includes("useTranslation")) {
                code = code.replace(
                    "import React",
                    "import { useTranslation } from 'react-i18next';\nimport React"
                );
            }
        }

        // Add Hook
        const componentMatch = code.match(/export const (\w+) =/);
        if (componentMatch) {
            const compName = componentMatch[1];
            if (!code.includes(`const { t } = useTranslation('${ns}');`)) {
                code = code.replace(
                    new RegExp(`export const ${compName} = \\([^)]*\\) => \\{`),
                    `$& \n  const { t } = useTranslation('${ns}');`
                );
            }
        }

        // Replacements
        let jsonContent = {};
        for (const [search, [key, fallback, replacementStr]] of Object.entries(replacements)) {
            if (replacementStr) {
                code = code.split(search).join(replacementStr);
                if (key) jsonContent[key] = fallback;
            } else {
                code = code.split(search).join(`>{t('${key}', '${fallback.replace(/'/g, "\\'")}')}<`);
                jsonContent[key] = fallback;
            }
        }

        // Save json
        let existingJson = {};
        if (fs.existsSync(jsonPath)) {
            try { existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch(e){}
        }
        const finalJson = { ...existingJson, ...jsonContent };
        
        const dir = path.dirname(jsonPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(jsonPath, JSON.stringify(finalJson, null, 2));
    }

    fs.writeFileSync(filePath, code);
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/home/HomeDashboardScreen.tsx',
        ns: 'home.dashboard',
        isAlreadyTranslated: true
    },
    {
        file: 'src/screens/home/DiscoverScreen.tsx',
        ns: 'home.discover',
        isAlreadyTranslated: true
    },
    {
        file: 'src/screens/home/CompanionProfileScreen.tsx',
        ns: 'home.companionProfile',
        isAlreadyTranslated: true
    },
    {
        file: 'src/screens/home/NotificationsScreen.tsx',
        ns: 'home.notifications',
        json: 'src/i18n/locales/en/home/notifications.json',
        isAlreadyTranslated: false,
        replacements: {
            '>Mark all read<': ['markAllRead', 'Mark all read'],
            '>All Caught Up!<': ['emptyTitle', 'All Caught Up!'],
            '>You have no notifications in this category right now.<': ['emptySub', 'You have no notifications in this category right now.']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json, b.isAlreadyTranslated));
