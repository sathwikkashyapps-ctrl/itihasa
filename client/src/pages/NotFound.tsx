import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-terracotta/10 text-terracotta flex items-center justify-center">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs uppercase font-bold tracking-widest text-terracotta">404 • Uncharted Terrain</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink dark:text-night-text">
          Lost in the Sands of Antiquity
        </h1>
        <p className="text-sm text-ink/60 dark:text-night-muted leading-relaxed">
          The heritage parchment or monument you were searching for has faded from current memory or was relocated.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-semibold shadow-md transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Sanctuary Gates
      </Link>
    </div>
  );
};
