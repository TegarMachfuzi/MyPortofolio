import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { locales } from '@/lib/i18n';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-semibold text-ink">404</p>
      <p className="mt-4 text-muted">This page could not be found.</p>
      <div className="mt-8 flex gap-3">
        {locales.map((l) => (
          <Button key={l} variant="outline" href={`/${l}#home`}>{l.toUpperCase()}</Button>
        ))}
      </div>
    </Container>
  );
}
