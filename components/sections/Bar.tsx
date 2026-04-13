const COCKTAILS = [
  { name: 'Žalgiris Mule', desc: 'House vodka, ginger beer, lime, fresh mint', price: '$12' },
  { name: 'Amber Rye', desc: 'Rye whiskey, honey, lemon, smoked bitters', price: '$13' },
  { name: 'The Partisan', desc: 'Gin, elderflower, cucumber, tonic water', price: '$12' },
  { name: 'Trakai Negroni', desc: 'Rye gin, red vermouth, Campari, orange peel', price: '$14' },
  { name: 'Klaipėda Sour', desc: 'Bourbon, blackberry shrub, lemon, egg white', price: '$13' },
  { name: 'Midus Fizz', desc: 'Traditional mead, prosecco, lavender bitters', price: '$11' },
];

const BEERS = [
  { name: 'Svyturys Ekstra', origin: 'Lithuania', type: 'Lager', price: '$7' },
  { name: 'Utenos Alus', origin: 'Lithuania', type: 'Pilsner', price: '$7' },
  { name: 'Great Lakes Dortmunder', origin: 'Cleveland', type: 'Lager', price: '$6' },
  { name: 'Club House Amber', origin: 'House Brew', type: 'Amber Ale', price: '$7' },
];

export default function Bar() {
  return (
    <section id="bar" className="py-24 px-6 bg-forest-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Baras
          </p>
          <h2 className="section-heading mb-4">The Bar</h2>
          <p className="font-fell italic text-parchment/60 max-w-xl mx-auto">
            From Lithuanian mead and imported Baltic beers to house cocktails crafted with old-world spirits — 
            our bar is a gathering place in its own right.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Cocktails */}
          <div>
            <h3 className="font-cinzel text-amber-club tracking-widest text-xl mb-6 text-center">
              House Cocktails
            </h3>
            <div className="space-y-5">
              {COCKTAILS.map((c) => (
                <div key={c.name} className="flex gap-4 border-b border-amber-club/10 pb-5">
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="font-cinzelPlain text-parchment tracking-wide">{c.name}</h4>
                      <span className="font-cinzelPlain text-amber-club text-sm">{c.price}</span>
                    </div>
                    <p className="font-fell italic text-parchment/50 text-sm">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beers + hours */}
          <div>
            <h3 className="font-cinzel text-amber-club tracking-widest text-xl mb-6 text-center">
              Beers on Tap
            </h3>
            <div className="space-y-4 mb-12">
              {BEERS.map((b) => (
                <div key={b.name} className="flex items-center justify-between border-b border-amber-club/10 pb-4">
                  <div>
                    <span className="font-cinzelPlain text-parchment tracking-wide text-sm">{b.name}</span>
                    <div className="font-fell italic text-parchment/40 text-xs">
                      {b.origin} · {b.type}
                    </div>
                  </div>
                  <span className="font-cinzelPlain text-amber-club text-sm">{b.price}</span>
                </div>
              ))}
            </div>

            {/* Bar hours */}
            <div className="border border-amber-club/20 p-6">
              <h4 className="font-cinzel text-amber-club tracking-wider mb-4 text-center">Bar Hours</h4>
              <div className="space-y-2 font-fell text-parchment/60 text-sm">
                <div className="flex justify-between">
                  <span>Tuesday – Thursday</span>
                  <span>4pm – Midnight</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday – Saturday</span>
                  <span>4pm – 2am</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>2pm – 10pm</span>
                </div>
                <div className="flex justify-between text-parchment/30">
                  <span>Monday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="font-fell italic text-parchment/30 text-xs mt-4 text-center">
                Kitchen closes at 9:30pm nightly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
