import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid,
  List,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react';
import { Site } from '../types';
import { SiteCard } from '../components/SiteCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const Sites: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Filters state from URL or defaults
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const era = searchParams.get('era') || 'all';
  const conservationStatus = searchParams.get('conservationStatus') || 'all';
  const isProtected = searchParams.get('isProtected') || 'all';
  const sort = searchParams.get('sort') || 'name';
  const order = searchParams.get('order') || 'asc';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [pagination, setPagination] = useState({
    total: 12,
    page: 1,
    limit: 12,
    totalPages: 1
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fort', label: 'Forts & Palaces' },
    { value: 'temple', label: 'Sacred Temples' },
    { value: 'monument', label: 'Monuments & Stepwells' },
    { value: 'natural', label: 'Natural Landscapes' },
    { value: 'museum', label: 'Museums & Archives' }
  ];

  const eras = ['all', 'Ancient', 'Medieval', 'Colonial', 'Modern'];
  const statuses = ['all', 'Excellent', 'Good', 'Needs Attention', 'Endangered'];

  useEffect(() => {
    const fetchSites = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.set('search', search);
        if (category !== 'all') query.set('category', category);
        if (era !== 'all') query.set('era', era);
        if (conservationStatus !== 'all') query.set('conservationStatus', conservationStatus);
        if (isProtected !== 'all') query.set('isProtected', isProtected);
        query.set('sort', sort);
        query.set('order', order);
        query.set('page', String(page));
        query.set('limit', '9');

        const res = await fetch(`/api/sites?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setSites(data.data || []);
          if (data.pagination) setPagination(data.pagination);
        }
      } catch (err) {
        console.error('Failed to fetch sites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, [search, category, era, conservationStatus, isProtected, sort, order, page]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/10 dark:bg-stone-100/10 border border-brass/30 text-terracotta text-xs font-bold uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5 text-terracotta" />
          <span>Living Archives & Sacred Architecture</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text skeuo-letterpress">
          Heritage Monuments & Sites
        </h1>
        <p className="text-sm text-ink/75 dark:text-night-muted">
          Explore architectural wonders cataloged with detailed histories, preservation status, visiting hours, and geographical coordinates.
        </p>
      </div>

      {/* Skeuomorphic Filter and Control Console */}
      <div className="skeuo-card rounded-2xl p-5 border border-stone-300 dark:border-stone-700 shadow-xl space-y-5 relative">
        {/* Corner Rivets */}
        <div className="absolute top-2 left-2 skeuo-rivet" />
        <div className="absolute top-2 right-2 skeuo-rivet" />

        {/* Search & Layout Toggle Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <div className="relative skeuo-recessed rounded-xl flex items-center px-3 py-2 border border-brass-dark/30">
              <Search className="w-4 h-4 text-terracotta mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by monument name, architecture, or district..."
                value={search}
                onChange={e => updateParam('search', e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-ink dark:text-night-text placeholder-ink/40 dark:placeholder-night-muted font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            {/* Sort Dropdown */}
            <select
              value={`${sort}-${order}`}
              onChange={e => {
                const [s, o] = e.target.value.split('-');
                const next = new URLSearchParams(searchParams);
                next.set('sort', s);
                next.set('order', o);
                setSearchParams(next);
              }}
              className="skeuo-btn-paper px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="name-asc">Sort: Name (A–Z)</option>
              <option value="name-desc">Sort: Name (Z–A)</option>
              <option value="views-desc">Sort: Most Viewed</option>
              <option value="yearBuilt-asc">Sort: Oldest Built</option>
            </select>

            {/* Layout Toggles */}
            <div className="flex items-center skeuo-recessed p-1 rounded-xl border border-stone-300 dark:border-stone-700">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  layout === 'grid'
                    ? 'skeuo-btn-paper text-terracotta shadow-xs'
                    : 'text-ink/60 dark:text-night-muted hover:text-ink'
                }`}
                title="Grid layout"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  layout === 'list'
                    ? 'skeuo-btn-paper text-terracotta shadow-xs'
                    : 'text-ink/60 dark:text-night-muted hover:text-ink'
                }`}
                title="List layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Row (Tactile Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-night-muted mr-1 flex items-center gap-1 flex-shrink-0">
            <Layers className="w-3.5 h-3.5 text-terracotta" /> Classification:
          </span>
          {categories.map(cat => {
            const isActive = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => updateParam('category', cat.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'skeuo-btn-terracotta shadow-sm scale-102'
                    : 'skeuo-btn-paper hover:text-terracotta'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-parchment-border/80 dark:border-night-border text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-ink/70 dark:text-night-muted font-bold">Historical Era:</span>
            <select
              value={era}
              onChange={e => updateParam('era', e.target.value)}
              className="skeuo-btn-paper px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer"
            >
              <option value="all">All Eras</option>
              {eras.filter(e => e !== 'all').map(e => (
                <option key={e} value={e}>{e} Era</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-ink/70 dark:text-night-muted font-bold">Conservation:</span>
            <select
              value={conservationStatus}
              onChange={e => updateParam('conservationStatus', e.target.value)}
              className="skeuo-btn-paper px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer"
            >
              <option value="all">All Statuses</option>
              {statuses.filter(s => s !== 'all').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-ink/70 dark:text-night-muted font-bold">Protection:</span>
            <select
              value={isProtected}
              onChange={e => updateParam('isProtected', e.target.value)}
              className="skeuo-btn-paper px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer"
            >
              <option value="all">Any Status</option>
              <option value="true">Protected (UNESCO / ASI)</option>
              <option value="false">Unprotected</option>
            </select>
          </div>

          {(search || category !== 'all' || era !== 'all' || conservationStatus !== 'all' || isProtected !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-terracotta hover:underline font-bold flex items-center gap-1 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Sites Listing */}
      {loading ? (
        <div className={`grid ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : sites.length === 0 ? (
        <div className="skeuo-card rounded-2xl border border-stone-300 dark:border-stone-700 p-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto skeuo-wax-seal flex items-center justify-center text-white">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text skeuo-letterpress">
            No Monuments Matched
          </h3>
          <p className="text-sm text-ink/65 dark:text-night-muted max-w-md mx-auto">
            Try adjusting your search keywords, era, or category filters to find registered heritage sites.
          </p>
          <button
            onClick={handleResetFilters}
            className="skeuo-btn-terracotta px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={`grid ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {sites.map(site => (
            <SiteCard key={site.id} site={site} layout={layout} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            disabled={page <= 1}
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.set('page', String(page - 1));
              setSearchParams(next);
            }}
            className="skeuo-btn-paper p-2.5 rounded-xl disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold px-4 text-ink/80 dark:text-night-muted skeuo-letterpress">
            Folio {page} of {pagination.totalPages} ({pagination.total} cataloged sites)
          </span>

          <button
            disabled={page >= pagination.totalPages}
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.set('page', String(page + 1));
              setSearchParams(next);
            }}
            className="skeuo-btn-paper p-2.5 rounded-xl disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};