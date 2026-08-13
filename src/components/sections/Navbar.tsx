'use client';

import React from 'react';
import Link from 'next/link';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Navbar({ locale }: { locale: Locale }) {
  const content = site[locale];

  const navLinks = [
    { href: '#about', label: content.navItems[0].label },
    { href: '#experience', label: content.navItems[1].label },
    { href: '#skills', label: content.navItems[2].label },
    { href: '#projects', label: content.navItems[3].label },
    { href: '#contact', label: content.navItems[4].label },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2EB] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-black"></div>
              <span className="font-mono text-sm font-bold">CREATOR NAMA ANDA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && <div className="h-4 w-px bg-black mx-2"></div>}
                <a
                  href={link.href}
                  className="font-mono text-sm hover:bg-[#D4FF00] px-3 py-1 transition-colors"
                >
                  {link.label.toUpperCase()}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center">
            <a
              href="#contact"
              className="bg-[#0066FF] text-black px-4 py-2 font-mono text-sm border-2 border-black hover:bg-[#D4FF00] transition-colors"
            >
              HAVE A PROJECT?
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
