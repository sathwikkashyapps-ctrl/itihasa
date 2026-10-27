import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ShieldCheck,
  Check,
  X,
  Upload,
  Plus,
  Trash2,
  Eye,
  LogOut,
  MapPin,
  Calendar,
  Layers,
  Inbox,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Site, Submission, StatsData } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { user, token, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'analytics' | 'submissions' | 'sites' | 'uploads'>('analytics');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  // New site form state
  const [showAddSite, setShowAddSite] = useState(false);
  const [newSite, setNewSite] = useState({
    name: '',
    slug: '',
    category: 'temple',
    shortDescription: '',
    history: '',
    significance: '',
    architecture: '',
    era: 'Medieval',
    yearBuilt: '',
    district: '',
    state: 'India',
    latitude: 26.9855,
    longitude: 75.8513,
    conservationStatus: 'Good',
    visitingHours: '9:00 AM – 5:00 PM',
    entryFee: '₹50',
    bestSeason: 'October to March',
    coverImage: ''
  });

  // Image upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, subsRes, sitesRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/submissions', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/sites?limit=50')
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (subsRes.ok) setSubmissions(await subsRes.json());
        if (sitesRes.ok) {
          const sd = await sitesRes.json();
          setSites(sd.data || []);
        }
      } catch (err) {
        console.error('Admin data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, navigate]);

  // Handle Submission Moderation (Approve / Reject)
  const handleModerateSubmission = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/submissions/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setSubmissions(prev =>
          prev.map(sub => (sub.id === id ? { ...sub, status } : sub))
        );
      }
    } catch (err) {
      console.error('Failed to moderate submission:', err);
    }
  };

  // Handle Site Deletion
  const handleDeleteSite = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this heritage site?')) return;
    try {
      const res = await fetch(`/api/sites/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setSites(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete site:', err);
    }
  };

  // Handle Image Upload
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('image', uploadFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedUrl(data.url);
        // Automatically set into newSite coverImage
        setNewSite(prev => ({ ...prev, coverImage: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  // Handle Create Site
  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newSite)
      });

      if (res.ok) {
        const created = await res.json();
        setSites(prev => [created, ...prev]);
        setShowAddSite(false);
        alert('Heritage site created successfully!');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create site');
      }
    } catch (err) {
      console.error('Error creating site:', err);
    }
  };

  const COLORS = ['#C65D3B', '#E9A23B', '#1B1F3B', '#5B6B3A', '#8A5A36', '#3B82F6'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Wood Panel with Rivets & Wax Seal */}
      <div className="skeuo-wood-panel p-6 rounded-3xl relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white shadow-2xl">
        <div className="absolute top-2.5 left-2.5 skeuo-rivet" />
        <div className="absolute top-2.5 right-2.5 skeuo-rivet" />
        <div className="absolute bottom-2.5 left-2.5 skeuo-rivet" />
        <div className="absolute bottom-2.5 right-2.5 skeuo-rivet" />

        <div className="flex items-center gap-3 pl-2">
          <div className="w-12 h-12 skeuo-wax-seal flex items-center justify-center text-white text-base">
            इ
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white skeuo-letterpress">
              Curator Administrative Suite
            </h1>
            <p className="text-xs text-amber-200/80">
              Logged in as <span className="font-bold text-amber-100">{user?.name || user?.email || 'Itihasa Chief Archivist'}</span> ({user?.role})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pr-2">
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="skeuo-btn-paper px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-4 h-4 text-terracotta" /> Sign Out Vault
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Tactile Index Tabs) */}
      <div className="flex items-center gap-2 border-b-2 border-stone-300 dark:border-stone-700 pb-2 overflow-x-auto">
        {[
          { id: 'analytics', label: 'Analytics & Insights' },
          { id: 'submissions', label: `Moderation Queue (${submissions.filter(s => s.status === 'pending').length} Pending)` },
          { id: 'sites', label: `Manage Sites (${sites.length})` },
          { id: 'uploads', label: 'Media Upload Tool' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'skeuo-btn-terracotta shadow-md'
                : 'skeuo-btn-paper text-ink/75 hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Stats Summary Plaques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="skeuo-plaque p-5 rounded-2xl relative shadow-md">
              <div className="absolute top-2 left-2 skeuo-rivet" />
              <div className="absolute top-2 right-2 skeuo-rivet" />
              <span className="text-[10px] uppercase font-bold text-amber-950 dark:text-amber-200 tracking-wider">
                Cataloged Monuments
              </span>
              <div className="font-serif text-3xl font-extrabold text-terracotta mt-1 skeuo-letterpress">
                {stats?.counters.sites || sites.length}
              </div>
            </div>

            <div className="skeuo-plaque p-5 rounded-2xl relative shadow-md">
              <div className="absolute top-2 left-2 skeuo-rivet" />
              <div className="absolute top-2 right-2 skeuo-rivet" />
              <span className="text-[10px] uppercase font-bold text-amber-950 dark:text-amber-200 tracking-wider">
                Archival Viewers
              </span>
              <div className="font-serif text-3xl font-extrabold text-amber-700 dark:text-amber-300 mt-1 skeuo-letterpress">
                {stats?.counters.totalViews || 14500}
              </div>
            </div>

            <div className="skeuo-plaque p-5 rounded-2xl relative shadow-md">
              <div className="absolute top-2 left-2 skeuo-rivet" />
              <div className="absolute top-2 right-2 skeuo-rivet" />
              <span className="text-[10px] uppercase font-bold text-amber-950 dark:text-amber-200 tracking-wider">
                Submissions
              </span>
              <div className="font-serif text-3xl font-extrabold text-emerald-800 dark:text-emerald-400 mt-1 skeuo-letterpress">
                {submissions.length}
              </div>
            </div>

            <div className="skeuo-plaque p-5 rounded-2xl relative shadow-md">
              <div className="absolute top-2 left-2 skeuo-rivet" />
              <div className="absolute top-2 right-2 skeuo-rivet" />
              <span className="text-[10px] uppercase font-bold text-amber-950 dark:text-amber-200 tracking-wider">
                Pending Review
              </span>
              <div className="font-serif text-3xl font-extrabold text-rose-700 dark:text-rose-400 mt-1 skeuo-letterpress">
                {submissions.filter(s => s.status === 'pending').length}
              </div>
            </div>
          </div>

          {/* Graphical Analytics (Recharts in Skeuomorphic Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Sites by Views Bar Chart */}
            <div className="skeuo-card p-6 rounded-3xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-ink dark:text-night-text skeuo-letterpress">
                Top Heritage Monuments by Views
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.analytics.topSites || []}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="views" fill="#C65D3B" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution by Category Pie Chart */}
            <div className="skeuo-card p-6 rounded-3xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-ink dark:text-night-text skeuo-letterpress">
                Monuments by Architectural Category
              </h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.analytics.byCategory || []}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={entry => `${entry.name} (${entry.count})`}
                    >
                      {(stats?.analytics.byCategory || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUBMISSIONS MODERATION QUEUE TAB */}
      {activeTab === 'submissions' && (
        <div className="skeuo-card rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-stone-300 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-800/30">
            <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
              Community Contributions Review Queue
            </h3>
            <p className="text-xs text-ink/70 dark:text-night-muted">
              Inspect user submissions. Approving will publish the record to the public catalog.
            </p>
          </div>

          {submissions.length === 0 ? (
            <div className="p-12 text-center text-xs text-ink/50 italic">No submissions in queue.</div>
          ) : (
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {submissions.map(sub => (
                <div
                  key={sub.id}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="skeuo-btn-paper px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {sub.type}
                      </span>

                      {/* Authentic Skeuomorphic Rubber Stamp */}
                      <span
                        className={`skeuo-stamp ${
                          sub.status === 'approved'
                            ? 'skeuo-stamp-approved'
                            : sub.status === 'rejected'
                            ? 'skeuo-stamp-rejected'
                            : 'skeuo-stamp-pending'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-ink dark:text-night-text skeuo-letterpress">
                      {sub.payload.titleOrName || sub.payload.name || sub.payload.title || 'Untitled Submission'}
                    </h4>

                    <p className="text-xs text-ink/75 dark:text-night-muted line-clamp-2 leading-relaxed">
                      {sub.payload.description || sub.payload.summary || sub.payload.details || 'No text summary'}
                    </p>

                    <div className="text-[11px] text-ink/60 dark:text-night-muted">
                      From: <span className="font-bold text-ink dark:text-night-text">{sub.submitterName}</span> ({sub.submitterEmail}) • {new Date(sub.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {sub.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleModerateSubmission(sub.id, 'approved')}
                          className="skeuo-btn-brass px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleModerateSubmission(sub.id, 'rejected')}
                          className="skeuo-btn-paper px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-1 shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-ink/50 dark:text-night-muted font-bold capitalize">
                        Archived as {sub.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. MANAGE SITES TAB */}
      {activeTab === 'sites' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
              Cataloged Heritage Sites ({sites.length})
            </h3>
            <button
              onClick={() => setShowAddSite(!showAddSite)}
              className="skeuo-btn-terracotta px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add New Site
            </button>
          </div>

          {/* Add Site Modal Form */}
          {showAddSite && (
            <div className="skeuo-card p-6 sm:p-8 rounded-3xl space-y-4 relative">
              <div className="absolute top-2 left-2 skeuo-rivet" />
              <div className="absolute top-2 right-2 skeuo-rivet" />
              <h4 className="font-serif text-lg font-bold text-ink dark:text-night-text skeuo-letterpress">
                Catalog New Heritage Site
              </h4>
              <form onSubmit={handleCreateSite} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Site Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Badami Caves"
                      value={newSite.name}
                      onChange={e => setNewSite(prev => ({
                        ...prev,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }))}
                      className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={newSite.slug}
                      onChange={e => setNewSite(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Category</label>
                    <select
                      value={newSite.category}
                      onChange={e => setNewSite(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2.5 skeuo-btn-paper rounded-xl font-medium outline-none cursor-pointer"
                    >
                      <option value="temple">Temple</option>
                      <option value="fort">Fort</option>
                      <option value="monument">Monument</option>
                      <option value="natural">Natural</option>
                      <option value="museum">Museum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Era</label>
                    <select
                      value={newSite.era}
                      onChange={e => setNewSite(prev => ({ ...prev, era: e.target.value }))}
                      className="w-full p-2.5 skeuo-btn-paper rounded-xl font-medium outline-none cursor-pointer"
                    >
                      <option value="Ancient">Ancient</option>
                      <option value="Medieval">Medieval</option>
                      <option value="Colonial">Colonial</option>
                      <option value="Modern">Modern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Year Built</label>
                    <input
                      type="text"
                      placeholder="6th Century CE"
                      value={newSite.yearBuilt}
                      onChange={e => setNewSite(prev => ({ ...prev, yearBuilt: e.target.value }))}
                      className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold mb-1">District</label>
                    <input
                      type="text"
                      value={newSite.district}
                      onChange={e => setNewSite(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Conservation Status</label>
                    <select
                      value={newSite.conservationStatus}
                      onChange={e => setNewSite(prev => ({ ...prev, conservationStatus: e.target.value }))}
                      className="w-full p-2.5 skeuo-btn-paper rounded-xl font-medium outline-none cursor-pointer"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Needs Attention">Needs Attention</option>
                      <option value="Endangered">Endangered</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newSite.latitude}
                      onChange={e => setNewSite(prev => ({ ...prev, latitude: parseFloat(e.target.value) }))}
                      className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newSite.longitude}
                      onChange={e => setNewSite(prev => ({ ...prev, longitude: parseFloat(e.target.value) }))}
                      className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Cover Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/... or /uploads/..."
                    value={newSite.coverImage}
                    onChange={e => setNewSite(prev => ({ ...prev, coverImage: e.target.value }))}
                    className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={newSite.shortDescription}
                    onChange={e => setNewSite(prev => ({ ...prev, shortDescription: e.target.value }))}
                    className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Historical Narrative</label>
                  <textarea
                    rows={3}
                    value={newSite.history}
                    onChange={e => setNewSite(prev => ({ ...prev, history: e.target.value }))}
                    className="w-full p-2.5 skeuo-recessed rounded-xl font-medium outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddSite(false)}
                    className="skeuo-btn-paper px-4 py-2 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="skeuo-btn-terracotta px-6 py-2 rounded-xl font-bold"
                  >
                    Save Heritage Site
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sites Table */}
          <div className="skeuo-card rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-200/60 dark:bg-stone-800/60 border-b border-stone-300 dark:border-stone-700 text-ink/75 dark:text-night-muted uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3.5">Monument</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">District</th>
                  <th className="p-3.5">Era</th>
                  <th className="p-3.5">Views</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {sites.map(s => (
                  <tr key={s.id} className="hover:bg-amber-100/30 dark:hover:bg-amber-950/20 transition-colors">
                    <td className="p-3.5 font-serif font-bold text-ink dark:text-night-text flex items-center gap-2 skeuo-letterpress">
                      <img src={s.coverImage} alt={s.name} className="w-8 h-8 rounded-md object-cover shadow-xs border border-stone-300 dark:border-stone-700" />
                      <span>{s.name}</span>
                    </td>
                    <td className="p-3.5 capitalize font-medium">{s.category}</td>
                    <td className="p-3.5">{s.district}</td>
                    <td className="p-3.5">{s.era}</td>
                    <td className="p-3.5 font-bold text-terracotta">{s.views}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteSite(s.id)}
                        className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="Delete site"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. MEDIA UPLOADS TOOL */}
      {activeTab === 'uploads' && (
        <div className="max-w-xl mx-auto skeuo-card p-8 rounded-3xl border-2 border-brass/50 shadow-2xl space-y-6 text-center relative">
          <div className="absolute top-2.5 left-2.5 skeuo-rivet" />
          <div className="absolute top-2.5 right-2.5 skeuo-rivet" />

          <div className="w-16 h-16 mx-auto skeuo-wax-seal flex items-center justify-center text-white mb-2 shadow-xl">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-ink dark:text-night-text skeuo-letterpress">
            Upload Local Architectural Photography
          </h3>
          <p className="text-xs text-ink/70 dark:text-night-muted">
            Uploaded files are stored locally in <span className="font-mono font-bold text-terracotta">/server/uploads</span> and validated up to 10MB.
          </p>

          <form onSubmit={handleImageUpload} className="space-y-4">
            <div className="p-4 skeuo-recessed rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700">
              <input
                type="file"
                accept="image/*"
                onChange={e => setUploadFile(e.target.files ? e.target.files[0] : null)}
                className="text-xs text-ink/75"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={uploading || !uploadFile}
                className="skeuo-btn-terracotta px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50"
              >
                {uploading ? 'Processing Image...' : 'Upload Image to Vault'}
              </button>
            </div>
          </form>

          {uploadedUrl && (
            <div className="p-4 rounded-2xl skeuo-recessed border border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs space-y-2">
              <span className="font-bold block">File uploaded successfully!</span>
              <code className="block p-2 bg-white dark:bg-night-card rounded-lg border text-[11px] select-all">
                {uploadedUrl}
              </code>
              <img src={uploadedUrl} alt="Uploaded preview" className="w-32 h-32 object-cover rounded-xl mx-auto shadow-md border border-stone-300" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};