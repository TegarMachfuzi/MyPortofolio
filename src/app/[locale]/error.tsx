'use client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-3xl font-semibold text-ink">Something went wrong.</p>
      <p className="mt-3 text-muted">Please try again.</p>
      <Button className="mt-8" onClick={() => reset()}>Try again</Button>
    </Container>
  );
}
