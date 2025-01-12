import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes that handle their own auth
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if trying to access protected routes
  if (pathname.includes('/dashboard') || 
      pathname.includes('/mes-commandes') || 
      pathname.includes('/mon-profil')) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const user = request.cookies.get('user')?.value;
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const userData = JSON.parse(decodeURIComponent(user));
      
      // Only allow ADMIN and EMPLOYE roles to access dashboard
      if (pathname.includes('/dashboard') && 
          userData.role !== 'ADMIN' && 
          userData.role !== 'EMPLOYE') {
        // Not authorized - redirect to home page with error
        const redirectUrl = new URL('/', request.url);
        redirectUrl.searchParams.set('error', 'not_authorized');
        return NextResponse.redirect(redirectUrl);
      }

      // User is authorized, continue to protected route
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      // If there's any error parsing the user data, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    '/mes-commandes/:path*',
    '/mon-profil/:path*',
    // API routes
    '/api/:path*'
  ]
};