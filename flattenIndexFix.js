const fs = require('fs');

let code = fs.readFileSync('src/i18n/index.ts', 'utf8');

const newResources = `const resources = {
  en: {
    common,
    auth: {
      phone: authPhone,
      otp: authOtp
    },
    onboarding: {
      welcome: onboardingWelcome,
      consent: onboardingConsent,
      location: onboardingLocation,
      notification: onboardingNotification,
      profile: onboardingProfile,
      interests: onboardingInterests,
      safety: onboardingSafety,
      contacts: onboardingContacts
    },
    'home.dashboard': homeDashboard,
    'home.notifications': homeNotifications,
    'discover': homeDiscover,
    'companionProfile': homeCompanionProfile,
    'booking.activitySelect': bookingActivitySelect,
    'booking.summary': bookingSummary,
    'booking.timeSelect': bookingTimeSelect,
    'booking.venueSelect': bookingVenueSelect,
    'booking.locationSelection': bookingLocationSelection,
    'booking.accepted': bookingAccepted,
    'booking.counterOffer': bookingCounterOffer,
    'booking.declined': bookingDeclined,
    'booking.requestSent': bookingRequestSent,
    'bookings.list': bookingsList,
    'bookings.detail': bookingsDetail,
    'bookings.cancel': bookingsCancel,
    'bookings.dispute': bookingsDispute,
    'bookings.modify': bookingsModify,
    'session.active': sessionActive,
    'session.arrival': sessionArrival,
    'session.companionReview': sessionCompanionReview,
    'session.postFeedback': sessionPostFeedback,
    'session.complete': sessionComplete,
    'session.reminder': sessionReminder,
    'session.tip': sessionTip,
    'chat.list': chatList,
    'chat.companion': chatCompanion,
    'chat.concierge': chatConcierge,
    'chat.incomingCall': chatIncomingCall,
    'chat.voiceCall': chatVoiceCall,
    'safety.report': safetyReport,
    'safety.guidelines': safetyGuidelines,
    'safety.hub': safetyHub,
    'safety.settings': safetySettings,
    'profile.edit': profileEdit,
    'profile.reviews': profileReviews,
    'profile.main': profileMain,
    'profile.saved': profileSaved,
    'system.deactivated': systemDeactivated,
    'system.reactivationReq': systemReactivationReq,
    'system.suspended': systemSuspended,
    'system.manualReview': systemManualReview,
    'system.forceUpdate': systemForceUpdate,
    'system.maintenance': systemMaintenance,
    'system.networkError': systemNetworkError,
    'system.policyViolation': systemPolicyViolation,
    'wallet.wallet': walletWallet,
    'wallet.transactionDetail': walletTransactionDetail,
    'wallet.transactionHistory': walletTransactionHistory,
    'wallet.paymentMethods': walletPaymentMethods,
    'wallet.addPaymentMethod': walletAddPaymentMethod,
    'wallet.addBankAccount': walletAddBankAccount,
    'wallet.addMoney': walletAddMoney,
    'wallet.withdrawMoney': walletWithdrawMoney,
    'wallet.withdrawalMethods': walletWithdrawalMethods,
    'verify.document': verifyDocument,
    'verify.kycIntro': verifyKycIntro,
    'verify.liveness': verifyLiveness,
    'verify.selfie': verifySelfie,
    'verify.pending': verifyPending,
    'verify.processing': verifyProcessing,
    'verify.rejected': verifyRejected,
    'verify.success': verifySuccess,
    'support.createTicket': supportCreateTicket,
    'support.helpCenter': supportHelpCenter,
    'support.supportCenter': supportSupportCenter,
    'support.ticketDetail': supportTicketDetail,
    'settings.hub': settingsHub,
    'settings.accountSettings': settingsAccountSettings,
    'settings.activeSessions': settingsActiveSessions,
    'settings.appLock': settingsAppLock,
    'settings.appPermissions': settingsAppPermissions,
    'settings.blockedUsers': settingsBlockedUsers,
    'settings.dataCache': settingsDataCache,
    'settings.deactivateAccount': settingsDeactivateAccount,
    'settings.deleteAccount': settingsDeleteAccount,
    'settings.languageSelection': settingsLanguageSelection,
    'settings.legalAgreements': settingsLegalAgreements,
    'settings.notificationPreferences': settingsNotificationPreferences,
    'settings.referFriend': settingsReferFriend,
    'settings.spokenLanguages': settingsSpokenLanguages
  }
};
`;

const splitCode = code.split('i18n.use(initReactI18next).init(');
const beforeResources = splitCode[0].split('const resources = {')[0];
const afterInit = splitCode[1];

const finalCode = beforeResources + newResources + '\ni18n.use(initReactI18next).init(' + afterInit;

fs.writeFileSync('src/i18n/index.ts', finalCode);
console.log('Flattened index.ts correctly!');
