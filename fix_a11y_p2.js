const fs = require('fs');

function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  replacements.forEach(r => {
    content = content.replace(r.find, r.replace);
  });
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}

replaceInFile('src/screens/profile/ProfileScreen.tsx', [
  // line 97: active booking banner
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yViewActiveSession', 'View your active session')}" },
  // line 310: mapped row (wallet/reviews/saved/refer)
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yOpenItem', 'Open {{label}}', { label: item.label })}" },
  // line 338: safety toggle row
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yToggleSafetySetting', 'Toggle {{title}}', { title: s.title })}" },
  // line 364: mapped row (settings/support/legal)
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yOpenItem', 'Open {{label}}', { label: item.label })}" }
]);

replaceInFile('src/screens/booking/LocationSelectionScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yUseCurrentLocation', 'Use current location')}" }, // GPS button approx line 89
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11ySelectLocation', 'Select {{location}}', { location: loc.mainText })}" }, // recent-location approx line 113
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11ySelectSearchedLocation', 'Select {{location}}', { location: searchQuery })}" } // searched-location approx line 131
]);

replaceInFile('src/screens/booking/BookingVenueSelectScreen.tsx', [
  // we grep for a11yNext or a11yAction, probably a11yItem or a11yNext
  // user says BookingVenueSelectScreen.tsx:100. Let's use global regex to catch generic keys inside this file.
  { find: /accessibilityLabel=\{t\('a11y[^']+', '[^']+'\)\}/, replace: "accessibilityLabel={t('a11ySelectVenue', 'Select {{venue}}', { venue: venue.name })}" }
]);

replaceInFile('src/screens/bookings/BookingsListScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11ySwitchTab', 'Switch to {{tab}} tab', { tab })}" }, // line 98
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yViewBookingDetails', 'View booking details')}" } // line 128
]);

replaceInFile('src/screens/bookings/ModifyBookingScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yItem', 'item'\)\}/, replace: "accessibilityLabel={t('a11ySelectVenueOption', 'Select {{venue}}', { venue: item })}" }
]);

replaceInFile('src/screens/chat/ChatListScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yCloseNewMessageDialog', 'Close new message dialog')}" },
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yStartChatWith', 'Start chat with {{name}}', { name: bk.name })}" }
]);

replaceInFile('src/screens/chat/CompanionChatScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yCloseOptionsMenu', 'Close options menu')}" }
]);

replaceInFile('src/screens/chat/ConciergeChatScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'action'\)\}/i, replace: "accessibilityLabel={t('a11ySendQuickAction', 'Send: {{action}}', { action })}" }
]);

replaceInFile('src/screens/home/DiscoverScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yItem', 'item'\)\}/, replace: "accessibilityLabel={t('a11ySelectFilter', 'Filter by {{item}}', { item })}" }
]);

replaceInFile('src/screens/home/HomeDashboardScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yViewFullItinerary', 'View full itinerary')}" }
]);

replaceInFile('src/screens/home/NotificationsScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yOpenNotification', 'Open notification')}" }
]);

replaceInFile('src/screens/safety/SafetyHubScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yActivateSOS', 'Activate SOS emergency alert')}" },
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yManageTrustedContacts', 'Manage trusted contacts')}" },
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yReportIncident', 'Report a safety incident')}" },
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yViewSafetyGuidelines', 'View safety guidelines')}" },
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yOpenHelpCenter', 'Open help center')}" }
]);

replaceInFile('src/screens/safety/IncidentReportScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11ySelectIncidentType', 'Select {{type}}', { type: type.label })}" }
]);

replaceInFile('src/screens/wallet/WithdrawMoneyScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yWithdrawMax', 'Withdraw maximum amount')}" },
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yProceedWithdraw', 'Proceed to withdraw')}" }
]);

replaceInFile('src/screens/wallet/WalletScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yViewPaymentMethods', 'View payment methods')}" }
]);

replaceInFile('src/screens/wallet/PaymentMethodsScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11ySelectPaymentMethod', 'Select {{method}}', { method: pm.title })}" }
]);

replaceInFile('src/screens/wallet/AddMoneyScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yProceedToPay', 'Proceed to pay')}" }
]);

replaceInFile('src/screens/wallet/WithdrawalMethodsScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11ySelectWithdrawalMethod', 'Select {{method}}', { method: wm.title })}" }
]);

replaceInFile('src/screens/settings/SpokenLanguagesScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yToggleLanguage', 'Toggle {{lang}}', { lang: lang.name })}" }
]);

replaceInFile('src/screens/settings/LanguageSelectionScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11ySelectLanguage', 'Select {{lang}}', { lang: lang.name })}" }
]);

replaceInFile('src/screens/settings/AccountSettingsScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yNext', 'Next'\)\}/, replace: "accessibilityLabel={t('a11yRequestDataDownload', 'Request your data download')}" }
]);

replaceInFile('src/screens/system/NetworkErrorScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yRetryConnection', 'Retry connection')}" }
]);

replaceInFile('src/screens/verify/SelfieCaptureScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yCaptureSelfie', 'Capture selfie photo')}" }
]);

// Handle session screens that showed up in grep
replaceInFile('src/screens/session/ActiveSessionScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yConfirmExtension', 'Confirm session extension')}" }
]);

replaceInFile('src/screens/session/ArrivalCheckInScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yShareLocation', 'Share live location')}" }
]);

replaceInFile('src/screens/session/TipGratuityScreen.tsx', [
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yCustomTip', 'Enter custom tip')}" },
  { find: /accessibilityLabel=\{t\('a11yAction', 'Action'\)\}/, replace: "accessibilityLabel={t('a11yPayTip', 'Pay tip amount')}" }
]);
