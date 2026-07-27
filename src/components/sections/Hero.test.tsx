import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the localized headline and primary CTA', () => {
    render(<Hero locale="en" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view work/i })).toHaveAttribute('href', '#projects');
  });
});
