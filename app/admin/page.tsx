'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/admin/events', label: 'Events', icon: '🎭', desc: 'Add, edit, delete events' },
  { href: '/admin/menu', label: 'Menu', icon: '🍽️', desc: 'Manage menu items' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅', desc: 'View space inquiries' },
  { href: '/admin/contacts', label: 'Messages', icon: '✉️', desc: 'View contact messages' },
  { href: '/admin/members', label: 'Members', icon: '🌿', desc: 'Manage membership list' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️', desc: 'Manage gallery images' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    // Fetch counts from each endpoint
    const endpoints = [
      { key: 'bookings', url: '/api/admin/bookings' },
      { key: 'contacts', url: '/api/admin/contacts' },
      { key: 'members', url: '/api/admin/members' },
      { key: 'events', url: '/api/admin/events' },
    ];
    endpoints.forEach(async ({ key, url }) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setStats(prev => ({ ...prev, [key]: Array.isArray(data) ? data.length : 0 }));
      } catch { /* silent */ }
    });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-forest-dark">
      {/* Header */}
      <header className="border-b border-amber-club/20 bg-forest px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-amber-club text-2xl">☀</span>
          <div>
            <h1 className="font-cinzel text-parchment tracking-widest text-lg">Lithuanian Club</h1>
            <p className="font-fell italic text-parchment/40 text-xs">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="font-cinzelPlain text-xs text-parchment/40 hover:text-parchment tracking-widest uppercase transition-colors">
            View Site ↗
          </Link>
          <button onClick={handleLogout} className="font-cinzelPlain text-xs text-crimson-light hover:text-crimson tracking-widest uppercase transition-colors">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h2 className="font-cinzel text-amber-club text-2xl tracking-widest mb-1">Dashboard</h2>
          <p className="font-fell italic text-parchment/50">Manage all site content from here.</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Events', key: 'events' },
            { label: 'Bookings', key: 'bookings' },
            { label: 'Messages', key: 'contacts' },
            { label: 'Members', key: 'members' },
          ].map(s => (
            <div key={s.key} className="border border-amber-club/20 bg-forest p-4 text-center">
              <div className="font-cinzel text-amber-club text-3xl">{stats[s.key] ?? '—'}</div>
              <div className="font-cinzelPlain text-xs text-parchment/40 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="group border border-amber-club/20 hover:border-amber-club/60 bg-forest p-6 transition-all duration-200 hover:bg-forest-light"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-cinzel text-parchment tracking-wide group-hover:text-amber-club transition-colors mb-1">
                {item.label}
              </h3>
              <p className="font-fell italic text-parchment/40 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
