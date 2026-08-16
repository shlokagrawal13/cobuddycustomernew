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
  },
};
