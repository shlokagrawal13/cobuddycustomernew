const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
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

    const componentMatch = code.match(/export const (\w+) =/);
    if (componentMatch) {
        if (!code.includes(`useTranslation('${ns}')`) && !code.includes(`useTranslation(["${ns}"])`)) {
            code = code.replace(
                new RegExp(`export const ${componentMatch[1]} = \\(\\) => \\{`),
                `$& \n  const { t } = useTranslation('${ns}');`
            );
        }
    }

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

    fs.writeFileSync(filePath, code);

    if (jsonPath) {
        let existingJson = {};
        if (fs.existsSync(jsonPath)) {
            try { existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); } catch(e){}
        }
        const finalJson = { ...existingJson, ...jsonContent };
        const dir = path.dirname(jsonPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(jsonPath, JSON.stringify(finalJson, null, 2));
    }
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/verify/DocumentVerificationScreen.tsx',
        ns: 'verify.document',
        json: 'src/i18n/locales/en/verify/document.json',
        replacements: {
            '>Step 1 of 3<': ['step1of3', 'Step 1 of 3'],
            '>Complete Identity Verification<': ['completeIdentity', 'Complete Identity Verification'],
            '>SELECT DOCUMENT TYPE<': ['selectDocType', 'SELECT DOCUMENT TYPE'],
            '>DOCUMENT NUMBER<': ['docNumber', 'DOCUMENT NUMBER'],
            '>LEGAL NAME (AS PER ID)<': ['legalName', 'LEGAL NAME (AS PER ID)'],
            '>UPLOAD DOCUMENT<': ['uploadDoc', 'UPLOAD DOCUMENT'],
            '>IMAGE REQUIREMENTS<': ['imageReq', 'IMAGE REQUIREMENTS'],
            '>Continue Verification<': ['continueVerify', 'Continue Verification']
        }
    },
    {
        file: 'src/screens/verify/KYCIntroScreen.tsx',
        ns: 'verify.kycIntro',
        json: 'src/i18n/locales/en/verify/kycIntro.json',
        replacements: {
            '>Verify your Identity<': ['verifyIdentity', 'Verify your Identity'],
            '>Government ID Verification<': ['govId', 'Government ID Verification'],
            '>Securely scan your Aadhaar, PAN, DL, or Passport.<': ['govIdDesc', 'Securely scan your Aadhaar, PAN, DL, or Passport.'],
            '>Liveness Check<': ['livenessCheck', 'Liveness Check'],
            '>A quick selfie to ensure you match your ID.<': ['livenessDesc', 'A quick selfie to ensure you match your ID.'],
            '>Start Verification<': ['startVerify', 'Start Verification']
        }
    },
    {
        file: 'src/screens/verify/LivenessDetectionScreen.tsx',
        ns: 'verify.liveness',
        json: 'src/i18n/locales/en/verify/liveness.json',
        replacements: {
            '>Step 3 of 3<': ['step3of3', 'Step 3 of 3'],
            '>Liveness Check<': ['livenessCheck', 'Liveness Check'],
            '>Analyzing facial features...<': ['analyzing', 'Analyzing facial features...']
        }
    },
    {
        file: 'src/screens/verify/SelfieCaptureScreen.tsx',
        ns: 'verify.selfie',
        json: 'src/i18n/locales/en/verify/selfie.json',
        replacements: {
            '>Step 2 of 3<': ['step2of3', 'Step 2 of 3'],
            '>Selfie Verification<': ['selfieVerify', 'Selfie Verification'],
            '>Face the camera directly and center your face in the oval.<': ['tipsText', 'Face the camera directly and center your face in the oval.'],
            '>Retake<': ['retakeBtn', 'Retake'],
            '>Confirm<': ['confirmBtn', 'Confirm']
        }
    },
    {
        file: 'src/screens/verify/VerificationPendingScreen.tsx',
        ns: 'verify.pending',
        json: 'src/i18n/locales/en/verify/pending.json',
        replacements: {
            '>Verification Status<': ['headerTitle', 'Verification Status'],
            '>Verification In Review<': ['heroTitle', 'Verification In Review'],
            '>STATUS<': ['statusLabel', 'STATUS'],
            '>Verification Pending<': ['statusValue', 'Verification Pending'],
            '>VERIFICATION PROGRESS<': ['progress', 'VERIFICATION PROGRESS'],
            '>Continue Setting Up Your Experience<': ['continueSetup', 'Continue Setting Up Your Experience']
        }
    },
    {
        file: 'src/screens/verify/VerificationProcessingScreen.tsx',
        ns: 'verify.processing',
        json: 'src/i18n/locales/en/verify/processing.json',
        replacements: {
            '>Secure Verification<': ['headerTitle', 'Secure Verification'],
            '>Your Information Is Protected<': ['protectedInfo', 'Your Information Is Protected']
        }
    },
    {
        file: 'src/screens/verify/VerificationRejectedScreen.tsx',
        ns: 'verify.rejected',
        json: 'src/i18n/locales/en/verify/rejected.json',
        replacements: {
            '>Verification Status<': ['headerTitle', 'Verification Status'],
            '>Verification Failed<': ['heroTitle', 'Verification Failed'],
            '>STATUS<': ['statusLabel', 'STATUS'],
            '>Action Required<': ['actionRequired', 'Action Required'],
            '>VERIFICATION PROGRESS<': ['progress', 'VERIFICATION PROGRESS'],
            '>Please Try Again<': ['tryAgain', 'Please Try Again'],
            '>Retry Verification<': ['retryBtn', 'Retry Verification']
        }
    },
    {
        file: 'src/screens/verify/VerificationSuccessScreen.tsx',
        ns: 'verify.success',
        json: 'src/i18n/locales/en/verify/success.json',
        replacements: {
            '>You are Verified!<': ['verified', 'You are Verified!'],
            '>Trusted Profile<': ['trustedProfile', 'Trusted Profile'],
            '>Booking Access<': ['bookingAccess', 'Booking Access']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
