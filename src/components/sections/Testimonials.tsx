'use client';

import React from 'react';
import { testimonials } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Testimonials({ locale }: { locale: Locale }) {
  const c = testimonials[locale];

  return (
    <section id="testimonials" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-black pb-4">
          <span className="font-mono text-sm">05</span>
          <h2 className="font-sans font-black text-3xl">{c.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {c.items.map((item, index) => (
            <div
              key={index}
              className={`border-2 border-t-0 border-l-0 ${
                index === 0 || index % 2 === 0 ? 'border-l-2' : ''
              } border-black p-6 bg-[#FFFFFF]`}
            >
              <blockquote className="font-mono text-sm leading-relaxed text-black mb-4">
                "{item.quote}"
              </blockquote>
              <cite className="font-mono text-xs not-italic text-black">
                — {item.name}, {item.role}{item.company !== '—' ? ` at ${item.company}` : ''}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
