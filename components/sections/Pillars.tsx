const pillars = [
  {
    icon: '🍽️',
    title: 'Dining & Cuisine',
    subtitle: 'Tradicinis Maistas',
    body: 'Old-world Lithuanian recipes — cepelinai, kugelis, šaltibarščiai — prepared with care and served in a dining room steeped in history.',
    href: '#dining',
  },
  {
    icon: '🎭',
    title: 'Events & Culture',
    subtitle: 'Renginiai',
    body: 'Folk dances, song festivals, heritage celebrations, and community gatherings that keep Lithuanian traditions alive in Cleveland.',
    href: '#events',
  },
  {
    icon: '🏛️',
    title: 'Event Spaces',
    subtitle: 'Salės',
    body: 'The Great Hall, the Oak Room, and the Bar Lounge — elegant spaces for weddings, celebrations, and private gatherings of all sizes.',
    href: '#book',
  },
  {
    icon: '📜',
    title: 'The Archive',
    subtitle: 'Archyvas',
    body: 'A living record of Lithuanian-American history in Cleveland — photographs, documents, and artifacts spanning over a century.',
    href: '#archive',
  },
];

export default function Pillars() {
  return (
    <section className="py-24 px-6 bg-forest-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            What We Offer
          </p>
          <h2 className="section-heading mb-4">Four Pillars</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group block border border-amber-club/20 hover:border-amber-club/60 bg-forest/40 hover:bg-forest p-8 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <p className="font-fell italic text-amber-club/60 text-sm mb-1">{p.subtitle}</p>
              <h3 className="font-cinzel text-parchment tracking-wider text-lg mb-3 group-hover:text-amber-club transition-colors">
                {p.title}
              </h3>
              <p className="font-fell text-parchment/60 text-sm leading-relaxed">{p.body}</p>
              <div className="mt-6 flex items-center gap-2 text-amber-club/40 group-hover:text-amber-club transition-colors">
                <div className="h-px w-6 bg-current" />
                <span className="font-cinzelPlain text-xs tracking-widest uppercase">Explore</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
