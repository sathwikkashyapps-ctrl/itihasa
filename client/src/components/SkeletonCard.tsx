import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-night-card rounded-2xl border border-parchment-border dark:border-night-border overflow-hidden animate-pulse">
      <div className="h-56 bg-stone-200 dark:bg-stone-800" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-stone-200 dark:bg-stone-800 rounded-full" />
          <div className="h-4 w-12 bg-stone-200 dark:bg-stone-800 rounded-full" />
        </div>
        <div className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800 rounded-md" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-stone-200 dark:bg-stone-800 rounded" />
          <div className="h-3 w-5/6 bg-stone-200 dark:bg-stone-800 rounded" />
        </div>
        <div className="pt-4 border-t border-stone-100 dark:border-night-border flex justify-between">
          <div className="h-4 w-24 bg-stone-200 dark:bg-stone-800 rounded" />
          <div className="h-4 w-16 bg-stone-200 dark:bg-stone-800 rounded" />
        </div>
      </div>
    </div>
  );
};
