import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Testimonials } from './Testimonials';

describe('Testimonials', () => {
  it('renders the quote text', () => {
    render(<Testimonials locale="en" />);
    expect(screen.getByText(/picks up new domains/i)).toBeInTheDocument();
  });
});
