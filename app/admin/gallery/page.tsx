'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import type { GalleryImage } from '@/types';

const CATEGORIES = ['events', 'dining', 'spaces', 'archive', 'general'];
const EMPTY: Partial<GalleryImage> = { title: '', description: '', image_url: '', category: 'general', sort_order: 0, is_published: true };

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [form, setForm] = useState<Partial<GalleryImage>>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchImages = async () => {
    const res = await fetch('/api/admin/gallery');
    const data = await res.json();
    setImages(data);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing } : form;
    await fetch('/api/admin/gallery', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await fetchImages();
    setForm(EMPTY);
    setEditing(null);
    setShowForm(false);
    setSaving(false);
  };

  const handleEdit = (image: GalleryImage) => {
    setForm(image);
    setEditing(image.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
    await fetchImages();
  };

  const handleTogglePublish = async (image: GalleryImage) => {
    await fetch('/api/admin/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: image.id, is_published: !image.is_published }),
    });
    await fetchImages();
  };

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cinzel text-amber-club text-2xl tracking-widest">Gallery</h2>
            <p className="font-fell italic text-parchment/40 text-sm mt-1">{images.length} images</p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm); }} className="btn-primary">
            {showForm ? 'Cancel' : '+ Add Image'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="admin-card mb-8">
            <h3 className="font-cinzel text-amber-club tracking-widest mb-6">
              {editing ? 'Edit Image' : 'Add Image'}
            </h3>
            <p className="font-fell italic text-parchment/50 text-sm mb-4">
              Upload images to your Supabase storage bucket (<code className="text-amber-club">club-images</code>) 
              and paste the public URL here. Or use any external image URL.
            </p>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-text">Title</label>
                <input className="input-field" required value={form.title || ''}
                  onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Category</label>
                <select className="input-field" value={form.category || 'general'}
                  onChange={e => setForm({ ...form, category: e.target.value as GalleryImage['category'] })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label-text">Image URL</label>
                <input className="input-field" type="url" required value={form.image_url || ''}
                  onChange={e => setForm({ ...form, image_url: e.target.value })} />
              </div>
              {form.image_url && (
                <div className="md:col-span-2">
                  <img src={form.image_url} alt="Preview" className="w-full max-h-48 object-cover border border-amber-club/20" />
                </div>
              )}
              <div>
                <label className="label-text">Description (optional)</label>
                <input className="input-field" value={form.description || ''}
                  onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="label-text">Sort Order</label>
                <input className="input-field" type="number" value={form.sort_order ?? 0}
                  onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="pub" checked={form.is_published ?? true}
                  onChange={e => setForm({ ...form, is_published: e.target.checked })}
                  className="accent-crimson" />
                <label htmlFor="pub" className="font-cinzelPlain text-xs text-parchment/60 tracking-wider uppercase">
                  Published
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Add Image'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY); }} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Image grid */}
        {loading ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">Loading...</div>
        ) : images.length === 0 ? (
          <div className="font-fell italic text-parchment/40 py-12 text-center">No images yet. Add one above.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(img => (
              <div key={img.id} className={`border transition-all ${img.is_published ? 'border-amber-club/20' : 'border-parchment/10 opacity-50'}`}>
                <div className="aspect-square bg-forest overflow-hidden">
                  <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-cinzel text-parchment text-xs tracking-wide truncate mb-1">{img.title}</p>
                  <p className="font-cinzelPlain text-amber-club/40 text-xs uppercase tracking-wider mb-2">{img.category}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleTogglePublish(img)}
                      className="font-cinzelPlain text-xs text-parchment/40 hover:text-amber-club tracking-wider uppercase transition-colors">
                      {img.is_published ? 'Hide' : 'Show'}
                    </button>
                    <button onClick={() => handleEdit(img)}
                      className="font-cinzelPlain text-xs text-amber-club hover:text-amber-light tracking-wider uppercase transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(img.id)}
                      className="font-cinzelPlain text-xs text-crimson-light hover:text-crimson tracking-wider uppercase transition-colors">
                      Del
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
