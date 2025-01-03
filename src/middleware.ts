import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if trying to access dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      // Not logged in - redirect to login page
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const user = request.cookies.get('user')?.value;
      if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const userData = JSON.parse(decodeURIComponent(user));
      
      // Only allow ADMIN and EMPLOYE roles to access dashboard
      if (userData.role !== 'ADMIN' && userData.role !== 'EMPLOYE') {
        // Not authorized - redirect to home page with error
        const redirectUrl = new URL('/', request.url);
        redirectUrl.searchParams.set('error', 'not_authorized');
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Check if trying to access protected routes (client-only routes, contact, appointment)
  if (request.nextUrl.pathname.startsWith('/mes-commandes') || 
      request.nextUrl.pathname.startsWith('/mon-profil') ||
      request.nextUrl.pathname === '/contact' ||
      request.nextUrl.pathname === '/appointment') {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      redirectUrl.searchParams.set('error', 'auth_required');
      redirectUrl.searchParams.set('message', `Vous devez être connecté pour accéder à ${request.nextUrl.pathname === '/contact' ? 'la page contact' : 'la page de rendez-vous'}`);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      const user = request.cookies.get('user')?.value;
      if (!user) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
        redirectUrl.searchParams.set('error', 'auth_required');
        redirectUrl.searchParams.set('message', `Vous devez être connecté pour accéder à ${request.nextUrl.pathname === '/contact' ? 'la page contact' : 'la page de rendez-vous'}`);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/mes-commandes/:path*',
    '/mon-profil/:path*',
    '/contact',
    '/appointment'
  ]
}
