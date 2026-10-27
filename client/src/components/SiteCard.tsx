import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Eye, ArrowUpRight } from 'lucide-react';
import { Site } from '../types';
import { useBookmarks } from '../context/BookmarksContext';
import { ConservationBadge } from './ConservationBadge';

interface Props {
  site: Site;
  layout?: 'grid' | 'list';
}

export const SiteCard: React.FC<Props> = ({ site, layout = 'grid' }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(site.slug);

  if (layout === 'list') {
    return (
      <div className="skeuo-card rounded-2xl p-4 flex flex-col md:flex-row gap-5 items-center group">
        {/* Recessed Mounted Photo with Brass Corner Mounts */}
        <div className="w-full md:w-64 h-52 rounded-xl overflow-hidden relative flex-shrink-0 p-1.5 bg-[#EAE0D0] dark:bg-[#151827] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] border border-[#C5B49D] dark:border-[#2A3048]">
          <div className="relative w-full h-full rounded-lg overflow-hidden skeuo-photo-mount">
            {/* 4 Brass Photo Corner Tabs */}
            <div className="skeuo-corner-tl" />
            <div className="skeuo-corner-tr" />
            <div className="skeuo-corner-bl" />
            <div className="skeuo-corner-br" />

            <img
              src={site.coverImage}
              alt={site.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <div className="absolute top-2.5 left-2.5">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#241710] text-[#E5C384] border border-[#8C6D23] shadow-md">
                {site.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-1 w-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ConservationBadge status={site.conservationStatus} size="sm" />
                <span className="text-xs text-ink/60 dark:text-night-muted font-medium bg-[#ECE3D2] dark:bg-[#1D2134] px-2 py-0.5 rounded border border-[#D5C6B1] dark:border-[#2C334E] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                  Built: {site.yearBuilt}
                </span>
              </div>
              <button
                onClick={e => {
                  e.preventDefault();
                  toggleBookmark(site);
                }}
                className={`p-2 rounded-xl transition-all ${
                  bookmarked
                    ? 'skeuo-btn-terracotta text-white'
                    : 'skeuo-btn-paper text-ink/70 dark:text-night-text hover:text-terracotta'
                }`}
                title={bookmarked ? 'Remove bookmark' : 'Bookmark site'}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link to={`/sites/${site.slug}`}>
              <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress group-hover:text-terracotta transition-colors mb-1.5">
                {site.name}
              </h3>
            </Link>

            <p className="text-sm text-ink/70 dark:text-night-muted line-clamp-2 leading-relaxed mb-3">
              {site.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#DCCEC0] dark:border-[#272D45] text-xs text-ink/60 dark:text-night-muted">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-terracotta" /> {site.district}, {site.state}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {site.views} views
              </span>
            </div>

            <Link
              to={`/sites/${site.slug}`}
              className="skeuo-btn-terracotta px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <span>Explore Sanctuary</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout: Archetypal Archival Mounted Photo Plate
  return (
    <div className="skeuo-card rounded-2xl overflow-hidden flex flex-col group">
      {/* Decorative Top Rivets */}
      <div className="px-3 pt-2.5 pb-1 flex justify-between items-center opacity-70">
        <div className="skeuo-rivet" />
        <span className="text-[10px] tracking-widest uppercase font-mono text-[#8C7A65] dark:text-[#7A83A2]">ARCHIVAL FOLIO #{site.yearBuilt}</span>
        <div className="skeuo-rivet" />
      </div>

      {/* Recessed Photographic Plate Frame with Brass Photo Corners */}
      <div className="px-3 pt-1">
        <div className="relative h-56 rounded-xl overflow-hidden p-1.5 bg-[#E8DDD0] dark:bg-[#131623] shadow-[inset_0_2px_5px_rgba(0,0,0,0.35)] border border-[#C5B49D] dark:border-[#282E44]">
          <div className="relative w-full h-full rounded-lg overflow-hidden skeuo-photo-mount">
            {/* 4 Brass Photo Corner Mounts */}
            <div className="skeuo-corner-tl" />
            <div className="skeuo-corner-tr" />
            <div className="skeuo-corner-bl" />
            <div className="skeuo-corner-br" />

            <img
              src={site.coverImage}
              alt={site.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

            {/* Embossed Leather Category Tag */}
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#2D1B12] text-[#E8C88A] border border-[#8C6D23] shadow-md">
                {site.category}
              </span>
            </div>

            {/* Tactile Bookmark Button */}
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(site);
              }}
              className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all shadow-md ${
                bookmarked
                  ? 'skeuo-wax-seal text-white'
                  : 'skeuo-btn-paper text-ink/80 dark:text-night-text hover:text-terracotta'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Save to bookmarks'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Bottom Photo Overlay Badges */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
              <span className="flex items-center gap-1 font-semibold bg-black/60 px-2 py-0.5 rounded border border-white/20 shadow-xs backdrop-blur-xs">
                <MapPin className="w-3 h-3 text-saffron" /> {site.district}
              </span>
              <span className="font-semibold bg-black/60 px-2 py-0.5 rounded border border-white/20 shadow-xs backdrop-blur-xs">
                {site.era} Era
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Parchment Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <ConservationBadge status={site.conservationStatus} size="sm" />
            <span className="text-[11px] font-semibold text-ink/60 dark:text-night-muted bg-[#EDE3D0] dark:bg-[#1D2133] px-2 py-0.5 rounded border border-[#D5C6AF] dark:border-[#2C334E] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]">
              {site.yearBuilt}
            </span>
          </div>

          <Link to={`/sites/${site.slug}`}>
            <h3 className="font-serif text-lg font-bold text-ink dark:text-night-text skeuo-letterpress group-hover:text-terracotta transition-colors line-clamp-1 mb-2">
              {site.name}
            </h3>
          </Link>

          <p className="text-xs text-ink/75 dark:text-night-muted line-clamp-3 leading-relaxed">
            {site.shortDescription}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-[#DFD1C1] dark:border-[#292F47] flex items-center justify-between text-xs">
          <span className="text-ink/60 dark:text-night-muted flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-terracotta" /> {site.views} views
          </span>
          <Link
            to={`/sites/${site.slug}`}
            className="skeuo-btn-terracotta px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <span>Explore Sanctuary</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
