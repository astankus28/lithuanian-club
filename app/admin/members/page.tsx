'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import type { Member } from '@/types';

const TYPE_COLORS: Record<string, string> = {
  individual: 'bg-blue-900/40 text-blue-300',
  family: 'bg-purple-900/40 text-purple-300',
  senior: 'bg-amber-900/40 text-amber-300',
  student: 'bg-green-900/40 text-green-300',
};

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchMembers = async () => {
    const res = await fetch('/api/admin/members');
    const data = await res.json();
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleToggleActive = async (member: Member) => {
    await fetch('/api/admin/members', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: member.id, is_active: !member.is_active }),
    });
    await fetchMembers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this member?')) return;
    await fetch(`/api/admin/members?id=${id}`, { method: 'DELETE' });
    await fetchMembers();
  };

  const filtered = members
    .filter(m => filter === 'all' || m.membership_type === filter)
    .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));

  const activeCount = members.filter(m => m.is_active).length;

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cinzel text-amber-club text-2xl tracking-widest">Members</h2>
            <p className="font-fell italic text-parchment/40 text-sm mt-1">
              {members.length} total · {activeCount} active
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            className="input-field max-w-xs"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {['all', 'individual', 'family', 'senior', 'student'].map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`font-cinzelPlain text-xs tracking-widest uppercase px-3 py-1.5 border transition-all ${
                  filter === t ? 'bg-crimson border-crimson text-parchment' : 'border-amber-club/30 text-parchment/50 hover:border-amber-club'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">No members found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-club/20">
                  {['Name', 'Email', 'Type', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="font-cinzelPlain text-amber-club/60 text-xs tracking-widest uppercase text-left py-3 px-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.id} className="border-b border-amber-club/10 hover:bg-forest/40 transition-colors">
                    <td className="py-3 px-3">
                      <span className={`font-fell text-sm ${m.is_active ? 'text-parchment' : 'text-parchment/40'}`}>{m.name}</span>
                    </td>
                    <td className="py-3 px-3">
                      <a href={`mailto:${m.email}`} className="font-fell text-parchment/60 text-sm hover:text-amber-club">{m.email}</a>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-cinzelPlain text-xs px-2 py-0.5 rounded tracking-wider ${TYPE_COLORS[m.membership_type]}`}>
                        {m.membership_type}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-fell text-parchment/40 text-sm">{m.joined_date}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-cinzelPlain text-xs px-2 py-0.5 rounded tracking-wider ${
                        m.is_active ? 'bg-green-900/40 text-green-300' : 'bg-gray-800 text-parchment/30'
                      }`}>
                        {m.is_active ? 'Active' : 'Lapsed'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleToggleActive(m)}
                          className="font-cinzelPlain text-xs text-parchment/40 hover:text-amber-club tracking-wider uppercase transition-colors">
                          {m.is_active ? 'Lapse' : 'Activate'}
                        </button>
                        <button onClick={() => handleDelete(m.id)}
                          className="font-cinzelPlain text-xs text-crimson-light hover:text-crimson tracking-wider uppercase transition-colors">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
