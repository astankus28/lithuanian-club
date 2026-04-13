import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { isAuthenticated } from '@/lib/auth';

function auth() {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function GET() {
  const deny = auth(); if (deny) return deny;
  const db = getAdminClient();
  const { data, error } = await db.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const deny = auth(); if (deny) return deny;
  const { id, status } = await request.json();
  const db = getAdminClient();
  const { data, error } = await db.from('contact_messages').update({ status }).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
