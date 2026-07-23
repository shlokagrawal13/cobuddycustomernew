const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mapping = {
  auth: ['SplashScreen', 'WelcomeScreen', 'PhoneLoginScreen', 'OTPVerificationScreen', 'LocationPermissionScreen', 'NotificationPermissionScreen'],
  onboarding: ['LegalConsentScreen', 'BasicProfileSetupScreen', 'InterestSelectionScreen', 'SafetyTutorialScreen'],
  verify: ['KYCIntroScreen', 'DocumentVerificationScreen', 'SelfieCaptureScreen', 'LivenessDetectionScreen', 'VerificationProcessingScreen', 'VerificationPendingScreen', 'VerificationRejectedScreen', 'VerificationSuccessScreen'],
  home: ['HomeDashboardScreen', 'DiscoverScreen', 'CompanionProfileScreen'],
  booking: ['BookingActivitySelectScreen', 'BookingVenueSelectScreen', 'BookingTimeSelectScreen', 'BookingSummaryScreen', 'BookingRequestSentScreen', 'BookingAcceptedScreen', 'BookingDeclinedScreen', 'BookingCounterOfferScreen', 'LocationSelectionScreen'],
  bookings: ['BookingsListScreen', 'BookingDetailScreen', 'CancelBookingScreen', 'ModifyBookingScreen', 'DisputeRefundScreen'],
  session: ['ArrivalCheckInScreen', 'ActiveSessionScreen', 'ActiveSessionsScreen', 'SessionCompleteScreen', 'SessionReminderScreen', 'PostSessionFeedbackScreen', 'CompanionReviewScreen', 'TipGratuityScreen'],
  chat: ['ChatListScreen', 'ConciergeChatScreen', 'CompanionChatScreen', 'VoiceCallScreen', 'IncomingCallScreen'],
  profile: ['ProfileScreen', 'EditProfileScreen', 'MyReviewsScreen', 'SavedProfilesScreen'],
  wallet: ['WalletScreen', 'TransactionDetailScreen', 'TransactionHistoryScreen', 'PaymentMethodsScreen', 'AddPaymentMethodScreen', 'AddBankAccountScreen', 'AddMoneyScreen', 'WithdrawMoneyScreen', 'WithdrawalMethodsScreen'],
  settings: ['SettingsHubScreen', 'NotificationPreferencesScreen', 'NotificationsScreen', 'LanguageSelectionScreen', 'SpokenLanguagesScreen', 'AccountSettingsScreen', 'DeactivateAccountScreen', 'DeleteAccountScreen', 'LegalAgreementsScreen', 'AppLockScreen', 'AppPermissionsScreen', 'DataCacheScreen', 'BlockedUsersScreen', 'ReferFriendScreen'],
  safety: ['SafetyHubScreen', 'TrustedContactsScreen', 'AddTrustedContactScreen', 'IncidentReportScreen', 'IncidentSubmittedScreen', 'SafetyGuidelinesScreen', 'SafetySettingsScreen'],
  support: ['SupportCenterScreen', 'CreateSupportTicketScreen', 'SupportTicketDetailScreen', 'HelpCenterScreen'],
  system: ['AccountSuspendedScreen', 'AccountUnderManualReviewScreen', 'AccountReactivationRequestScreen', 'PolicyViolationNoticeScreen', 'AccountDeactivatedScreen', 'NetworkErrorScreen', 'ForceUpdateScreen', 'MaintenanceModeScreen']
};

// Create a reverse map for quick lookup: ScreenName -> folder
const screenToFolder = {};
for (const [folder, screens] of Object.entries(mapping)) {
  for (const screen of screens) {
    screenToFolder[screen] = folder;
  }
}

const SCREENS_DIR = path.join(__dirname, 'src', 'screens');

