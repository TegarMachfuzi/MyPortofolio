'use client';

import React from 'react';
import { hero } from '@/content';
import type { Locale } from '@/lib/i18n';
import { OutlinedText } from '@/lib/brutal-utils';
import { BrutalButton } from '@/components/ui/BrutalButton';
import { ExperienceGrid } from './ExperienceGrid';

export function Hero({ locale }: { locale: Locale }) {
  const c = hero[locale];

  return (
    <section id="home" className="pt-24 min-h-screen border-2 border-t-0 border-black bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column: Hero Content */}
          <div className="p-8 lg:p-12 border-r-0 lg:border-r border-b lg:border-b-0 border-black bg-[#FFFFFF]">
            <h1 className="text-5xl lg:text-6xl font-black text-black mb-2">
              CREATING
            </h1>
            <h2 className="text-5xl lg:text-6xl font-black mb-8">
              <OutlinedText text="DIGITAL EXPERIENCE!" className="font-black text-transparent" />
            </h2>

            <p className="font-mono text-base leading-relaxed mb-8 max-w-md text-black font-medium bg-[#F5F2EB] p-4 border-2 border-black">
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
          <div className="border-black bg-[#FFFFFF]">
            <ExperienceGrid locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
