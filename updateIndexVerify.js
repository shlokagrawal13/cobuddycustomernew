const fs = require('fs');

let code = fs.readFileSync('src/i18n/index.ts', 'utf8');

const newImports = `
import verifyDocument from './locales/en/verify/document.json';
import verifyKycIntro from './locales/en/verify/kycIntro.json';
import verifyLiveness from './locales/en/verify/liveness.json';
import verifySelfie from './locales/en/verify/selfie.json';
import verifyPending from './locales/en/verify/pending.json';
import verifyProcessing from './locales/en/verify/processing.json';
import verifyRejected from './locales/en/verify/rejected.json';
import verifySuccess from './locales/en/verify/success.json';
`;

code = code.replace(
    "import supportTicketDetail from './locales/en/support/ticketDetail.json';",
    "import supportTicketDetail from './locales/en/support/ticketDetail.json';\n" + newImports
);

const newResources = `
    verify: {
      document: verifyDocument,
      kycIntro: verifyKycIntro,
      liveness: verifyLiveness,
      selfie: verifySelfie,
      pending: verifyPending,
      processing: verifyProcessing,
      rejected: verifyRejected,
      success: verifySuccess
    },
`;

code = code.replace(
    "    support: {",
    newResources + "    support: {"
);

fs.writeFileSync('src/i18n/index.ts', code);
console.log('index.ts updated with verify namespaces');
