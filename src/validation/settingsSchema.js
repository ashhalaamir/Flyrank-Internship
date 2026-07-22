import { z } from 'zod';

export const settingsSchema = z
  .object({
    displayName: z
      .string()
      .min(2, 'Display name must be at least 2 characters')
      .max(50, 'Display name must be 50 characters or fewer'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or fewer')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username may only contain letters, numbers, and underscores'
      ),
    bio: z
      .string()
      .max(160, 'Bio must be 160 characters or fewer')
      .optional()
      .or(z.literal('')),
    theme: z.enum(['light', 'dark', 'system'], {
      required_error: 'Select a theme preference',
    }),
    emailNotifications: z.boolean(),
    marketingEmails: z.boolean(),
    currentPassword: z.string().optional().or(z.literal('')),
    newPassword: z.string().optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const wantsPasswordChange =
      data.currentPassword || data.newPassword || data.confirmPassword;

    if (!wantsPasswordChange) {
      return;
    }

    if (!data.currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Current password is required to change password',
        path: ['currentPassword'],
      });
    }

    if (!data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password is required',
        path: ['newPassword'],
      });
    } else if (data.newPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password must be at least 8 characters',
        path: ['newPassword'],
      });
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.newPassword)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must include uppercase, lowercase, and a number',
        path: ['newPassword'],
      });
    }

    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const defaultSettings = {
  displayName: '',
  email: '',
  username: '',
  bio: '',
  theme: 'system',
  emailNotifications: true,
  marketingEmails: false,
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
