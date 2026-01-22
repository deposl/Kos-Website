
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Twitter, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

const Home: React.FC = () => {
  const { content } = useSite();
  const { home, branding } = content;
  
  // Slider variants for the horizontal slide effect with direction support
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  // Swipe logic constants
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Hero Slider Logic
  const heroImages = home.heroImages && home.heroImages.length > 0 ? home.heroImages : [home.heroImage];
  const [[heroIdx, heroDirection], setHeroPage] = useState([0, 0]);

  const paginateHero = (newDirection: number) => {
    setHeroPage([ (heroIdx + newDirection + heroImages.length) % heroImages.length, newDirection ]);
  };

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      paginateHero(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroIdx, heroImages.length]);

  // Service Slider Logic
  const serviceImages = home.serviceImages && home.serviceImages.length > 0 ? home.serviceImages : ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"];
  const [[serviceIdx, serviceDirection], setServicePage] = useState([0, 0]);

  const paginateService = (newDirection: number) => {
    setServicePage([ (serviceIdx + newDirection + serviceImages.length) % serviceImages.length, newDirection ]);
  };

  useEffect(() => {
    if (serviceImages.length <= 1) return;
    const interval = setInterval(() => {
      paginateService(1);
    }, 4500);
    return () => clearInterval(interval);
  }, [serviceIdx, serviceImages.length]);

  // Section refs for localized scroll tracking
  const philosophyRef = useRef<HTMLElement>(null);
  
  // Global scroll for Hero
  const { scrollY } = useScroll();
  
  // Section-specific scroll for Philosophy
  const { scrollYProgress: philosophyProgress } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for Hero
  const heroTextXLeft = useTransform(scrollY, [0, 800], [0, -200]);
  const heroTextXRight = useTransform(scrollY, [0, 800], [0, 200]);
  const heroImgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const heroBgTextX = useTransform(scrollY, [0, 1000], [0, -300]);

  // Philosophy Kinetic Scroll
  const rawKineticLine1X = useTransform(philosophyProgress, [0, 1], [400, -400]);
  const rawKineticLine2X = useTransform(philosophyProgress, [0, 1], [-400, 400]);
  const rawKineticBgX = useTransform(philosophyProgress, [0, 1], [-600, 600]);

  const kineticLine1X = useSpring(rawKineticLine1X, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const kineticLine2X = useSpring(rawKineticLine2X, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const kineticBgX = useSpring(rawKineticBgX, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <div className="bg-white text-dark overflow-hidden font-sans fade-in">
      {/* Hero Section */}
      <section className="relative h-auto md:h-[88vh] flex flex-col md:flex-row bg-white pt-24 md:pt-36 gpu-accelerated overflow-hidden border-b border-gray-50">
        
        {/* Right Column (Visuals - Image Slider) */}
        <div className="w-full md:w-[55%] h-[50vh] md:h-full relative overflow-hidden bg-gray-100 order-1 md:order-2 touch-pan-y">
          <motion.div 
            style={{ scale: heroImgScale }}
            className="w-full h-full relative"
          >
            <AnimatePresence mode="popLayout" initial={false} custom={heroDirection}>
              <motion.img 
                key={heroIdx}
                src={heroImages[heroIdx]} 
                custom={heroDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginateHero(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginateHero(-1);
                  }
                }}
                alt={`Hero Showcase ${heroIdx + 1}`} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 ease-in-out cursor-grab active:cursor-grabbing transform-gpu"
                loading="eager" 
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-10 pointer-events-none z-10" />
            
            {/* Slider Indicators */}
            {heroImages.length > 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                {heroImages.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 transition-all duration-500 rounded-full ${i === heroIdx ? 'w-10 bg-accent' : 'w-4 bg-white/30'}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
          
          <div className="absolute bottom-0 right-0 z-30">
            <div className="bg-[#eeeeee] p-6 md:p-8 w-40 md:w-48 shadow-lg border-t border-l border-black/5">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 block mb-2 leading-none">CURRENT <br/>FOCUS</span>
              <span className="text-[11px] font-black text-black uppercase italic tracking-tighter leading-tight block">
                {home.heroMood}
              </span>
            </div>
          </div>
        </div>

        {/* Left Column (Content) */}
        <div className="w-full md:w-[45%] p-8 sm:p-14 md:p-16 lg:px-24 pt-12 md:pt-0 flex flex-col justify-center relative z-20 bg-white order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="mb-6 md:mb-8 flex flex-col">
              <motion.h1 style={{ x: heroTextXLeft }} className="text-6xl md:text-[8vw] font-display font-black uppercase tracking-tighter leading-[0.75] italic mb-0 whitespace-nowrap">
                {home.heroTitle.split(' ')[0]}
              </motion.h1>
              <motion.h1 style={{ x: heroTextXRight }} className="text-6xl md:text-[8vw] font-display font-black uppercase tracking-tighter leading-[0.75] italic text-hollow whitespace-nowrap">
                {home.heroSubTitle}
              </motion.h1>
            </div>
            
            <p className="text-gray-500 max-w-sm mb-10 text-sm md:text-base leading-relaxed font-medium tracking-tight">
              {home.heroDescription}
            </p>
            
            <div className="flex space-x-10 mb-12 items-center">
              <motion.a href={branding.socialLinks.instagram} target="_blank" whileHover={{ scale: 1.2, color: 'var(--accent-color)' }} className="text-dark transition-colors"><Instagram size={24} strokeWidth={1.5} /></motion.a>
              <motion.a href={branding.socialLinks.youtube} target="_blank" whileHover={{ scale: 1.2, color: 'var(--accent-color)' }} className="text-dark transition-colors"><Youtube size={24} strokeWidth={1.5} /></motion.a>
              <motion.a href={branding.socialLinks.twitter} target="_blank" whileHover={{ scale: 1.2, color: 'var(--accent-color)' }} className="text-dark transition-colors"><Twitter size={24} strokeWidth={1.5} /></motion.a>
              <motion.a href={branding.socialLinks.linkedin} target="_blank" whileHover={{ scale: 1.2, color: 'var(--accent-color)' }} className="text-dark transition-colors"><Linkedin size={24} strokeWidth={1.5} /></motion.a>
              <motion.a href={branding.socialLinks.facebook} target="_blank" whileHover={{ scale: 1.2, color: 'var(--accent-color)' }} className="text-dark transition-colors"><Facebook size={24} strokeWidth={1.5} /></motion.a>
            </div>
          </motion.div>

          <div className="absolute bottom-4 left-8 md:left-24 overflow-hidden hidden md:block">
             <motion.h2 
               style={{ x: heroBgTextX }}
               className="text-[10vw] font-display font-black uppercase leading-none tracking-tighter text-black/[0.03] select-none pointer-events-none whitespace-nowrap"
             >
              {home.heroWatermark}
             </motion.h2>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 border-b border-gray-100 bg-gray-50 overflow-hidden hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-12 grayscale opacity-30">
           {(home.clients || []).slice(0, 4).map((client, i) => (
             <span key={i} className="font-display font-black uppercase tracking-[0.3em] text-xl">{client.name}</span>
           ))}
           {(!home.clients || home.clients.length === 0) && (
              <>
                <span className="font-display font-black uppercase tracking-[0.3em] text-xl">Nike</span>
                <span className="font-display font-black uppercase tracking-[0.3em] text-xl">Adobe</span>
                <span className="font-display font-black uppercase tracking-[0.3em] text-xl">Red Bull</span>
                <span className="font-display font-black uppercase tracking-[0.3em] text-xl">Samsung</span>
              </>
           )}
        </div>
      </section>

      {/* Philosophy Kinetic Section */}
      <section 
        ref={philosophyRef}
        className="py-44 md:py-64 bg-dark text-white relative overflow-hidden flex items-center justify-center"
      >
        <motion.div 
          style={{ x: kineticBgX }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-[0.04] select-none pointer-events-none"
        >
          <span className="text-[60vw] font-display font-black uppercase tracking-tighter italic">STORIES</span>
        </motion.div>

        <div className="relative z-10 w-full text-center flex flex-col items-center justify-center">
          <motion.div style={{ x: kineticLine1X }} className="flex flex-col mb-4 md:mb-6">
            <h2 className="text-6xl md:text-[9vw] font-display font-black uppercase tracking-tighter leading-none italic whitespace-nowrap">
              {home.philosophyLine1}
            </h2>
          </motion.div>
          <motion.div style={{ x: kineticLine2X }}>
            <h2 className="text-6xl md:text-[9vw] font-display font-black uppercase tracking-tighter leading-none italic text-accent whitespace-nowrap">
              {home.philosophyLine2}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Service Teasers (Slider implemented here) */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="flex-1 relative group">
          <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden shadow-2xl touch-pan-y">
             <AnimatePresence mode="popLayout" initial={false} custom={serviceDirection}>
               <motion.img 
                 key={serviceIdx}
                 src={serviceImages[serviceIdx]} 
                 custom={serviceDirection}
                 variants={slideVariants}
                 initial="enter"
                 animate="center"
                 exit="exit"
                 transition={slideTransition}
                 drag="x"
                 dragConstraints={{ left: 0, right: 0 }}
                 dragElastic={1}
                 onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginateService(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginateService(-1);
                  }
                 }}
                 alt="Production Showcase" 
                 className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] cursor-grab active:cursor-grabbing" 
                 loading="lazy" 
               />
             </AnimatePresence>
             <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
             <motion.div whileHover={{ rotate: 0, scale: 1.05 }} initial={{ rotate: 5 }} className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-accent text-dark p-10 flex flex-col justify-center shadow-2xl z-20 cursor-pointer pointer-events-none md:pointer-events-auto">
                <span className="font-display font-black uppercase text-3xl italic leading-[0.8] mb-3 tracking-tighter">
                  {home.serviceCardTitle.split(' ')[0]} <br/> {home.serviceCardTitle.split(' ').slice(1).join(' ')}
                </span>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-50">{home.serviceCardLabel}</span>
             </motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex-1 space-y-20 py-10">
          {home.services.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="max-w-md group cursor-default">
              <motion.div whileInView={{ width: '80px' }} initial={{ width: 0 }} className="h-1.5 bg-dark mb-8 origin-left" />
              <h3 className="text-lg font-black uppercase tracking-[0.3em] mb-5 group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed font-medium">{item.desc}</p>
              <Link to="/services" className="text-[10px] font-black uppercase tracking-[0.5em] border-b-2 border-gray-100 hover:border-dark pb-3 inline-flex items-center transition-all group-hover:pl-4">
                EXPLORE <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-44 bg-white px-6 overflow-hidden border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 md:gap-32">
          <div className="flex-1 relative">
             <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="aspect-[4/5] bg-gray-50 overflow-hidden relative shadow-2xl gpu-accelerated">
               <img src={home.aboutImage || "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop"} alt="About" className="w-full h-full object-cover transition-all duration-700 hover:scale-105 grayscale hover:grayscale-0 transform-gpu" loading="lazy" />
             </motion.div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
             <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter mb-10 md:mb-14 leading-[0.9]">
               {home.aboutTitle}
             </motion.h2>
             <div className="space-y-8 text-gray-500 text-base md:text-lg leading-relaxed mb-14 max-w-lg font-medium">
               {home.aboutText.map((p, i) => <p key={i}>{p}</p>)}
             </div>
             
             <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-gray-100 pt-16">
               {home.stats.map((stat, i) => (
                 <motion.div key={i} whileHover={{ y: -8 }} className="group">
                    <div className="flex items-center space-x-1 mb-3">
                      <span className="text-2xl md:text-4xl font-display font-black tracking-tighter group-hover:text-accent transition-colors">{stat.value}</span>
                    </div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-dark transition-colors">{stat.label}</span>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Work Clients Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="w-full border-t border-b border-dark/10 py-10 md:py-14 text-center">
          <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-[0.15em] text-dark leading-none italic">
            I WORK WITH INCREDIBLE BRANDS
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {(home.clients || []).map((client, idx) => (
            <div key={idx} className={`h-40 md:h-64 flex items-center justify-center p-8 md:p-12 border-dark/5 ${idx % 2 !== 0 ? 'border-l' : ''} ${idx % 4 !== 0 ? 'lg:border-l' : ''} ${idx >= 2 ? 'border-t' : ''} ${idx >= 4 ? 'lg:border-t' : 'lg:border-t-0'}`}>
              <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <Link to="/contact" className="block relative group overflow-hidden">
         <motion.div whileHover={{ backgroundColor: 'var(--accent-color)', color: '#000000' }} className="bg-dark text-white py-20 md:py-32 text-center transition-colors duration-500">
           <motion.div className="text-3xl sm:text-4xl md:text-7xl font-display font-black uppercase tracking-tighter inline-flex items-center italic px-4" initial={{ x: 0 }} whileHover={{ x: 30 }}>
             LET'S WORK TOGETHER <ArrowRight className="ml-6 md:ml-12 w-10 h-10 md:w-16 md:h-16" />
           </motion.div>
         </motion.div>
         <motion.div className="absolute bottom-0 left-0 h-2 bg-accent" initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
      </Link>
    </div>
  );
};

export default Home;
