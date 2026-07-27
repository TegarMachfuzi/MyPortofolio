import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from './Contact';

afterEach(() => vi.restoreAllMocks());

describe('Contact', () => {
  it('submits valid input and shows success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }));
    render(<Contact locale="en" />);
    await userEvent.type(screen.getByLabelText(/name/i), 'Ana');
    await userEvent.type(screen.getByLabelText(/email/i), 'a@b.co');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello there world');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/thanks/i)).toBeInTheDocument();
  });

  it('shows an error when the server fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({ error: 'fail' }) }));
    render(<Contact locale="en" />);
    await userEvent.type(screen.getByLabelText(/name/i), 'Ana');
    await userEvent.type(screen.getByLabelText(/email/i), 'a@b.co');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello there world');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
