'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { MenuItem } from '@/types';

const CATEGORIES = [
  { key: 'appetizers', label: 'Užkandžiai', en: 'Appetizers' },
  { key: 'soups', label: 'Sriubos', en: 'Soups' },
  { key: 'mains', label: 'Pagrindiniai', en: 'Mains' },
  { key: 'sides', label: 'Garnyrai', en: 'Sides' },
  { key: 'desserts', label: 'Desertai', en: 'Desserts' },
  { key: 'drinks', label: 'Gėrimai', en: 'Drinks' },
];

export default function Dining() {
  const [activeTab, setActiveTab] = useState('mains');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('name');
      if (data) setItems(data);
      setLoading(false);
    }
    fetchMenu();
  }, []);

  const filtered = items.filter((i) => i.category === activeTab);

  return (
    <section id="dining" className="py-24 px-6 bg-forest">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Tradicinis Maistas
          </p>
          <h2 className="section-heading mb-4">Our Menu</h2>
          <p className="font-fell italic text-parchment/60 max-w-xl mx-auto">
            Old-world Lithuanian recipes, prepared fresh each evening. 
            Ask your server about seasonal specials and the chef's recommendations.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`font-cinzelPlain text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-200 ${
                activeTab === cat.key
                  ? 'bg-crimson border-crimson-light text-parchment'
                  : 'bg-transparent border-amber-club/30 text-parchment/60 hover:border-amber-club hover:text-parchment'
              }`}
            >
              <span className="hidden sm:inline">{cat.label} / </span>{cat.en}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {loading ? (
          <div className="text-center py-16 font-fell italic text-parchment/40">
            Loading menu...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 font-fell italic text-parchment/40">
            No items in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border-b border-amber-club/10 pb-6"
              >
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-cinzel text-parchment text-base tracking-wide">{item.name}</h3>
                    <span className="font-cinzelPlain text-amber-club text-sm whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  {item.description && (
                    <p className="font-fell italic text-parchment/55 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="font-fell italic text-parchment/40 text-sm">
            Menu changes seasonally. Dietary accommodations available upon request.
          </p>
        </div>
      </div>
    </section>
  );
}
