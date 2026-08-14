'use client';

import React from 'react';
import { education } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Education({ locale }: { locale: Locale }) {
  const c = education[locale];

  return (
    <section id="education" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-black pb-4">
          <span className="font-mono text-sm">06</span>
          <h2 className="font-sans font-black text-3xl">{c.heading}</h2>
        </div>

        <div className="space-y-0">
          {c.items.map((item, index) => (
            <div
              key={index}
              className={`border-2 border-t-0 border-black p-6 ${
                index === 0 ? 'border-t-2' : ''
              } bg-[#FFFFFF]`}
            >
              <h3 className="font-mono font-bold text-lg text-black">{item.title}</h3>
              <p className="font-mono text-sm text-black">{item.org}</p>
              <p className="font-mono text-xs text-gray-700 mt-1">{item.period}</p>
              {item.detail && (
                <p className="font-mono text-xs text-black mt-2">{item.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
