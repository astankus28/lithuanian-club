import { NextRequest, NextResponse } from 'next/server';
import { validatePassword, setAuthCookie, clearAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { password, action } = await request.json();

  if (action === 'logout') {
    const response = NextResponse.json({ success: true });
    return clearAuthCookie(response);
  }

  if (!validatePassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  return setAuthCookie(response);
}
