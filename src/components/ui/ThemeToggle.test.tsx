import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders an accessible theme button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
});
