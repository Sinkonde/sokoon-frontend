import '../globals.css';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '../../i18n/routing';

export const metadata = {
  title: 'Duka SaaS',
  description: 'Shop management system',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}