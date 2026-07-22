import {
  validateField,
  validateSettingsForm,
  CUISINE_OPTIONS,
} from './validation.js';

describe('validateField', () => {
  it('requires fullName', () => {
    expect(validateField('fullName', '')).toBe('Full Name is required');
    expect(validateField('fullName', '   ')).toBe('Full Name is required');
    expect(validateField('fullName', 'Jane Doe')).toBe('');
  });

  it('validates email format', () => {
    expect(validateField('email', '')).toBe('Email is required');
    expect(validateField('email', 'bad-email')).toBe('Enter a valid email address');
    expect(validateField('email', 'chef@restaurant.com')).toBe('');
  });

  it('requires restaurantName', () => {
    expect(validateField('restaurantName', '')).toBe('Restaurant Name is required');
    expect(validateField('restaurantName', 'The Golden Fork')).toBe('');
  });

  it('requires a valid cuisineType', () => {
    expect(validateField('cuisineType', '')).toBe('Cuisine Type is required');
    expect(validateField('cuisineType', 'French')).toBe('Select a valid cuisine type');
    expect(validateField('cuisineType', CUISINE_OPTIONS[0])).toBe('');
  });
});

describe('validateSettingsForm', () => {
  it('returns errors when form is invalid', () => {
    const result = validateSettingsForm({
      fullName: '',
      email: 'not-an-email',
      restaurantName: '',
      cuisineType: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.restaurantName).toBeTruthy();
    expect(result.errors.cuisineType).toBeTruthy();
  });

  it('passes when all fields are valid', () => {
    const result = validateSettingsForm({
      fullName: 'Jane Doe',
      email: 'chef@restaurant.com',
      restaurantName: 'The Golden Fork',
      cuisineType: 'Italian',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});
