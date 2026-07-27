import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';

describe('Skills', () => {
  it('renders category titles and the stat', () => {
    render(<Skills locale="en" />);
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('2.5+')).toBeInTheDocument();
  });
});
