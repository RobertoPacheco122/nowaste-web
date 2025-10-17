import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "./app/auth/sign-in/_hooks/use-sign-in-form";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(AUTH_COOKIE_NAME);

  if (authToken)
    return NextResponse.redirect(new URL("/products", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/sign-in", "/auth/sign-up"],
};
