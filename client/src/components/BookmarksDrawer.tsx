import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, X, Trash2, ArrowRight, Compass } from 'lucide-react';
import { useBookmarks } from '../context/BookmarksContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { bookmarkedSites, toggleBookmark, clearBookmarks } = useBookmarks();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-ink/50 dark:bg-black/70 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-night-card shadow-2xl border-l border-parchment-border dark:border-night-border flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-parchment-border dark:border-night-border flex items-center justify-between">
            <div className="flex items-center space-x-2 text-terracotta">
              <Bookmark className="w-5 h-5 fill-current" />
              <h2 className="font-serif text-lg font-bold text-ink dark:text-night-text">Saved Heritage Places</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-parchment dark:hover:bg-night-border text-ink/60 dark:text-night-muted">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {bookmarkedSites.length === 0 ? (
              <div className="text-center py-16 text-ink/60 dark:text-night-muted">
                <Compass className="w-12 h-12 mx-auto text-terracotta/40 mb-3" />
                <p className="font-serif text-base font-semibold">Your heritage journey is waiting.</p>
                <p className="text-xs mt-1 max-w-xs mx-auto">
                  Click the bookmark icon on any site or monument to collect your personal cultural travel itinerary.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/sites');
                  }}
                  className="mt-5 px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Explore Heritage Sites
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-ink/50 dark:text-night-muted">
                  <span>{bookmarkedSites.length} saved places</span>
                  <button onClick={clearBookmarks} className="text-rose-500 hover:text-rose-600 flex items-center gap-1 font-medium">
                    <Trash2 className="w-3.5 h-3.5" /> Clear all
                  </button>
                </div>

                {bookmarkedSites.map(site => (
                  <div
                    key={site.id}
                    className="p-3 rounded-xl border border-parchment-border dark:border-night-border hover:shadow-md transition-shadow bg-parchment/40 dark:bg-night-bg flex gap-3 group"
                  >
                    <img src={site.coverImage} alt={site.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-xs uppercase tracking-wider text-terracotta font-bold">{site.category}</span>
                        <button
                          onClick={() => toggleBookmark(site)}
                          title="Remove bookmark"
                          className="text-terracotta hover:text-rose-500 p-0.5"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          onClose();
                          navigate(`/sites/${site.slug}`);
                        }}
                        className="font-serif text-sm font-semibold truncate cursor-pointer hover:text-terracotta transition-colors mt-0.5"
                      >
                        {site.name}
                      </h4>
                      <p className="text-xs text-ink/60 dark:text-night-muted truncate mt-0.5">{site.district}, {site.state}</p>
                      <button
                        onClick={() => {
                          onClose();
                          navigate(`/sites/${site.slug}`);
                        }}
                        className="text-xs text-terracotta font-medium flex items-center gap-1 mt-2 group-hover:translate-x-0.5 transition-transform"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {bookmarkedSites.length > 0 && (
            <div className="p-4 border-t border-parchment-border dark:border-night-border bg-stone-50 dark:bg-night-bg">
              <button
                onClick={() => {
                  onClose();
                  navigate('/map');
                }}
                className="w-full py-2.5 bg-indigo-deep text-white hover:bg-indigo text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Compass className="w-4 h-4 text-saffron" /> View All on Interactive Map
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
