import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, defaultSettings } from '../validation/settingsSchema.js';
import FormField from './FormField.jsx';

function SettingsForm({ initialValues = defaultSettings, onSave }) {
  const [savedMessage, setSavedMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: { ...defaultSettings, ...initialValues },
    resolver: zodResolver(settingsSchema),
    mode: 'onBlur',
  });

  const bioValue = watch('bio') ?? '';

  async function onSubmit(data) {
    setSavedMessage('');
    await onSave?.(data);
    reset(data);
    setSavedMessage('Settings saved successfully.');
  }

  return (
    <form
      className="settings-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <section className="form-section">
        <h2 className="section-title">Profile</h2>
        <p className="section-description">
          Update how others see you on FlyRank.
        </p>

        <FormField
          id="displayName"
          label="Display name"
          error={errors.displayName?.message}
          required
        >
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.displayName)}
            {...register('displayName')}
          />
        </FormField>

        <FormField
          id="email"
          label="Email address"
          error={errors.email?.message}
          required
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
        </FormField>

        <FormField
          id="username"
          label="Username"
          hint="Letters, numbers, and underscores only."
          error={errors.username?.message}
          required
        >
          <input
            id="username"
            type="text"
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
            {...register('username')}
          />
        </FormField>

        <FormField
          id="bio"
          label="Bio"
          hint={`${bioValue.length}/160 characters`}
          error={errors.bio?.message}
        >
          <textarea
            id="bio"
            rows={3}
            aria-invalid={Boolean(errors.bio)}
            {...register('bio')}
          />
        </FormField>
      </section>

      <section className="form-section">
        <h2 className="section-title">Preferences</h2>

        <FormField
          id="theme"
          label="Theme"
          error={errors.theme?.message}
          required
        >
          <select id="theme" {...register('theme')}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </FormField>

        <fieldset className="checkbox-group">
          <legend className="visually-hidden">Notification preferences</legend>

          <label className="checkbox-row">
            <input type="checkbox" {...register('emailNotifications')} />
            <span>
              <strong>Email notifications</strong>
              <small>Receive alerts about account activity.</small>
            </span>
          </label>

          <label className="checkbox-row">
            <input type="checkbox" {...register('marketingEmails')} />
            <span>
              <strong>Marketing emails</strong>
              <small>Product updates and tips from FlyRank.</small>
            </span>
          </label>
        </fieldset>
      </section>

      <section className="form-section">
        <h2 className="section-title">Security</h2>
        <p className="section-description">
          Leave blank to keep your current password.
        </p>

        <FormField
          id="currentPassword"
          label="Current password"
          error={errors.currentPassword?.message}
        >
          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.currentPassword)}
            {...register('currentPassword')}
          />
        </FormField>

        <FormField
          id="newPassword"
          label="New password"
          hint="At least 8 characters with uppercase, lowercase, and a number."
          error={errors.newPassword?.message}
        >
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.newPassword)}
            {...register('newPassword')}
          />
        </FormField>

        <FormField
          id="confirmPassword"
          label="Confirm new password"
          error={errors.confirmPassword?.message}
        >
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register('confirmPassword')}
          />
        </FormField>
      </section>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={!isDirty || isSubmitting}
          onClick={() => {
            reset({ ...defaultSettings, ...initialValues });
            setSavedMessage('');
          }}
        >
          Reset
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving…' : 'Save settings'}
        </button>
      </div>

      {savedMessage && (
        <p className="success-message" role="status">
          {savedMessage}
        </p>
      )}
    </form>
  );
}

export default SettingsForm;
