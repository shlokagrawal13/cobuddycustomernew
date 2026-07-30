const fs = require('fs');

const filePaths = {
  safetySettings: 'src/i18n/locales/en/safety/settings.json',
  appLock: 'src/i18n/locales/en/settings/appLock.json',
  notificationPrefs: 'src/i18n/locales/en/settings/notificationPreferences.json',
  appPermissions: 'src/i18n/locales/en/settings/appPermissions.json',
  dataCache: 'src/i18n/locales/en/settings/dataCache.json',
  profile: 'src/i18n/locales/en/profile/main.json',
  locationSelect: 'src/i18n/locales/en/booking/locationSelection.json',
  venueSelect: 'src/i18n/locales/en/booking/venueSelect.json',
  bookingsList: 'src/i18n/locales/en/bookings/list.json',
  modifyBooking: 'src/i18n/locales/en/bookings/modify.json',
  chatList: 'src/i18n/locales/en/chat/list.json',
  companionChat: 'src/i18n/locales/en/chat/companion.json',
  conciergeChat: 'src/i18n/locales/en/chat/concierge.json',
  discover: 'src/i18n/locales/en/home/discover.json',
  homeDashboard: 'src/i18n/locales/en/home/dashboard.json',
  notifications: 'src/i18n/locales/en/home/notifications.json',
  safetyHub: 'src/i18n/locales/en/safety/hub.json',
  incidentReport: 'src/i18n/locales/en/safety/report.json',
  withdrawMoney: 'src/i18n/locales/en/wallet/withdrawMoney.json',
  wallet: 'src/i18n/locales/en/wallet/wallet.json',
  paymentMethods: 'src/i18n/locales/en/wallet/paymentMethods.json',
  addMoney: 'src/i18n/locales/en/wallet/addMoney.json',
  withdrawalMethods: 'src/i18n/locales/en/wallet/withdrawalMethods.json',
  spokenLanguages: 'src/i18n/locales/en/settings/spokenLanguages.json',
  languageSelection: 'src/i18n/locales/en/settings/languageSelection.json',
  accountSettings: 'src/i18n/locales/en/settings/accountSettings.json',
  networkError: 'src/i18n/locales/en/system/networkError.json',
  selfieCapture: 'src/i18n/locales/en/verify/selfie.json',
  activeSession: 'src/i18n/locales/en/session/active.json',
  arrivalCheckIn: 'src/i18n/locales/en/session/arrival.json',
  tipGratuity: 'src/i18n/locales/en/session/tip.json',
};

const newKeys = {
  safetySettings: { "a11yIncognitoMode": "Toggle incognito mode", "a11ySafeChat": "Toggle safe chat mode", "a11yTrustedContacts": "Manage trusted contacts" },
  appLock: { "a11yAppLockToggle": "Toggle app lock", "a11yHideScreenToggle": "Toggle hide screen in app switcher" },
  notificationPrefs: { "a11yToggleBookingPush": "Toggle booking push notifications", "a11yToggleBookingReminders": "Toggle session reminders", "a11yToggleBookingEmail": "Toggle email receipts", "a11yToggleChatPush": "Toggle chat message notifications", "a11yToggleWalletPush": "Toggle wallet alerts", "a11yToggleReviewPush": "Toggle review requests", "a11yTogglePromoPush": "Toggle promotions and offers", "a11ySOSAlertsStatus": "SOS alerts cannot be disabled" },
  appPermissions: { "a11yTogglePermission": "Toggle {{permission}} permission" },
  dataCache: { "a11yAutoDownloadToggle": "Toggle auto-download media on Wi-Fi", "a11yPhotoUploadQuality": "Change photo upload quality" },
  profile: { "a11yViewActiveSession": "View your active session", "a11yOpenItem": "Open {{label}}", "a11yToggleSafetySetting": "Toggle {{title}}" },
  locationSelect: { "a11yUseCurrentLocation": "Use current location", "a11ySelectLocation": "Select {{location}}", "a11ySelectSearchedLocation": "Select {{location}}" },
  venueSelect: { "a11ySelectVenue": "Select {{venue}}" },
  bookingsList: { "a11ySwitchTab": "Switch to {{tab}} tab", "a11yViewBookingDetails": "View booking details" },
  modifyBooking: { "a11ySelectVenueOption": "Select {{venue}}" },
  chatList: { "a11yCloseNewMessageDialog": "Close new message dialog", "a11yStartChatWith": "Start chat with {{name}}" },
  companionChat: { "a11yCloseOptionsMenu": "Close options menu" },
  conciergeChat: { "a11ySendQuickAction": "Send: {{action}}" },
  discover: { "a11ySelectFilter": "Filter by {{item}}" },
  homeDashboard: { "a11yViewFullItinerary": "View full itinerary" },
  notifications: { "a11yOpenNotification": "Open notification" },
  safetyHub: { "a11yActivateSOS": "Activate SOS emergency alert", "a11yManageTrustedContacts": "Manage trusted contacts", "a11yReportIncident": "Report a safety incident", "a11yViewSafetyGuidelines": "View safety guidelines", "a11yOpenHelpCenter": "Open help center" },
  incidentReport: { "a11ySelectIncidentType": "Select {{type}}" },
  withdrawMoney: { "a11yWithdrawMax": "Withdraw maximum amount", "a11yProceedWithdraw": "Proceed to withdraw" },
  wallet: { "a11yViewPaymentMethods": "View payment methods" },
  paymentMethods: { "a11ySelectPaymentMethod": "Select {{method}}" },
  addMoney: { "a11yProceedToPay": "Proceed to pay" },
  withdrawalMethods: { "a11ySelectWithdrawalMethod": "Select {{method}}" },
  spokenLanguages: { "a11yToggleLanguage": "Toggle {{lang}}" },
  languageSelection: { "a11ySelectLanguage": "Select {{lang}}" },
  accountSettings: { "a11yRequestDataDownload": "Request your data download" },
  networkError: { "a11yRetryConnection": "Retry connection" },
  selfieCapture: { "a11yCaptureSelfie": "Capture selfie photo" },
  activeSession: { "a11yConfirmExtension": "Confirm session extension" },
  arrivalCheckIn: { "a11yShareLocation": "Share live location" },
  tipGratuity: { "a11yCustomTip": "Enter custom tip", "a11yPayTip": "Pay tip amount" }
};

for (const [key, filePath] of Object.entries(filePaths)) {
  if (fs.existsSync(filePath)) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data = { ...data, ...newKeys[key] };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`File missing: ${filePath}`);
  }
}
