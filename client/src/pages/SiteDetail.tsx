import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Ticket,
  Calendar,
  Bookmark,
  Share2,
  ArrowLeft,
  Compass,
  ExternalLink,
  Shield,
  Eye,
  Camera,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { Site, Event } from '../types';
import { useBookmarks } from '../context/BookmarksContext';
import { ConservationBadge } from '../components/ConservationBadge';
import { MapView } from '../components/MapView';
import { Lightbox } from '../components/Lightbox';
import { SiteCard } from '../components/SiteCard';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const SiteDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [site, setSite] = useState<Site | null>(null);
  const [relatedSites, setRelatedSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    const fetchSiteDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/sites/${slug}`);
        if (!res.ok) {
          throw new Error('Heritage site not found');
        }
        const data = await res.json();
        setSite(data.site);
        setRelatedSites(data.relatedSites || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load site details');
      } finally {
        setLoading(false);
      }
    };

    fetchSiteDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 skeuo-wax-seal animate-pulse flex items-center justify-center text-white text-base">
          इ
        </div>
        <p className="font-serif italic text-ink/75 dark:text-night-muted">Unrolling manuscript folio for {slug}...</p>
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto skeuo-wax-seal flex items-center justify-center text-white">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-ink dark:text-night-text skeuo-letterpress">
          Monolith Not Located
        </h2>
        <p className="text-sm text-ink/65 dark:text-night-muted">
          The heritage sanctuary requested is not cataloged in our registry.
        </p>
        <Link
          to="/sites"
          className="skeuo-btn-terracotta inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Monuments Registry
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(site.slug);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${site.name} — Itihasa Heritage`,
        text: site.shortDescription,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Compile all images (cover + site images) for lightbox
  const galleryImages = [
    { url: site.coverImage, caption: `${site.name} (Primary Monument View)`, credit: 'Heritage Archive' },
    ...(site.images || []).map(img => ({
      url: img.url,
      caption: img.caption,
      credit: img.credit
    }))
  ];

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.latitude},${site.longitude}`;

  return (
    <article className="pb-20 space-y-12">
      {/* 1. CINEMATIC HERO COVER WITH ARCHIVAL MOUNT */}
      <section className="relative h-[65vh] min-h-[460px] w-full overflow-hidden bg-indigo-deep text-parchment">
        <img
          src={site.coverImage}
          alt={site.name}
          className="w-full h-full object-cover filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-black/35" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <Link
              to="/sites"
              className="skeuo-btn-paper inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-terracotta" /> Back to Monuments
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(site)}
                className={`p-2.5 rounded-full transition-all shadow-lg ${
                  bookmarked ? 'skeuo-wax-seal text-white' : 'skeuo-btn-paper'
                }`}
                title={bookmarked ? 'Remove bookmark' : 'Save to bookmarks'}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : 'text-stone-700 dark:text-stone-300'}`} />
              </button>
              <button
                onClick={handleShare}
                className="skeuo-btn-paper p-2.5 rounded-full shadow-lg"
                title="Share heritage sanctuary"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-stone-700 dark:text-stone-300" />}
              </button>
            </div>
          </div>

          {/* Hero Meta & Title */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-md bg-stone-900/80 text-amber-200 border border-brass/50 font-bold uppercase tracking-wider shadow-sm">
                {site.category}
              </span>
              <ConservationBadge status={site.conservationStatus} size="md" />
              {site.isProtected && (
                <span className="px-3 py-1 rounded-md bg-stone-900/80 text-white font-semibold flex items-center gap-1.5 border border-white/20 shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-saffron" /> UNESCO / ASI Protected Sanctuary
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight skeuo-letterpress drop-shadow-xl">
              {site.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-200 font-medium">
              <span className="flex items-center gap-1 font-semibold text-amber-300">
                <MapPin className="w-4 h-4" /> {site.district}, {site.state}
              </span>
              <span>•</span>
              <span>Built: {site.yearBuilt} ({site.era} Era)</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {site.views} visitors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN DETAIL GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Historical Narratives & Gallery (2 cols) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Summary Callout (Parchment Folio Note) */}
          <div className="skeuo-card p-6 rounded-2xl border-l-4 border-l-terracotta relative overflow-hidden">
            <div className="absolute top-2 right-2 skeuo-rivet" />
            <p className="font-serif italic text-base sm:text-lg text-ink dark:text-night-text leading-relaxed skeuo-letterpress">
              "{site.shortDescription}"
            </p>
          </div>

          {/* Photo Gallery with Lightbox Launch */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text flex items-center gap-2 skeuo-letterpress">
                <Camera className="w-5 h-5 text-terracotta" /> Architectural Photographic Folio
              </h3>
              <span className="text-xs text-ink/60 dark:text-night-muted font-medium">
                {galleryImages.length} plates • Click to enlarge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="group relative h-48 rounded-xl overflow-hidden cursor-pointer shadow-md border-2 border-stone-300 dark:border-stone-700 skeuo-photo-mount"
                >
                  <span className="skeuo-corner-tl" />
                  <span className="skeuo-corner-tr" />
                  <span className="skeuo-corner-bl" />
                  <span className="skeuo-corner-br" />
                  <img
                    src={img.url}
                    alt={img.caption || site.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="skeuo-btn-brass text-xs px-3 py-1 rounded-md font-bold">
                      Inspect Plate
                    </span>
                  </div>
                  {img.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-2 text-[11px] text-white/95 truncate font-medium">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed History Narrative */}
          <div className="skeuo-card p-6 sm:p-8 rounded-2xl space-y-4 relative">
            <div className="absolute top-2 left-2 skeuo-rivet" />
            <div className="absolute top-2 right-2 skeuo-rivet" />
            <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text flex items-center gap-2 skeuo-letterpress">
              <Sparkles className="w-5 h-5 text-terracotta" /> Historical Chronology & Imperial Patronage
            </h3>
            <p className="text-sm sm:text-base text-ink/80 dark:text-night-text leading-relaxed whitespace-pre-line font-normal">
              {site.history}
            </p>
          </div>

          {/* Architecture & Engineering Ingenuity */}
          <div className="skeuo-card p-6 sm:p-8 rounded-2xl space-y-4 relative">
            <div className="absolute top-2 left-2 skeuo-rivet" />
            <div className="absolute top-2 right-2 skeuo-rivet" />
            <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text flex items-center gap-2 skeuo-letterpress">
              <Layers className="w-5 h-5 text-saffron" /> Architectural Grammar & Stonecraft
            </h3>
            <p className="text-sm sm:text-base text-ink/80 dark:text-night-text leading-relaxed whitespace-pre-line font-normal">
              {site.architecture}
            </p>
          </div>

          {/* Cultural Significance & Living Lore */}
          <div className="skeuo-card p-6 sm:p-8 rounded-2xl space-y-4 relative">
            <div className="absolute top-2 left-2 skeuo-rivet" />
            <div className="absolute top-2 right-2 skeuo-rivet" />
            <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text flex items-center gap-2 skeuo-letterpress">
              <Shield className="w-5 h-5 text-olive" /> Cultural Heritage & Ecological Significance
            </h3>
            <p className="text-sm sm:text-base text-ink/80 dark:text-night-text leading-relaxed whitespace-pre-line font-normal">
              {site.significance}
            </p>
          </div>

          {/* Associated Events & Festivals */}
          {site.events && site.events.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text flex items-center gap-2 skeuo-letterpress">
                <Calendar className="w-5 h-5 text-saffron" /> Living Festivals Celebrated Here
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {site.events.map(ev => (
                  <Link
                    key={ev.id}
                    to={`/events/${ev.slug}`}
                    className="skeuo-card p-4 rounded-xl flex items-center gap-3 group"
                  >
                    <img src={ev.coverImage} alt={ev.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-saffron">{ev.type}</span>
                      <h4 className="font-serif text-sm font-bold text-ink dark:text-night-text group-hover:text-terracotta line-clamp-1 skeuo-letterpress">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-ink/55 dark:text-night-muted">
                        {new Date(ev.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visitor Logistics Plaque & Mini-Map (1 col) */}
        <div className="space-y-6">
          {/* Visitor Guide Card: Engraved Brass Plaque */}
          <div className="skeuo-plaque p-6 rounded-2xl relative shadow-xl space-y-5">
            {/* Corner Rivets */}
            <div className="absolute top-2.5 left-2.5 skeuo-rivet" />
            <div className="absolute top-2.5 right-2.5 skeuo-rivet" />
            <div className="absolute bottom-2.5 left-2.5 skeuo-rivet" />
            <div className="absolute bottom-2.5 right-2.5 skeuo-rivet" />

            <h3 className="font-serif text-xl font-bold pb-3 border-b border-amber-900/20 dark:border-amber-500/20 skeuo-letterpress">
              Visitor Registry & Protocol
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block skeuo-letterpress">Visiting Hours</span>
                  <span className="opacity-80">{site.visitingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ticket className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block skeuo-letterpress">Admission & Entry</span>
                  <span className="opacity-80">{site.entryFee}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-emerald-800 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block skeuo-letterpress">Recommended Season</span>
                  <span className="opacity-80">{site.bestSeason}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-indigo-900 dark:text-indigo-300 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block skeuo-letterpress">Conservation Index</span>
                  <ConservationBadge status={site.conservationStatus} size="sm" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="skeuo-btn-terracotta w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <Compass className="w-4 h-4" /> Get Travel Directions
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Mini-Map of Sanctuary (Brass Framed) */}
          <div className="skeuo-wood-panel p-4 rounded-2xl relative shadow-xl space-y-3">
            <div className="absolute top-2 left-2 skeuo-rivet" />
            <div className="absolute top-2 right-2 skeuo-rivet" />

            <div className="flex items-center justify-between text-xs font-bold text-white pt-1">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-saffron" /> Spatial Coordinates
              </span>
              <span className="font-mono text-amber-200">{site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}</span>
            </div>
            <div className="p-1 rounded-xl bg-gradient-to-b from-brass-light via-brass to-brass-dark shadow-md">
              <MapView sites={[site]} selectedSite={site} height="260px" zoom={11} interactive={false} />
            </div>
          </div>

          {/* Cultural Stewardship Callout (Archival Decree) */}
          <div className="skeuo-card p-5 rounded-2xl border-2 border-dashed border-terracotta/40 space-y-3 relative">
            <h4 className="font-serif text-base font-bold text-ink dark:text-night-text flex items-center gap-2 skeuo-letterpress">
              <div className="w-5 h-5 skeuo-wax-seal flex items-center justify-center text-white text-[9px]">
                इ
              </div>
              Sacred Etiquette & Code
            </h4>
            <p className="text-xs text-ink/75 dark:text-night-muted leading-relaxed font-normal">
              Respect the sanctity of sacred shrines. Avoid defacing stone surfaces, adhere to photography regulations in inner sanctums, and support hereditary craft communities in adjacent villages.
            </p>
          </div>
        </div>
      </div>

      {/* 3. RELATED SITES CAROUSEL */}
      {relatedSites.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-10 border-t border-stone-300 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text skeuo-letterpress">
              Related Monuments in {site.category} & {site.era} Era
            </h3>
            <Link to="/sites" className="skeuo-btn-paper px-3 py-1.5 rounded-lg text-xs font-bold text-terracotta">
              View All Sites
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedSites.map(s => (
              <SiteCard key={s.id} site={s} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        photos={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
        onNext={() => setLightboxIndex(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
      />
    </article>
  );
};