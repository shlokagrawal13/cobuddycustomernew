export interface ProfileStackParamList {
  MyReviewsScreen: undefined;
  SavedProfilesScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: { updatedCity?: string; updatedInterests?: string[]; updatedLanguages?: string[]; updatedLangIds?: string[] } | undefined;
  InterestSelectionScreen: { isEditMode?: boolean; initialInterests?: string[] } | undefined;
  SpokenLanguagesScreen: { initialLanguages?: string[] } | undefined;
  SettingsHubScreen: undefined;
  AccountSettingsScreen: undefined;
};
