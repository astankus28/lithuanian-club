'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '⌂' },
  { href: '/admin/events', label: 'Events', icon: '🎭' },
  { href: '/admin/menu', label: 'Menu', icon: '🍽️' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { href: '/admin/contacts', label: 'Messages', icon: '✉️' },
  { href: '/admin/members', label: 'Members', icon: '🌿' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-52 bg-forest border-r border-amber-club/20 flex flex-col shrink-0">
        <div className="p-5 border-b border-amber-club/20">
          <span className="text-amber-club text-xl">☀</span>
          <div className="font-cinzel text-parchment text-xs tracking-widest mt-1">Lithuanian Club</div>
          <div className="font-fell italic text-parchment/30 text-xs">Admin</div>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition-all ${
                  active
                    ? 'bg-crimson/30 text-parchment border-r-2 border-crimson'
                    : 'text-parchment/50 hover:text-parchment hover:bg-forest-light'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-cinzelPlain tracking-wider text-xs uppercase">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-5 border-t border-amber-club/20 space-y-2">
          <Link href="/" target="_blank" className="block font-cinzelPlain text-xs text-parchment/30 hover:text-parchment tracking-widest uppercase transition-colors">
            View Site ↗
          </Link>
          <button onClick={handleLogout} className="block font-cinzelPlain text-xs text-crimson-light hover:text-crimson tracking-widest uppercase transition-colors w-full text-left">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-forest-dark">
        {children}
      </main>
    </div>
  );
}
