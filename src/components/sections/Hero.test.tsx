import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  describe('English locale', () => {
    it('renders the brutalist hero content with outlined text and CTAs', () => {
      render(<Hero locale="en" />);

      // Check for main heading
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('CREATING');

      // Check for outlined text
      expect(screen.getByText('DIGITAL EXPERIENCE!')).toBeInTheDocument();

      // Check for primary CTA
      expect(screen.getByRole('link', { name: /view work/i })).toHaveAttribute('href', '#projects');

      // Check for secondary CTA
      expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute('href', '/resume.pdf');

      // Check for ExperienceGrid content - English
      expect(screen.getByText('Freelance Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Photo-in')).toBeInTheDocument();
      expect(screen.getByText('SPECIALIZING IN FULL STACK DEVELOPMENT')).toBeInTheDocument();
    });
  });

  describe('Indonesian locale', () => {
    it('renders localized content for Indonesian locale', () => {
      render(<Hero locale="id" />);

      // Check for Indonesian CTA text
      expect(screen.getByRole('link', { name: /lihat karya/i })).toHaveAttribute('href', '#projects');
      expect(screen.getByRole('link', { name: /unduh cv/i })).toHaveAttribute('href', '/resume.pdf');

      // Check for ExperienceGrid content - Indonesian
      expect(screen.getByText('Freelance Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('Photo-in')).toBeInTheDocument();
      expect(screen.getByText('SPESIALIS DALAM FULL STACK DEVELOPMENT')).toBeInTheDocument();
    });
  });

  describe('Cross-locale consistency', () => {
    it('renders the same structure for both locales', () => {
      const { rerender } = render(<Hero locale="en" />);

      // Check structure exists for English
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getAllByRole('link').length).toBeGreaterThan(0);

      // Re-render with Indonesian locale
      rerender(<Hero locale="id" />);

      // Check structure still exists for Indonesian
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
    });
  });
});
