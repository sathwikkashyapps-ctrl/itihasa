import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Download, ArrowRight, Grid, List, Sparkles } from 'lucide-react';
import { Event } from '../types';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (selectedType !== 'all') query.set('type', selectedType);
        const res = await fetch(`/api/events?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedType]);

  const types = ['all', 'festival', 'ritual', 'fair', 'performance', 'exhibition'];

  const filteredEvents = selectedMonth === 'all'
    ? events
    : events.filter(e => new Date(e.startDate).getMonth() === parseInt(selectedMonth, 10));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/15 text-saffron-dark text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intangible Heritage & Cultural Seasons</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text">
          Living Festivals & Sacred Rites
        </h1>
        <p className="text-sm text-ink/70 dark:text-night-muted">
          Ancient celebrations, starlit classical dance festivals, harvest rituals, and sacred melas celebrated across monuments and riverbanks.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-night-card rounded-2xl p-5 border border-parchment-border dark:border-night-border shadow-warm flex flex-wrap gap-4 items-center justify-between">
        {/* Type Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                selectedType === t
                  ? 'bg-saffron text-indigo-deep shadow-xs'
                  : 'bg-stone-50 dark:bg-night-bg text-ink/70 dark:text-night-text border border-parchment-border dark:border-night-border hover:border-saffron'
              }`}
            >
              {t === 'all' ? 'All Traditions' : t}
            </button>
          ))}
        </div>

        {/* View Mode & Month Selector */}
        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 dark:bg-night-bg border border-parchment-border dark:border-night-border rounded-xl text-xs font-medium text-ink dark:text-night-text focus:outline-none"
          >
            <option value="all">All Months</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="3">April</option>
            <option value="7">August</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>

          <div className="flex items-center bg-stone-100 dark:bg-night-bg p-1 rounded-xl border border-parchment-border dark:border-night-border">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'calendar' ? 'bg-white dark:bg-night-card text-saffron shadow-xs' : 'text-ink/60 dark:text-night-muted'
              }`}
              title="Calendar Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white dark:bg-night-card text-saffron shadow-xs' : 'text-ink/60 dark:text-night-muted'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Events Presentation */}
      {loading ? (
        <div className="text-center py-20 text-xs text-ink/60 dark:text-night-muted">Opening festival calendars...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-night-card rounded-2xl border border-parchment-border dark:border-night-border">
          <p className="font-serif text-lg font-bold">No cultural events found for this filter.</p>
        </div>
      ) : (
        <div className={`grid ${viewMode === 'calendar' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {filteredEvents.map(event => {
            const start = new Date(event.startDate);
            const end = new Date(event.endDate);

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-night-card rounded-2xl border border-parchment-border dark:border-night-border overflow-hidden hover:shadow-warm-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-saffron text-indigo-deep shadow-xs font-medium">
                        {event.type}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <a
                        href={`/api/events/${event.slug}/ics`}
                        download
                        className="px-2.5 py-1.5 bg-black/70 hover:bg-black/90 text-white rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-xs transition-colors"
                        title="Download .ics for Google Calendar or Apple iCal"
                      >
                        <Download className="w-3.5 h-3.5 text-saffron" /> .ics
                      </a>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-terracotta">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – {end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <Link to={`/events/${event.slug}`}>
                      <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text group-hover:text-terracotta transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-ink/70 dark:text-night-muted line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>

                    {event.site && (
                      <div className="pt-2 text-xs text-ink/60 dark:text-night-muted flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-terracotta" />
                        <Link to={`/sites/${event.site.slug}`} className="hover:underline font-medium text-terracotta">
                          {event.site.name} ({event.site.district})
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/events/${event.slug}`}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-night-bg dark:hover:bg-night-cardHover text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 text-ink dark:text-night-text transition-colors"
                  >
                    <span>View Traditions & Venue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
