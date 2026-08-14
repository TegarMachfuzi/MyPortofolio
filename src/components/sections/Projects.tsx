'use client';

import React from 'react';
import Image from 'next/image';
import { projects } from '@/content';
import { BrutalButton } from '@/components/ui/BrutalButton';
import type { Locale } from '@/lib/i18n';

export function Projects({ locale }: { locale: Locale }) {
  const c = projects[locale];

  return (
    <section id="projects" className="border-2 border-t-0 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-black pb-4">
          <span className="font-mono text-sm">04</span>
          <h2 className="font-sans font-black text-3xl">{c.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {c.items.map((project, index) => (
            <div
              key={project.title}
              className={`border-2 border-t-0 border-l-0 ${
                index === 0 || index % 3 === 0 ? 'border-l-2' : ''
              } border-black p-6 hover:bg-[#D4FF00]/10 transition-colors bg-[#FFFFFF]`}
            >
              <div className="relative aspect-[3/2] bg-[#F5F2EB] border-2 border-black mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-mono font-bold text-lg mb-2 text-black">{project.title}</h3>
              <p className="font-mono text-xs mb-4 text-black leading-relaxed">{project.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs bg-[#D4FF00] px-2 py-1 border-2 border-black text-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.sourceUrl && (
                  <BrutalButton variant="secondary" href={project.sourceUrl} className="text-xs py-2 px-3">
                    Source
                  </BrutalButton>
                )}
                {project.liveUrl && (
                  <BrutalButton variant="secondary" href={project.liveUrl} className="text-xs py-2 px-3">
                    Live
                  </BrutalButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
