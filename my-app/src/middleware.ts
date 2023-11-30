import { NextResponse, NextRequest } from "next/server";
import { fallbackLng, languages } from "./app/i18n/settings";
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname, searchParams } = request.nextUrl;

  // Check if the default locale is in the pathname
  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLng}`,
          pathname === `/${fallbackLng}` ? "/" : ""
        ),
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Do not run the middleware on the following paths
  matcher:
    "/((?!api|_next/static|_next/image|manifest.json|assets|favicon.ico|ads.txt).*)",
};
// export const config = {
//   matcher: "/((?!api|static|.*..*|_next).*)",
// };
