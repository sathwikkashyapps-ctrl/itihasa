export interface SiteImage {
  id: string;
  siteId: string;
  url: string;
  caption?: string;
  credit?: string;
  createdAt: string;
}

export interface Site {
  id: string;
  slug: string;
  name: string;
  category: 'temple' | 'fort' | 'monument' | 'museum' | 'natural' | 'intangible' | string;
  shortDescription: string;
  history: string;
  significance: string;
  architecture: string;
  era: 'Ancient' | 'Medieval' | 'Colonial' | 'Modern' | string;
  yearBuilt: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  conservationStatus: 'Excellent' | 'Good' | 'Needs Attention' | 'Endangered';
  isProtected: boolean;
  visitingHours: string;
  entryFee: string;
  bestSeason: string;
  coverImage: string;
  views: number;
  createdAt: string;
  images?: SiteImage[];
  events?: Event[];
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  type: 'festival' | 'ritual' | 'fair' | 'performance' | 'exhibition';
  startDate: string;
  endDate: string;
  siteId?: string | null;
  description: string;
  traditions: string;
  coverImage: string;
  location?: string | null;
  site?: {
    id: string;
    name: string;
    slug: string;
    district: string;
    coverImage: string;
  };
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  body: string;
  authorName: string;
  coverImage: string;
  audioUrl?: string | null;
  tags: string;
  readTime: string;
  status: 'published' | 'draft';
  createdAt: string;
}

export interface Submission {
  id: string;
  type: 'site' | 'event' | 'story' | 'photo';
  payload: any;
  submitterName: string;
  submitterEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string | null;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface StatsData {
  counters: {
    sites: number;
    events: number;
    stories: number;
    contributors: number;
    totalViews: number;
    pendingSubmissions: number;
  };
  analytics: {
    topSites: Array<{ id: string; name: string; slug: string; views: number; category: string; district: string }>;
    byCategory: Array<{ name: string; count: number }>;
    byEra: Array<{ name: string; count: number }>;
    byConservationStatus: Array<{ name: string; count: number }>;
  };
}
