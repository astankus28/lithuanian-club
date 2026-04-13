import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, space, event_date, guest_count, event_type, message } = body;

    if (!name || !email || !phone || !space || !event_date || !guest_count || !event_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase.from('booking_submissions').insert([{
      name, email, phone, space, event_date,
      guest_count: parseInt(guest_count),
      event_type, message,
      status: 'pending',
    }]);

    if (error) throw error;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 });
  }
}
