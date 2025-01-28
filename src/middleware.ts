import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log('🔒 Middleware - Checking path:', pathname);

  // If not a dashboard route, allow access
  if (!pathname.startsWith('/dashboard')) {
    console.log('✅ Non-dashboard route - allowing access');
    return NextResponse.next();
  }

  // For dashboard routes, check authentication
  const authHeader = request.headers.get('authorization');
  console.log('🔑 Auth header present?', !!authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No valid auth header found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log('🔍 Verifying token for dashboard access...');
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    
    if (!payload || !payload.role) {
      throw new Error('Invalid token payload');
    }

    const role = payload.role as string;
    console.log('👤 User role:', role);

    // Only ADMIN and EMPLOYE can access dashboard
    const isAuthorizedRole = ['ADMIN', 'EMPLOYE'].includes(role);
    
    console.log('📊 Dashboard access check:', {
      userRole: role,
      isAuthorizedRole
    });

    if (!isAuthorizedRole) {
      console.log('🚫 Unauthorized dashboard access attempt - redirecting to home');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Add user role to headers for use in the application
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', role);

    console.log('✅ Dashboard access granted');
    return NextResponse.next({
      headers: requestHeaders,
    });

  } catch (error) {
    console.error('⚠️ Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Only run middleware for dashboard routes
export const config = {
  matcher: ['/dashboard/:path*']
};