'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Event } from '@/types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('event_date', today)
        .order('event_date', { ascending: true })
        .limit(6);
      if (data) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return {
      month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: d.getDate(),
      full: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
  };

  return (
    <section id="events" className="py-24 px-6 bg-forest-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-cinzelPlain text-amber-club tracking-[0.4em] uppercase text-xs mb-3">
            Renginiai
          </p>
          <h2 className="section-heading mb-4">Upcoming Events</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-amber-club/40" />
            <div className="w-2 h-2 rotate-45 bg-amber-club" />
            <div className="h-px w-20 bg-amber-club/40" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 font-fell italic text-parchment/40">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-fell italic text-parchment/40 text-lg">No upcoming events scheduled.</p>
            <p className="font-fell text-parchment/30 text-sm mt-2">Check back soon or contact us for private bookings.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => {
              const date = formatDate(event.event_date);
              return (
                <div
                  key={event.id}
                  className="flex gap-6 border border-amber-club/20 hover:border-amber-club/50 bg-forest/40 hover:bg-forest p-6 transition-all duration-300 group"
                >
                  {/* Date block */}
                  <div className="flex-shrink-0 w-16 text-center border-r border-amber-club/20 pr-6">
                    <div className="font-cinzelPlain text-amber-club text-xs tracking-widest uppercase">
                      {date.month}
                    </div>
                    <div className="font-cinzel text-parchment text-4xl leading-none my-1">
                      {date.day}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-cinzel text-parchment tracking-wide text-lg mb-1 group-hover:text-amber-club transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-cinzelPlain text-amber-club/60 text-xs tracking-wider mb-2">
                      {date.full} · {event.event_time} · {event.location}
                    </p>
                    {event.description && (
                      <p className="font-fell italic text-parchment/60 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      {event.price !== undefined && event.price !== null && (
                        <span className="font-cinzelPlain text-xs text-amber-club tracking-wider">
                          {event.price === 0 ? 'Free' : `$${event.price.toFixed(2)}`}
                        </span>
                      )}
                      {event.capacity && (
                        <span className="font-fell italic text-parchment/40 text-xs">
                          Capacity: {event.capacity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <a href="#contact" className="btn-secondary">
            Inquire About Private Events
          </a>
        </div>
      </div>
    </section>
  );
}
