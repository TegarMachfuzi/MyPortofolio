'use client';

import React from 'react';
import { skills } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Skills({ locale }: { locale: Locale }) {
  const c = skills[locale];

  return (
    <section id="skills" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-black pb-4">
          <span className="font-mono text-sm">03</span>
          <h2 className="font-sans font-black text-3xl">{c.heading}</h2>
        </div>

        <div className="border-2 border-black p-8 bg-[#FFFFFF]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Stat Box */}
            <div className="border-2 border-black p-4 bg-[#0A0A0A] text-[#D4FF00]">
              <p className="font-sans text-4xl font-semibold">{c.stat.value}</p>
              <p className="mt-1 font-mono text-xs text-[#D4FF00]/80">{c.stat.label}</p>
            </div>

            {/* Skill Categories */}
            {c.categories.map((category) => (
              <div key={category.title} className="border-2 border-black p-4">
                <h3 className="font-mono font-bold text-sm mb-3 text-black">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs bg-[#D4FF00] px-2 py-1 border-2 border-black text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
