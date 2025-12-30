import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('c4ts_auth_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if logged in and accessing login page
  if (isLoginPage && token) {
    // Default to admin dashboard - client-side will handle proper redirect
    return NextResponse.redirect(new URL('/dashboard-admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard-admin/:path*', '/dashboard-client/:path*', '/login']
};
