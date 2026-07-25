const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Replace 'system' with new ns
    code = code.replace(/useTranslation\(\['system'\]\)/g, `useTranslation('${ns}')`);
    code = code.replace(/useTranslation\(['"]system['"]\)/g, `useTranslation('${ns}')`);

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

    fs.writeFileSync(filePath, code);
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/system/AccountDeactivatedScreen.tsx',
        ns: 'system.deactivated',
        json: 'src/i18n/locales/en/system/deactivated.json',
        replacements: {
            '>Account Deactivated<': ['title', 'Account Deactivated'],
            '>Reactivate Account<': ['reactivateBtn', 'Reactivate Account'],
            '>Contact Support<': ['supportBtn', 'Contact Support']
        }
    },
    {
        file: 'src/screens/system/AccountReactivationRequestScreen.tsx',
        ns: 'system.reactivationReq',
        json: 'src/i18n/locales/en/system/reactivationReq.json',
        replacements: {
            '>Request Received<': ['title', 'Request Received'],
            '>Return to Login<': ['loginBtn', 'Return to Login']
        }
    },
    {
        file: 'src/screens/system/AccountSuspendedScreen.tsx',
        ns: 'system.suspended',
        json: 'src/i18n/locales/en/system/suspended.json',
        replacements: {
            '>Account Suspended<': ['title', 'Account Suspended'],
            '>View Violation Details<': ['viewDetails', 'View Violation Details'],
            '>Submit Appeal<': ['appealBtn', 'Submit Appeal']
        }
    },
    {
        file: 'src/screens/system/AccountUnderManualReviewScreen.tsx',
        ns: 'system.manualReview',
        json: 'src/i18n/locales/en/system/manualReview.json',
        replacements: {
            '>Under Review<': ['title', 'Under Review'],
            '>This process usually takes 24-48 hours.<': ['info', 'This process usually takes 24-48 hours.'],
            '>Contact Support<': ['supportBtn', 'Contact Support'],
            '>Return to Login<': ['loginBtn', 'Return to Login']
        }
    },
    {
        file: 'src/screens/system/ForceUpdateScreen.tsx',
        ns: 'system.forceUpdate',
        json: 'src/i18n/locales/en/system/forceUpdate.json',
        replacements: {
            '>Update Required<': ['title', 'Update Required'],
            '>Update Now<': ['updateBtn', 'Update Now']
        }
    },
    {
        file: 'src/screens/system/MaintenanceModeScreen.tsx',
        ns: 'system.maintenance',
        json: 'src/i18n/locales/en/system/maintenance.json',
        replacements: {
            '>Under Maintenance<': ['title', 'Under Maintenance'],
            '>Expected completion:<': ['expectedLabel', 'Expected completion:'],
            '>~ 2 Hours<': ['expectedValue', '~ 2 Hours'],
            '>Check System Status<': ['statusBtn', 'Check System Status']
        }
    },
    {
        file: 'src/screens/system/NetworkErrorScreen.tsx',
        ns: 'system.networkError',
        json: 'src/i18n/locales/en/system/networkError.json',
        replacements: {
            '>No Connection<': ['title', 'No Connection'],
            '>Try Again<': ['retryBtn', 'Try Again']
        }
    },
    {
        file: 'src/screens/system/PolicyViolationNoticeScreen.tsx',
        ns: 'system.policyViolation',
        json: 'src/i18n/locales/en/system/policyViolation.json',
        replacements: {
            '>Policy Violation Notice<': ['title', 'Policy Violation Notice'],
            '>Issued on: Oct 24, 2026<': ['issuedOn', 'Issued on: Oct 24, 2026'],
            '>Violation Type: Off-App Payment Attempt<': ['violationType', 'Violation Type: Off-App Payment Attempt'],
            '>WHY THIS MATTERS<': ['whyMatters', 'WHY THIS MATTERS'],
            '>Payments on the app are secure and protected against fraud.<': ['reason1', 'Payments on the app are secure and protected against fraud.'],
            '>Off-app payments bypass our safety checks and dispute resolution systems.<': ['reason2', 'Off-app payments bypass our safety checks and dispute resolution systems.'],
            '>NEXT STEPS<': ['nextSteps', 'NEXT STEPS'],
            '>I Understand<': ['understandBtn', 'I Understand'],
            '>Submit Appeal<': ['appealBtn', 'Submit Appeal']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
