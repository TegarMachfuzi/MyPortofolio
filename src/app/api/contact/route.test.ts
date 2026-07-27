import { describe, it, expect, vi, afterEach } from 'vitest';
import { POST } from './route';

afterEach(() => vi.restoreAllMocks());

describe('POST /api/contact', () => {
  it('returns 400 on invalid input', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'bad', message: 'hi' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 200 when email send succeeds', async () => {
    vi.mock('@/lib/email', () => ({ sendContactEmail: vi.fn().mockResolvedValue(undefined) }));
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Ana', email: 'a@b.co', message: 'Hello there world' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
