'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ArchiveItem } from '@/types';

const DECADES = ['All', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s'];

// Static fallback items for when DB is empty
const FALLBACK_ITEMS: Partial<ArchiveItem>[] = [
  {
    id: '1',
    title: 'Club Founding Charter',
    description: 'The original 1912 charter establishing the Lithuanian Club of Cleveland, signed by 43 founding members.',
    year: 1912,
    decade: '1910s',
    category: 'documents',
  },
  {
    id: '2',
    title: 'First Midsummer Festival',
    description: 'Photographs from the inaugural Joninės celebration held in the Club\'s courtyard, attended by over 200 community members.',
    year: 1924,
    decade: '1920s',
    category: 'photos',
  },
  {
    id: '3',
    title: 'The Great Hall Construction',
    description: 'Documentation of the 1936 expansion that added the Great Hall — a project funded entirely by community contributions.',
    year: 1936,
    decade: '1930s',
    category: 'history',
  },
  {
    id: '4',
    title: 'Post-War Refugee Welcome',
    description: 'Records and photographs from the 1948–1952 campaign that welcomed Lithuanian displaced persons to Cleveland.',
    year: 1950,
    decade: '1950s',
    category: 'history',
  },
  {
    id: '5',
    title: 'Folk Dance Ensemble — 1967',
    description: 'The Club\'s folk dance troupe at the national Lithuanian festival in Chicago. The ensemble performed for 12 consecutive years.',
    year: 1967,
    decade: '1960s',
    category: 'photos',
  },
  {
    id: '6',
    title: 'Handwoven Juosta Collection',
    description: 'A collection of traditional woven sashes donated by the Stankus family, dating from the 1880s–1920s.',
    year: 1920,
    decade: '1920s',
    category: 'artifacts',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  history: 'text-amber-club bg-amber-club/10',
  documents: 'text-blue-300 bg-blue-900/20',
  photos: 'text-green-300 bg-green-900/20',
  artifacts: 'text-purple-300 bg-purple-900/20',
};

export default function Archive() {
  const [items, setItems] = useState<Partial<ArchiveItem>[]>(FALLBACK_ITEMS);
  const [activeDecade, setActiveDecade] = useState('All');

  useEffect(() => {
    async function fetchArchive() {
      const { data } = await supabase
        .from('archive_items')
        .select('*')
        .eq('is_published', true)
        .order('year', { ascending: true });
      if (data && data.length > 0) setItems(data);
    }
    fetchArchive();
  }, []);

  const filtered = activeDecade === 'All'
    ? items
    : items.filter((i) => i.decade === activeDecade);

  return (
    <section id="archive" className="py-24 px-6 bg-forest">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Archyvas
          </p>
          <h2 className="section-heading mb-4">The Archive</h2>
          <p className="font-fell italic text-parchment/60 max-w-xl mx-auto">
            Over a century of Lithuanian-American life in Cleveland — preserved in photographs, 
            documents, and the memories of those who came before.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        {/* Decade filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {DECADES.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDecade(d)}
              className={`font-cinzelPlain text-xs tracking-widest uppercase px-4 py-1.5 border transition-all ${
                activeDecade === d
                  ? 'bg-crimson border-crimson-light text-parchment'
                  : 'border-amber-club/30 text-parchment/50 hover:border-amber-club hover:text-parchment'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border border-amber-club/20 hover:border-amber-club/50 bg-forest-dark p-6 transition-all duration-300 group"
            >
              {item.image_url && (
                <div className="w-full h-40 bg-forest mb-4 overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              {!item.image_url && (
                <div className="w-full h-32 bg-forest/50 mb-4 flex items-center justify-center border border-amber-club/10">
                  <span className="text-amber-club/20 text-4xl font-cinzel">{item.year}</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className={`font-cinzelPlain text-xs tracking-wider uppercase px-2 py-0.5 rounded ${CATEGORY_COLORS[item.category || 'history']}`}>
                  {item.category}
                </span>
                <span className="font-cinzelPlain text-parchment/30 text-xs">{item.year || item.decade}</span>
              </div>
              <h3 className="font-cinzel text-parchment tracking-wide text-sm mb-2 group-hover:text-amber-club transition-colors">
                {item.title}
              </h3>
              <p className="font-fell italic text-parchment/50 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-fell italic text-parchment/40 text-sm">
            Have photographs, documents, or artifacts to donate?
          </p>
          <a href="#contact" className="btn-secondary mt-4 inline-block">
            Contact the Archive Committee
          </a>
        </div>
      </div>
    </section>
  );
}
