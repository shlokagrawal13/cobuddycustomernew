import type { SafetyState } from '../slices/safetyStore';

export const selectIsSOSActive = (state: SafetyState) => state.isSOSActive;
export const selectIsSessionActive = (state: SafetyState) => state.isSessionActive;
export const selectTrustedContacts = (state: SafetyState) => state.trustedContacts;
export const selectLastKnownLocation = (state: SafetyState) => state.lastKnownLocation;
export const selectTriggerSOS = (state: SafetyState) => state.triggerSOS;
export const selectResolveSOS = (state: SafetyState) => state.resolveSOS;
