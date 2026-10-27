import React from 'react';
import { TimelineView } from '../components/TimelineView';
import { Clock, Compass, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Timeline: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-widest">
          <Clock className="w-3.5 h-3.5" />
          <span>Epochs of Human Civilization</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text">
          Civilization Timeline
        </h1>
        <p className="text-sm text-ink/70 dark:text-night-muted">
          A chronological journey across four millennia: from the prehistoric rock shelters and Indus brickworks,
          through classical Buddhist viharas and imperial medieval dynasties, into modern living preservation.
        </p>
      </div>

      {/* Interactive Timeline View */}
      <TimelineView />

      {/* Cartographic connection banner */}
      <div className="bg-indigo-deep text-parchment rounded-3xl p-8 sm:p-10 shadow-warm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold text-white">
            Prefer Spatial Exploration?
          </h3>
          <p className="text-xs sm:text-sm text-parchment/70 max-w-md">
            View all monuments from these historical eras plotted across coordinates on our interactive cultural map.
          </p>
        </div>
        <Link
          to="/map"
          className="px-6 py-3 bg-saffron hover:bg-saffron-light text-indigo-deep font-bold text-xs rounded-xl shadow-md flex items-center gap-2 flex-shrink-0"
        >
          <Compass className="w-4 h-4" /> Open Interactive Map
        </Link>
      </div>
    </div>
  );
};
