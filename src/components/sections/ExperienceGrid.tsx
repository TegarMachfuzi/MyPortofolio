'use client';

import React from 'react';
import { Code } from 'lucide-react';
import { experience } from '@/content';
import type { Locale } from '@/lib/i18n';

interface ExperienceGridProps {
  locale: Locale;
}

export const ExperienceGrid: React.FC<ExperienceGridProps> = ({ locale }) => {
  // Get first 4 experience entries from the localized content
  const experiences = experience[locale].items.slice(0, 4);

  // Localized highlight text
  const highlightText = locale === 'id'
    ? 'SPESIALIS DALAM FULL STACK DEVELOPMENT'
    : 'SPECIALIZING IN FULL STACK DEVELOPMENT';

  return (
    <div className="h-full border-black">
      {/* Experience Boxes */}
      {experiences.map((exp, index) => (
        <div
          key={`${exp.role}-${exp.company}-${index}`}
          className={`p-6 border-b border-r border-black bg-[#FFFFFF] ${
            index === experiences.length - 1 ? 'border-b-0' : ''
          }`}
        >
          <h3 className="font-mono font-bold text-lg text-black">{exp.role}</h3>
          <p className="font-mono text-sm text-black">{exp.company}</p>
          {exp.period && (
            <p className="font-mono text-xs text-black mt-1">{exp.period}</p>
          )}
        </div>
      ))}

      {/* Highlight Box */}
      <div className="bg-[#0A0A0A] text-[#D4FF00] p-6 m-4">
        <div className="flex items-center gap-3">
          <Code size={24} />
          <p className="font-mono text-sm font-bold">
            {highlightText}
          </p>
        </div>
      </div>
    </div>
  );
};