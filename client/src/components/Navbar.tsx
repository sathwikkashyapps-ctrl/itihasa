import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Bookmark,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  ShieldCheck,
  Compass,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  Image as GalleryIcon,
  HeartHandshake
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarksContext';
import { useAuth } from '../context/AuthContext';
import { CommandPalette } from './CommandPalette';
import { BookmarksDrawer } from './BookmarksDrawer';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { bookmarkedSites } = useBookmarks();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('itihasa_lang', nextLang);
  };

  const navLinks = [
    { to: '/sites', label: t('nav.sites'), icon: MapPin },
    { to: '/map', label: t('nav.map'), icon: Compass },
    { to: '/events', label: t('nav.events'), icon: Calendar },
    { to: '/timeline', label: t('nav.timeline'), icon: Clock },
    { to: '/stories', label: t('nav.stories'), icon: BookOpen },
    { to: '/gallery', label: t('nav.gallery'), icon: GalleryIcon },
    { to: '/contribute', label: t('nav.contribute'), icon: HeartHandshake },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF4E8]/95 dark:bg-[#121524]/95 backdrop-blur-md border-b-2 border-[#C5A059] dark:border-[#8C6D23] shadow-[0_4px_16px_rgba(43,38,35,0.15),inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand Plaque */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            {/* 3D Wax Seal Emblem */}
            <div className="w-11 h-11 skeuo-wax-seal flex items-center justify-center text-white transform group-hover:scale-105 transition-transform">
              <span className="font-serif font-black text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">इ</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-black tracking-wide text-ink dark:text-night-text skeuo-letterpress group-hover:text-terracotta transition-colors block leading-tight">
                ITIHASA
              </span>
              <span className="block text-[9px] tracking-[0.2em] uppercase font-bold text-terracotta dark:text-saffron">
                Digital Heritage Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Archival Tabs) */}
          <nav className="hidden xl:flex items-center space-x-1.5 p-1 rounded-xl bg-[#EDE1CD] dark:bg-[#0D101C] border border-[#D1BEA5] dark:border-[#23283E] shadow-[inset_0_2px_4px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.7)]">
            {navLinks.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'skeuo-btn-terracotta text-white shadow-md'
                      : 'text-ink/80 dark:text-night-text hover:text-terracotta dark:hover:text-saffron hover:bg-white/60 dark:hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons & Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Recessed Command Palette Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="skeuo-recessed flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs text-ink/75 dark:text-night-muted hover:border-terracotta transition-all cursor-pointer"
              title="Search archives (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-terracotta" />
              <span className="hidden md:inline font-medium">Search archives...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#E6D7C1] dark:bg-[#1A1D2E] text-ink/70 dark:text-night-text rounded border border-[#C5B39A] dark:border-[#2E3550] shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                ⌘K
              </kbd>
            </button>

            {/* Tactile Bookmarks Button */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              className="skeuo-btn-paper relative p-2.5 rounded-xl cursor-pointer"
              title="Saved heritage sites"
            >
              <Bookmark className="w-4 h-4 text-terracotta" />
              {bookmarkedSites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full skeuo-wax-seal text-white text-[10px] font-extrabold flex items-center justify-center animate-scale">
                  {bookmarkedSites.length}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="skeuo-btn-paper flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-terracotta" />
              <span>{i18n.language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Tactile Brass Mechanical Day/Night Switch */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'skeuo-btn-brass text-[#2B1F07]'
                  : 'skeuo-btn-paper text-indigo-deep'
              }`}
              title={theme === 'dark' ? 'Switch to Parchment Day Mode' : 'Switch to Night Lamp Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-deep" />
              )}
            </button>

            {/* Curator Portal Shortcut (Burnished Brass Plaque) */}
            <Link
              to={isAuthenticated ? '/admin' : '/admin/login'}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold skeuo-btn-brass text-amber-950"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4 text-amber-900" />
              <span>{isAuthenticated ? 'Admin' : 'Curator'}</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden skeuo-btn-paper p-2 rounded-xl text-ink dark:text-night-text"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF4E8] dark:bg-[#151829] border-b-2 border-[#C5A059] px-4 py-4 space-y-2 shadow-2xl">
            {navLinks.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink dark:text-night-text skeuo-card"
                >
                  <Icon className="w-4 h-4 text-terracotta" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#D5C6AF] dark:border-[#2C334E] flex justify-between items-center px-2">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-ink/70 dark:text-night-muted"
              >
                About Itihasa
              </Link>
              <Link
                to={isAuthenticated ? '/admin' : '/admin/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="skeuo-btn-brass text-amber-950 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Curator Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <BookmarksDrawer isOpen={isBookmarksOpen} onClose={() => setIsBookmarksOpen(false)} />
    </>
  );
};
