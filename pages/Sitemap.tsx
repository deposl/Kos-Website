
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';
import { Map, ArrowRight, BookOpen, Star, Globe, Share2 } from 'lucide-react';

const Sitemap: React.FC = () => {
  const { content } = useSite();
  const { navLinks, blogs, favorites } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 pt-8 md:pt-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-dark text-accent flex items-center justify-center rounded-sm shadow-2xl">
              <Map size={32} />
            </div>
            <div>
              <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none">
                SITE<span className="text-gray-200">MAP</span>
              </h1>
              <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px] mt-2">Full Digital Index & Architecture</p>
            </div>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Sitemap link copied to clipboard!");
            }}
            className="flex items-center gap-3 bg-[#f8f8f8] border border-gray-100 px-6 py-3 rounded-sm font-black uppercase tracking-widest text-[10px] hover:bg-dark hover:text-white transition-all self-start md:self-center"
          >
            <Share2 size={14} /> Copy Index Link
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20"
        >
          {/* Main Directory */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-3 border-b-4 border-dark pb-3">
              <Globe size={18} className="text-accent" />
              <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">Directory</h2>
            </div>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-3 text-dark/60 hover:text-dark transition-colors"
                  >
                    <span className="font-black uppercase tracking-widest" style={{ fontSize: 'var(--font-nav, 15px)' }}>{link.name}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Journal Archive */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-3 border-b-4 border-dark pb-3">
              <BookOpen size={18} className="text-accent" />
              <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">The Journal</h2>
            </div>
            {blogs.length > 0 ? (
              <ul className="space-y-4">
                {blogs.map((post) => (
                  <li key={post.id}>
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="group block"
                    >
                      <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest block mb-1">{post.date}</span>
                      <span className="font-bold uppercase tracking-tight text-dark/70 group-hover:text-accent transition-colors block leading-tight" style={{ fontSize: '15px' }}>{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">No articles found.</p>
            )}
          </motion.div>

          {/* Creator Favorites */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-3 border-b-4 border-dark pb-3">
              <Star size={18} className="text-accent" />
              <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">Curated Gear</h2>
            </div>
            <ul className="space-y-4">
              <li>
                <Link to="/favorites" className="font-black uppercase tracking-widest text-accent hover:underline decoration-2 underline-offset-4" style={{ fontSize: 'var(--font-nav, 15px)' }}>Master Favorites List</Link>
              </li>
              {favorites.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={`/favorites/${item.id}`} 
                    className="text-dark/60 hover:text-dark transition-colors font-bold uppercase tracking-tight block group"
                    style={{ fontSize: '15px' }}
                  >
                    <span className="group-hover:text-accent transition-colors">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sitemap;
