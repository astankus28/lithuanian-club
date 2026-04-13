'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    };
    hero.addEventListener('mousemove', onMouseMove);
    return () => hero.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #2d4a2d 0%, #1a2e1a 40%, #0d1a0d 100%)',
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,26,13,0.8) 100%)',
        }}
      />

      {/* Saulutė — large background */}
      <div className="absolute opacity-5 select-none pointer-events-none">
        <SauluteSvg size={700} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-club" />
          <SauluteSvg size={28} className="text-amber-club" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-club" />
        </div>

        <p className="font-cinzelPlain tracking-[0.4em] text-amber-club uppercase text-sm mb-4">
          Est. 1912 · Cleveland, Ohio
        </p>

        <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-parchment leading-tight mb-6">
          Lithuanian<br />
          <span className="text-amber-club">Club</span>
        </h1>

        <p className="font-fell italic text-parchment/70 text-xl md:text-2xl mb-4">
          Čia yra namai — Here, there is home
        </p>

        <p className="font-fell text-parchment/60 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          A cultural hearth for the Lithuanian community of Cleveland — 
          where old-world traditions meet warm fellowship, fine dining, 
          and over a century of shared history.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#dining" className="btn-primary">
            Explore Dining
          </a>
          <a href="#events" className="btn-secondary">
            Upcoming Events
          </a>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-club/40" />
          <div className="w-2 h-2 rotate-45 bg-amber-club/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-club/40" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-amber-club/60 to-transparent" />
      </div>
    </section>
  );
}

function SauluteSvg({ size = 60, className = 'text-parchment' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 30 30)`}>
          <rect x="28.5" y="8" width="3" height="10" rx="1.5" />
          <polygon points="30,4 27,10 33,10" />
        </g>
      ))}
      <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
