'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import type { Event } from '@/types';

const EMPTY: Partial<Event> = {
  title: '', description: '', event_date: '', event_time: '18:00',
  location: 'Lithuanian Club', price: undefined, capacity: undefined, is_published: true,
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Partial<Event>>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    const res = await fetch('/api/admin/events');
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing } : form;
    await fetch('/api/admin/events', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await fetchEvents();
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
    setSaving(false);
  };

  const handleEdit = (event: Event) => {
    setForm(event);
    setEditing(event.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
    await fetchEvents();
  };

  const handleTogglePublish = async (event: Event) => {
    await fetch('/api/admin/events', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: event.id, is_published: !event.is_published }),
    });
    await fetchEvents();
  };

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cinzel text-amber-club text-2xl tracking-widest">Events</h2>
            <p className="font-fell italic text-parchment/40 text-sm mt-1">{events.length} total</p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm); }} className="btn-primary">
            {showForm ? 'Cancel' : '+ Add Event'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="admin-card mb-8">
            <h3 className="font-cinzel text-amber-club tracking-widest mb-6">
              {editing ? 'Edit Event' : 'New Event'}
            </h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label-text">Title</label>
                <input className="input-field" required value={form.title || ''}
                  onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Date</label>
                <input className="input-field" type="date" required value={form.event_date || ''}
                  onChange={e => setForm({ ...form, event_date: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Time</label>
                <input className="input-field" type="time" required value={form.event_time || ''}
                  onChange={e => setForm({ ...form, event_time: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Location</label>
                <input className="input-field" value={form.location || ''}
                  onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Price (leave blank if free)</label>
                <input className="input-field" type="number" step="0.01" min="0"
                  value={form.price ?? ''}
                  onChange={e => setForm({ ...form, price: e.target.value ? parseFloat(e.target.value) : undefined })} />
              </div>
              <div>
                <label className="label-text">Capacity (optional)</label>
                <input className="input-field" type="number" min="1"
                  value={form.capacity ?? ''}
                  onChange={e => setForm({ ...form, capacity: e.target.value ? parseInt(e.target.value) : undefined })} />
              </div>
              <div>
                <label className="label-text">Image URL (optional)</label>
                <input className="input-field" type="url" value={form.image_url || ''}
                  onChange={e => setForm({ ...form, image_url: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="label-text">Description</label>
                <textarea className="input-field" rows={3} value={form.description || ''}
                  onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="published" checked={form.is_published ?? true}
                  onChange={e => setForm({ ...form, is_published: e.target.checked })}
                  className="accent-crimson" />
                <label htmlFor="published" className="font-cinzelPlain text-xs text-parchment/60 tracking-wider uppercase">
                  Published (visible on site)
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? 'Saving...' : editing ? 'Update Event' : 'Create Event'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY); }} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">Loading...</div>
        ) : events.length === 0 ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">No events yet. Add one above.</div>
        ) : (
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="admin-card flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-cinzel text-parchment tracking-wide">{event.title}</h4>
                    <span className={`font-cinzelPlain text-xs px-2 py-0.5 rounded tracking-wider ${
                      event.is_published ? 'bg-green-900/40 text-green-300' : 'bg-gray-800 text-parchment/30'
                    }`}>
                      {event.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="font-cinzelPlain text-amber-club/60 text-xs tracking-wider">
                    {event.event_date} · {event.event_time} · {event.location}
                    {event.price !== undefined && event.price !== null && ` · $${event.price}`}
                  </p>
                  {event.description && (
                    <p className="font-fell italic text-parchment/40 text-sm mt-1 line-clamp-2">{event.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleTogglePublish(event)}
                    className="font-cinzelPlain text-xs text-parchment/40 hover:text-amber-club tracking-wider uppercase transition-colors px-2 py-1 border border-transparent hover:border-amber-club/30">
                    {event.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => handleEdit(event)}
                    className="font-cinzelPlain text-xs text-amber-club hover:text-amber-light tracking-wider uppercase transition-colors px-2 py-1 border border-amber-club/30 hover:border-amber-club">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)}
                    className="font-cinzelPlain text-xs text-crimson-light hover:text-crimson tracking-wider uppercase transition-colors px-2 py-1 border border-crimson/20 hover:border-crimson">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
