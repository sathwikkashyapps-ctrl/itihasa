import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  ArrowLeft,
  Sparkles,
  Share2,
  Check,
  Compass
} from 'lucide-react';
import { Event } from '../types';

export const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${slug}`);
        if (res.ok) {
          const d = await res.json();
          setEvent(d);
        }
      } catch (err) {
        console.error('Failed to load event:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading || !event) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="font-serif italic text-ink/60">Opening festival chronicles...</p>
      </div>
    );
  }

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-parchment-border dark:border-night-border text-xs font-semibold hover:border-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All Cultural Events
        </Link>
        <button
          onClick={handleShare}
          className="p-2 rounded-full border border-parchment-border dark:border-night-border hover:border-terracotta transition-colors"
          title="Share event"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Header Card */}
      <div className="relative rounded-3xl overflow-hidden bg-indigo-deep text-parchment shadow-warm-lg">
        <div className="relative h-96 w-full">
          <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover filter brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-transparent to-black/20" />
        </div>

        <div className="p-6 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-saffron text-indigo-deep text-xs font-bold uppercase tracking-wider">
              {event.type}
            </span>
            <span className="text-xs text-parchment/70 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-saffron" />
              {start.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} – {end.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            {event.title}
          </h1>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap gap-4 items-center justify-between border-t border-indigo-light">
            <div className="flex items-center gap-2 text-sm text-parchment/80">
              <MapPin className="w-4 h-4 text-saffron" />
              <span>{event.site ? `${event.site.name}, ${event.site.district}` : event.location}</span>
            </div>

            <a
              href={`/api/events/${event.slug}/ics`}
              download
              className="px-5 py-2.5 bg-saffron hover:bg-saffron-light text-indigo-deep font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-colors"
            >
              <Download className="w-4 h-4" /> Add to Calendar (.ics)
            </a>
          </div>
        </div>
      </div>

      {/* Traditions & Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-night-card p-6 sm:p-8 rounded-2xl border border-parchment-border dark:border-night-border shadow-xs space-y-4">
            <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text">
              Festival Description & Heritage Context
            </h3>
            <p className="text-sm sm:text-base text-ink/80 dark:text-night-text leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div className="bg-white dark:bg-night-card p-6 sm:p-8 rounded-2xl border border-parchment-border dark:border-night-border shadow-xs space-y-4">
            <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron" /> Sacred Rituals & Cultural Traditions
            </h3>
            <p className="text-sm sm:text-base text-ink/80 dark:text-night-text leading-relaxed whitespace-pre-line">
              {event.traditions}
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {event.site && (
            <div className="bg-white dark:bg-night-card p-5 rounded-2xl border border-parchment-border dark:border-night-border shadow-xs space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">Sanctuary Venue</span>
              <img src={event.site.coverImage} alt={event.site.name} className="w-full h-32 rounded-xl object-cover" />
              <h4 className="font-serif text-base font-bold text-ink dark:text-night-text">{event.site.name}</h4>
              <p className="text-xs text-ink/60 dark:text-night-muted">{event.site.district}</p>
              <Link
                to={`/sites/${event.site.slug}`}
                className="w-full py-2 bg-terracotta text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
              >
                Explore Monument Guide
              </Link>
            </div>
          )}

          <div className="p-5 rounded-2xl bg-indigo-deep text-parchment text-xs space-y-2">
            <span className="font-semibold text-saffron block">Visitor Note:</span>
            <p className="text-parchment/80 leading-relaxed font-light">
              Festival dates may align with the traditional lunar panchanga calendar. Confirm specific pooja schedules locally upon arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
