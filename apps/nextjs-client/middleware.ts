import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token');
  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    request.cookies.delete('token');
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/users', request.url));
  }
}

export const protectedRoutes = ['/users'];
export const authRoutes = ['/login', '/signup'];
export const publicRoutes = ['/about'];
