'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ExternalLink } from 'lucide-react';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = site[locale];

  // Tech stack from existing content structure
  const techStack = ['REACT', 'NEXT.JS', 'PYTHON', 'AWS', 'UI/UX', 'TYPESCRIPT'];

  return (
    <footer className="w-full bg-[#D4FF00] text-black border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tech Stack */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center font-mono text-sm">
            {techStack.map((tech, index) => (
              <React.Fragment key={tech}>
                {index > 0 && <span className="text-black">•</span>}
                <span className="hover:underline cursor-pointer">{tech}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-4">
          {content.socials.map((social) => {
            const Icon = social.label.toLowerCase() === 'email' ||
                        social.label.toLowerCase() === 'mail' ? Mail : ExternalLink;
            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm hover:underline"
              >
                <Icon size={18} />
                <span>{social.label}</span>
              </Link>
            );
          })}
          <Link
            href={content.resumeUrl}
            className="flex items-center gap-2 font-mono text-sm hover:underline"
          >
            <ExternalLink size={18} />
            <span>CV</span>
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center font-mono text-xs">
          © {new Date().getFullYear()} {content.name}. {content.footerNote}
        </p>
      </div>
    </footer>
  );
}
