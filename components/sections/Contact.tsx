'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-forest-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Kontaktai
          </p>
          <h2 className="section-heading mb-4">Contact Us</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-cinzel text-amber-club tracking-widest text-base mb-3">Visit Us</h3>
              <p className="font-fell text-parchment/70 leading-relaxed">
                851 Broadview Road<br />
                Cleveland, Ohio 44109
              </p>
            </div>
            <div>
              <h3 className="font-cinzel text-amber-club tracking-widest text-base mb-3">Hours</h3>
              <div className="font-fell text-parchment/70 space-y-1 text-sm">
                <div className="flex justify-between max-w-xs">
                  <span>Tuesday – Thursday</span><span>5pm – 11pm</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>Friday – Saturday</span><span>5pm – 1am</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>Sunday</span><span>2pm – 9pm</span>
                </div>
                <div className="flex justify-between max-w-xs text-parchment/30">
                  <span>Monday</span><span>Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-cinzel text-amber-club tracking-widest text-base mb-3">Get in Touch</h3>
              <div className="font-fell text-parchment/70 space-y-1 text-sm">
                <p>info@lithuanianclub.org</p>
                <p>(216) 555-0192</p>
              </div>
            </div>
            <div className="border border-amber-club/20 p-5">
              <p className="font-fell italic text-parchment/50 text-sm leading-relaxed">
                "Lietuva — tėvynė mūsų" — Lithuania, our homeland. 
                Whether you are Lithuanian by blood, by marriage, or by heart, 
                you are welcome here.
              </p>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="border border-amber-club/40 bg-forest p-8 text-center flex flex-col items-center justify-center">
              <div className="text-4xl mb-4">📬</div>
              <h4 className="font-cinzel text-amber-club text-xl mb-2">Message Sent</h4>
              <p className="font-fell italic text-parchment/60">
                Thank you for reaching out. We'll respond within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Name</label>
                  <input className="input-field" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="label-text">Email</label>
                  <input className="input-field" type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label-text">Subject</label>
                <input className="input-field" required value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Message</label>
                <textarea className="input-field" rows={6} required value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              {error && <p className="font-fell italic text-crimson-light text-sm">{error}</p>}
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
