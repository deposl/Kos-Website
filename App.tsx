
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MetaHead from './components/MetaHead';
import Home from './pages/Home';
import Services from './pages/Services';
import Endorsements from './pages/Endorsements';
import Favorites from './pages/Favorites';
import FavoriteDetail from './pages/FavoriteDetail';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Sitemap from './pages/Sitemap';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import { SiteProvider, useSite } from './contexts/SiteContext';

const Preloader: React.FC<{ logoText: string, logoSubText: string }> = ({ logoText, logoSubText }) => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
  >
    <motion.div 
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] bg-white rounded-full flex items-center justify-center p-4 border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] overflow-hidden"
    >
      <div className="text-black font-display font-black text-[14px] md:text-[18px] leading-[0.8] text-center tracking-tighter flex flex-col items-center justify-center h-full uppercase">
        <span className="block">{logoText}</span>
        <span className="block">{logoSubText}</span>
      </div>
    </motion.div>
  </motion.div>
);

const UnderConstruction: React.FC<{ logoText: string, logoSubText: string }> = ({ logoText, logoSubText }) => (
  <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center p-6 text-center">
    <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] bg-white rounded-full flex items-center justify-center p-4 border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)] overflow-hidden mb-12">
      <div className="text-black font-display font-black text-[14px] md:text-[18px] leading-[0.8] text-center tracking-tighter flex flex-col items-center justify-center h-full uppercase">
        <span className="block">{logoText}</span>
        <span className="block">{logoSubText}</span>
      </div>
    </div>
    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6">Website Under Construction</h1>
    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm max-w-md">
      We are currently improving our digital experience. Please check back soon.
    </p>
  </div>
);

const AppContent: React.FC = () => {
  const { isLoading, content, isAdmin } = useSite();
  const location = useLocation();

  // Logic for Under Construction Mode
  // Show if enabled AND user is NOT on admin routes AND NOT logged in as admin
  const isMaintenanceMode = content.branding.isUnderConstruction;
  const isRestricted = isMaintenanceMode && !isAdmin && !location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Preloader overlays on top — real content renders immediately underneath */}
      <AnimatePresence>
        {isLoading && (
          <Preloader 
            logoText={content.branding.logoText} 
            logoSubText={content.branding.logoSubText} 
          />
        )}
      </AnimatePresence>

      {isRestricted ? (
        <UnderConstruction 
          logoText={content.branding.logoText} 
          logoSubText={content.branding.logoSubText} 
        />
      ) : (
        <>
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/endorsements" element={<Endorsements />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/favorites/:id" element={<FavoriteDetail />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <ScrollToTop />
        <MetaHead />
        <AppContent />
      </Router>
    </SiteProvider>
  );
};

export default App;
