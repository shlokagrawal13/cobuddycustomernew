const fs = require('fs');
const path = require('path');

function processFile(filePath, ns, replacements, jsonPath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let code = fs.readFileSync(filePath, 'utf8');
    
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

    fs.writeFileSync(filePath, code);

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
    console.log(`Processed ${filePath}`);
}

const batch = [
    {
        file: 'src/screens/chat/ChatListScreen.tsx',
        ns: 'chat.list',
        json: 'src/i18n/locales/en/chat/list.json',
        replacements: {
            '>Messages<': ['headerTitle', 'Messages'],
            '>Online Now<': ['liveBadgeText', 'Online Now'],
            '>CoBuddy Concierge<': ['liveCardTitle', 'CoBuddy Concierge'],
            '>Start Conversation<': ['startBtnText', 'Start Conversation'],
            '>ACTIVE CONVERSATIONS<': ['convoHeaderLabel', 'ACTIVE CONVERSATIONS'],
            '>typing...<': ['typing', 'typing...'],
            '>No active chats<': ['emptyTitle', 'No active chats'],
            '>Once your booking is accepted, you can securely chat with your companion here.<': ['emptyDesc', 'Once your booking is accepted, you can securely chat with your companion here.']
        }
    },
    {
        file: 'src/screens/chat/CompanionChatScreen.tsx',
        ns: 'chat.companion',
        json: 'src/i18n/locales/en/chat/companion.json',
        replacements: {
            '>View Booking<': ['viewBookingText', 'View Booking'],
            '>TODAY<': ['dateText', 'TODAY'],
            '>Chat Options<': ['sheetTitle', 'Chat Options'],
            '>View Profile<': ['optionProfile', 'View Profile'],
            '>Mute Notifications<': ['optionMute', 'Mute Notifications'],
            '>Clear Chat<': ['optionClear', 'Clear Chat'],
            '>Report Safety Issue<': ['optionReport', 'Report Safety Issue']
        }
    },
    {
        file: 'src/screens/chat/ConciergeChatScreen.tsx',
        ns: 'chat.concierge',
        json: 'src/i18n/locales/en/chat/concierge.json',
        replacements: {
            '>CoBuddy Concierge<': ['headerTitle', 'CoBuddy Concierge'],
            '>Typically replies in 2 mins<': ['onlineText', 'Typically replies in 2 mins'],
            '>TODAY<': ['dateText', 'TODAY']
        }
    },
    {
        file: 'src/screens/chat/IncomingCallScreen.tsx',
        ns: 'chat.incomingCall',
        json: 'src/i18n/locales/en/chat/incomingCall.json',
        replacements: {
            '>CoBuddy Voice Call<': ['incomingText', 'CoBuddy Voice Call'],
            '>Ringing...<': ['statusText', 'Ringing...']
        }
    },
    {
        file: 'src/screens/chat/VoiceCallScreen.tsx',
        ns: 'chat.voiceCall',
        json: 'src/i18n/locales/en/chat/voiceCall.json',
        replacements: {
            '>End-to-End Encrypted<': ['secureText', 'End-to-End Encrypted'],
            '>Mute<': ['controlMute', 'Mute'],
            '>Keypad<': ['controlKeypad', 'Keypad'],
            '>Speaker<': ['controlSpeaker', 'Speaker']
        }
    }
];

batch.forEach(b => processFile(b.file, b.ns, b.replacements, b.json));
