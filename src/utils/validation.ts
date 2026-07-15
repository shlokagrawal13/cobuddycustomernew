import { isValidPhoneNumber } from 'libphonenumber-js';

export const ValidationRules = {
  // Matches exactly 6 digits (OTP)
  OTP: /^[0-9]{6}$/,
  
  // Standard email validation
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Name validation: Only letters and spaces, min 2 chars
  NAME: /^[a-zA-Z\s]{2,50}$/,
};

export const validatePhone = (phoneWithCode: string): boolean => {
  try {
    return isValidPhoneNumber(phoneWithCode);
  } catch (e) {
    return false;
  }
};

export const validateOTP = (otp: string): boolean => {
  return ValidationRules.OTP.test(otp.trim());
};

export const validateEmail = (email: string): boolean => {
  if (!email) return true; // Optional field in some places
  return ValidationRules.EMAIL.test(email.trim());
};

export const validateName = (name: string): boolean => {
  return ValidationRules.NAME.test(name.trim());
};

export const validateAge = (ageInput: string | number): boolean => {
  const parsed = typeof ageInput === 'string' ? parseInt(ageInput, 10) : ageInput;
  if (isNaN(parsed)) return false;
  return parsed >= 18;
};
