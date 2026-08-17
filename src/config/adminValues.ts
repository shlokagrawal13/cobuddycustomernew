/**
 * Admin Values Config
 * This file centralizes hardcoded values that will eventually be fetched from the Admin API.
 * Currently, it serves as a single source of truth for these values during the interim backend-less phase.
 */

export const adminValues = {
  walletBalanceLimits: {
    // Used temporarily as the max withdrawable amount until a dedicated per-transaction max is added by Admin.
    nonKycMax: 10000,
  },
  commission: {
    minimumWithdrawalAmount: 100,
    serviceFee: 50,
  },
  pricing: {
    cancellationFeePercentage: 10,
  },
  cancellationRefundTiers: {
    // Defines refund percentage based on hours before the session
    tier1: { minHours: 48, refundPercent: 100 },
    tier2: { minHours: 24, maxHours: 48, refundPercent: 50 },
    tier3: { maxHours: 24, refundPercent: 0 },
  },
  venue: {
    allowedPlaceTypes: [
      'cafe', 'restaurant', 'park', 'museum', 'book_store', 
      'shopping_mall', 'movie_theater', 'amusement_park'
    ],
    excludedPlaceTypes: ['lodging', 'bar'],
  },
  reviewTags: {
    praise: [
      { id: 'great_listener', label: 'Great listener' },
      { id: 'dressed_well', label: 'Dressed well' },
      { id: 'safe_comforting', label: 'Safe & comforting' },
      { id: 'punctual', label: 'Punctual' }
    ],
    concern: [
      { id: 'catfished_fake_profile', label: 'Catfished / Fake Profile' },
      { id: 'boring', label: 'Boring' },
      { id: 'late', label: 'Late' },
      { id: 'rude_unprofessional', label: 'Rude / Unprofessional' },
      { id: 'made_uncomfortable', label: 'Made me uncomfortable' }
    ]
  },
  ticketCategories: [
    { id: 'payment_payout', label: 'Payment / Payout' },
    { id: 'booking_session', label: 'Booking / Session' },
    { id: 'safety_incident', label: 'Safety / Incident' },
    { id: 'verification', label: 'Verification' },
    { id: 'account_access', label: 'Account / Access' },
    { id: 'dispute', label: 'Dispute' },
    { id: 'general', label: 'General' },
    { id: 'age_minor_escalation', label: 'Age / Minor Escalation' },
    { id: 'marketing_promo', label: 'Marketing / Promo' },
    { id: 'feedback', label: 'Feedback' }
  ],
  incidentTypes: [
    { id: 'harassment', label: 'Harassment' },
    { id: 'safety_concern', label: 'Safety Concern' },
    { id: 'no_show', label: 'No Show' },
    { id: 'payment_dispute', label: 'Payment Dispute' },
    { id: 'inappropriate_behavior', label: 'Inappropriate Behavior' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'unauthorized_recording', label: 'Unauthorized Recording' },
    { id: 'privacy_violation', label: 'Privacy Violation' },
    { id: 'scam', label: 'Scam' },
    { id: 'no_show_customer', label: 'No Show (Customer)' },
    { id: 'identity_mismatch', label: 'Identity Mismatch' },
    { id: 'other', label: 'Other' }
  ],
  activityCategories: [
    { id: 'conversation', label: 'Conversation' },
    { id: 'dining', label: 'Dining' },
    { id: 'events', label: 'Events' },
    { id: 'movies', label: 'Movies' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'shopping', label: 'Shopping' }
  ]
};
