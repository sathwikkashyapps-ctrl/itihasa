import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, BookOpen, X, ArrowRight, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ sites: any[]; events: any[]; stories: any[] }>({
    sites: [],
    events: [],
    stories: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ sites: [], events: [], stories: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({ sites: [], events: [], stories: [] });
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  const hasResults = results.sites.length > 0 || results.events.length > 0 || results.stories.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ink/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-night-card rounded-2xl shadow-2xl border border-parchment-border dark:border-night-border overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-parchment-border dark:border-night-border">
          <Search className="w-5 h-5 text-terracotta mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search heritage sites, living festivals, oral histories..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-ink dark:text-night-text text-base placeholder-ink/40 dark:placeholder-night-muted"
          />
          {loading && <Loader2 className="w-5 h-5 text-terracotta animate-spin mr-2" />}
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-ink/40 hover:text-ink dark:text-night-muted">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-mono text-ink/50 dark:text-night-muted bg-stone-100 dark:bg-night-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="py-8 text-center text-ink/60 dark:text-night-muted">
              <p className="font-serif italic text-base">"A civilization is known by how it preserves its memory."</p>
              <p className="text-xs mt-2 text-ink/40 dark:text-night-muted/60">
                Type <span className="font-semibold text-terracotta">"Amer"</span>, <span className="font-semibold text-terracotta">"Hampi"</span>, <span className="font-semibold text-terracotta">"Dance"</span> or <span className="font-semibold text-terracotta">"Indigo"</span>
              </p>
            </div>
          )}

          {query && !loading && !hasResults && (
            <div className="py-10 text-center text-ink/60 dark:text-night-muted">
              <p className="font-medium">No heritage archives found matching "{query}"</p>
              <p className="text-xs mt-1">Try searching for broader terms like "Fort", "Odisha", or "Festival".</p>
            </div>
          )}

          {/* Sites */}
          {results.sites.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-terracotta mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Heritage Sites ({results.sites.length})
              </div>
              <div className="space-y-1">
                {results.sites.map(site => (
                  <button
                    key={site.id}
                    onClick={() => handleSelect(`/sites/${site.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-parchment dark:hover:bg-night-cardHover text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={site.coverImage} alt={site.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="text-sm font-semibold text-ink dark:text-night-text group-hover:text-terracotta transition-colors">
                          {site.name}
                        </div>
                        <div className="text-xs text-ink/50 dark:text-night-muted">
                          {site.district} • {site.era} Era • {site.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {results.events.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-saffron mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Cultural Events ({results.events.length})
              </div>
              <div className="space-y-1">
                {results.events.map(event => (
                  <button
                    key={event.id}
                    onClick={() => handleSelect(`/events/${event.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-parchment dark:hover:bg-night-cardHover text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={event.coverImage} alt={event.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="text-sm font-semibold text-ink dark:text-night-text group-hover:text-saffron transition-colors">
                          {event.title}
                        </div>
                        <div className="text-xs text-ink/50 dark:text-night-muted">
                          {new Date(event.startDate).toLocaleDateString()} • {event.type}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-saffron group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stories */}
          {results.stories.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-olive mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Oral Histories & Stories ({results.stories.length})
              </div>
              <div className="space-y-1">
                {results.stories.map(story => (
                  <button
                    key={story.id}
                    onClick={() => handleSelect(`/stories/${story.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-parchment dark:hover:bg-night-cardHover text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={story.coverImage} alt={story.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="text-sm font-semibold text-ink dark:text-night-text group-hover:text-olive transition-colors">
                          {story.title}
                        </div>
                        <div className="text-xs text-ink/50 dark:text-night-muted">
                          By {story.authorName} • {story.readTime}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-olive group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-stone-50 dark:bg-night-bg border-t border-parchment-border dark:border-night-border flex items-center justify-between text-xs text-ink/50 dark:text-night-muted">
          <span>Search spans 12+ monuments, 8 festivals, and oral archives</span>
          <span>Click result to explore</span>
        </div>
      </div>
    </div>
  );
};
