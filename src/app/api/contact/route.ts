import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const hits = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX;
}

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  // honeypot: silently accept and drop
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 });
  }
}
