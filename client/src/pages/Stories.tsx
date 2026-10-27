import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Volume2, Clock, ArrowRight, User, Sparkles } from 'lucide-react';
import { Story } from '../types';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

export const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories');
        if (res.ok) {
          const data = await res.json();
          setStories(data);
        }
      } catch (err) {
        console.error('Failed to load stories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const tags = ['all', 'Acoustics', 'Craftsmanship', 'Indigo', 'Water Lore', 'Music', 'Textiles'];

  const filteredStories = selectedTag === 'all'
    ? stories
    : stories.filter(s => s.tags.toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive/15 text-olive-dark text-xs font-semibold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Voices, Ballads & Generational Memory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink dark:text-night-text">
          Oral Histories & Living Folklore
        </h1>
        <p className="text-sm text-ink/70 dark:text-night-muted">
          Firsthand accounts, ancient artisan guilds, acoustic secrets, and oral songs passed down from generation to generation.
        </p>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-olive text-white shadow-xs'
                : 'bg-white dark:bg-night-card text-ink/70 dark:text-night-text border border-parchment-border dark:border-night-border hover:border-olive'
            }`}
          >
            {tag === 'all' ? 'All Oral Lore' : tag}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      {loading ? (
        <div className="text-center py-20 text-xs text-ink/60">Opening oral recordings...</div>
      ) : filteredStories.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-night-card rounded-2xl border border-parchment-border dark:border-night-border">
          <p className="font-serif text-lg font-bold">No narratives found under this topic.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map(story => (
            <div
              key={story.id}
              className="bg-white dark:bg-night-card rounded-2xl border border-parchment-border dark:border-night-border overflow-hidden hover:shadow-warm-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {story.audioUrl && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-saffron text-xs font-semibold flex items-center gap-1 shadow-xs">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Audio Oral Recording
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                    <span className="bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {story.tags.split(',')[0]}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-ink/50 dark:text-night-muted">
                    <span className="flex items-center gap-1 font-medium text-ink/80 dark:text-night-text">
                      <User className="w-3.5 h-3.5 text-olive" /> {story.authorName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {story.readTime}
                    </span>
                  </div>

                  <Link to={`/stories/${story.slug}`}>
                    <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text group-hover:text-olive transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-ink/70 dark:text-night-muted line-clamp-3 leading-relaxed">
                    {story.body}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/stories/${story.slug}`}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-night-bg dark:hover:bg-night-cardHover text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 text-ink dark:text-night-text transition-colors"
                >
                  <span>Read Oral History</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
