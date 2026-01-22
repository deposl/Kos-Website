
import React from 'react';
import { Instagram, Youtube, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
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
              <a href="#" className="hover:text-accent transition-colors"><Instagram size={24}/></a>
              <a href="#" className="hover:text-accent transition-colors"><Youtube size={24}/></a>
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={24}/></a>
              <a href="#" className="hover:text-accent transition-colors"><Linkedin size={24}/></a>
            </div>

            <div className="w-full max-w-sm">
              <form className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="bg-transparent border border-gray-800 px-4 py-4 text-sm flex-grow focus:outline-none focus:border-white transition-colors"
                />
                <button className="bg-gray-800 px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-dark transition-all">
                  SUBSCRIBE
                </button>
              </form>
              <div className="mt-6 text-xs uppercase tracking-widest text-gray-600 font-bold text-center md:text-right">
                BUILT BY <span className="text-gray-400">CREATORPRO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-600 gap-6">
          <p className="text-center md:text-left">© {new Date().getFullYear()} SEVA MOZHAEV T/AS SEVS PICS | ALL RIGHTS RESERVED</p>
          <div className="flex space-x-10">
            <Link to="/admin" className="hover:text-gray-400 transition-colors">ADMIN LOGIN</Link>
            <Link to="/sitemap" className="hover:text-gray-400 transition-colors">SITEMAP</Link>
            <a href="#" className="hover:text-gray-400">WEBSITE BY BARE.DIGITAL</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
