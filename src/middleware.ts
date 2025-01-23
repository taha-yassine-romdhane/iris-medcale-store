import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes that handle their own auth
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if trying to access protected routes
  if (pathname.includes('/dashboard') || pathname.includes('/mes-commandes') || pathname.includes('/mon-profil')) {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    console.log("--------------------------");
    console.log(authHeader);
    

    if (!token) {
      console.log('❌ Access Denied: No token found in Authorization header');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Get user data from Authorization-User header
      const userHeader = request.headers.get('Authorization-User');
      
      if (!userHeader) {
        console.log('❌ Access Denied: No user data found in header');
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const userData = JSON.parse(decodeURIComponent(userHeader));
      
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

  return NextResponse.next();
}

// Update config to match all routes except public assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};