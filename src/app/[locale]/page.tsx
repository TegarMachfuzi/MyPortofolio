import type { Locale } from '@/lib/i18n';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Education } from '@/components/sections/Education';

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Experience locale={locale} />
      <Skills locale={locale} />
      <Projects locale={locale} />
      <Testimonials locale={locale} />
      <Education locale={locale} />
    </>
  );
}
