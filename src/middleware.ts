import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // List of public routes that don't need authentication
  const publicRoutes = [
    '/login',
    '/',
    '/api/auth/login',
    '/api/auth/verify',
    '/api/category-types',
    '/api/products',
    '/verify-email',
    '/api/auth/verify-email'
  ];

  // Check if the current path is a public route
  if (publicRoutes.some(route => pathname.startsWith(route)) ||
      pathname.includes('/_next/') ||
      pathname.includes('/favicon.ico')) {
    return NextResponse.next();
  }

  // Get token from Authorization header
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check role for dashboard access
    if (pathname.includes('/dashboard') && 
        !['ADMIN', 'EMPLOYE'].includes(decoded.role)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('⚠️ Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Update config to match all routes except public assets
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};