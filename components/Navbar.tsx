
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '../contexts/SiteContext';

const Navbar: React.FC = () => {
  const { content } = useSite();
  const { branding, navLinks } = content;
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed w-full z-[100] bg-black top-0 h-24 md:h-36 flex items-center shadow-lg border-b border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex justify-between items-center">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-6 md:gap-12">
          <Link to="/" className="flex items-center">
            <div className="w-[60px] h-[60px] md:w-[88px] md:h-[88px] bg-white rounded-full flex items-center justify-center p-2 border border-white/20 transition-transform hover:scale-105 duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden">
              <div className="text-black font-display font-black text-[9px] md:text-[14px] leading-[0.8] text-center tracking-tighter flex flex-col items-center justify-center h-full uppercase">
                <span className="block">{branding.logoText}</span>
                <span className="block">{branding.logoSubText}</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.filter(link => !link.isButton).map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`text-[15px] font-display font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-accent' : 'text-white hover:text-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Button & Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Main Contact Button (Mobile & Desktop) */}
          {navLinks.filter(link => link.isButton).map((link) => (
            <Link 
              key={link.id}
              to={link.path} 
              className="flex items-center justify-center border border-white px-4 md:px-8 py-2 md:py-3 text-[10px] md:text-[15px] font-display font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Menu Toggle (Visible only on Mobile/Tablet) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden bg-accent text-dark w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-sm transition-transform active:scale-95 z-[110]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay (Only functional on mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[105] pt-32 px-10 flex flex-col lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`text-4xl font-display font-black uppercase tracking-tighter mb-8 transition-colors ${
                  location.pathname === link.path ? 'text-accent' : 'text-white hover:text-accent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Social Links inside Mobile Menu */}
            <div className="mt-auto pb-12 flex gap-6 grayscale opacity-50 border-t border-white/10 pt-8">
               <span className="text-[10px] font-black uppercase tracking-widest text-white">Instagram</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-white">TikTok</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-white">YouTube</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
