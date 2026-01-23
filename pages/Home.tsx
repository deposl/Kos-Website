
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Twitter, Linkedin, Facebook, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

const Home: React.FC = () => {
  const { content } = useSite();
  const { home, branding } = content;
  
  // Slider variants for the horizontal slide effect
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
    x: { type: "spring" as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

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

  const philosophyRef = useRef<HTMLElement>(null);
  
  // Global scroll for Hero
  const { scrollY } = useScroll();
  
  // Section-specific scroll for Philosophy
  const { scrollYProgress: philosophyProgress } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for Hero - Refined to move in tandem rather than opposite
  const heroTextY = useTransform(scrollY, [0, 800], [0, 80]);
  const heroImgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const heroBgTextX = useTransform(scrollY, [0, 1000], [0, -300]);

  // Philosophy Kinetic Scroll
  const rawKineticLine1X = useTransform(philosophyProgress, [0, 1], [150, -150]);
  const rawKineticLine2X = useTransform(philosophyProgress, [0, 1], [-150, 150]);
  const rawKineticBgX = useTransform(philosophyProgress, [0, 1], [-300, 300]);

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
      transition: { 
        duration: 0.8, 
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number] 
      }
    }
  };

  return (
    <div className="bg-white text-dark overflow-hidden font-sans fade-in">
      {/* Hero Section */}
      <section className="relative h-auto md:min-h-screen flex flex-col md:flex-row bg-white pt-24 md:pt-36 gpu-accelerated overflow-hidden">
        
        {/* Visual Column */}
        <div className="w-full md:w-[50%] h-[50vh] md:h-screen relative overflow-hidden bg-gray-100 order-1 md:order-2 touch-pan-y">
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
                alt="Showcase" 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 transition-all duration-700 cursor-grab active:cursor-grabbing transform-gpu"
                loading="eager" 
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-10 pointer-events-none z-10" />
            
            {heroImages.length > 1 && (
              <div className="absolute bottom-10 left-10 flex space-x-3 z-30">
                {heroImages.map((_, i) => (
                  <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === heroIdx ? 'w-12 bg-accent' : 'w-4 bg-white/20'}`} />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Content Column */}
        <div className="w-full md:w-[50%] p-6 sm:p-14 md:p-16 lg:px-24 flex flex-col justify-center relative z-20 bg-white order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Metadata Strip */}
            <div className="absolute -left-12 top-0 h-full hidden xl:flex flex-col justify-between py-4 border-l border-gray-100 pl-4">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] text-gray-300">EST. 2024</span>
              <div className="w-px h-12 bg-gray-100 self-center" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] text-accent">VERIFIED CREATOR</span>
            </div>

            <motion.div style={{ y: heroTextY }} className="flex flex-col items-center md:items-start text-center md:text-left mb-10">
              <span className="inline-flex items-center gap-2 bg-dark text-accent px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] mb-8">
                <Zap size={10} fill="currentColor" /> Vertical Storytelling Pro
              </span>
              
              <h1 className="text-[15vw] md:text-[10vw] font-display font-black uppercase tracking-tighter leading-[0.8] italic mb-0 break-words">
                {home.heroTitle.split(' ')[0]} <br/>
                <span className="text-accent underline decoration-4 underline-offset-[10px] md:underline-offset-[15px]">{home.heroSubTitle}</span>
              </h1>
            </motion.div>
            
            <p className="text-gray-500 max-w-sm mx-auto md:mx-0 mb-10 text-sm md:text-base leading-relaxed font-medium tracking-tight">
              {home.heroDescription}
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
              <Link 
                to="/contact" 
                className="bg-dark text-white px-10 py-5 rounded-sm font-black uppercase tracking-[0.25em] text-xs hover:bg-accent hover:text-dark transition-all transform hover:scale-105 shadow-xl w-full md:w-auto text-center"
              >
                Let's Connect
              </Link>
              <div className="flex space-x-6 items-center">
                <motion.a href={branding.socialLinks.instagram} target="_blank" whileHover={{ y: -5, color: 'var(--accent-color)' }} className="text-dark"><Instagram size={20}/></motion.a>
                <motion.a href={branding.socialLinks.youtube} target="_blank" whileHover={{ y: -5, color: 'var(--accent-color)' }} className="text-dark"><Youtube size={20}/></motion.a>
                <motion.a href={branding.socialLinks.linkedin} target="_blank" whileHover={{ y: -5, color: 'var(--accent-color)' }} className="text-dark"><Linkedin size={20}/></motion.a>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-4 left-8 md:left-24 overflow-hidden hidden md:block opacity-[0.05]">
             <motion.h2 
               style={{ x: heroBgTextX }}
               className="text-[12vw] font-display font-black uppercase leading-none tracking-tighter text-black select-none pointer-events-none whitespace-nowrap"
             >
              {home.heroWatermark}
             </motion.h2>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-10 border-b border-gray-100 bg-gray-50 overflow-hidden hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-around items-center grayscale opacity-40">
           {(home.clients || []).slice(0, 5).map((client, i) => (
             <div key={i} className="flex items-center gap-3">
               <span className="text-[10px] text-gray-400 font-black">0{i+1}</span>
               <span className="font-display font-black uppercase tracking-[0.3em] text-lg">{client.name}</span>
             </div>
           ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        ref={philosophyRef}
        className="py-12 md:py-32 bg-dark text-white relative overflow-hidden flex items-center justify-center min-h-[40vh]"
      >
        <motion.div style={{ x: kineticBgX }} className="absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
          <span className="text-[35vw] md:text-[60vw] font-display font-black uppercase tracking-tighter italic">STORIES</span>
        </motion.div>

        <div className="relative z-10 w-full text-center flex flex-col items-center justify-center">
          <motion.div style={{ x: kineticLine1X }}>
            <h2 className="text-[11vw] md:text-[9vw] font-display font-black uppercase tracking-tighter leading-none italic whitespace-nowrap">
              {home.philosophyLine1}
            </h2>
          </motion.div>
          <motion.div style={{ x: kineticLine2X }}>
            <h2 className="text-[11vw] md:text-[9vw] font-display font-black uppercase tracking-tighter leading-none italic text-accent whitespace-nowrap md:-mt-4">
              {home.philosophyLine2}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Service Teasers */}
      <section className="pt-16 pb-12 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex-1 relative group">
          <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden shadow-2xl">
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
                 alt="Showcase" 
                 className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]" 
               />
             </AnimatePresence>
             <motion.div initial={{ rotate: 5 }} whileHover={{ rotate: 0, scale: 1.05 }} className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-accent text-dark p-10 flex flex-col justify-center shadow-2xl z-20">
                <span className="font-display font-black uppercase text-3xl italic leading-[0.8] mb-3 tracking-tighter">
                  {home.serviceCardTitle.split(' ')[0]} <br/> {home.serviceCardTitle.split(' ').slice(1).join(' ')}
                </span>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-50">{home.serviceCardLabel}</span>
             </motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex-1 space-y-16 py-10">
          {home.services.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="max-w-md group">
              <motion.div whileInView={{ width: '80px' }} initial={{ width: 0 }} className="h-1.5 bg-dark mb-8 origin-left" />
              <h3 className="text-lg font-black uppercase tracking-[0.3em] mb-5 group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed font-medium">{item.desc}</p>
              <Link to="/services" className="text-[10px] font-black uppercase tracking-[0.5em] border-b-2 border-gray-100 hover:border-dark pb-3 inline-flex items-center transition-all">
                EXPLORE <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white px-6 border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32">
          <div className="flex-1 relative">
             <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="aspect-[4/5] bg-gray-50 overflow-hidden relative shadow-2xl">
               <img src={home.aboutImage} alt="About" className="w-full h-full object-cover transition-all duration-700 hover:scale-105 grayscale hover:grayscale-0" />
             </motion.div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
             <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="text-6xl font-display font-black uppercase tracking-tighter mb-14 leading-[0.9]">
               {home.aboutTitle}
             </motion.h2>
             <div className="space-y-8 text-gray-500 text-lg leading-relaxed mb-14 max-w-lg font-medium">
               {home.aboutText.map((p, i) => <p key={i}>{p}</p>)}
             </div>
             
             <div className="grid grid-cols-3 gap-16 border-t border-gray-100 pt-16">
               {home.stats.map((stat, i) => (
                 <div key={i} className="group">
                    <span className="text-4xl font-display font-black tracking-tighter group-hover:text-accent transition-colors block mb-2">{stat.value}</span>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">{stat.label}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="bg-white">
        <div className="w-full border-t border-b border-dark/10 py-14 text-center">
          <h2 className="text-2xl md:text-5xl font-display font-black uppercase tracking-[0.15em] text-dark leading-none italic">
            I WORK WITH INCREDIBLE BRANDS
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 grayscale opacity-60">
          {(home.clients || []).map((client, idx) => (
            <div key={idx} className="h-64 flex items-center justify-center p-12 border-dark/5 hover:grayscale-0 hover:opacity-100 transition-all border-l border-t last:border-r">
              <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <Link to="/contact" className="block relative group overflow-hidden">
         <motion.div whileHover={{ backgroundColor: 'var(--accent-color)', color: '#000000' }} className="bg-dark text-white py-24 text-center transition-colors duration-500">
           <motion.div className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter inline-flex items-center italic" whileHover={{ x: 30 }}>
             LET'S WORK TOGETHER <ArrowRight className="ml-12 w-16 h-16" />
           </motion.div>
         </motion.div>
      </Link>
    </div>
  );
};

export default Home;
