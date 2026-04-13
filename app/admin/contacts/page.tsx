'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import type { ContactMessage } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  unread: 'bg-blue-900/40 text-blue-300',
  read: 'bg-gray-800 text-parchment/50',
  replied: 'bg-green-900/40 text-green-300',
};

export default function AdminContacts() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchMessages = async () => {
    const res = await fetch('/api/admin/contacts');
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleStatus = async (id: string, status: string) => {
    await fetch('/api/admin/contacts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await fetchMessages();
  };

  const handleExpand = async (msg: ContactMessage) => {
    setExpanded(expanded === msg.id ? null : msg.id);
    if (msg.status === 'unread') {
      await handleStatus(msg.id, 'read');
    }
  };

  const filtered = filter === 'all' ? messages : messages.filter(m => m.status === filter);
  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cinzel text-amber-club text-2xl tracking-widest">
              Messages
              {unreadCount > 0 && (
                <span className="ml-3 font-cinzelPlain text-sm bg-crimson text-parchment px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h2>
            <p className="font-fell italic text-parchment/40 text-sm mt-1">{messages.length} total</p>
          </div>
          <div className="flex gap-2">
            {['all', 'unread', 'read', 'replied'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`font-cinzelPlain text-xs tracking-widest uppercase px-3 py-1.5 border transition-all ${
                  filter === s ? 'bg-crimson border-crimson text-parchment' : 'border-amber-club/30 text-parchment/50 hover:border-amber-club'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">No messages found.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map(msg => (
              <div key={msg.id} className={`admin-card cursor-pointer transition-all ${msg.status === 'unread' ? 'border-amber-club/40' : ''}`}>
                <div className="flex items-start justify-between gap-4" onClick={() => handleExpand(msg)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`font-cinzel tracking-wide ${msg.status === 'unread' ? 'text-parchment' : 'text-parchment/60'}`}>
                        {msg.name}
                      </h4>
                      <span className={`font-cinzelPlain text-xs px-2 py-0.5 rounded tracking-wider ${STATUS_COLORS[msg.status]}`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="font-cinzelPlain text-amber-club/60 text-xs tracking-wider">{msg.subject}</p>
                    <p className="font-fell italic text-parchment/40 text-xs mt-1">
                      {msg.email} · {new Date(msg.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-parchment/30 text-xs">{expanded === msg.id ? '▲' : '▼'}</span>
                </div>

                {expanded === msg.id && (
                  <div className="mt-4 pt-4 border-t border-amber-club/10">
                    <p className="font-fell text-parchment/70 leading-relaxed mb-4">{msg.message}</p>
                    <div className="flex gap-3">
                      <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                        onClick={() => handleStatus(msg.id, 'replied')}
                        className="btn-primary text-xs py-2">
                        Reply via Email
                      </a>
                      {msg.status !== 'replied' && (
                        <button onClick={() => handleStatus(msg.id, 'replied')}
                          className="btn-secondary text-xs py-2">
                          Mark Replied
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
