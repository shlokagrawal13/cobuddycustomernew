export const featureFlags = {
  ENABLE_VOICE_CALL: true,
  ENABLE_VIDEO_CALL: false,
  ENABLE_TIPPING: true,
  ENABLE_WALLET_TOPUP: true,
  ENABLE_INCIDENT_REPORTING: true,
  ENABLE_REVIEWS: true,
  ENABLE_MULTILINGUAL: true,
  ENABLE_SOS_BACKGROUND_TRACKING: false, // E.g. awaiting proper native module setup
};

export type FeatureFlag = keyof typeof featureFlags;

export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  return featureFlags[feature];
};
