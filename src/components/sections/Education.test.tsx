import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Education } from './Education';

describe('Education', () => {
  it('renders the section heading', () => {
    render(<Education locale="en" />);
    expect(screen.getByRole('heading', { name: /education & certifications/i })).toBeInTheDocument();
  });
});
