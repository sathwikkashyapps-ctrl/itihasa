import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Site } from '../types';

interface Milestone {
  era: 'Ancient' | 'Medieval' | 'Colonial' | 'Modern';
  century: string;
  dynasty: string;
  title: string;
  description: string;
  siteSlug?: string;
  siteName?: string;
  image?: string;
}

const HISTORICAL_CHRONOLOGY: Milestone[] = [
  {
    era: 'Ancient',
    century: 'c. 2500 – 1500 BCE',
    dynasty: 'Indus Valley & Vedic Period',
    title: 'Urban Brick Architecture & Sacred Chants',
    description: 'Advanced grid-planned settlements, subterranean drainage systems at Dholavira and Lothal, and the oral memorization of the Rigveda hymns without written texts.',
    siteSlug: 'rani-ki-vav',
    siteName: 'Subterranean Gujarat Region',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80'
  },
  {
    era: 'Ancient',
    century: 'c. 2nd Century BCE',
    dynasty: 'Satavahana & Early Vakataka',
    title: 'Rock-Cut Monastic Viharas of Ajanta',
    description: 'Buddhist monks and master craftsmen excavate thirty horseshoe caverns out of basalt cliffs, painting murals with lapis lazuli and mineral tempera.',
    siteSlug: 'ajanta-caves',
    siteName: 'Ajanta Cave Sanctuaries',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    era: 'Ancient',
    century: '5th Century CE',
    dynasty: 'Gupta Golden Age & Pala Empire',
    title: 'Establishment of Nalanda Mahavihara',
    description: 'The pinnacle of classical Buddhist logic and higher sciences attracts 10,000 scholars from across Asia to study under Master Silabhadra.',
    siteSlug: 'nalanda-mahavihara',
    siteName: 'Nalanda Mahavihara',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    era: 'Medieval',
    century: 'c. 10th – 11th Century CE',
    dynasty: 'Chandela Dynasty & Solanki Era',
    title: 'Nagara Temple Spire Flourishing & Stepwells',
    description: 'Chandela kings build the 85 temples of Khajuraho celebrating human emotion, while Queen Udayamati constructs the inverted subterranean stepwell at Patan.',
    siteSlug: 'khajuraho-temples',
    siteName: 'Khajuraho Group of Monuments',
    image: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=600&q=80'
  },
  {
    era: 'Medieval',
    century: '1250 CE',
    dynasty: 'Eastern Ganga Dynasty',
    title: 'The Great Chariot of Surya at Konark',
    description: 'King Narasimhadeva I commissions 1,200 artisans to fashion the chlorite Sun Temple, engineering 24 astronomical sundial wheels along the Bay of Bengal.',
    siteSlug: 'konark-sun-temple',
    siteName: 'Konark Sun Temple',
    image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=600&q=80'
  },
  {
    era: 'Medieval',
    century: '14th – 16th Century CE',
    dynasty: 'Vijayanagara Empire & Qutb Shahis',
    title: 'Imperial Granite & Deccan Acoustic Citadels',
    description: 'Krishnadevaraya expands Hampi’s Virupaksha temple, and Golconda Fort perfects acoustic warning systems and global diamond trading.',
    siteSlug: 'virupaksha-hampi',
    siteName: 'Virupaksha Temple & Hampi',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f444f4b9?auto=format&fit=crop&w=600&q=80'
  },
  {
    era: 'Medieval',
    century: '1592 – 1653 CE',
    dynasty: 'Rajput-Mughal Renaissance',
    title: 'Amer Fort & The Taj Mahal',
    description: 'Synthesis of Persian garden symmetry, red sandstone ramparts, and white Makrana marble inlay at Amer and Agra.',
    siteSlug: 'amer-fort',
    siteName: 'Amer Fort & Palace Complex',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  },
  {
    era: 'Modern',
    century: '20th – 21st Century',
    dynasty: 'Republic of India & Living Guardianship',
    title: 'Digital Conservation & Sacred Landscape Protection',
    description: 'Community-led preservation of Kaziranga sacred floodplains, UNESCO World Heritage designations, and digital documentation portals.',
    siteSlug: 'kaziranga-living-heritage',
    siteName: 'Kaziranga Sacred Wetlands',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=600&q=80'
  }
];

export const TimelineView: React.FC<{ sites?: Site[] }> = () => {
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const eras = ['All', 'Ancient', 'Medieval', 'Colonial', 'Modern'];

  const filteredChronology = selectedEra === 'All'
    ? HISTORICAL_CHRONOLOGY
    : HISTORICAL_CHRONOLOGY.filter(m => m.era === selectedEra);

  return (
    <div className="space-y-8">
      {/* Era Filter Tabs (Tactile Paper / Terracotta Tabs) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {eras.map(era => (
          <button
            key={era}
            onClick={() => setSelectedEra(era)}
            className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
              selectedEra === era
                ? 'skeuo-btn-terracotta shadow-md scale-105'
                : 'skeuo-btn-paper hover:text-terracotta'
            }`}
          >
            {era === 'All' ? 'Complete Timeline' : `${era} Era`}
          </button>
        ))}
      </div>

      {/* Vertical Spine Timeline (Brass Rod & Metallic Node Studs) */}
      <div className="relative border-l-4 border-brass dark:border-brass-dark ml-4 md:ml-36 space-y-12 py-6 shadow-sm">
        {filteredChronology.map((milestone, idx) => (
          <div key={idx} className="relative pl-6 md:pl-10 group">
            {/* Timeline Node Icon (3D Enamel Stud) */}
            <div className="absolute -left-[14px] top-2 w-6 h-6 rounded-full skeuo-wax-seal flex items-center justify-center group-hover:scale-125 transition-transform">
              <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
            </div>

            {/* Epoch Label on Desktop Left */}
            <div className="hidden md:block absolute -left-40 top-1 text-right w-32">
              <span className="font-serif text-xs font-bold text-terracotta dark:text-saffron block skeuo-letterpress">
                {milestone.century}
              </span>
              <span className="text-[10px] uppercase font-bold text-ink/60 dark:text-night-muted">
                {milestone.era} Era
              </span>
            </div>

            {/* Content Card (Archival Parchment Folio) */}
            <div className="skeuo-card rounded-2xl p-6 relative">
              <div className="absolute top-2.5 right-2.5 skeuo-rivet" />

              {/* Mobile Era Label */}
              <div className="md:hidden flex items-center gap-2 text-xs font-bold text-terracotta mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{milestone.century} • {milestone.era}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <div className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-saffron" /> {milestone.dynasty}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-ink/75 dark:text-night-muted leading-relaxed font-normal">
                    {milestone.description}
                  </p>

                  {milestone.siteSlug && (
                    <div className="pt-2">
                      <Link
                        to={`/sites/${milestone.siteSlug}`}
                        className="skeuo-btn-paper inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-terracotta"
                      >
                        <MapPin className="w-3.5 h-3.5 text-terracotta" />
                        <span>Explore {milestone.siteName}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {milestone.image && (
                  <div className="rounded-xl overflow-hidden h-40 shadow-md border border-stone-300 dark:border-stone-700 skeuo-photo-mount">
                    <span className="skeuo-corner-tl" />
                    <span className="skeuo-corner-tr" />
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};