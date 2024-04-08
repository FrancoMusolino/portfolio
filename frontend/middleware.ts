import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Locale } from "./lib/strapi/types";

const supportedLocales: Locale[] = ["es", "en"];
const defaultLocale: Locale = "es";

function getLocale(headers: ReadonlyHeaders): Locale {
  const languageHeader = Object.fromEntries(
    Array.from(headers.entries()).filter(
      ([header]) => header === "accept-language"
    )
  );

  const languages = new Negotiator({ headers: languageHeader }).languages();
  return match(languages, supportedLocales, defaultLocale) as Locale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`Running middleware on route: `, pathname);

  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(headers());
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - files on public directory (no matters which extension)
     * - _next/image (image optimization files)
     * - Open Grapgh image
     */
    "/((?!api|_next/static|.*\\..*|_next/image|opengraph-image).*)",
  ],
};
