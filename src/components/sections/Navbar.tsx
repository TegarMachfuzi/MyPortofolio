'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';
import { site } from '@/content';
import type { Locale } from '@/lib/i18n';

export function Navbar({ locale }: { locale: Locale }) {
  const content = site[locale];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: content.navItems[0].label },
    { href: '#experience', label: content.navItems[1].label },
    { href: '#skills', label: content.navItems[2].label },
    { href: '#projects', label: content.navItems[3].label },
    { href: '#contact', label: content.navItems[4].label },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#F5F2EB] shadow-sm' : 'bg-[#F5F2EB]'
    } border-b-2 border-black`}>
      {/* Decorative top border accent */}
      <div className="h-1 bg-[#D4FF00] border-b border-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="#home" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-black flex items-center justify-center group-hover:bg-[#0066FF] transition-colors">
                <span className="font-mono text-lg font-bold text-[#D4FF00] group-hover:text-black transition-colors">TM</span>
                <div className="absolute inset-0 border-2 border-[#D4FF00] group-hover:border-black transition-colors"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold leading-tight">TEGAR</span>
                <span className="font-mono text-xs font-medium leading-tight text-gray-700">MACHFUZI</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && (
                  <div className="h-6 w-px bg-black mx-3 relative">
                    <div className="absolute inset-0 w-full h-full bg-[#D4FF00] animate-pulse"></div>
                  </div>
                )}
                <a
                  href={link.href}
                  className="relative font-mono text-xs font-bold hover:bg-[#D4FF00] px-4 py-2 transition-all duration-200 group"
                >
                  {link.label.toUpperCase()}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0066FF] group-hover:w-full transition-all duration-200"></span>
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="relative bg-[#0066FF] text-black px-5 py-2.5 font-mono text-xs font-bold border-2 border-black hover:bg-[#D4FF00] transition-all duration-200 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                HAVE A PROJECT?
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile CTA */}
            <a
              href="#contact"
              className="hidden sm:flex bg-[#0066FF] text-black px-3 py-2 font-mono text-xs font-bold border-2 border-black hover:bg-[#D4FF00] transition-colors"
            >
              PROJECT?
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 border-2 border-black hover:bg-[#D4FF00] transition-all duration-200 relative group"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
              ) : (
                <Menu size={18} className="group-hover:scale-110 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-black bg-[#FFFFFF]">
            <div className="px-2 pt-4 pb-4 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between font-mono text-sm font-bold hover:bg-[#D4FF00] px-4 py-3 border-b border-black transition-colors group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label.toUpperCase()}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
              <a
                href="#contact"
                className="flex items-center justify-between bg-[#0066FF] text-black font-mono text-sm font-bold px-4 py-3 mt-3 border-2 border-black hover:bg-[#D4FF00] transition-colors group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>HAVE A PROJECT?</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Mobile footer info */}
            <div className="px-4 py-3 border-t-2 border-black bg-[#F5F2EB]">
              <p className="font-mono text-xs text-gray-700">
                © {new Date().getFullYear()} Tegar Machfuzi
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
