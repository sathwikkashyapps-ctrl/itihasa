import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  HeartHandshake,
  CheckCircle,
  MapPin,
  Calendar,
  BookOpen,
  Camera,
  ArrowRight,
  ArrowLeft,
  Shield,
  Sparkles,
  Info
} from 'lucide-react';

export const Contribute: React.FC = () => {
  const [step, setStep] = useState(1);
  const [contributionType, setContributionType] = useState<'site' | 'event' | 'story' | 'photo'>('site');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    titleOrName: '',
    categoryOrEra: 'monument',
    district: '',
    state: '',
    description: '',
    traditionsOrArchitecture: '',
    visitingOrDates: '',
    mediaUrl: '',
    submitterName: '',
    submitterEmail: '',
    honeypot: '' // Spam prevention hidden honeypot
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contributionType,
          submitterName: formData.submitterName,
          submitterEmail: formData.submitterEmail,
          honeypot: formData.honeypot,
          payload: {
            titleOrName: formData.titleOrName,
            categoryOrEra: formData.categoryOrEra,
            district: formData.district,
            state: formData.state,
            description: formData.description,
            traditionsOrArchitecture: formData.traditionsOrArchitecture,
            visitingOrDates: formData.visitingOrDates,
            mediaUrl: formData.mediaUrl
          }
        })
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to submit contribution');
      }

      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setError(err.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  const types = [
    { id: 'site', label: 'Heritage Site / Monument', icon: MapPin, desc: 'Undocumented fort, temple, baoli, or rock shelter' },
    { id: 'event', label: 'Living Festival / Ritual', icon: Calendar, desc: 'Local fair, seasonal dance, or village ritual' },
    { id: 'story', label: 'Oral Lore / History', icon: BookOpen, desc: 'Elders’ memories, craft guild stories, or songs' },
    { id: 'photo', label: 'Architectural Photos', icon: Camera, desc: 'Original high-res photographs of heritage sites' }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto skeuo-wax-seal flex items-center justify-center text-white shadow-xl">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-ink dark:text-night-text skeuo-letterpress">
          Dhanyavaad! Your Contribution is Received
        </h2>
        <p className="text-sm text-ink/75 dark:text-night-muted leading-relaxed">
          Your submission for <span className="font-bold text-terracotta">"{formData.titleOrName}"</span> has entered
          the Itihasa editorial review queue. Our heritage historians will verify coordinates, fact-check oral accounts, and catalog it for public access.
        </p>
        <div className="pt-4">
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData({
                titleOrName: '',
                categoryOrEra: 'monument',
                district: '',
                state: '',
                description: '',
                traditionsOrArchitecture: '',
                visitingOrDates: '',
                mediaUrl: '',
                submitterName: '',
                submitterEmail: '',
                honeypot: ''
              });
            }}
            className="skeuo-btn-terracotta px-6 py-2.5 rounded-xl text-xs font-bold"
          >
            Submit Another Cultural Record
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/10 dark:bg-stone-100/10 border border-brass/30 text-terracotta text-xs font-bold uppercase tracking-widest">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Community Stewardship & Crowdsourcing</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text skeuo-letterpress">
          Contribute to the Archives
        </h1>
        <p className="text-sm text-ink/75 dark:text-night-muted max-w-xl mx-auto">
          Help document disappearing stepwells, local folklore, oral memories, and temple festivals across India.
        </p>
      </div>

      {/* Step Indicator (Tactile Medallions) */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold">
        {[
          { num: 1, label: 'Category' },
          { num: 2, label: 'Details' },
          { num: 3, label: 'Media & Region' },
          { num: 4, label: 'Author Info' }
        ].map(s => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all ${
                step === s.num
                  ? 'skeuo-wax-seal text-white scale-110'
                  : step > s.num
                  ? 'skeuo-btn-brass text-amber-950'
                  : 'skeuo-btn-paper text-ink/50'
              }`}
            >
              {s.num}
            </div>
            <span className="hidden sm:inline text-ink/75 dark:text-night-muted skeuo-letterpress">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Main Wizard Form (Archival Manuscript Ledger) */}
      <div className="skeuo-card rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        <div className="absolute top-3 left-3 skeuo-rivet" />
        <div className="absolute top-3 right-3 skeuo-rivet" />

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200 text-xs border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from real users to catch spambots) */}
          <input
            type="text"
            name="website_url_hp"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: 'none' }}
            value={formData.honeypot}
            onChange={e => handleInputChange('honeypot', e.target.value)}
          />

          {/* STEP 1: CHOOSE CONTRIBUTION TYPE */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
                Select What You Would Like to Document
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {types.map(t => {
                  const Icon = t.icon;
                  const isSelected = contributionType === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setContributionType(t.id as any)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? 'skeuo-card border-2 border-terracotta bg-amber-50/60 dark:bg-stone-800/60 shadow-lg scale-102'
                          : 'skeuo-btn-paper hover:border-terracotta/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? 'skeuo-wax-seal text-white' : 'skeuo-btn-paper text-terracotta'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif font-bold text-sm text-ink dark:text-night-text skeuo-letterpress">{t.label}</h4>
                      </div>
                      <p className="text-xs text-ink/70 dark:text-night-muted leading-relaxed font-normal">{t.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="skeuo-btn-terracotta px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS & DESCRIPTION */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
                Historical Information & Significance
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                    {contributionType === 'site' ? 'Monument Name *' : contributionType === 'event' ? 'Festival / Event Title *' : 'Oral Story Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chand Baori Stepwell, Abhaneri"
                    value={formData.titleOrName}
                    onChange={e => handleInputChange('titleOrName', e.target.value)}
                    className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                    Historical Overview & Lore *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe historical context, oral legends, founding rulers, or significance..."
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                    Architectural Grammar / Living Traditions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Stone type, carvings, ritual practices, music instruments, or folklore..."
                    value={formData.traditionsOrArchitecture}
                    onChange={e => handleInputChange('traditionsOrArchitecture', e.target.value)}
                    className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="skeuo-btn-paper px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.titleOrName || !formData.description) {
                      setError('Please fill in the title and description.');
                      return;
                    }
                    setError(null);
                    setStep(3);
                  }}
                  className="skeuo-btn-terracotta px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION & MEDIA */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
                Geographic Coordinates & Media
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                    District / Town
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dausa, Rajasthan"
                    value={formData.district}
                    onChange={e => handleInputChange('district', e.target.value)}
                    className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rajasthan"
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                  Public Photo / Audio URL (Unsplash or Cloud Link)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.mediaUrl}
                  onChange={e => handleInputChange('mediaUrl', e.target.value)}
                  className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="skeuo-btn-paper px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="skeuo-btn-terracotta px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUBMITTER DETAILS & REVIEW */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
                Submitter Attribution & Archival Agreement
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Raghavendra Rao"
                    value={formData.submitterName}
                    onChange={e => handleInputChange('submitterName', e.target.value)}
                    className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="raghavendra@heritage.in"
                    value={formData.submitterEmail}
                    onChange={e => handleInputChange('submitterEmail', e.target.value)}
                    className="w-full px-3.5 py-2.5 skeuo-recessed rounded-xl text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl skeuo-recessed text-xs text-ink/75 dark:text-night-muted flex items-start gap-2.5 border border-stone-300 dark:border-stone-700">
                <Shield className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <span>
                  All community contributions are moderated prior to public indexing. Submissions remain open-access for researchers, cultural travelers, and school educators.
                </span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="skeuo-btn-paper px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="skeuo-btn-terracotta px-8 py-3 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Submitting to Queue...' : 'Confirm & Submit to Archive'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};