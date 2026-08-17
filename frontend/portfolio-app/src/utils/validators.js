// ===== EMAIL VALIDATION =====
export const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// ===== PASSWORD VALIDATION =====
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

export const isStrongPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

// ===== URL VALIDATION =====
export const isValidUrl = (url) => {
  if (!url) return true; // Allow empty
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ===== PHONE VALIDATION (WhatsApp) =====
export const isValidPhone = (phone) => {
  if (!phone) return true; // Allow empty
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// ===== NAME VALIDATION =====
export const isValidName = (name) => {
  return name && name.length >= 2 && name.length <= 50;
};

// ===== BIO VALIDATION =====
export const isValidBio = (bio) => {
  if (!bio) return true; // Allow empty
  return bio.length <= 500;
};

// ===== SKILL VALIDATION =====
export const isValidSkill = (skill) => {
  return skill && skill.trim().length >= 2;
};

// ===== PROJECT VALIDATION =====
export const isValidProjectName = (name) => {
  return name && name.length >= 1 && name.length <= 100;
};

export const isValidDescription = (description) => {
  return description && description.length >= 10 && description.length <= 1000;
};

// ===== SOCIAL MEDIA VALIDATION =====
export const isValidGitHub = (url) => {
  if (!url) return true;
  return /^(https?:\/\/)?(www\.)?github\.com\/.*$/.test(url);
};

export const isValidLinkedIn = (url) => {
  if (!url) return true;
  return /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(url);
};

export const isValidFacebook = (url) => {
  if (!url) return true;
  return /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/.test(url);
};

export const isValidX = (url) => {
  if (!url) return true;
  return /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.*$/.test(url);
};