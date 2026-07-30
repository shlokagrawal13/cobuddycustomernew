const fs = require('fs');

function updateJson(file, updates) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  for (const [keyPath, value] of Object.entries(updates)) {
    const keys = keyPath.split('.');
    let current = data;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

// 2. Legal Consent Text
updateJson('src/i18n/locales/en/onboarding/consent.json', {
  'consent.docs.terms.title': 'Terms & Conditions',
  'consent.docs.terms.desc': 'Our legal framework for usage and liability.',
  'consent.docs.terms.s1.h': 'Eligibility',
  'consent.docs.terms.s1.b': 'You must be 18 years or older to use CoBuddy. By registering, you confirm you meet this requirement and have the legal capacity to enter into this agreement.',
  'consent.docs.terms.s2.h': 'Permitted Use',
  'consent.docs.terms.s2.b': 'CoBuddy connects members for trusted public-only experiences including dining, cultural outings, networking, and wellness activities. The platform is strictly for platonic, professional companionship in verified public settings.',
  'consent.docs.terms.s3.h': 'Account Responsibility',
  'consent.docs.terms.s3.b': 'You are responsible for all activity under your account. Do not share credentials. CoBuddy reserves the right to suspend accounts for any breach of these terms without prior notice.',
  'consent.docs.terms.s4.h': 'Limitation of Liability',
  'consent.docs.terms.s4.b': 'CoBuddy acts as a connection platform only. We are not liable for conduct between members during or after sessions. Sessions are undertaken at your own discretion.',
  'consent.docs.privacy.title': 'Privacy Policy',
  'consent.docs.privacy.desc': 'How we protect and manage your data.',
  'consent.docs.privacy.s1.h': 'Data We Collect',
  'consent.docs.privacy.s1.b': 'We collect identity verification data (government ID), contact information, location data during active sessions, and usage analytics to improve your experience.',
  'consent.docs.privacy.s2.h': 'How We Use Your Data',
  'consent.docs.privacy.s2.b': 'Your data is used exclusively for identity verification, session matching, safety monitoring, and personalized recommendations. We never sell personal data to third parties.',
  'consent.docs.privacy.s3.h': 'Data Protection',
  'consent.docs.privacy.s3.b': 'All data is encrypted in transit and at rest. We are compliant with applicable regional data protection regulations.',
  'consent.docs.privacy.s4.h': 'Your Rights',
  'consent.docs.privacy.s4.b': 'You may request access to, correction of, or deletion of your personal data at any time through Settings.',
  'consent.docs.community.title': 'Community Guidelines',
  'consent.docs.community.desc': 'Behavioral standards for all members.',
  'consent.docs.community.s1.h': 'Respect & Dignity',
  'consent.docs.community.s1.b': 'All members must treat companions and fellow users with respect. Harassment, discrimination, or any form of disrespectful conduct will result in immediate account suspension.',
  'consent.docs.community.s2.h': 'Public Venues Only',
  'consent.docs.community.s2.b': 'For safety, all first-time meetings must occur in CoBuddy-verified public venues. Never request a companion to meet in private or isolated settings.',
  'consent.docs.community.s3.h': 'Zero Tolerance Policy',
  'consent.docs.community.s3.b': 'Any solicitation for services beyond our platform scope (romantic, sexual, or private arrangements) is strictly prohibited and will result in permanent banning and potential legal action.',
  'consent.docs.community.s4.h': 'Reporting',
  'consent.docs.community.s4.b': 'If you experience any behavior that violates these guidelines, use the in-app report feature immediately.',
  'consent.checkbox.tos': I agree to CoBuddy\\'s Terms & Conditions,
  'consent.checkbox.public': 'I understand CoBuddy supports public-only meetups and verified experiences',
  'consent.checkbox.safety': 'I agree to follow community safety and respectful behavior guidelines'
});

console.log('Done with consent');

