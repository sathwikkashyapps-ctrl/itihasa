import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@itihasa.org');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.token, data.user);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md skeuo-card rounded-3xl overflow-hidden border-2 border-brass/50 shadow-2xl relative">
        {/* Wood trim header with brass rivets */}
        <div className="skeuo-wood-panel p-6 text-center relative">
          <div className="absolute top-3 left-3 skeuo-rivet" />
          <div className="absolute top-3 right-3 skeuo-rivet" />

          {/* Central Wax Seal Emblem */}
          <div className="w-16 h-16 mx-auto skeuo-wax-seal flex items-center justify-center text-white mb-2 shadow-xl">
            <Key className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-white skeuo-letterpress">
            Archivist Vault Access
          </h2>
          <p className="text-xs text-amber-200/80 mt-1">
            Authenticate to review community submissions and manage registered monuments.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200 text-xs flex items-center gap-2 border border-rose-200 dark:border-rose-800">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                Curator Credentials
              </label>
              <div className="relative skeuo-recessed rounded-xl flex items-center px-3 py-2 border border-stone-300 dark:border-stone-700">
                <Mail className="w-4 h-4 text-terracotta mr-2 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-ink dark:text-night-text font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink dark:text-night-text mb-1 uppercase tracking-wider">
                Vault Passphrase
              </label>
              <div className="relative skeuo-recessed rounded-xl flex items-center px-3 py-2 border border-stone-300 dark:border-stone-700">
                <Lock className="w-4 h-4 text-terracotta mr-2 flex-shrink-0" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-ink dark:text-night-text font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="skeuo-btn-brass w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold tracking-wide"
              >
                <span>{loading ? 'Unlocking Vault...' : 'Unlock Portal Archive'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="p-3 skeuo-recessed rounded-xl text-center text-[11px] text-ink/65 dark:text-night-muted border border-stone-300 dark:border-stone-700">
            Default Demo Pass: <code className="font-mono font-bold text-terracotta">admin@itihasa.org / admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
};