import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// next/image renders a plain <img> in jsdom tests
vi.mock('next/image', () => ({
  default: (props) =>
    (props.alt ? `__IMG__:${props.alt}` : null) && null,
}));

// Mock window.matchMedia for next-themes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for useActiveSection
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));
