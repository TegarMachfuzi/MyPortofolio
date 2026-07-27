'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { contactSchema, type ContactInput } from '@/lib/validation';
import { contact } from '@/content';
import type { Locale } from '@/lib/i18n';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact({ locale }: { locale: Locale }) {
  const c = contact[locale];
  const [status, setStatus] = useState<Status>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactInput) {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  const inputCls = 'w-full rounded-lg border border-line bg-canvas px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent';

  return (
    <section id="contact" className="border-t border-line bg-surface py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="07" title={c.heading} description={c.intro} />
        </Reveal>
        <Reveal delay={0.1}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* honeypot */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden {...register('company')} className="hidden" />
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">Name</label>
              <input id="name" className={inputCls} {...register('name')} />
              {errors.name && <p className="mt-1 text-sm text-accent">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">Email</label>
              <input id="email" type="email" className={inputCls} {...register('email')} />
              {errors.email && <p className="mt-1 text-sm text-accent">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">Message</label>
              <textarea id="message" rows={5} className={inputCls} {...register('message')} />
              {errors.message && <p className="mt-1 text-sm text-accent">{errors.message.message}</p>}
            </div>
            <Button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send →'}
            </Button>
            {status === 'success' && <p className="text-sm font-medium text-ink">Thanks — your message is on its way.</p>}
            {status === 'error' && <p className="text-sm font-medium text-accent">Something went wrong. Please email me directly.</p>}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
