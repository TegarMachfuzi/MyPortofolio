import { describe, it, expect } from 'vitest';
import { contactSchema } from './validation';

describe('contactSchema', () => {
  it('accepts a valid message', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'a@b.co', message: 'Hello there world' });
    expect(r.success).toBe(true);
  });
  it('rejects a bad email', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'nope', message: 'Hello there world' });
    expect(r.success).toBe(false);
  });
  it('rejects a too-short message', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'a@b.co', message: 'hi' });
    expect(r.success).toBe(false);
  });
  it('silently allows an empty honeypot field', () => {
    const r = contactSchema.safeParse({ name: 'Ana', email: 'a@b.co', message: 'Hello there world', company: '' });
    expect(r.success).toBe(true);
  });
});
