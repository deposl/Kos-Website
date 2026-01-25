
import React, { useState } from 'react';
import { Instagram, Youtube, Twitter, Linkedin, Facebook, Loader2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';
import { createClient } from '@supabase/supabase-js';

// TikTok Icon SVG
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.944 4.944 0 0 1-3.218-1.182V13.38c0 3.123-2.532 5.655-5.655 5.655-3.123 0-5.655-2.532-5.655-5.655 0-3.122 2.532-5.655 5.655-5.655.154 0 .305.01.455.03v2.869c-.149-.03-.302-.047-.455-.047-1.531 0-2.771 1.24-2.771 2.771 0 1.53 1.24 2.771 2.771 2.771 1.53 0 2.771-1.24 2.771-2.771V2.606h2.883a4.947 4.947 0 0 0 4.944 4.944v2.883a7.803 7.803 0 0 1-1.455-.133v-3.614z" />
  </svg>
);

const Footer: React.FC = () => {
  const { content, dbConfig } = useSite();
  const { branding } = content;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const supabase = createClient(dbConfig.url, dbConfig.key);
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error && error.code !== '23505') { // Ignore unique constraint errors (already subscribed)
        throw error;
      }
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
          {/* Brand & Tagline */}
          <div>
            <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter leading-none mb-8">
              CREATIVE SOCIAL SOLUTIONS
            </h2>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest text-gray-400">
              <li><Link to="/services" className="hover:text-accent border-b border-gray-800 pb-1 inline-block transition-colors">TIKTOK CONSULTING</Link></li>
              <li><Link to="/endorsements" className="hover:text-accent border-b border-gray-800 pb-1 inline-block transition-colors">ENDORSEMENTS</Link></li>
              <li><Link to="/blog" className="hover:text-accent border-b border-gray-800 pb-1 inline-block transition-colors">JOURNAL / BLOG</Link></li>
              <li><Link to="/favorites" className="hover:text-accent border-b border-gray-800 pb-1 inline-block transition-colors">SEV'S FAVOURITE THINGS</Link></li>
              <li><Link to="/contact" className="hover:text-accent border-b border-gray-800 pb-1 inline-block transition-colors">CONTACT</Link></li>
            </ul>
          </div>

          {/* Spacer / Logo Section */}
          <div className="hidden lg:flex items-center justify-center">
             {/* Dynamic space or additional branding */}
          </div>

          {/* Socials & Newsletter */}
          <div className="flex flex-col items-end">
            <div className="flex space-x-8 mb-12">
              <a href={branding.socialLinks.tiktok} target="_blank" className="hover:text-accent transition-colors"><TikTokIcon size={24}/></a>
              <a href={branding.socialLinks.instagram} target="_blank" className="hover:text-accent transition-colors"><Instagram size={24}/></a>
              <a href={branding.socialLinks.youtube} target="_blank" className="hover:text-accent transition-colors"><Youtube size={24}/></a>
              <a href={branding.socialLinks.facebook} target="_blank" className="hover:text-accent transition-colors"><Facebook size={24}/></a>
              <a href={branding.socialLinks.linkedin} target="_blank" className="hover:text-accent transition-colors"><Linkedin size={24}/></a>
              <a href={branding.socialLinks.twitter} target="_blank" className="hover:text-accent transition-colors"><Twitter size={24}/></a>
            </div>

            <div className="w-full max-w-sm">
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input 
                  type="email" 
                  required
                  placeholder={status === 'success' ? "Subscribed!" : "Email Address"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-transparent border ${status === 'error' ? 'border-red-500' : 'border-gray-800'} px-4 py-4 text-sm flex-grow focus:outline-none focus:border-white transition-colors`}
                  disabled={status === 'loading' || status === 'success'}
                />
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`${status === 'success' ? 'bg-green-500' : 'bg-gray-800'} px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-dark transition-all flex items-center justify-center min-w-[120px]`}
                >
                  {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : 
                   status === 'success' ? <Check size={16} /> : "SUBSCRIBE"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-600 gap-6">
          <p className="text-center md:text-left">
            COPYRIGHT © {new Date().getFullYear()} {branding.siteName} | ALL RIGHTS RESERVED
          </p>
          <div className="flex space-x-10">
            <Link to="/admin" className="hover:text-gray-400 transition-colors">ADMIN LOGIN</Link>
            <Link to="/sitemap" className="hover:text-gray-400 transition-colors">SITEMAP</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
