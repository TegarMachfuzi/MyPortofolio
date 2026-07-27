import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About', () => {
  it('renders the heading and lead paragraph', () => {
    render(<About locale="en" />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/Java backend developer/i)).toBeInTheDocument();
  });
});
