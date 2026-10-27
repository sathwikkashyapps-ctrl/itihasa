import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, MapPin, X, ArrowRight, Layers, Eye } from 'lucide-react';
import { Site } from '../types';
import { MapView } from '../components/MapView';
import { ConservationBadge } from '../components/ConservationBadge';

export const ExploreMap: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [filteredSites, setFilteredSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchAllSites = async () => {
      try {
        const res = await fetch('/api/sites?limit=50');
        if (res.ok) {
          const d = await res.json();
          setSites(d.data || []);
          setFilteredSites(d.data || []);
        }
      } catch (err) {
        console.error('Failed to load map sites:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllSites();
  }, []);

  useEffect(() => {
    let result = sites;
    if (selectedCategory !== 'all') {
      result = result.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        s => s.name.toLowerCase().includes(q) || s.district.toLowerCase().includes(q)
      );
    }
    setFilteredSites(result);
  }, [selectedCategory, search, sites]);

  const categories = [
    { id: 'all', label: 'All Monuments', color: 'bg-stone-800' },
    { id: 'temple', label: 'Temples', color: 'bg-saffron' },
    { id: 'fort', label: 'Forts & Citadels', color: 'bg-indigo-deep' },
    { id: 'monument', label: 'Monuments', color: 'bg-terracotta' },
    { id: 'natural', label: 'Sacred Landscapes', color: 'bg-olive' }
  ];

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col md:flex-row">
      {/* Top Floating Filter Bar for Quick Categories */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2 pointer-events-none md:left-96">
        <div className="pointer-events-auto skeuo-card rounded-2xl p-2 flex items-center gap-2 overflow-x-auto max-w-full shadow-2xl border border-brass-dark/30">
          <span className="text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-night-muted pl-2 flex items-center gap-1 flex-shrink-0">
            <Layers className="w-3.5 h-3.5 text-terracotta" />
          </span>
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'skeuo-btn-terracotta shadow-xs'
                    : 'skeuo-btn-paper text-ink/75 hover:text-ink'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible Left Sidebar (Archivist's Cartographic Ledger) */}
      <div
        className={`w-full md:w-96 skeuo-card rounded-none border-r border-stone-300 dark:border-stone-800 flex flex-col z-20 transition-all duration-300 shadow-2xl ${
          sidebarOpen ? 'h-[40vh] md:h-full' : 'h-14 md:w-14'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 skeuo-wood-panel text-white flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 skeuo-wax-seal flex items-center justify-center text-white text-[10px]">
              इ
            </div>
            <span className="font-serif font-bold text-base text-amber-200 skeuo-letterpress">
              Cartographic Index
            </span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-900/60 border border-brass/40 text-amber-300">
            {filteredSites.length} surveyed
          </span>
        </div>

        {/* Search Field (Recessed) */}
        <div className="p-3 border-b border-stone-300 dark:border-stone-800">
          <div className="relative skeuo-recessed rounded-xl flex items-center px-3 py-1.5 border border-stone-400/40">
            <Search className="w-4 h-4 text-terracotta mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search map monuments..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs text-ink dark:text-night-text placeholder-ink/40 dark:placeholder-night-muted font-medium"
            />
          </div>
        </div>

        {/* Sites List */}
        <div className="flex-1 overflow-y-auto divide-y divide-stone-200 dark:divide-stone-800">
          {loading ? (
            <div className="p-6 text-center text-xs text-ink/50 dark:text-night-muted italic">Unrolling parchment coordinates...</div>
          ) : filteredSites.length === 0 ? (
            <div className="p-6 text-center text-xs text-ink/50 dark:text-night-muted">No sites found in this filter</div>
          ) : (
            filteredSites.map(site => {
              const isSelected = selectedSite?.id === site.id;
              return (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`p-3 cursor-pointer transition-all flex gap-3 ${
                    isSelected
                      ? 'bg-amber-100/60 dark:bg-amber-950/40 border-l-4 border-terracotta shadow-inner'
                      : 'hover:bg-stone-100/60 dark:hover:bg-stone-800/40'
                  }`}
                >
                  <img src={site.coverImage} alt={site.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 shadow-sm border border-stone-300 dark:border-stone-700" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                        {site.category}
                      </span>
                      <ConservationBadge status={site.conservationStatus} size="sm" />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-ink dark:text-night-text truncate mt-0.5 skeuo-letterpress">
                      {site.name}
                    </h4>
                    <p className="text-[11px] text-ink/65 dark:text-night-muted truncate">
                      {site.district}, {site.state}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Fullscreen Leaflet Map */}
      <div className="flex-1 h-full relative">
        <MapView
          sites={filteredSites}
          selectedSite={selectedSite}
          onSelectSite={site => setSelectedSite(site)}
          height="100%"
          zoom={5}
        />

        {/* Selected Site Floating Drawer Preview (Bottom Right) */}
        {selectedSite && (
          <div className="absolute bottom-6 right-6 z-30 max-w-sm w-full skeuo-card rounded-2xl p-4 shadow-2xl border-2 border-brass/50 animate-in slide-in-from-bottom duration-300">
            {/* Corner Rivet */}
            <div className="absolute top-2 left-2 skeuo-rivet" />

            <div className="flex items-start justify-between mb-2 pl-4">
              <span className="text-xs uppercase font-bold tracking-wider text-terracotta">
                {selectedSite.category} • {selectedSite.era}
              </span>
              <button
                onClick={() => setSelectedSite(null)}
                className="p-1 text-ink/40 hover:text-ink dark:text-night-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-36 rounded-xl overflow-hidden mb-3 skeuo-photo-mount">
              <span className="skeuo-corner-tl" />
              <span className="skeuo-corner-tr" />
              <img src={selectedSite.coverImage} alt={selectedSite.name} className="w-full h-full object-cover" />
            </div>

            <h3 className="font-serif text-lg font-bold text-ink dark:text-night-text mb-1 skeuo-letterpress">
              {selectedSite.name}
            </h3>

            <p className="text-xs text-ink/75 dark:text-night-muted line-clamp-2 mb-3 leading-relaxed">
              {selectedSite.shortDescription}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-stone-300 dark:border-stone-700">
              <span className="text-xs text-ink/70 dark:text-night-muted flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-terracotta" /> {selectedSite.district}
              </span>
              <Link
                to={`/sites/${selectedSite.slug}`}
                className="skeuo-btn-terracotta px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <span>Full Sanctuary Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};