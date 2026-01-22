
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Search, TrendingUp, Users, Video, ArrowUpRight } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

const Services: React.FC = () => {
  const { content } = useSite();
  const { services } = content;

  return (
    <div className="pt-24 md:pt-36 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mb-32 pt-12 md:pt-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-black uppercase tracking-[0.5em] text-accent bg-dark px-6 py-3 rounded-sm inline-block mb-10"
          >
            {services.headerLabel}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-[0.85] mb-12"
          >
            {services.headerTitle.split(' ')[0]} <br />
            <span className="text-gray-200">{services.headerTitle.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
            {services.headerDescription}
          </p>
        </div>

        {/* Dynamic Service Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
          {services.serviceBlocks.map((service, sIdx) => (
            <motion.div 
              key={sIdx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.2 }}
              className="bg-[#f8f8f8] p-12 md:p-16 rounded-sm border border-gray-100 relative group overflow-hidden"
            >
              <div className="absolute top-10 right-10 text-gray-200 group-hover:text-accent group-hover:rotate-12 transition-all duration-500">
                {sIdx === 0 ? <TrendingUp size={48} /> : <Video size={48} />}
              </div>
              <h2 className="text-4xl font-display font-black uppercase italic mb-10 tracking-tighter group-hover:translate-x-2 transition-transform">{service.title}</h2>
              <ul className="space-y-6 relative z-10">
                {service.items.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    whileHover={{ x: 10 }}
                    className="flex items-center text-lg text-gray-600 font-bold group/item"
                  >
                    <CheckCircle2 className="w-6 h-6 text-accent mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                className="mt-12 inline-flex items-center text-xs font-black uppercase tracking-[0.3em] cursor-pointer"
                whileHover={{ gap: '20px' }}
              >
                Inquire Now <ArrowUpRight size={16} className="text-accent" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Animated Process Section */}
        <div className="mb-40">
          <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter">OUR <span className="text-gray-200">DNA</span></h2>
            <div className="h-[2px] flex-grow bg-gray-100" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {services.processes.map((p, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="bg-white border border-gray-100 p-10 rounded-sm shadow-sm hover:shadow-2xl transition-all group"
              >
                <div className="text-5xl font-display font-black text-gray-100 mb-8 group-hover:text-accent transition-colors">0{idx + 1}</div>
                <h3 className="text-xl font-display font-black uppercase mb-4 tracking-tighter">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-dark rounded-sm px-6 py-16 md:p-20 text-center text-white relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-4xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-[1.1] md:leading-none mb-12 relative z-10">
            {services.ctaTitle.split(' ')[0]} <br /> <span className="text-accent underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8">{services.ctaTitle.split(' ').slice(1).join(' ')}</span>
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-dark px-8 md:px-16 py-6 rounded-sm font-black uppercase tracking-[0.4em] text-xs md:text-sm relative z-10 transition-colors shadow-2xl"
          >
            Start Your Transformation
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
};

export default Services;
