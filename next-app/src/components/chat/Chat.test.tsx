import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Chat from './Chat';

describe('Chat', () => {
  it('renders the message input and send button and accepts text', async () => {
    const user = userEvent.setup();
    render(<Chat />);

    const input = screen.getByRole('textbox', { name: 'Message' });
    expect(input).toBeVisible();
    expect(screen.getByRole('button', { name: 'Send' })).toBeVisible();

    await user.type(input, 'Hello world');

    expect(input).toHaveValue('Hello world');
  });
});
