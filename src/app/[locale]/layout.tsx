import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/sections/Navbar';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { locales, type Locale } from '@/lib/i18n';
import { site, hero } from '@/content';
import { localeAlternates, BASE, personJsonLd } from '@/lib/seo';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const s = site[locale];
  const h = hero[locale];
  const title = `${s.name} — ${h.eyebrow}`;
  const description = h.intro;
  return {
    title,
    description,
    metadataBase: new URL(BASE),
    alternates: localeAlternates(),
    openGraph: { title, description, url: `${BASE}/${locale}`, siteName: s.name, locale: locale === 'id' ? 'id_ID' : 'en_US', type: 'profile' },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();
  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(`${BASE}/${locale}`)) }} />
        <ThemeProvider>
          <Navbar locale={locale} />
          <main className="pt-16">{children}</main>
          <SiteFooter locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
