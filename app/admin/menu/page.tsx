'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import type { MenuItem } from '@/types';

const CATEGORIES = ['appetizers', 'soups', 'mains', 'sides', 'desserts', 'drinks'];
const EMPTY: Partial<MenuItem> = { name: '', description: '', price: 0, category: 'mains', is_available: true };

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<Partial<MenuItem>>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    const res = await fetch('/api/admin/menu');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing } : form;
    await fetch('/api/admin/menu', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await fetchItems();
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
    setSaving(false);
  };

  const handleEdit = (item: MenuItem) => {
    setForm(item);
    setEditing(item.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this menu item?')) return;
    await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' });
    await fetchItems();
  };

  const handleToggleAvailable = async (item: MenuItem) => {
    await fetch('/api/admin/menu', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, is_available: !item.is_available }),
    });
    await fetchItems();
  };

  const filtered = activeCategory === 'all' ? items : items.filter(i => i.category === activeCategory);

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cinzel text-amber-club text-2xl tracking-widest">Menu Items</h2>
            <p className="font-fell italic text-parchment/40 text-sm mt-1">{items.length} total</p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm); }} className="btn-primary">
            {showForm ? 'Cancel' : '+ Add Item'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="admin-card mb-8">
            <h3 className="font-cinzel text-amber-club tracking-widest mb-6">
              {editing ? 'Edit Menu Item' : 'New Menu Item'}
            </h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-text">Name</label>
                <input className="input-field" required value={form.name || ''}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Price ($)</label>
                <input className="input-field" type="number" step="0.01" min="0" required
                  value={form.price ?? ''}
                  onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} />
              </div>
              <div>
                <label className="label-text">Category</label>
                <select className="input-field" value={form.category || 'mains'}
                  onChange={e => setForm({ ...form, category: e.target.value as MenuItem['category'] })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
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
                <input type="checkbox" id="available" checked={form.is_available ?? true}
                  onChange={e => setForm({ ...form, is_available: e.target.checked })}
                  className="accent-crimson" />
                <label htmlFor="available" className="font-cinzelPlain text-xs text-parchment/60 tracking-wider uppercase">
                  Available (visible on menu)
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? 'Saving...' : editing ? 'Update Item' : 'Add Item'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY); }} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`font-cinzelPlain text-xs tracking-widest uppercase px-4 py-1.5 border transition-all ${
                activeCategory === cat ? 'bg-crimson border-crimson text-parchment' : 'border-amber-club/30 text-parchment/50 hover:border-amber-club hover:text-parchment'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">Loading...</div>
        ) : (
          <div className="space-y-3">
            {filtered.map(item => (
              <div key={item.id} className="admin-card flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-cinzel text-parchment tracking-wide">{item.name}</h4>
                    <span className="font-cinzelPlain text-amber-club text-sm">${item.price.toFixed(2)}</span>
                    <span className={`font-cinzelPlain text-xs px-2 py-0.5 rounded tracking-wider ${
                      item.is_available ? 'bg-green-900/40 text-green-300' : 'bg-gray-800 text-parchment/30'
                    }`}>
                      {item.is_available ? 'Available' : 'Hidden'}
                    </span>
                  </div>
                  <span className="font-cinzelPlain text-amber-club/40 text-xs tracking-wider uppercase">{item.category}</span>
                  {item.description && (
                    <p className="font-fell italic text-parchment/40 text-sm mt-1 line-clamp-1">{item.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleToggleAvailable(item)}
                    className="font-cinzelPlain text-xs text-parchment/40 hover:text-amber-club tracking-wider uppercase transition-colors px-2 py-1 border border-transparent hover:border-amber-club/30">
                    {item.is_available ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleEdit(item)}
                    className="font-cinzelPlain text-xs text-amber-club hover:text-amber-light tracking-wider uppercase transition-colors px-2 py-1 border border-amber-club/30 hover:border-amber-club">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)}
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
