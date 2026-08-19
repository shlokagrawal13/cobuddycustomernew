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
    minimumWithdrawalAmount: 1000,
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
  cancellationReasons: [
    'found_another_companion',
    'booked_by_mistake',
    'changed_mind',
    'personal_emergency',
    'unresponsive'
  ],
  disputeReasons: [
    'payment_not_received',
    'unfair_cancellation',
    'false_review',
    'no_show',
    'service_quality',
    'different_profile',
    'early_end',
    'companion_late',
    'customer_late',
    'safety_concern',
    'other'
  ],
  activityCategories: [
    { id: 'INT-1', label: 'Italian Cuisine', type: 'CUISINE', multiplier: 1.0, icon: 'pizza' },
    { id: 'INT-2', label: 'Museums', type: 'ACTIVITY', multiplier: 1.2, icon: 'bank' },
    { id: 'INT-3', label: 'Cafe Hopping', type: 'ACTIVITY', multiplier: 1.0, icon: 'coffee' },
    { id: 'INT-4', label: 'Movies', type: 'ACTIVITY', multiplier: 1.0, icon: 'popcorn' },
    { id: 'INT-5', label: 'Concerts', type: 'ACTIVITY', multiplier: 1.5, icon: 'ticket-confirmation' },
    { id: 'INT-6', label: 'Parks', type: 'ACTIVITY', multiplier: 1.0, icon: 'tree' },
    { id: 'INT-7', label: 'Sightseeing', type: 'ACTIVITY', multiplier: 1.2, icon: 'camera' },
    { id: 'INT-8', label: 'Clubbing', type: 'ACTIVITY', multiplier: 1.5, icon: 'glass-cocktail' },
    { id: 'INT-9', label: 'Art Galleries', type: 'ACTIVITY', multiplier: 1.2, icon: 'palette' },
    { id: 'INT-10', label: 'Hiking', type: 'ACTIVITY', multiplier: 1.5, icon: 'hiking' },
    { id: 'INT-11', label: 'Board Games', type: 'ACTIVITY', multiplier: 1.0, icon: 'dice-multiple' },
    { id: 'INT-12', label: 'Karaoke', type: 'ACTIVITY', multiplier: 1.2, icon: 'microphone' },
    { id: 'INT-13', label: 'Gaming', type: 'ACTIVITY', multiplier: 1.0, icon: 'controller-classic' }
  ]
};