// 1. Move files using git mv
console.log('--- Moving files ---');
for (const [folder, screens] of Object.entries(mapping)) {
  const targetDir = path.join(SCREENS_DIR, folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const screen of screens) {
    const oldPath = path.join(SCREENS_DIR, `${screen}.tsx`);
    const newPath = path.join(targetDir, `${screen}.tsx`);
    
    if (fs.existsSync(oldPath)) {
      try {
        execSync(`git mv "${oldPath}" "${newPath}"`, { stdio: 'inherit' });
        console.log(`Moved ${screen}.tsx to ${folder}/`);
      } catch (err) {
        console.error(`Failed to git mv ${screen}.tsx:`, err.message);
      }
    } else {
      console.warn(`WARN: File not found: ${oldPath}`);
    }
  }
}

// 2. Update imports recursively in src/
function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else {
      if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
        callback(filepath);
      }
    }
  });
}

console.log('--- Updating imports ---');
walk(path.join(__dirname, 'src'), (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let updated = false;

  const isInsideScreensSubdir = filepath.includes(path.join('src', 'screens')) && path.dirname(filepath) !== path.join(__dirname, 'src', 'screens');
  const currentFileFolder = isInsideScreensSubdir ? path.basename(path.dirname(filepath)) : null;

  // Process imports line by line
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('import ') || line.trim().startsWith('export ')) {
      
      // Case A: A screen importing something else with `../` (only if the file is inside a screen subfolder)
      if (isInsideScreensSubdir) {
        // If the import path starts with `../` and doesn't point to another screen that was just moved relative to it
        // Wait, the safest way is a regex replace on the import path string.
        const match = line.match(/(from|import)\s+['"]([^'"]+)['"]/);
        if (match) {
          const importPath = match[2];
          
          if (importPath.startsWith('../')) {
            // Need to adjust depth. Wait, what if it's importing another screen?
            // e.g. `../screens/ProfileScreen` -> this shouldn't happen inside `src/screens` itself normally, 
            // but if it did, we should adjust.
            // Usually, inside `src/screens/ProfileScreen.tsx`, importing theme was `../theme`.
            // Now it's `../../theme`.
            const newImportPath = '../' + importPath;
            lines[i] = line.replace(importPath, newImportPath);
            updated = true;
          } else if (importPath.startsWith('./')) {
            // Importing a fellow screen: `import X from './OtherScreen'`
            // Check if it's one of the screens we moved.
            const importedScreenName = importPath.replace('./', '').replace('.tsx', '');
            if (screenToFolder[importedScreenName]) {
              const targetFolder = screenToFolder[importedScreenName];
              if (targetFolder === currentFileFolder) {
                // Same folder, keep it `./OtherScreen`
              } else {
                // Different folder, change to `../targetFolder/OtherScreen`
                lines[i] = line.replace(importPath, `../${targetFolder}/${importedScreenName}`);
                updated = true;
              }
            }
          }
        }
      } 
      else {
        // Case B: A file outside `src/screens` importing a screen.
        // Or a file importing something from `screens/...`
        const match = line.match(/(from|import)\s+['"]([^'"]+)['"]/);
        if (match) {
          const importPath = match[2];
          // E.g. `../screens/ProfileScreen`
          const parts = importPath.split('/');
          const lastPart = parts[parts.length - 1]; // e.g. ProfileScreen
          
          if (screenToFolder[lastPart] && importPath.includes('screens')) {
            // It's a known screen, and being imported from a path containing 'screens'
            const targetFolder = screenToFolder[lastPart];
            const newImportPath = importPath.replace(`screens/${lastPart}`, `screens/${targetFolder}/${lastPart}`);
            if (newImportPath !== importPath) {
              lines[i] = line.replace(importPath, newImportPath);
              updated = true;
            }
          }
        }
      }
    }
  }

  if (updated) {
    fs.writeFileSync(filepath, lines.join('\n'), 'utf8');
    console.log(`Updated imports in ${path.relative(__dirname, filepath)}`);
  }
});

console.log('--- Done ---');
