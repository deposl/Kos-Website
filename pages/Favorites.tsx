
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tag, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

const Favorites: React.FC = () => {
  const { content } = useSite();
  const items = content.favorites;

  return (
    <div className="pt-20 md:pt-28 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 pt-8 md:pt-12">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter mb-6"
          >
            FAVOURITE <span className="text-gray-200">THINGS</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            The tools, gear, and software I actually use to run my business and life. 
            No fluff, just essentials with exclusive discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#f8f8f8] border border-gray-100 rounded-sm overflow-hidden group hover:border-accent transition-all"
            >
              <Link to={`/favorites/${item.id}`} className="block relative aspect-square overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute top-6 right-6">
                  <div className="bg-accent text-dark font-black px-4 py-2 rounded-sm text-[10px] flex items-center shadow-2xl tracking-widest">
                    <Tag className="w-3 h-3 mr-2" /> {item.code}
                  </div>
                </div>
                <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white text-dark p-3 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-transform">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
              <div className="p-8">
                <Link to={`/favorites/${item.id}`}>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-4 group-hover:text-accent transition-colors">{item.name}</h3>
                </Link>
                <p className="text-gray-500 mb-8 text-base leading-relaxed line-clamp-2">{item.desc}</p>
                <Link to={`/favorites/${item.id}`} className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-100 py-4 rounded-sm font-black uppercase text-xs tracking-[0.3em] hover:bg-dark hover:text-white transition-all">
                  <span>GET EXCLUSIVE DEAL</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
