import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;

  // Auth routes that should redirect to dashboard if logged in
  const authRoutes = ["/login", "/register", "/reset-password"];

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/builder"];

  // If user is logged in and tries to access auth routes, redirect to dashboard
  if (authToken && authRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (!authToken && protectedRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure paths that should trigger middleware
export const config = {
  matcher: [
    "/login",
    "/register",
    "/reset-password",
    "/dashboard/:path*",
    "/builder/:path*",
  ],
};
