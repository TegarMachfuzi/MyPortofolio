import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>View work</Button>);
    expect(screen.getByText('View work')).toBeInTheDocument();
  });
  it('renders an anchor when href is provided', () => {
    render(<Button href="#projects">Go</Button>);
    expect(document.querySelector('a[href="#projects"]')).not.toBeNull();
  });
  it('applies outline variant classes', () => {
    render(<Button variant="outline">CV</Button>);
    const el = screen.getByText('CV');
    expect(el.className).toContain('border');
  });
});
