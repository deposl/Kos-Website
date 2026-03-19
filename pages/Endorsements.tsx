
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Award, PlayCircle } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import { getCalApi } from "@calcom/embed-react";
import { PageSections } from '../components/PageSections';

const Endorsements: React.FC = () => {
  const { content } = useSite();
  const { endorsements } = content;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  const getIcon = (title: string) => {
    if (title.includes('Spark')) return Zap;
    if (title.includes('Experiential')) return Target;
    if (title.includes('Partnerships')) return Award;
    return PlayCircle;
  };

  return (
    <div className="pt-20 md:pt-28 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center mb-20 pt-8 md:pt-12">
          <div className="flex-1">
            <h1 className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              {endorsements.headerTitle.split(' ')[0]} <br /> <span className="text-gray-200">{endorsements.headerTitle.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-xl font-medium leading-relaxed">
              {endorsements.headerDescription}
            </p>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-full -z-10 blur-3xl opacity-20" />
            <img 
              src={endorsements.mainImage} 
              alt="Partnership" 
              className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 border border-gray-100 shadow-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 md:mb-32">
          {endorsements.options.map((opt, idx) => {
            const IconComponent = getIcon(opt.title);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#f8f8f8] border border-gray-50 p-8 rounded-sm hover:border-accent transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-sm flex items-center justify-center text-dark mb-6 group-hover:bg-accent transition-colors shadow-sm">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-display font-black uppercase mb-3 tracking-tighter">{opt.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{opt.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Sections */}
        <div className="mb-24">
          <PageSections sections={endorsements.sections} />
        </div>

        <div className="bg-dark rounded-sm p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent opacity-[0.03]" />
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter mb-8 relative z-10">
            {endorsements.ctaTitle}
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-medium relative z-10">
            {endorsements.ctaDescription}
          </p>
          <button 
            data-cal-namespace="30min"
            data-cal-link="kosta-genaris-4slqyp/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="inline-block bg-accent text-dark px-12 py-5 rounded-sm font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-transform relative z-10"
          >
            BOOK A FREE CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default Endorsements;
