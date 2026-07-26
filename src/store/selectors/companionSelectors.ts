import { useCompanionStore } from '../slices/companionStore';
import type { CompanionState } from '../slices/companionStore';

export const selectCompanions = (state: CompanionState) => state.companions;
export const selectSelectedCompanion = (state: CompanionState) => state.selectedCompanion;
export const selectIsLoadingCompanion = (state: CompanionState) => state.isLoading;
