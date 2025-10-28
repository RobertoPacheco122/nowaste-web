import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "./app/auth/sign-in/_hooks/use-sign-in-form";

const privateRoutes = ["/addresses", "/checkout", "/orders"];

/* const publicRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/products",
  "/establishment",
]; */

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(AUTH_COOKIE_NAME);

  const actualRouteName = request.nextUrl.pathname;

  const isPrivateRoute = privateRoutes.some((route) =>
    actualRouteName.startsWith(route)
  );

  if (isPrivateRoute && !authToken)
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));

  const isAnyAuthRoute = actualRouteName.startsWith("/auth");

  if (isAnyAuthRoute && authToken)
    return NextResponse.redirect(new URL("/products", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
