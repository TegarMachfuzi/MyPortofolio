'use client';

import React from 'react';
import { experience } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Experience({ locale }: { locale: Locale }) {
  const c = experience[locale];

  return (
    <section id="experience" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-black pb-4">
          <span className="font-mono text-sm">02</span>
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
              <h3 className="font-mono font-bold text-lg text-black">{item.role}</h3>
              <p className="font-mono text-sm text-black mb-2">{item.company}</p>
              {item.period && (
                <p className="font-mono text-xs text-gray-700">{item.period}</p>
              )}
              {item.location && (
                <p className="font-mono text-xs text-gray-700">{item.location}</p>
              )}
              {item.bullets && item.bullets.length > 0 && (
                <ul className="font-mono text-sm text-black mt-3 space-y-1 list-disc list-inside">
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
