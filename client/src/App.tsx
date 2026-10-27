import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Sites } from './pages/Sites';
import { SiteDetail } from './pages/SiteDetail';
import { ExploreMap } from './pages/ExploreMap';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { Timeline } from './pages/Timeline';
import { Stories } from './pages/Stories';
import { StoryDetail } from './pages/StoryDetail';
import { Gallery } from './pages/Gallery';
import { Contribute } from './pages/Contribute';
import { About } from './pages/About';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-parchment-texture text-ink dark:bg-night-bg dark:text-night-text transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/sites/:slug" element={<SiteDetail />} />
            <Route path="/map" element={<ExploreMap />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:slug" element={<StoryDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
