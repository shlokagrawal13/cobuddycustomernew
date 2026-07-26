import type { UserPreferencesState } from '../slices/userPreferencesStore';

export const selectInterests = (state: UserPreferencesState) => state.interests;
export const selectSetInterests = (state: UserPreferencesState) => state.setInterests;
export const selectAddInterest = (state: UserPreferencesState) => state.addInterest;
export const selectRemoveInterest = (state: UserPreferencesState) => state.removeInterest;
