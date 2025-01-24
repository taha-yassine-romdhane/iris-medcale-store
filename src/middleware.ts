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
    '/api/products'
  ];

  // Check if the current path is a public route
  if (publicRoutes.some(route => pathname.startsWith(route)) ||
      pathname.includes('/_next/') ||
      pathname.includes('/favicon.ico')) {
    return NextResponse.next();
  }

  // Get token from Authorization header
  const authHeader = request.headers.get('Authorization');
  const userHeader = request.headers.get('Authorization-User');
  
  if (!authHeader || !userHeader) {
    console.log('❌ Access Denied: Missing authentication headers');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const userData = JSON.parse(decodeURIComponent(userHeader));
    
    const decoded = await verifyToken(token);
    if (!decoded) {
      console.log('❌ Access Denied: Invalid token');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Only allow ADMIN and EMPLOYE roles to access dashboard
    if (pathname.includes('/dashboard') && 
        !['ADMIN', 'EMPLOYE'].includes(userData.role)) {
      console.log('❌ Access Denied: Unauthorized role for dashboard');
      return NextResponse.redirect(new URL('/', request.url));
    }

    console.log('✅ Access Granted: User authenticated');
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