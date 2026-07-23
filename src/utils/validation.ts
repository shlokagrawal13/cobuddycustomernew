import { isValidPhoneNumber } from 'libphonenumber-js';

export const ValidationRules = {
  // Matches exactly 6 digits (OTP)
  OTP: /^[0-9]{6}$/,
  
  // Standard email validation
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Name validation: Only letters and spaces, min 2 chars
  NAME: /^[a-zA-Z\s]{2,50}$/,
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  const clean = phone.replace(/\D/g, '');
  // Basic fallback for 10-digit Indian numbers if no country code provided
  if (clean.length === 10 && !phone.startsWith('+')) return true;
  try {
    return isValidPhoneNumber(phone);
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

export const validateDOB = (dobInput: string): boolean => {
  // Format expected: DD/MM/YYYY
  const parts = dobInput.split('/');
  if (parts.length !== 3) return false;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  
  const dob = new Date(year, month - 1, day);
  const today = new Date();
  
  // Calculate age
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
  }
  
  return age >= 18 && age <= 100;
};
