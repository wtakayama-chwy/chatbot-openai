import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18n/routing';

function getLocale(request: NextRequest): string {
  // Determine the locale from the request headers or default to 'en-US'
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const acceptedLocales = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0]);

  for (const locale of acceptedLocales) {
    if (locales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /dashboard >> then new URL is /en-US/dashboard
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
