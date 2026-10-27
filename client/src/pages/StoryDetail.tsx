import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, User, Volume2, ArrowLeft, Share2, Check, Sparkles } from 'lucide-react';
import { Story } from '../types';

export const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [related, setRelated] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/stories/${slug}`);
        if (res.ok) {
          const d = await res.json();
          setStory(d.story);
          setRelated(d.related || []);
        }
      } catch (err) {
        console.error('Failed to load story:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading || !story) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="font-serif italic text-ink/60">Opening oral archive...</p>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link
          to="/stories"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-parchment-border dark:border-night-border text-xs font-semibold hover:border-olive transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All Oral Histories
        </Link>
        <button
          onClick={handleShare}
          className="p-2 rounded-full border border-parchment-border dark:border-night-border hover:border-olive transition-colors"
          title="Share story"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Header Info */}
      <header className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive/15 text-olive-dark text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Oral History Archive
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text leading-tight">
          {story.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-xs text-ink/60 dark:text-night-muted pt-2">
          <span className="flex items-center gap-1 font-semibold text-ink dark:text-night-text">
            <User className="w-3.5 h-3.5 text-olive" /> {story.authorName}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {story.readTime}
          </span>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-warm-lg max-h-[480px]">
        <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
      </div>

      {/* Audio Player if Available */}
      {story.audioUrl && (
        <div className="p-5 rounded-2xl bg-indigo-deep text-parchment border border-indigo-light flex flex-col sm:flex-row items-center justify-between gap-4 shadow-warm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saffron text-indigo-deep flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-saffron block">Audio Recording</span>
              <span className="text-sm font-semibold text-white">Listen to the field recording / acoustic atmosphere</span>
            </div>
          </div>
          <audio controls className="w-full sm:w-64 h-10 rounded-lg">
            <source src={story.audioUrl} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Main Narrative Content */}
      <div className="bg-white dark:bg-night-card p-8 sm:p-12 rounded-3xl border border-parchment-border dark:border-night-border shadow-xs prose dark:prose-invert max-w-none">
        <div className="font-serif text-lg leading-relaxed text-ink/90 dark:text-night-text whitespace-pre-line space-y-6">
          {story.body}
        </div>

        {/* Tags */}
        <div className="pt-8 mt-8 border-t border-parchment-border dark:border-night-border flex flex-wrap gap-2">
          {story.tags.split(',').map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-stone-100 dark:bg-night-bg rounded-lg text-xs font-medium text-ink/70 dark:text-night-muted"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Related Stories */}
      {related.length > 0 && (
        <div className="pt-8 border-t border-parchment-border dark:border-night-border space-y-4">
          <h3 className="font-serif text-2xl font-bold text-ink dark:text-night-text">
            More Living Memories & Chronicles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(r => (
              <Link
                key={r.id}
                to={`/stories/${r.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-night-card border border-parchment-border dark:border-night-border hover:shadow-md transition-shadow space-y-2 block"
              >
                <img src={r.coverImage} alt={r.title} className="w-full h-32 rounded-xl object-cover" />
                <h4 className="font-serif text-sm font-bold text-ink dark:text-night-text line-clamp-1">{r.title}</h4>
                <p className="text-xs text-ink/60 dark:text-night-muted">{r.authorName}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
