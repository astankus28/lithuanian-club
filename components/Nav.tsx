'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Dining', href: '#dining' },
  { label: 'Events', href: '#events' },
  { label: 'Book a Space', href: '#book' },
  { label: 'The Bar', href: '#bar' },
  { label: 'Archive', href: '#archive' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-dark/95 backdrop-blur-md border-b border-amber-club/20 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <SauluteSvg className="w-9 h-9 text-amber-club group-hover:text-amber-light transition-colors" />
          <div>
            <div className="font-cinzel text-xs tracking-[0.3em] text-amber-club uppercase">Lithuanian Club</div>
            <div className="font-fell italic text-parchment/60 text-xs">Cleveland, Ohio</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-cinzelPlain text-xs tracking-widest uppercase text-parchment/70 hover:text-amber-club transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-parchment p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-amber-club transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-amber-club transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-amber-club transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-forest-dark/98 border-t border-amber-club/20 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-cinzelPlain text-sm tracking-widest uppercase text-parchment/80 hover:text-amber-club transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function SauluteSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="6" />
      {/* 8 rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 30 30)`}>
          <rect x="28.5" y="8" width="3" height="10" rx="1.5" />
          <polygon points="30,4 27,10 33,10" />
        </g>
      ))}
      {/* Outer ring */}
      <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
