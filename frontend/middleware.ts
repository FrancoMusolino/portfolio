import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

const supportedLocales = ["es", "en"];
const defaultLocale = "es";

function getLocale(headers: ReadonlyHeaders): string {
  const languageHeader = Object.fromEntries(
    Array.from(headers.entries()).filter(
      ([header]) => header === "accept-language"
    )
  );

  const languages = new Negotiator({ headers: languageHeader }).languages();
  return match(languages, supportedLocales, defaultLocale);
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
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // only run on root (/) URL
    "/",
  ],
};
