'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validation';
import { contact } from '@/content';
import { BrutalButton } from '@/components/ui/BrutalButton';
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

  const inputCls = 'w-full border-2 border-black bg-white p-3 font-mono text-sm focus:outline-none focus:border-[#0066FF] text-black';

  return (
    <section id="contact" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-black pb-4">
          <span className="font-mono text-sm">07</span>
          <h2 className="font-sans font-black text-3xl">{c.heading}</h2>
        </div>

        <div className="border-2 border-black p-8 bg-[#FFFFFF]">
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              {...register('company')}
              className="hidden"
            />
            <div>
              <label htmlFor="name" className="font-mono text-sm block mb-2 text-black">Name</label>
              <input
                id="name"
                className={inputCls}
                {...register('name')}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-[#0066FF] font-mono">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-sm block mb-2 text-black">Email</label>
              <input
                id="email"
                type="email"
                className={inputCls}
                {...register('email')}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-[#0066FF] font-mono">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-sm block mb-2 text-black">Message</label>
              <textarea
                id="message"
                rows={4}
                className={inputCls}
                {...register('message')}
                placeholder="Your message here..."
              />
              {errors.message && <p className="mt-1 text-sm text-[#0066FF] font-mono">{errors.message.message}</p>}
            </div>
            <div className="flex items-center gap-4">
              <BrutalButton variant="primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
              </BrutalButton>
              {status === 'success' && (
                <p className="text-sm font-mono text-black">Thanks — your message is on its way.</p>
              )}
              {status === 'error' && (
                <p className="text-sm font-mono text-[#0066FF]">Something went wrong. Please email me directly.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
