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
  const { data, error } = await db.from('gallery_images').select('*').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const deny = auth(); if (deny) return deny;
  const body = await request.json();
  const db = getAdminClient();
  const { data, error } = await db.from('gallery_images').insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const deny = auth(); if (deny) return deny;
  const body = await request.json();
  const { id, ...updates } = body;
  const db = getAdminClient();
  const { data, error } = await db.from('gallery_images').update(updates).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const deny = auth(); if (deny) return deny;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const db = getAdminClient();
  const { error } = await db.from('gallery_images').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
