import React, { useState } from 'react';
import { Shield, Sparkles, ChevronDown, ChevronUp, BookOpen, Layers, Users, Globe } from 'lucide-react';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const About: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the core mission of the Itihasa Digital Heritage initiative?',
      a: 'Itihasa was founded to establish an open-access digital memory repository for the vast tangible and intangible cultural patrimony of India. We document monuments, sacred water architectures (baolis), living temple rituals, and fragile oral traditions.'
    },
    {
      q: 'How does digital preservation help prevent physical monument loss?',
      a: 'High-precision photogrammetry, archival field photography, GPS spatial boundary mapping, and historical epigraphy documentation provide baseline data for restoration architects and archaeological authorities in the event of environmental degradation or climate stress.'
    },
    {
      q: 'How are community submissions verified and moderated?',
      a: 'Submissions from researchers, students, and local residents land in an administrative moderation queue. Heritage curators cross-reference ASI registries, gazetteers, and local historians before approving them to the public portal.'
    },
    {
      q: 'Are the photographs and oral histories open-access for educational use?',
      a: 'Yes. All non-commercial educational use by schools, research universities, and public institutions is warmly encouraged with proper creator attribution.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>Charter & Manifesto</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text leading-tight">
          Conserving Millennia of Memory in a Single Digital Sanctuary
        </h1>
        <p className="text-sm sm:text-base text-ink/70 dark:text-night-muted leading-relaxed font-light">
          Architecture is the physical manifestation of philosophy, astronomy, and devotion. Itihasa documents
          not just stone edifices, but the human communities, living rituals, and oral songs that keep them alive.
        </p>
      </div>

      {/* Pillars of Preservation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-night-card p-6 rounded-2xl border border-parchment-border dark:border-night-border shadow-warm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-ink dark:text-night-text">1. Spatial & Architectural</h3>
          <p className="text-xs text-ink/70 dark:text-night-muted leading-relaxed">
            Recording GPS coordinates, Nagara and Dravidian architectural classifications, structural material types, and conservation ratings.
          </p>
        </div>

        <div className="bg-white dark:bg-night-card p-6 rounded-2xl border border-parchment-border dark:border-night-border shadow-warm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-saffron/15 text-saffron-dark flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-ink dark:text-night-text">2. Oral Lore & Field Audio</h3>
          <p className="text-xs text-ink/70 dark:text-night-muted leading-relaxed">
            Capturing generational oral histories, stone masons’ Shilpa Shastra chants, water ballads, and acoustic reverberations before they vanish.
          </p>
        </div>

        <div className="bg-white dark:bg-night-card p-6 rounded-2xl border border-parchment-border dark:border-night-border shadow-warm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-olive/15 text-olive-dark flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-ink dark:text-night-text">3. Living Stewardship</h3>
          <p className="text-xs text-ink/70 dark:text-night-muted leading-relaxed">
            Empowering local youth, heritage tour guides, and scholars to submit undocumented regional monuments and monitor ecological status.
          </p>
        </div>
      </div>

      <OrnamentalDivider />

      {/* Preservation FAQ Accordion */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-bold text-ink dark:text-night-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-ink/60 dark:text-night-muted">
            Everything you need to know about archival integrity and contribution guidelines.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-night-card rounded-2xl border border-parchment-border dark:border-night-border overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-semibold text-ink dark:text-night-text hover:text-terracotta transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-terracotta flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-ink/40 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-ink/70 dark:text-night-muted leading-relaxed border-t border-parchment-border/40 dark:border-night-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Institutional Partner Placeholder Logos */}
      <div className="p-8 rounded-3xl bg-indigo-deep text-parchment text-center space-y-6">
        <div className="text-xs uppercase font-bold tracking-widest text-saffron">
          Collaborating Cultural Institutions & Archives
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center opacity-80 text-xs font-semibold tracking-wider uppercase">
          <div className="p-4 border border-white/10 rounded-xl bg-white/5">Archaeological Trust of India</div>
          <div className="p-4 border border-white/10 rounded-xl bg-white/5">National Crafts Museum</div>
          <div className="p-4 border border-white/10 rounded-xl bg-white/5">Deccan Heritage Council</div>
          <div className="p-4 border border-white/10 rounded-xl bg-white/5">International Council on Monuments</div>
        </div>
      </div>
    </div>
  );
};
