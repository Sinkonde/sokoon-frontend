import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';
import { handleTokenProxy } from './lib/proxy/token-proxy';

const handleI18nRouting = createMiddleware(routing);

// Read actual hostname from incoming request
function getHostname(request) {
  const hostHeader =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    request.nextUrl.host;

  return new URL(`http://${hostHeader.split(',')[0].trim()}`).hostname.toLowerCase();
}

// Identify portal
function getPortal(hostname) {
  const rootDomain = (process.env.APP_ROOT_DOMAIN || 'localhost')
    .replace(/^https?:\/\//, '')
    .split(':')[0]
    .toLowerCase();

  const adminHostname = `admin.${rootDomain}`;

  if (hostname === adminHostname) {
    return 'admin';
  }

  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    return null;
  }

  if (hostname.endsWith(`.${rootDomain}`)) {
    return 'shop';
  }

  return null;
}

export function proxy(request) {
  // 1. Handle authentication token first
  const tokenResponse = handleTokenProxy(request);

  if (tokenResponse) {
    return tokenResponse;
  }

  // 2. Detect hostname and portal
  const hostname = getHostname(request);
  const portal = getPortal(hostname);

  // 3. Read incoming pathname
  const segments = request.nextUrl.pathname
    .split('/')
    .filter(Boolean);

  const locale = segments[0];

  // 4. Rewrite localized portal requests
  if (portal && routing.locales.includes(locale)) {
    const remainingPath = segments.slice(1).join('/');

    const destination = request.nextUrl.clone();

    destination.pathname =
      `/${locale}/${portal}` +
      (remainingPath ? `/${remainingPath}` : '');

    // console.log('[PORTAL REWRITE]', {
    //   hostname,
    //   portal,
    //   incomingPath: request.nextUrl.pathname,
    //   destination: destination.pathname,
    // });

    return NextResponse.rewrite(destination);
  }

  // 5. Main website or locale negotiation
  // console.log('[NORMAL ROUTING]', {
  //   hostname,
  //   portal,
  //   pathname: request.nextUrl.pathname,
  // });

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};