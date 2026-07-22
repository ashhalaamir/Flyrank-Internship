import { describe, it, expect } from 'vitest';
import { settingsSchema } from '../validation/settingsSchema.js';

describe('settingsSchema', () => {
  const validProfile = {
    displayName: 'Ashhal Aamir',
    email: 'ashhal@example.com',
    username: 'ashhal_aamir',
    bio: 'Hello world',
    theme: 'dark',
    emailNotifications: true,
    marketingEmails: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  it('accepts valid profile data', () => {
    const result = settingsSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = settingsSchema.safeParse({
      ...validProfile,
      email: 'not-an-email',
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.email).toContain(
      'Enter a valid email address'
    );
  });

  it('rejects short display names', () => {
    const result = settingsSchema.safeParse({
      ...validProfile,
      displayName: 'A',
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.displayName).toBeDefined();
  });

  it('rejects invalid usernames', () => {
    const result = settingsSchema.safeParse({
      ...validProfile,
      username: 'bad username!',
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.username).toBeDefined();
  });

  it('requires matching passwords when changing password', () => {
    const result = settingsSchema.safeParse({
      ...validProfile,
      currentPassword: 'OldPass1',
      newPassword: 'NewPass1',
      confirmPassword: 'Mismatch1',
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.confirmPassword).toContain(
      'Passwords do not match'
    );
  });

  it('validates password strength rules', () => {
    const result = settingsSchema.safeParse({
      ...validProfile,
      currentPassword: 'OldPass1',
      newPassword: 'weakpass',
      confirmPassword: 'weakpass',
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.newPassword).toBeDefined();
  });
});
