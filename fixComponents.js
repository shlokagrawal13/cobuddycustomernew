const fs = require('fs');

// 1. Fix ChatInputBar.tsx
let chatPath = 'src/components/common/ChatInputBar.tsx';
let chatCode = fs.readFileSync(chatPath, 'utf8');

if (!chatCode.includes('useTranslation')) {
  chatCode = chatCode.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { useTranslation } from 'react-i18next';");
  chatCode = chatCode.replace('export const ChatInputBar = ({ onSend }: ChatInputBarProps) => {', "export const ChatInputBar = ({ onSend }: ChatInputBarProps) => {\n  const { t } = useTranslation('common');");
  
  chatCode = chatCode.replace('placeholder="Message..."', "placeholder={t('chatInput.placeholder', 'Message...')}");
  chatCode = chatCode.replace('<Text style={styles.sheetTitle}>Share Content</Text>', "<Text style={styles.sheetTitle}>{t('chatInput.shareContent', 'Share Content')}</Text>");
  chatCode = chatCode.replace('<Text style={styles.attachLabel}>Camera</Text>', "<Text style={styles.attachLabel}>{t('chatInput.camera', 'Camera')}</Text>");
  chatCode = chatCode.replace('<Text style={styles.attachLabel}>Photo</Text>', "<Text style={styles.attachLabel}>{t('chatInput.photo', 'Photo')}</Text>");
  chatCode = chatCode.replace('<Text style={styles.attachLabel}>Document</Text>', "<Text style={styles.attachLabel}>{t('chatInput.document', 'Document')}</Text>");
  chatCode = chatCode.replace('<Text style={styles.attachLabel}>Location</Text>', "<Text style={styles.attachLabel}>{t('chatInput.location', 'Location')}</Text>");
  
  fs.writeFileSync(chatPath, chatCode);
  console.log('Fixed ChatInputBar');
}

// 2. Fix CompanionCard.tsx
let cardPath = 'src/components/ui/CompanionCard.tsx';
let cardCode = fs.readFileSync(cardPath, 'utf8');

if (!cardCode.includes('useTranslation')) {
  cardCode = cardCode.replace("import React from 'react';", "import React from 'react';\nimport { useTranslation } from 'react-i18next';");
  cardCode = cardCode.replace('export const CompanionCard = ({ companion, onPress }: CompanionCardProps) => {', "export const CompanionCard = ({ companion, onPress }: CompanionCardProps) => {\n  const { t } = useTranslation('common');");
  
  cardCode = cardCode.replace('<Text style={styles.actionBtnText}>View Profile</Text>', "<Text style={styles.actionBtnText}>{t('companionCard.viewProfile', 'View Profile')}</Text>");
  
  fs.writeFileSync(cardPath, cardCode);
  console.log('Fixed CompanionCard');
}
