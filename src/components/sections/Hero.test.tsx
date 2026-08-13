import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
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

    // Check for ExperienceGrid content
    expect(screen.getByText('Freelance Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Photo-in')).toBeInTheDocument();
    expect(screen.getByText('SPECIALIZING IN FULL STACK DEVELOPMENT')).toBeInTheDocument();
  });

  it('renders localized content for Indonesian locale', () => {
    render(<Hero locale="id" />);

    // Check for Indonesian CTA text
    expect(screen.getByRole('link', { name: /lihat karya/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /unduh cv/i })).toHaveAttribute('href', '/resume.pdf');
  });
});
