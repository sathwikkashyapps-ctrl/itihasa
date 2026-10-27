import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight, Shield, Heart, Sparkles } from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="skeuo-wood-panel text-[#EDE7DC] pt-16 pb-12 border-t-4 border-[#C5A059] relative overflow-hidden">
      {/* Decorative Brass Header Trim */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8C6D23] via-[#F3E5AB] to-[#8C6D23] shadow-md" />

      {/* Background traditional faint watermark */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Manifesto Plaque with Brass Rivets */}
          <div className="lg:col-span-2 space-y-4 p-6 rounded-2xl bg-[#1A0E08]/85 border border-[#4A2D1B] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] relative">
            {/* 4 Corner Brass Rivets */}
            <div className="absolute top-2.5 left-2.5 skeuo-rivet" />
            <div className="absolute top-2.5 right-2.5 skeuo-rivet" />
            <div className="absolute bottom-2.5 left-2.5 skeuo-rivet" />
            <div className="absolute bottom-2.5 right-2.5 skeuo-rivet" />

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 skeuo-wax-seal flex items-center justify-center text-white">
                <span className="font-serif font-black text-2xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">इ</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-black tracking-wide text-white skeuo-letterpress block">
                  ITIHASA
                </span>
                <span className="block text-[9px] tracking-[0.2em] uppercase font-bold text-[#D4AF37]">
                  Digital Heritage Preservation Portal
                </span>
              </div>
            </div>

            <p className="text-xs text-[#DFD6C8] leading-relaxed font-light pt-1">
              Itihasa is a digital sanctuary dedicated to documenting, archiving, and promoting India’s monumental
              architecture, endangered living rituals, sacred water systems, and generational oral lore. We bridge
              deep historical antiquity with modern digital cartography.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#E5C384] font-medium pt-1">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>Preserving 5,000 Years of Architectural & Cultural Genius</span>
            </div>
          </div>

          {/* Heritage Collections */}
          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4 flex items-center gap-2 skeuo-letterpress">
              <span className="text-[#D4AF37]">◆</span> Explore Archives
            </h4>
            <ul className="space-y-2.5 text-xs text-[#DFD6C8]">
              <li><Link to="/sites" className="hover:text-[#D4AF37] transition-colors">Heritage Monuments</Link></li>
              <li><Link to="/map" className="hover:text-[#D4AF37] transition-colors">Cartographic Map</Link></li>
              <li><Link to="/events" className="hover:text-[#D4AF37] transition-colors">Living Festivals</Link></li>
              <li><Link to="/timeline" className="hover:text-[#D4AF37] transition-colors">Civilization Chronology</Link></li>
              <li><Link to="/stories" className="hover:text-[#D4AF37] transition-colors">Oral Lore Recordings</Link></li>
              <li><Link to="/gallery" className="hover:text-[#D4AF37] transition-colors">Photographic Plate Wall</Link></li>
            </ul>
          </div>

          {/* Community & Stewardship */}
          <div>
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-4 flex items-center gap-2 skeuo-letterpress">
              <span className="text-[#D4AF37]">◆</span> Stewardship
            </h4>
            <ul className="space-y-2.5 text-xs text-[#DFD6C8]">
              <li><Link to="/contribute" className="hover:text-[#D4AF37] transition-colors">Submit Monument Record</Link></li>
              <li><Link to="/contribute" className="hover:text-[#D4AF37] transition-colors">Record Oral History</Link></li>
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">Preservation Charter</Link></li>
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">Conservation FAQs</Link></li>
              <li><Link to="/admin" className="hover:text-[#D4AF37] transition-colors">Curator Suite Login</Link></li>
            </ul>
          </div>

          {/* Cultural Dispatch Newsletter with Recessed Carved Input */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide mb-2 flex items-center gap-2 skeuo-letterpress">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Itihasa Dispatch
            </h4>
            <p className="text-xs text-[#DFD6C8] leading-relaxed">
              Receive quarterly chronicles on rare excavations, seasonal celebrations, and master artisan profiles.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#06331D] border border-[#059669] rounded-xl text-xs text-[#A7F3D0] flex items-center gap-2 shadow-inner">
                <CheckCircle className="w-4 h-4 text-[#34D399] flex-shrink-0" />
                <span>You are subscribed to the Itihasa chronicles.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A89885] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter archival email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#1A0E08] border border-[#52331F] rounded-xl text-xs text-white placeholder-[#8F7D6B] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 skeuo-btn-brass rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Subscribe to Chronicles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <OrnamentalDivider className="my-10 opacity-30" />

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#BAAB97] pt-2 gap-4">
          <p>© {new Date().getFullYear()} Itihasa Digital Heritage Initiative. Preserved with open-access cultural data.</p>
          <div className="flex items-center space-x-6">
            <span>Crafted for physical antiquity & living memory</span>
            <span>•</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
