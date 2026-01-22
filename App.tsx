
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

const AppContent: React.FC = () => {
  const { isLoading, content } = useSite();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center"
        >
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-32 h-32 rounded-full border border-accent/30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-display font-black text-xs tracking-tighter text-center leading-none uppercase">
                {content.branding.logoText || "KOSTA"}<br/>{content.branding.logoSubText || "GENARIS"}
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 2, ease: "linear" }}
            className="h-[1px] bg-accent mt-8"
          />
        </motion.div>
      ) : (
        <motion.div 
          key="site"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col min-h-screen"
        >
          <Navbar />
          <main className="flex-grow">
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
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
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
