import { NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';

export function handleAuthProxy(request, locale) {

  const token = request.cookies.get('access_token')?.value;

  // Authenticated
  if (token && token.trim()) {
    return null;
  }

  const currentLocale = routing.locales.includes(locale)
    ? locale
    : routing.defaultLocale;

  const appRootUrl =
    process.env.APP_ROOT_URL || 'http://localhost:3000';

  const loginUrl = new URL(
    `/${currentLocale}/login`,
    appRootUrl
  );

  return NextResponse.redirect(loginUrl, 307);
}