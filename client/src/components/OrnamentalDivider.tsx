import React from 'react';

interface Props {
  className?: string;
  variant?: 'jaali' | 'mandala' | 'simple';
}

export const OrnamentalDivider: React.FC<Props> = ({ className = '', variant = 'jaali' }) => {
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-center my-8 ${className}`}>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-terracotta/40 to-terracotta" />
        <div className="mx-3 text-terracotta transform rotate-45 text-xs">◆</div>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-terracotta/40 to-terracotta" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center my-10 select-none ${className}`}>
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-terracotta/30 to-terracotta/70" />
      <div className="mx-4 flex items-center space-x-2 text-terracotta">
        <svg className="w-5 h-5 fill-current opacity-70" viewBox="0 0 24 24">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
        <span className="font-serif text-sm tracking-widest text-saffron uppercase font-semibold">Itihasa</span>
        <svg className="w-5 h-5 fill-current opacity-70" viewBox="0 0 24 24">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </div>
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-l from-transparent via-terracotta/30 to-terracotta/70" />
    </div>
  );
};
