import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience', () => {
  it('renders each role with its period and bullets', () => {
    render(<Experience locale="en" />);
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    expect(screen.getByText('2023 — Present')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });
});
