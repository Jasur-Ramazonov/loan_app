import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(request: NextRequestWithAuth) {
  console.log("pathname", request.nextUrl.pathname);
  console.log("token", request.nextauth.token);

  if (
    request.nextUrl.pathname === "/admin" &&
    request.nextauth.token?.role !== "admin"
  ) {
    return NextResponse.rewrite(new URL("/denied", request.url));
  }

  if (
    request.nextUrl.pathname === "/profile" &&
    request.nextauth.token?.role !== "user"
  ) {
    return NextResponse.rewrite(new URL("/denied", request.url));
  }
});

export const config = { matcher: ["/", "/admin", "/profile"] };
