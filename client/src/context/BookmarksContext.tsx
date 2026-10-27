import React, { createContext, useContext, useEffect, useState } from 'react';
import { Site } from '../types';

interface BookmarksContextType {
  bookmarkedSiteSlugs: string[];
  bookmarkedSites: Site[];
  toggleBookmark: (site: Site) => void;
  isBookmarked: (slug: string) => boolean;
  clearBookmarks: () => void;
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarkedSiteSlugs: [],
  bookmarkedSites: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
  clearBookmarks: () => {}
});

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarkedSites, setBookmarkedSites] = useState<Site[]>(() => {
    try {
      const saved = localStorage.getItem('itihasa_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('itihasa_bookmarks', JSON.stringify(bookmarkedSites));
  }, [bookmarkedSites]);

  const toggleBookmark = (site: Site) => {
    setBookmarkedSites(prev => {
      const exists = prev.some(s => s.slug === site.slug);
      if (exists) {
        return prev.filter(s => s.slug !== site.slug);
      } else {
        return [...prev, site];
      }
    });
  };

  const isBookmarked = (slug: string) => {
    return bookmarkedSites.some(s => s.slug === slug);
  };

  const clearBookmarks = () => {
    setBookmarkedSites([]);
  };

  const bookmarkedSiteSlugs = bookmarkedSites.map(s => s.slug);

  return (
    <BookmarksContext.Provider value={{ bookmarkedSiteSlugs, bookmarkedSites, toggleBookmark, isBookmarked, clearBookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
