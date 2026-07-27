import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders project titles and source links', () => {
    render(<Projects locale="en" />);
    expect(screen.getByText('RFM analytics dashboard')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /source/i }).length).toBeGreaterThan(0);
  });
});
