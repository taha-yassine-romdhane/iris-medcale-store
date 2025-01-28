import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log('🔒 Middleware - Checking path:', pathname);

  // Allow non-dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    console.log('✅ Non-dashboard route - allowing access');
    return NextResponse.next();
  }

  // For page requests (HTML), let the client-side handle auth
  const isPageRequest = request.headers.get('accept')?.includes('text/html');
  if (isPageRequest) {
    console.log('📄 Page request - letting client handle auth');
    return NextResponse.next();
  }

  // For API requests, verify the token
  const authHeader = request.headers.get('authorization');
  console.log('🔑 Auth header present?', !!authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No valid auth header found');
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log('🔍 Verifying token for API access...');
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    if (!payload || !payload.role) {
      throw new Error('Invalid token payload');
    }

    const role = payload.role as string;
    console.log('👤 User role:', role);

    // Restrict dashboard access to ADMIN and EMPLOYE roles
    const isAuthorizedRole = ['ADMIN', 'EMPLOYE'].includes(role);
    console.log('📊 Dashboard access check:', {
      userRole: role,
      isAuthorizedRole,
    });

    if (!isAuthorizedRole) {
      console.log('🚫 Unauthorized API access attempt');
      return new NextResponse(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
        headers: { 'content-type': 'application/json' }
      });
    }

    // Attach user role to request headers for downstream usage
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', role);

    console.log('✅ API access granted');
    return NextResponse.next({
      headers: requestHeaders,
    });
  } catch (error) {
    console.error('⚠️ Middleware error:', error);
    return new NextResponse(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    });
  }
}

// Match only dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
