'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import type { BookingSubmission } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-900/40 text-yellow-300',
  confirmed: 'bg-green-900/40 text-green-300',
  cancelled: 'bg-red-900/40 text-red-300',
};

const SPACE_LABELS: Record<string, string> = {
  great_hall: 'Great Hall',
  oak_room: 'Oak Room',
  bar_lounge: 'Bar Lounge',
  full_venue: 'Full Venue',
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings');
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatus = async (id: string, status: string) => {
    await fetch('/api/admin/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await fetchBookings();
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cinzel text-amber-club text-2xl tracking-widest">Space Bookings</h2>
            <p className="font-fell italic text-parchment/40 text-sm mt-1">{bookings.length} total</p>
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'confirmed', 'cancelled'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`font-cinzelPlain text-xs tracking-widest uppercase px-3 py-1.5 border transition-all ${
                  filter === s ? 'bg-crimson border-crimson text-parchment' : 'border-amber-club/30 text-parchment/50 hover:border-amber-club'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">No bookings found.</div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => (
              <div key={b.id} className="admin-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-cinzel text-parchment tracking-wide">{b.name}</h4>
                      <span className={`font-cinzelPlain text-xs px-2 py-0.5 rounded tracking-wider ${STATUS_COLORS[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="font-cinzelPlain text-amber-club/60 text-xs tracking-wider">
                      {SPACE_LABELS[b.space]} · {b.event_date} · {b.guest_count} guests · {b.event_type}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {b.status !== 'confirmed' && (
                      <button onClick={() => handleStatus(b.id, 'confirmed')}
                        className="font-cinzelPlain text-xs text-green-300 hover:text-green-200 tracking-wider uppercase px-2 py-1 border border-green-800 hover:border-green-600 transition-all">
                        Confirm
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button onClick={() => handleStatus(b.id, 'cancelled')}
                        className="font-cinzelPlain text-xs text-red-300 hover:text-red-200 tracking-wider uppercase px-2 py-1 border border-red-900 hover:border-red-700 transition-all">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm border-t border-amber-club/10 pt-3">
                  <div>
                    <span className="font-cinzelPlain text-amber-club/40 text-xs uppercase tracking-wider block">Email</span>
                    <a href={`mailto:${b.email}`} className="font-fell text-parchment/70 hover:text-parchment">{b.email}</a>
                  </div>
                  <div>
                    <span className="font-cinzelPlain text-amber-club/40 text-xs uppercase tracking-wider block">Phone</span>
                    <a href={`tel:${b.phone}`} className="font-fell text-parchment/70 hover:text-parchment">{b.phone}</a>
                  </div>
                  <div>
                    <span className="font-cinzelPlain text-amber-club/40 text-xs uppercase tracking-wider block">Submitted</span>
                    <span className="font-fell text-parchment/50 text-xs">{new Date(b.created_at).toLocaleDateString()}</span>
                  </div>
                  {b.message && (
                    <div className="md:col-span-3">
                      <span className="font-cinzelPlain text-amber-club/40 text-xs uppercase tracking-wider block mb-1">Notes</span>
                      <p className="font-fell italic text-parchment/50 text-sm">{b.message}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
