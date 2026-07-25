const fs = require('fs');
const path = require('path');

function refactorSettingsHub() {
    const filePath = 'src/screens/settings/SettingsHubScreen.tsx';
    const jsonPath = 'src/i18n/locales/en/settings/hub.json';
    let code = fs.readFileSync(filePath, 'utf8');

    // Make sure we have useTranslation
    if (!code.includes("useTranslation")) {
        code = code.replace(
            "import { useNavigation",
            "import { useTranslation } from 'react-i18next';\nimport { useNavigation"
        );
    }
    
    // Inject hook
    if (!code.includes("useTranslation('settings.hub')")) {
        code = code.replace(/export const SettingsHubScreen = \(\) => \{/, "$& \n  const { t } = useTranslation('settings.hub');");
    }

    // Replace render tags
    code = code.replace(
        /<Text style=\{styles\.sectionTitle\}>\{section\.title\}<\/Text>/g,
        "<Text style={styles.sectionTitle}>{t(`sections.${section.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, section.title)}</Text>"
    );
    
    code = code.replace(
        /<Text style=\{styles\.title\}>\{item\.title\}<\/Text>/g,
        "<Text style={styles.title}>{t(`items.${item.id}.title`, item.title)}</Text>"
    );
    code = code.replace(
        /<Text style=\{styles\.sub\}>\{item\.sub\}<\/Text>/g,
        "<Text style={styles.sub}>{t(`items.${item.id}.sub`, item.sub)}</Text>"
    );

    code = code.replace(/>Settings</, ">{t('headerTitle', 'Settings')}<");
    code = code.replace(/>Your Privacy, Our Priority</, ">{t('privacyTitle', 'Your Privacy, Our Priority')}<");
    code = code.replace(/>CoBuddy is built on a privacy-first architecture\.</, ">{t('privacySub', 'CoBuddy is built on a privacy-first architecture.')}<");
    code = code.replace(/>Data Sovereignty</, ">{t('pillar1', 'Data Sovereignty')}<");
    code = code.replace(/>Zero-Share</, ">{t('pillar2', 'Zero-Share')}<");
    code = code.replace(/>AES-256 Auth</, ">{t('pillar3', 'AES-256 Auth')}<");
    code = code.replace(/>DEV ZONE \(TEMPORARY\)</, ">{t('devZone', 'DEV ZONE (TEMPORARY)')}<");
    code = code.replace(/>DANGER ZONE</, ">{t('dangerZone', 'DANGER ZONE')}<");
    code = code.replace(/>Log Out</g, ">{t('logOut', 'Log Out')}<");
    code = code.replace(/>CoBuddy</, ">{t('brand', 'CoBuddy')}<");
    code = code.replace(/>© 2026 CoBuddy Technologies</, ">{t('copyright', '© 2026 CoBuddy Technologies')}<");
    code = code.replace(/>v1\.0\.0 \(Build 42\)</, ">{t('version', 'v1.0.0 (Build 42)')}<");

    // Replace literal in Alert
    code = code.replace(
        /Alert\.alert\(\s*'Log Out',\s*'Are you sure you want to log out of CoBuddy\?',/,
        "Alert.alert(\n      t('logOutAlert.title', 'Log Out'),\n      t('logOutAlert.message', 'Are you sure you want to log out of CoBuddy?'),"
    );
    
    fs.writeFileSync(filePath, code);

    // Build the JSON file
    const hubJson = {
        headerTitle: "Settings",
        privacyTitle: "Your Privacy, Our Priority",
        privacySub: "CoBuddy is built on a privacy-first architecture.",
        pillar1: "Data Sovereignty",
        pillar2: "Zero-Share",
        pillar3: "AES-256 Auth",
        devZone: "DEV ZONE (TEMPORARY)",
        dangerZone: "DANGER ZONE",
        logOut: "Log Out",
        brand: "CoBuddy",
        copyright: "© 2026 CoBuddy Technologies",
        version: "v1.0.0 (Build 42)",
        logOutAlert: {
            title: "Log Out",
            message: "Are you sure you want to log out of CoBuddy?"
        },
        sections: {
            "account": "ACCOUNT",
            "privacy___safety": "PRIVACY & SAFETY",
            "data___notifications": "DATA & NOTIFICATIONS",
            "support": "SUPPORT"
        },
        items: {
            "acc": { "title": "Account Settings", "sub": "Phone, Email, Linked Accounts" },
            "perms": { "title": "App Permissions", "sub": "Camera, Location, Microphone" },
            "sessions": { "title": "Active Sessions", "sub": "Manage logged-in devices" },
            "applock": { "title": "App Lock", "sub": "FaceID & Biometrics" },
            "blocked": { "title": "Blocked Users", "sub": "Manage your blocked list" },
            "safety": { "title": "Safety Settings", "sub": "SOS & Trusted Contacts" },
            "notif": { "title": "Notifications", "sub": "Push & Email preferences" },
            "data": { "title": "Data & Cache", "sub": "Clear cache & consent manager" },
            "lang": { "title": "App Language", "sub": "English (US)" },
            "help": { "title": "Help Center", "sub": "FAQs & Guides" },
            "contact": { "title": "Contact Support", "sub": "24/7 Concierge Chat" },
            "report": { "title": "Report a Problem", "sub": "Flag an issue or bug" },
            "deactivate": { "title": "Deactivate Account", "sub": "Temporarily hide your profile" },
            "delete": { "title": "Delete Account", "sub": "Permanently remove all data" },
            "susp": { "title": "Suspended Screen" },
            "rev": { "title": "Under Review Screen" },
            "react": { "title": "Reactivation Request" },
            "pol": { "title": "Policy Violation" },
            "deact": { "title": "Deactivated Screen" },
            "net": { "title": "Network Error" },
            "force": { "title": "Force Update" },
            "maint": { "title": "Maintenance Mode" }
        }
    };

    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(jsonPath, JSON.stringify(hubJson, null, 2));

    console.log('SettingsHubScreen processed');
}

refactorSettingsHub();
