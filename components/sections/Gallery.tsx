'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { GalleryImage } from '@/types';

const CATEGORIES = ['all', 'events', 'dining', 'spaces', 'archive', 'general'];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });
      if (data) setImages(data);
      setLoading(false);
    }
    fetchGallery();
  }, []);

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((i) => i.category === activeCategory);

  return (
    <section id="gallery" className="py-24 px-6 bg-forest-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Galerija
          </p>
          <h2 className="section-heading mb-4">Gallery</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-cinzelPlain text-xs tracking-widest uppercase px-5 py-2 border transition-all ${
                activeCategory === cat
                  ? 'bg-crimson border-crimson-light text-parchment'
                  : 'border-amber-club/30 text-parchment/50 hover:border-amber-club hover:text-parchment'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 font-fell italic text-parchment/40">Loading gallery...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 font-fell italic text-parchment/40">
            No images in this category yet.
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden border border-amber-club/10 hover:border-amber-club/50 transition-all"
                onClick={() => setLightbox(image)}
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/60 transition-all flex items-end p-3">
                  <p className="font-cinzelPlain text-xs text-parchment tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    {image.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-forest-dark/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.image_url}
              alt={lightbox.title}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="font-cinzel text-amber-club tracking-wide">{lightbox.title}</h3>
              {lightbox.description && (
                <p className="font-fell italic text-parchment/60 text-sm mt-1">{lightbox.description}</p>
              )}
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-parchment/60 hover:text-parchment font-cinzelPlain text-xs tracking-widest uppercase"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
