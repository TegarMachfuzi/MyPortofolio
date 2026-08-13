'use client';

import React from 'react';
import { Code } from 'lucide-react';
import { experience } from '@/content';

export const ExperienceGrid: React.FC = () => {
  // Get first 4 experience entries from the actual content
  const experiences = experience.en.items.slice(0, 4);

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
            SPECIALIZING IN FULL STACK DEVELOPMENT
          </p>
        </div>
      </div>
    </div>
  );
};