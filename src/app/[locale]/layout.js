import '../globals.css';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '../../i18n/routing';
import QueryProvider from '@/components/providers/query-provider';
import ThemeProvider from '@/components/providers/theme-provider';

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
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
          </ThemeProvider>          
        </NextIntlClientProvider>
      </body>
    </html>
  );
}