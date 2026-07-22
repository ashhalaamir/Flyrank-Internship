export const CUISINE_OPTIONS = ['Italian', 'Mexican', 'Chinese', 'American'];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const fieldValidators = {
  fullName: (value) => {
    if (!value?.trim()) return 'Full Name is required';
    return '';
  },
  email: (value) => {
    if (!value?.trim()) return 'Email is required';
    if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid email address';
    return '';
  },
  restaurantName: (value) => {
    if (!value?.trim()) return 'Restaurant Name is required';
    return '';
  },
  cuisineType: (value) => {
    if (!value) return 'Cuisine Type is required';
    if (!CUISINE_OPTIONS.includes(value)) return 'Select a valid cuisine type';
    return '';
  },
};

export function validateField(fieldName, value) {
  const validator = fieldValidators[fieldName];
  return validator ? validator(value) : '';
}

export function validateSettingsForm(data) {
  const errors = {};

  Object.keys(fieldValidators).forEach((field) => {
    const message = validateField(field, data[field]);
    if (message) errors[field] = message;
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
