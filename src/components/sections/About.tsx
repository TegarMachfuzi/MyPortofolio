'use client';

import React from 'react';
import { about } from '@/content';
import type { Locale } from '@/lib/i18n';

export function About({ locale }: { locale: Locale }) {
  const c = about[locale];

  return (
    <section id="about" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-black p-8 bg-[#FFFFFF]">
          <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4">
            <span className="font-mono text-sm">01</span>
            <h2 className="font-sans font-black text-3xl">{c.heading}</h2>
          </div>

          <div className="space-y-6">
            <p className="font-sans text-2xl font-medium leading-snug text-black">
              {c.lead}
            </p>
            <div className="space-y-4 font-mono text-sm leading-relaxed text-black">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
