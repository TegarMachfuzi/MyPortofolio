'use client';

import React from 'react';
import { hero } from '@/content';
import type { Locale } from '@/lib/i18n';
import { OutlinedText } from '@/lib/brutal-utils';
import { BrutalButton } from '@/components/ui/BrutalButton';

export function Hero({ locale }: { locale: Locale }) {
  const c = hero[locale];

  return (
    <section id="home" className="pt-24 min-h-screen border-2 border-t-0 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column: Hero Content */}
          <div className="p-8 lg:p-12 border-r-0 lg:border-r border-b lg:border-b-0 border-black">
            <h1 className="text-5xl lg:text-6xl font-black text-black mb-2">
              CREATING
            </h1>
            <h2 className="text-5xl lg:text-6xl font-black mb-8">
              <OutlinedText text="DIGITAL EXPERIENCE!" className="font-black text-transparent" />
            </h2>

            <p className="font-mono text-sm leading-relaxed mb-8 max-w-md text-black">
              {c.intro}
            </p>

            <div className="flex flex-wrap gap-4">
              <BrutalButton variant="primary" href={c.ctaPrimary.href}>
                {c.ctaPrimary.label} →
              </BrutalButton>
              <BrutalButton variant="secondary" href={c.ctaSecondary.href}>
                {c.ctaSecondary.label}
              </BrutalButton>
            </div>
          </div>

          {/* Right Column: ExperienceGrid */}
          <div className="border-black">
            {/* ExperienceGrid will be added in Task 6 */}
            <div className="p-8 lg:p-12 bg-[#FFFFFF]">
              <p className="font-mono text-sm text-black">Experience grid placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
