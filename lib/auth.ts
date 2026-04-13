import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lithuanian-club-admin';
const COOKIE_NAME = 'lc_admin_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  return authCookie?.value === 'authenticated';
}

export function setAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set(COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  return response;
}

export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.delete(COOKIE_NAME);
  return response;
}

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function requireAuth(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value !== 'authenticated') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return null;
}
