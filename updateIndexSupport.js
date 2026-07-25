const fs = require('fs');

let code = fs.readFileSync('src/i18n/index.ts', 'utf8');

const newImports = `
import supportCreateTicket from './locales/en/support/createTicket.json';
import supportHelpCenter from './locales/en/support/helpCenter.json';
import supportSupportCenter from './locales/en/support/supportCenter.json';
import supportTicketDetail from './locales/en/support/ticketDetail.json';
`;

code = code.replace(
    "import settingsSpokenLanguages from './locales/en/settings/spokenLanguages.json';",
    "import settingsSpokenLanguages from './locales/en/settings/spokenLanguages.json';\n" + newImports
);

const newResources = `
    support: {
      createTicket: supportCreateTicket,
      helpCenter: supportHelpCenter,
      supportCenter: supportSupportCenter,
      ticketDetail: supportTicketDetail
    },
`;

code = code.replace(
    "    settings: {",
    newResources + "    settings: {"
);

fs.writeFileSync('src/i18n/index.ts', code);
console.log('index.ts updated with support namespaces');
