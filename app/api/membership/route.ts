import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, membership_type } = body;

    if (!name || !email || !membership_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase.from('members').insert([{
      name, email, membership_type, is_active: true,
    }]);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }
      throw error;
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Membership error:', err);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
