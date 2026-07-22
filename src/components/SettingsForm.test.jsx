import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsForm from './SettingsForm.jsx';

describe('SettingsForm', () => {
  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(await screen.findByText(/display name must be at least 2 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument();
  });

  it('submits valid data', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn().mockResolvedValue(undefined);

    render(<SettingsForm onSave={onSave} />);

    await user.type(screen.getByLabelText(/display name/i), 'Ashhal Aamir');
    await user.type(screen.getByLabelText(/email address/i), 'ashhal@example.com');
    await user.type(screen.getByLabelText(/username/i), 'ashhal_aamir');
    await user.selectOptions(screen.getByLabelText(/theme/i), 'dark');
    await user.click(screen.getByRole('button', { name: /save settings/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'Ashhal Aamir',
          email: 'ashhal@example.com',
          username: 'ashhal_aamir',
          theme: 'dark',
        })
      );
    });

    expect(await screen.findByText(/settings saved successfully/i)).toBeInTheDocument();
  });
});
