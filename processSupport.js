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
        file: 'src/screens/support/CreateSupportTicketScreen.tsx',
        ns: 'support.createTicket',
        json: 'src/i18n/locales/en/support/createTicket.json',
        replacements: {
            '>Create Ticket<': ['headerTitle', 'Create Ticket'],
            '>WHAT DO YOU NEED HELP WITH?<': ['whatDoYouNeedHelpWith', 'WHAT DO YOU NEED HELP WITH?'],
            '>SUBJECT<': ['subject', 'SUBJECT'],
            '>DESCRIPTION<': ['description', 'DESCRIPTION'],
            '>ATTACHMENTS (OPTIONAL)<': ['attachmentsOptional', 'ATTACHMENTS (OPTIONAL)'],
            '>Submit Ticket<': ['submitTicket', 'Submit Ticket']
        }
    },
    {
        file: 'src/screens/support/HelpCenterScreen.tsx',
        ns: 'support.helpCenter',
        json: 'src/i18n/locales/en/support/helpCenter.json',
        replacements: {
            '>Help Center<': ['headerTitle', 'Help Center'],
            '>Hi there, how can we help?<': ['greeting', 'Hi there, how can we help?'],
            '>BROWSE TOPICS<': ['browseTopics', 'BROWSE TOPICS'],
            '>No FAQs found for this topic.<': ['noFaqs', 'No FAQs found for this topic.'],
            '>Still need help?<': ['stillNeedHelp', 'Still need help?'],
            '>Our 24/7 concierge team is here for you.<': ['contactSub', 'Our 24/7 concierge team is here for you.'],
            '>Chat Now<': ['chatNow', 'Chat Now']
        }
    },
    {
        file: 'src/screens/support/SupportCenterScreen.tsx',
        ns: 'support.supportCenter',
        json: 'src/i18n/locales/en/support/supportCenter.json',
        replacements: {
            '>Support Tickets<': ['headerTitle', 'Support Tickets'],
            '>Active<': ['activeTab', 'Active'],
            '>Closed<': ['closedTab', 'Closed'],
            ">You don't have any support tickets in this category right now.<": ['emptySub', "You don't have any support tickets in this category right now."],
            '>New Ticket<': ['newTicket', 'New Ticket']
        }
    },
    {
        file: 'src/screens/support/SupportTicketDetailScreen.tsx',
        ns: 'support.ticketDetail',
        json: 'src/i18n/locales/en/support/ticketDetail.json',
        replacements: {
            '>Open<': ['statusOpen', 'Open'],
            '>Refund Request for Booking #4412<': ['contextLabel', 'Refund Request for Booking #4412'],
            '>Category: Payment  •  Created 2 hours ago<': ['contextMeta', 'Category: Payment  •  Created 2 hours ago'],
            '>This ticket has been marked as closed.<': ['closedText', 'This ticket has been marked as closed.']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
