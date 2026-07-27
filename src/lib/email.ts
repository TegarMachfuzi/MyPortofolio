import { Resend } from 'resend';
import type { ContactInput } from './validation';

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';
  if (!to) throw new Error('CONTACT_TO_EMAIL is not set');

  const { error } = await resend.emails.send({
    from,
    to,
    reply_to: input.email,
    subject: `Portfolio message from ${input.name}`,
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
  });
  if (error) throw new Error(error.message);
}
