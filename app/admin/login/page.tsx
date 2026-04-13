'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, action: 'login' }),
      });
      if (!res.ok) {
        setError('Invalid password. Please try again.');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="text-amber-club text-5xl mb-4">☀</div>
          <h1 className="font-cinzel text-parchment text-2xl tracking-widest mb-1">Lithuanian Club</h1>
          <p className="font-fell italic text-parchment/40 text-sm">Admin Dashboard</p>
        </div>
        <div className="border border-amber-club/20 bg-forest p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-text">Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>
            {error && <p className="font-fell italic text-crimson-light text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Authenticating...' : 'Enter'}
            </button>
          </form>
        </div>
        <p className="text-center mt-6">
          <a href="/" className="font-cinzelPlain text-xs text-parchment/30 hover:text-parchment/60 tracking-widest uppercase transition-colors">
            ← Return to Site
          </a>
        </p>
      </div>
    </div>
  );
}
