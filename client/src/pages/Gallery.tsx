import React, { useEffect, useState } from 'react';
import { Camera, ExternalLink, Image as ImageIcon, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Lightbox } from '../components/Lightbox';

interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string | null;
  credit?: string | null;
  site?: {
    id: string;
    name: string;
    slug: string;
    category: string;
    district: string;
    era: string;
  };
}

export const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const query = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
        const res = await fetch(`/api/gallery${query}`);
        if (res.ok) {
          const d = await res.json();
          setPhotos(d);
        }
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'fort', label: 'Forts & Bastions' },
    { id: 'temple', label: 'Temples & Mandapas' },
    { id: 'monument', label: 'Monuments & Stepwells' },
    { id: 'natural', label: 'Sacred Landscapes' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-widest">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Visual Preservation Archive</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text">
          Architectural Gallery Wall
        </h1>
        <p className="text-sm text-ink/70 dark:text-night-muted">
          High-resolution photography capturing stone friezes, ceiling frescoes, subterranean reservoirs, and royal gateways across India.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-terracotta text-white shadow-xs'
                : 'bg-white dark:bg-night-card text-ink/70 dark:text-night-text border border-parchment-border dark:border-night-border hover:border-terracotta'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry / Grid Photo Wall */}
      {loading ? (
        <div className="text-center py-20 text-xs text-ink/60">Opening photo archives...</div>
      ) : photos.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-night-card rounded-2xl border border-parchment-border dark:border-night-border">
          <p className="font-serif text-base font-semibold">No photographs cataloged in this filter.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-warm border border-parchment-border dark:border-night-border bg-white dark:bg-night-card transition-all duration-300 hover:shadow-warm-lg hover:-translate-y-1"
            >
              <img
                src={photo.url}
                alt={photo.caption || 'Heritage Monument'}
                loading="lazy"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white">
                    <Camera className="w-4 h-4 text-saffron" />
                  </span>
                </div>

                <div className="space-y-1.5">
                  {photo.caption && (
                    <p className="font-serif text-sm font-semibold line-clamp-2 leading-snug">
                      {photo.caption}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-white/80 pt-1 border-t border-white/20">
                    <span className="text-[11px] truncate">{photo.credit}</span>
                    {photo.site && (
                      <Link
                        to={`/sites/${photo.site.slug}`}
                        onClick={e => e.stopPropagation()}
                        className="text-saffron hover:underline flex items-center gap-1 font-semibold flex-shrink-0"
                      >
                        <span>{photo.site.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        photos={photos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex(prev => (prev > 0 ? prev - 1 : photos.length - 1))}
        onNext={() => setLightboxIndex(prev => (prev < photos.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
