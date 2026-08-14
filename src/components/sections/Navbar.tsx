'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Navbar({ locale }: { locale: Locale }) {
  const content = site[locale];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Desktop Navigation */}
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

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="bg-[#0066FF] text-black px-4 py-2 font-mono text-sm border-2 border-black hover:bg-[#D4FF00] transition-colors"
            >
              HAVE A PROJECT?
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-black hover:bg-[#D4FF00] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-sm hover:bg-[#D4FF00] px-3 py-2 border-b border-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
              <a
                href="#contact"
                className="block bg-[#0066FF] text-black font-mono text-sm px-3 py-2 mt-2 border-2 border-black hover:bg-[#D4FF00] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                HAVE A PROJECT?
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
