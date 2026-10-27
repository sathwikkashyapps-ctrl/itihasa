import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PhotoItem {
  url: string;
  caption?: string | null;
  credit?: string | null;
  site?: {
    name: string;
    slug: string;
  } | null;
}

interface Props {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<Props> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !photos[currentIndex]) return null;

  const current = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-8 backdrop-blur-md select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-10">
        <div className="text-sm font-medium text-white/80">
          Archive Photo {currentIndex + 1} of {photos.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Close (ESC)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="relative flex-1 flex items-center justify-center py-4">
        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 md:left-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20"
              title="Previous photo (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 md:right-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all z-20"
              title="Next photo (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image */}
        <img
          src={current.url}
          alt={current.caption || 'Heritage Gallery Image'}
          className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl transition-transform"
        />
      </div>

      {/* Caption & Metadata Footer */}
      <div className="bg-black/80 border border-white/10 rounded-2xl p-4 max-w-2xl mx-auto w-full text-center text-white z-10">
        {current.caption && (
          <p className="font-serif text-base font-medium mb-1 text-white/95">{current.caption}</p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
          {current.credit && (
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-saffron" /> {current.credit}
            </span>
          )}

          {current.site && (
            <Link
              to={`/sites/${current.site.slug}`}
              className="text-saffron hover:underline flex items-center gap-1 font-semibold"
            >
              <span>{current.site.name}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
