import type { Locale } from '@/lib/i18n';
import { Hero } from '@/components/sections/Hero';

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <>
      <Hero locale={locale} />
    </>
  );
}
