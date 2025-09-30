import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Public routes
  const publicPaths = ["/auth/login", "/auth/signin"];
  const isPublic = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // If no token and trying to access protected page → redirect to login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If token exists and trying to access auth pages → redirect to feed
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply to specific routes
export const config = {
  matcher: ["/", "/profile/:path*", "/auth/:path*"],
};
