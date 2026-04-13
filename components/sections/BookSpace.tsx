'use client';
import { useState } from 'react';

const SPACES = [
  {
    key: 'great_hall',
    name: 'The Great Hall',
    lt: 'Didžioji Salė',
    capacity: '200–300 guests',
    desc: 'Our grandest space — soaring ceilings, herringbone hardwood floors, and a stage. Perfect for weddings, galas, and large celebrations.',
    features: ['Full stage & sound system', 'Dance floor', 'Bridal suite', 'Catering kitchen access'],
  },
  {
    key: 'oak_room',
    name: 'The Oak Room',
    lt: 'Ąžuolų Kambarys',
    capacity: '40–80 guests',
    desc: 'An intimate paneled room with leaded glass windows and a working fireplace. Ideal for dinners, showers, and corporate gatherings.',
    features: ['Working fireplace', 'Leaded glass windows', 'Private bar', 'AV projector & screen'],
  },
  {
    key: 'bar_lounge',
    name: 'The Bar Lounge',
    lt: 'Baro Salė',
    capacity: '20–50 guests',
    desc: 'Reserve the entire bar and lounge area for cocktail receptions, rehearsal dinners, and casual gatherings with a full bar service.',
    features: ['Full bar service', 'High-top tables', 'Ambient lighting', 'Sound system'],
  },
  {
    key: 'full_venue',
    name: 'Full Venue',
    lt: 'Visa Vieta',
    capacity: '300+ guests',
    desc: 'Exclusive use of all spaces — the Great Hall, Oak Room, Bar Lounge, and grounds. The ultimate setting for milestone events.',
    features: ['All three spaces', 'Exclusive grounds access', 'Preferred vendor list', 'Dedicated coordinator'],
  },
];

export default function BookSpace() {
  const [selectedSpace, setSelectedSpace] = useState('great_hall');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', space: 'great_hall',
    event_date: '', guest_count: '', event_type: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, space: selectedSpace }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="book" className="py-24 px-6 bg-forest">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Salių Rezervacija
          </p>
          <h2 className="section-heading mb-4">Book a Space</h2>
          <p className="font-fell italic text-parchment/60 max-w-xl mx-auto">
            From intimate gatherings to grand celebrations — our spaces are available for weddings, 
            corporate events, reunions, and private parties.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Space selector */}
          <div>
            <h3 className="font-cinzelPlain text-amber-club tracking-widest uppercase text-xs mb-6">
              Choose Your Space
            </h3>
            <div className="space-y-4">
              {SPACES.map((space) => (
                <button
                  key={space.key}
                  onClick={() => setSelectedSpace(space.key)}
                  className={`w-full text-left p-5 border transition-all duration-200 ${
                    selectedSpace === space.key
                      ? 'border-amber-club bg-forest-dark'
                      : 'border-amber-club/20 hover:border-amber-club/50 bg-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="font-cinzel text-parchment tracking-wide">{space.name}</span>
                      <span className="font-fell italic text-amber-club/60 text-sm ml-2">— {space.lt}</span>
                    </div>
                    <span className="font-cinzelPlain text-xs text-amber-club/60 tracking-wider whitespace-nowrap ml-2">
                      {space.capacity}
                    </span>
                  </div>
                  <p className="font-fell text-parchment/55 text-sm">{space.desc}</p>
                  {selectedSpace === space.key && (
                    <ul className="mt-3 grid grid-cols-2 gap-1">
                      {space.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 font-fell italic text-xs text-parchment/50">
                          <span className="text-amber-club">·</span> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <h3 className="font-cinzelPlain text-amber-club tracking-widest uppercase text-xs mb-6">
              Inquiry Form
            </h3>
            {submitted ? (
              <div className="border border-amber-club/40 bg-forest-dark p-8 text-center">
                <div className="text-3xl mb-4">✉️</div>
                <h4 className="font-cinzel text-amber-club text-xl mb-2">Inquiry Received</h4>
                <p className="font-fell italic text-parchment/60">
                  Thank you, we'll be in touch within 48 hours to discuss your event.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Full Name</label>
                    <input className="input-field" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-text">Phone</label>
                    <input className="input-field" type="tel" required value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="label-text">Email</label>
                  <input className="input-field" type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Event Date</label>
                    <input className="input-field" type="date" required value={form.event_date}
                      onChange={e => setForm({ ...form, event_date: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-text">Guest Count</label>
                    <input className="input-field" type="number" min="1" required value={form.guest_count}
                      onChange={e => setForm({ ...form, guest_count: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="label-text">Event Type</label>
                  <input className="input-field" placeholder="Wedding, birthday, corporate..." required
                    value={form.event_type}
                    onChange={e => setForm({ ...form, event_type: e.target.value })} />
                </div>
                <div>
                  <label className="label-text">Additional Notes</label>
                  <textarea className="input-field" rows={4} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                {error && <p className="font-fell italic text-crimson-light text-sm">{error}</p>}
                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
