'use client';
import { useState } from 'react';

const TIERS = [
  {
    key: 'student',
    name: 'Student',
    lt: 'Studentas',
    price: '$30/yr',
    features: [
      'Club newsletter & announcements',
      'Discounted event tickets',
      'Library & archive access',
      'Voting rights at annual meeting',
    ],
  },
  {
    key: 'individual',
    name: 'Individual',
    lt: 'Narys',
    price: '$75/yr',
    features: [
      'All Student benefits',
      '10% dining discount',
      'Priority event registration',
      'Use of meeting rooms',
      'Annual heritage dinner invitation',
    ],
    featured: true,
  },
  {
    key: 'senior',
    name: 'Senior',
    lt: 'Pagyvenęs Narys',
    price: '$45/yr',
    features: [
      'All Individual benefits',
      '15% dining discount',
      'Free admission to select events',
    ],
  },
  {
    key: 'family',
    name: 'Family',
    lt: 'Šeimos Narystė',
    price: '$120/yr',
    features: [
      'Up to 6 family members',
      'All Individual benefits',
      '15% dining discount',
      'Annual family portrait session',
      'Priority venue booking',
    ],
  },
];

export default function Membership() {
  const [form, setForm] = useState({ name: '', email: '', membership_type: 'individual' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="membership" className="py-24 px-6 bg-forest">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Narystė
          </p>
          <h2 className="section-heading mb-4">Membership</h2>
          <p className="font-fell italic text-parchment/60 max-w-xl mx-auto">
            Join the Lithuanian Club of Cleveland and become part of a community rooted in heritage, 
            fellowship, and shared culture spanning generations.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TIERS.map((tier) => (
            <div
              key={tier.key}
              className={`border p-6 flex flex-col ${
                tier.featured
                  ? 'border-amber-club bg-forest-dark shadow-lg shadow-amber-club/10'
                  : 'border-amber-club/20 bg-forest-dark/50'
              }`}
            >
              {tier.featured && (
                <div className="font-cinzelPlain text-xs text-crimson tracking-widest uppercase mb-3">
                  Most Popular
                </div>
              )}
              <p className="font-fell italic text-amber-club/60 text-sm">{tier.lt}</p>
              <h3 className="font-cinzel text-parchment text-xl tracking-wide my-1">{tier.name}</h3>
              <p className="font-cinzel text-amber-club text-2xl mb-4">{tier.price}</p>
              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-fell text-parchment/60 text-sm">
                    <span className="text-amber-club mt-0.5">·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setForm({ ...form, membership_type: tier.key })}
                className={`mt-6 font-cinzelPlain text-xs tracking-widest uppercase px-4 py-2 border transition-all ${
                  form.membership_type === tier.key
                    ? 'bg-crimson border-crimson text-parchment'
                    : 'border-amber-club/40 text-parchment/60 hover:border-amber-club hover:text-parchment'
                }`}
              >
                {form.membership_type === tier.key ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>

        {/* Join form */}
        <div className="max-w-lg mx-auto">
          <h3 className="font-cinzel text-amber-club text-center tracking-widest text-lg mb-6">
            Apply for Membership
          </h3>
          {submitted ? (
            <div className="border border-amber-club/40 bg-forest-dark p-8 text-center">
              <div className="text-3xl mb-4">🌿</div>
              <h4 className="font-cinzel text-amber-club text-xl mb-2">Sveiki! Welcome!</h4>
              <p className="font-fell italic text-parchment/60">
                Your membership application has been received. We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-text">Full Name</label>
                <input className="input-field" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Email Address</label>
                <input className="input-field" type="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Membership Type</label>
                <select className="input-field" value={form.membership_type}
                  onChange={e => setForm({ ...form, membership_type: e.target.value })}>
                  {TIERS.map((t) => (
                    <option key={t.key} value={t.key}>{t.name} — {t.price}</option>
                  ))}
                </select>
              </div>
              {error && <p className="font-fell italic text-crimson-light text-sm">{error}</p>}
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? 'Submitting...' : 'Apply Now'}
              </button>
              <p className="font-fell italic text-parchment/30 text-xs text-center">
                Payment information will be requested upon approval. 
                Lithuanian heritage not required — all are welcome.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
