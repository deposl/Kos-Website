
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSite } from '../contexts/SiteContext';
import { ArrowLeft, Tag, ExternalLink, ShieldCheck } from 'lucide-react';

const FavoriteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useSite();
  const item = content.favorites.find((f) => f.id === id);

  if (!item) {
    return (
      <div className="pt-24 md:pt-36 pb-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter mb-4">Item Not Found</h1>
          <Link to="/favorites" className="text-accent bg-dark px-8 py-3 rounded-sm font-black uppercase tracking-widest text-xs inline-block">Back to Favorites</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-36 pb-20 bg-white min-h-screen overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <Link to="/favorites" className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] mb-12 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Curated List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden shadow-2xl border border-gray-100">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-dark p-6 md:p-8 rounded-sm shadow-2xl flex flex-col items-center">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Promo Code</span>
               <span className="text-xl md:text-2xl font-display font-black uppercase italic tracking-tighter">{item.code}</span>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
              <div className="flex items-center gap-2 text-accent mb-4">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Verified Creator Gear</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-none mb-6 break-words">
                {item.name}
              </h1>
              <div className="prose prose-stone prose-sm md:prose-base lg:prose-lg max-w-none text-gray-500 font-medium leading-relaxed break-words">
                {item.desc}
              </div>
            </div>

            <div className="bg-gray-50 p-8 border border-gray-100 rounded-sm space-y-6">
               <div className="flex items-center justify-between">
                 <span className="font-black uppercase tracking-widest text-[10px] text-gray-400">Status</span>
                 <span className="font-black uppercase tracking-widest text-[10px] text-green-500">Active Deal</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="font-black uppercase tracking-widest text-[10px] text-gray-400">Exclusive Link</span>
                 <span className="font-black uppercase tracking-widest text-[10px] text-dark">Verified Referral</span>
               </div>
               <button className="w-full bg-dark text-white py-6 rounded-sm font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-accent hover:text-dark transition-all shadow-xl">
                 Shop This Item <ExternalLink size={16} />
               </button>
            </div>

            <div className="pt-10 border-t border-gray-100">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Disclaimer</h4>
               <p className="text-[11px] text-gray-400 leading-relaxed uppercase font-bold tracking-wider">
                 I only recommend products I actually use and trust. Clicking links on this page may result in a small commission that helps support the channel at no extra cost to you.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteDetail;
