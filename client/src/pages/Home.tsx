import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Compass,
  ArrowRight,
  Sparkles,
  Calendar,
  BookOpen,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Eye,
  Award
} from 'lucide-react';
import { Site, Event, Story, StatsData } from '../types';
import { SiteCard } from '../components/SiteCard';
import { MapView } from '../components/MapView';
import { OrnamentalDivider } from '../components/OrnamentalDivider';
import { SkeletonCard } from '../components/SkeletonCard';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sites, setSites] = useState<Site[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [spotlightStory, setSpotlightStory] = useState<Story | null>(null);
  const [stats, setStats] = useState<StatsData['counters']>({
    sites: 12,
    events: 8,
    stories: 6,
    contributors: 54,
    totalViews: 14500,
    pendingSubmissions: 3
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesRes, eventsRes, storiesRes, statsRes] = await Promise.all([
          fetch('/api/sites?limit=6&sort=views&order=desc'),
          fetch('/api/events?upcomingOnly=true'),
          fetch('/api/stories'),
          fetch('/api/stats')
        ]);

        if (sitesRes.ok) {
          const d = await sitesRes.json();
          setSites(d.data || []);
        }
        if (eventsRes.ok) {
          const e = await eventsRes.json();
          setEvents(e.slice(0, 4) || []);
        }
        if (storiesRes.ok) {
          const s = await storiesRes.json();
          if (s.length > 0) setSpotlightStory(s[0]);
        }
        if (statsRes.ok) {
          const st = await statsRes.json();
          if (st.counters) setStats(st.counters);
        }
      } catch (err) {
        console.error('Home page data load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/sites?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. CINEMATIC HERO SECTION WITH VINTAGE PARCHMENT & BRASS DETAILS */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-indigo-deep text-parchment">
        {/* Layered Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
            alt="Amer Fort Amber Rajasthan"
            className="w-full h-full object-cover scale-105 filter brightness-75 contrast-115"
          />
          {/* Subtle Warm Gradients Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/50 to-black/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/60 backdrop-blur-md border border-brass/40 text-xs tracking-widest uppercase font-bold text-amber-200 shadow-md">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span>Digital Heritage Preservation & Cultural Information Portal</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-[1.15] skeuo-letterpress">
            Preserving the Living Soul <br />
            <span className="italic font-normal skeuo-gold-foil">of Our Civilization</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-parchment/90 font-light leading-relaxed drop-shadow-md">
            Journey through fortified citadels, sacred stone monoliths, seasonal festivals, and timeless oral histories.
            Built to archive living cultural memory for future generations.
          </p>

          {/* Recessed Carved Search Bar */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto relative group">
            <div className="relative flex items-center skeuo-recessed rounded-2xl p-2 border border-brass-dark/40 shadow-2xl">
              {/* Corner decorative rivets */}
              <div className="absolute -top-1 -left-1 skeuo-rivet" />
              <div className="absolute -top-1 -right-1 skeuo-rivet" />
              <div className="absolute -bottom-1 -left-1 skeuo-rivet" />
              <div className="absolute -bottom-1 -right-1 skeuo-rivet" />

              <Search className="w-5 h-5 text-terracotta ml-3 mr-2 flex-shrink-0 drop-shadow-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search forts, temples, festivals, dynasties (e.g. Amer, Hampi, Konark)..."
                className="w-full bg-transparent border-none outline-none text-ink dark:text-night-text text-sm sm:text-base placeholder-ink/50 dark:placeholder-night-muted pr-2 font-medium"
              />
              <button
                type="submit"
                className="skeuo-btn-terracotta px-6 py-3 rounded-xl flex items-center gap-2 flex-shrink-0 text-sm font-bold tracking-wide"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Action Badges (Tactile Paper Chips) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-parchment/90 pt-2">
            <span className="text-brass-light uppercase tracking-wider font-bold">Popular Archives:</span>
            {['Amer Fort', 'Virupaksha Hampi', 'Konark Sun Temple', 'Khajuraho', 'Oral Histories'].map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  navigate(`/sites?search=${encodeURIComponent(tag)}`);
                }}
                className="skeuo-btn-paper px-3 py-1 rounded-lg text-ink font-serif text-xs transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS COUNTERS STRIP: ENGRAVED BRASS & WOOD ARCHIVAL PLAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
        <div className="skeuo-wood-panel rounded-2xl p-4 sm:p-6 shadow-2xl relative">
          {/* Corner Brass Rivets */}
          <div className="absolute top-2 left-2 skeuo-rivet" />
          <div className="absolute top-2 right-2 skeuo-rivet" />
          <div className="absolute bottom-2 left-2 skeuo-rivet" />
          <div className="absolute bottom-2 right-2 skeuo-rivet" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {/* Sites Stat Plaque */}
            <div className="skeuo-plaque rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-terracotta skeuo-letterpress">
                {stats.sites}+
              </div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-amber-950 dark:text-amber-200 mt-1">
                {t('stats.sites')}
              </div>
            </div>

            {/* Events Stat Plaque */}
            <div className="skeuo-plaque rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-600 skeuo-letterpress">
                {stats.events}
              </div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-amber-950 dark:text-amber-200 mt-1">
                {t('stats.events')}
              </div>
            </div>

            {/* Stories Stat Plaque */}
            <div className="skeuo-plaque rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-800 dark:text-emerald-400 skeuo-letterpress">
                {stats.stories}
              </div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-amber-950 dark:text-amber-200 mt-1">
                {t('stats.stories')}
              </div>
            </div>

            {/* Contributors Stat Plaque */}
            <div className="skeuo-plaque rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-indigo-deep dark:text-indigo-light skeuo-letterpress">
                {stats.contributors}+
              </div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-amber-950 dark:text-amber-200 mt-1">
                {t('stats.contributors')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED HERITAGE SITES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-terracotta mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              Curated Archival Marvels
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink dark:text-night-text skeuo-letterpress">
              Masterpieces of Human Ingenuity
            </h2>
            <p className="text-sm text-ink/70 dark:text-night-muted mt-1 max-w-xl">
              From subterranean stepped sanctuaries to colossal astronomical chariot spires, explore our documented monuments.
            </p>
          </div>
          <Link
            to="/sites"
            className="skeuo-btn-paper px-4 py-2 rounded-xl text-xs font-bold text-terracotta flex items-center gap-1.5 shadow-sm"
          >
            <span>View All 12 Sites</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map(site => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        )}
      </section>

      <OrnamentalDivider />

      {/* 4. "HAPPENING SOON" CULTURAL EVENTS STRIP (ARCHIVAL TICKETS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-saffron mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              Living Traditions & Rites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink dark:text-night-text skeuo-letterpress">
              Festivals, Rites & Celebrations
            </h2>
            <p className="text-sm text-ink/70 dark:text-night-muted mt-1 max-w-xl">
              Witness classical dance on illuminated temple courtyards, sacred chariot processions, and centuries-old artisan melas.
            </p>
          </div>
          <Link
            to="/events"
            className="skeuo-btn-brass px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
          >
            <span>Calendar View</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map(event => (
            <div
              key={event.id}
              className="skeuo-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo with photo matte and top-left/top-right corners */}
                <div className="relative h-44 overflow-hidden skeuo-photo-mount">
                  <span className="skeuo-corner-tl" />
                  <span className="skeuo-corner-tr" />
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-stone-900/80 text-amber-300 border border-brass/50 shadow-sm">
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-terracotta font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <Link to={`/events/${event.slug}`}>
                    <h4 className="font-serif text-base font-bold text-ink dark:text-night-text group-hover:text-terracotta transition-colors line-clamp-1 skeuo-letterpress">
                      {event.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-ink/70 dark:text-night-muted line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Perforated ticket separator & button */}
              <div className="p-4 pt-3 border-t-2 border-dashed border-stone-300 dark:border-stone-700">
                <Link
                  to={`/events/${event.slug}`}
                  className="skeuo-btn-paper w-full py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1"
                >
                  <span>Pass & Traditions</span>
                  <ChevronRight className="w-3.5 h-3.5 text-terracotta" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE MINI-MAP SPOTLIGHT (ANTIQUE BRASS DRAFTING DESK) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="skeuo-wood-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden space-y-6">
          {/* Corner Brass Rivets */}
          <div className="absolute top-3 left-3 skeuo-rivet" />
          <div className="absolute top-3 right-3 skeuo-rivet" />
          <div className="absolute bottom-3 left-3 skeuo-rivet" />
          <div className="absolute bottom-3 right-3 skeuo-rivet" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-saffron" />
                Cartographic Archives of India
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white skeuo-letterpress">
                Cultural Cartography & Spatial Survey
              </h3>
              <p className="text-sm text-stone-300 mt-1">
                Explore coordinates, protected boundaries, and regional proximity across the subcontinent.
              </p>
            </div>
            <Link
              to="/map"
              className="skeuo-btn-brass px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 flex-shrink-0"
            >
              <Compass className="w-4 h-4" /> Fullscreen Map Experience
            </Link>
          </div>

          {/* Map surrounded by brass border casing */}
          <div className="p-1 rounded-2xl bg-gradient-to-b from-brass-light via-brass to-brass-dark shadow-2xl">
            <MapView sites={sites} height="420px" zoom={5} center={[22.5, 80.0]} />
          </div>
        </div>
      </section>

      {/* 6. "STORY OF THE MONTH" SPOTLIGHT (ILLUMINATED FOLIO / LEATHER-BOUND MANUSCRIPT) */}
      {spotlightStory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeuo-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative border-2 border-brass/40">
            {/* Hanging Bookmark Ribbon */}
            <div className="absolute top-0 right-10 w-6 h-12 skeuo-ribbon z-20 hidden lg:block" />

            <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6 relative">
              {/* Corner rivets */}
              <div className="absolute top-3 left-3 skeuo-rivet" />
              <div className="absolute bottom-3 left-3 skeuo-rivet" />

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-terracotta">
                  <div className="w-5 h-5 skeuo-wax-seal flex items-center justify-center text-white text-[9px]">
                    इ
                  </div>
                  <span>Story of the Month • Oral Lore Archive</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ink dark:text-night-text leading-tight skeuo-letterpress">
                  {spotlightStory.title}
                </h3>
                <p className="text-sm text-ink/80 dark:text-night-muted leading-relaxed font-normal line-clamp-4">
                  {spotlightStory.body}
                </p>
              </div>

              <div className="pt-4 border-t border-parchment-border dark:border-night-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-ink dark:text-night-text">{spotlightStory.authorName}</div>
                  <div className="text-[11px] text-ink/60 dark:text-night-muted">{spotlightStory.readTime}</div>
                </div>

                <Link
                  to={`/stories/${spotlightStory.slug}`}
                  className="skeuo-btn-terracotta px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <span>Listen & Read Narrative</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-full skeuo-photo-mount">
              <span className="skeuo-corner-tr" />
              <span className="skeuo-corner-br" />
              <img
                src={spotlightStory.coverImage}
                alt={spotlightStory.title}
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </section>
      )}

      {/* 7. CALL TO ACTION: COMMUNITY CONTRIBUTION (ARCHIVAL CHARTER) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="skeuo-card p-8 sm:p-12 rounded-3xl relative border-2 border-dashed border-terracotta/40">
          {/* Center Wax Seal Medallion */}
          <div className="w-16 h-16 mx-auto skeuo-wax-seal flex items-center justify-center text-white mb-4 shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink dark:text-night-text skeuo-letterpress">
            Guardians of Local Memory
          </h3>
          <p className="max-w-xl mx-auto text-sm text-ink/75 dark:text-night-muted leading-relaxed mt-2">
            Do you know of an undocumented stepwell, a dying folk art form, a local village fair, or elderly oral recordings?
            Help preserve our collective heritage by submitting it for archival review.
          </p>

          <div className="pt-6">
            <Link
              to="/contribute"
              className="skeuo-btn-terracotta inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <span>Contribute to the Heritage Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};