import { NextResponse } from 'next/server';

export function handleTokenProxy(request) {
  const url = request.nextUrl.clone();

  // Check if URL contains token
  if (!url.searchParams.has('token')) {
    return null;
  }

  const token = decodeURIComponent(url.searchParams.get('token'));

  // Validate token
  if (!token || !token.trim()) {
    return NextResponse.json(
      { message: 'Invalid authentication token.' },
      { status: 400 }
    );
  }

  console.log("token", token)

  // Remove token from URL
  url.searchParams.delete('token');

  // Redirect to clean URL
  const response = NextResponse.redirect(url, 303);

  // Store token in HttpOnly cookie
  response.cookies.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  // Security headers
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate'
  );

  response.headers.set(
    'Referrer-Policy',
    'no-referrer'
  );

  return response;
}