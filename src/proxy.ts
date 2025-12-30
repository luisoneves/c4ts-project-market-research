import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * ✅ CORREÇÃO CRÍTICA: Função deve se chamar "proxy" no Next.js 16+
 * ✅ Lê token do COOKIE (não do localStorage, que é client-only)
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get('c4ts_auth_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/dashboard-admin') ||
    request.nextUrl.pathname.startsWith('/dashboard-client');

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if logged in and accessing login page
  if (isLoginPage && token) {
    // Default redirect to admin (client-side router will handle correct dashboard)
    return NextResponse.redirect(new URL('/dashboard-admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard-admin/:path*', '/dashboard-client/:path*', '/login']
};
