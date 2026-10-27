import React from 'react';

interface Props {
  status: 'Excellent' | 'Good' | 'Needs Attention' | 'Endangered' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const ConservationBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const getSkeuoStyles = () => {
    switch (status) {
      case 'Excellent':
        return {
          gradient: 'linear-gradient(180deg, #34D399 0%, #059669 50%, #047857 100%)',
          border: '#065F46',
          shadow: '0 2px 4px rgba(4,120,87,0.35), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.3)',
          textShadow: '0 -1px 1px rgba(0,0,0,0.4)',
          dot: '#A7F3D0'
        };
      case 'Good':
        return {
          gradient: 'linear-gradient(180deg, #60A5FA 0%, #2563EB 50%, #1D4ED8 100%)',
          border: '#1E40AF',
          shadow: '0 2px 4px rgba(29,78,216,0.35), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.3)',
          textShadow: '0 -1px 1px rgba(0,0,0,0.4)',
          dot: '#BFDBFE'
        };
      case 'Needs Attention':
        return {
          gradient: 'linear-gradient(180deg, #FBBF24 0%, #D97706 50%, #B45309 100%)',
          border: '#92400E',
          shadow: '0 2px 4px rgba(180,83,9,0.35), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.3)',
          textShadow: '0 -1px 1px rgba(0,0,0,0.4)',
          dot: '#FEF3C7'
        };
      case 'Endangered':
        return {
          gradient: 'linear-gradient(180deg, #F87171 0%, #DC2626 50%, #991B1B 100%)',
          border: '#7F1D1D',
          shadow: '0 3px 8px rgba(185,28,28,0.5), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.35)',
          textShadow: '0 -1px 1px rgba(0,0,0,0.5)',
          dot: '#FECACA'
        };
      default:
        return {
          gradient: 'linear-gradient(180deg, #A8A29E 0%, #78716C 50%, #57534E 100%)',
          border: '#44403C',
          shadow: '0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
          textShadow: '0 -1px 1px rgba(0,0,0,0.5)',
          dot: '#E7E5E4'
        };
    }
  };

  const skeuo = getSkeuoStyles();

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 font-semibold tracking-wide'
  };

  return (
    <span
      style={{
        background: skeuo.gradient,
        borderColor: skeuo.border,
        boxShadow: skeuo.shadow,
        textShadow: skeuo.textShadow,
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border text-white font-semibold uppercase select-none transition-transform hover:scale-[1.02] ${sizeClasses[size]}`}
    >
      <span
        style={{
          backgroundColor: skeuo.dot,
          boxShadow: '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)'
        }}
        className="w-1.5 h-1.5 rounded-full inline-block"
      />
      <span>{status}</span>
    </span>
  );
};
