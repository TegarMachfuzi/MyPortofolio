import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// next/image renders a plain <img> in jsdom tests
vi.mock('next/image', () => ({
  default: (props) =>
    (props.alt ? `__IMG__:${props.alt}` : null) && null,
}));
