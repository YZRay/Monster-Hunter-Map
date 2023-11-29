// import { NextResponse } from "next/server";
// import acceptLanguage from "accept-language";
// import { fallbackLng, languages } from "./src/app/i18n/settings";

// acceptLanguage.languages(languages);

// export const config = {
//   // matcher: '/:lng*'
//   matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
// };

// const cookieName = "i18next";

// export function middleware(req) {
//   let lng;
//   if (req.cookies.has(cookieName))
//     lng = acceptLanguage.get(req.cookies.get(cookieName).value);
//   if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
//   if (!lng) lng = fallbackLng;

//   // Redirect if lng in path is not supported
//   if (
//     !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//     !req.nextUrl.pathname.startsWith("/_next")
//   ) {
//     return NextResponse.redirect(
//       new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
//     );
//   }

//   if (req.headers.has("referer")) {
//     const refererUrl = new URL(req.headers.get("referer"));
//     const lngInReferer = languages.find((l) =>
//       refererUrl.pathname.startsWith(`/${l}`)
//     );
//     const response = NextResponse.next();
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
//     return response;
//   }

//   return NextResponse.next();
// }

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
    return NextResponse.rewrite(
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
    "/((?!api|_next/static|_next/image|manifest.json|assets|favicon.ico).*)",
};
// export const config = {
//   matcher: "/((?!api|static|.*..*|_next).*)",
// };
