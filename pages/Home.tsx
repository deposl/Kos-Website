
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Twitter, Linkedin, Facebook, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.944 4.944 0 0 1-3.218-1.182V13.38c0 3.123-2.532 5.655-5.655 5.655-3.123 0-5.655-2.532-5.655-5.655 0-3.122 2.532-5.655 5.655-5.655.154 0 .305.01.455.03v2.869c-.149-.03-.302-.047-.455-.047-1.531 0-2.771 1.24-2.771 2.771 0 1.53 1.24 2.771 2.771 2.771 1.53 0 2.771-1.24 2.771-2.771V2.606h2.883a4.947 4.947 0 0 0 4.944 4.944v2.883a7.803 7.803 0 0 1-1.455-.133v-3.614z" />
  </svg>
);

const Home: React.FC = () => {
  const { content } = useSite();
  const { home, branding } = content;
  
  // Spring config for silky smooth transforms
  const smoothSpring = { stiffness: 60, damping: 20, restDelta: 0.001 };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      zIndex: 1
    }),
    center: {
      x: 0,
      zIndex: 2,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 35 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 35 }
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const heroImages = useMemo(() => 
    home.heroImages && home.heroImages.length > 0 
      ? home.heroImages 
      : (home.heroImage ? [home.heroImage] : []),
    [home.heroImages, home.heroImage]
  );
    
  const [[heroIdx, heroDirection], setHeroPage] = useState([0, 0]);

  const paginateHero = (newDirection: number) => {
    if (heroImages.length === 0) return;
    setHeroPage([ (heroIdx + newDirection + heroImages.length) % heroImages.length, newDirection ]);
  };

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      paginateHero(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroIdx, heroImages.length]);

  const serviceImages = useMemo(() => home.serviceImages && home.serviceImages.length > 0 ? home.serviceImages : [], [home.serviceImages]);
  const [[serviceIdx, serviceDirection], setServicePage] = useState([0, 0]);

  const paginateService = (newDirection: number) => {
    if (serviceImages.length === 0) return;
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
  const { scrollY } = useScroll();
  const { scrollYProgress: philosophyProgress } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  // Parallax optimized with springs
  const rawHeroImgScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const heroImgScale = useSpring(rawHeroImgScale, smoothSpring);

  const rawHeroBgTextX = useTransform(scrollY, [0, 1000], [0, -200]);
  const heroBgTextX = useSpring(rawHeroBgTextX, smoothSpring);

  const rawKineticLine1X = useTransform(philosophyProgress, [0, 1], [100, -100]);
  const rawKineticLine2X = useTransform(philosophyProgress, [0, 1], [-100, 100]);
  const rawKineticBgX = useTransform(philosophyProgress, [0, 1], [-200, 200]);

  const kineticLine1X = useSpring(rawKineticLine1X, smoothSpring);
  const kineticLine2X = useSpring(rawKineticLine2X, smoothSpring);
  const kineticBgX = useSpring(rawKineticBgX, smoothSpring);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }
  };

  return (
    <div className="bg-white text-dark overflow-hidden font-sans fade-in">
      <section className="relative h-auto md:min-h-screen flex flex-col md:flex-row bg-white pt-24 md:pt-36 gpu-accelerated overflow-hidden">
        {/* Reservation of space to prevent jumping */}
        <div className="w-full md:w-[50%] aspect-video md:aspect-auto md:h-screen relative overflow-hidden bg-black order-1 md:order-2 touch-none min-h-[50vh]">
          <motion.div style={{ scale: heroImgScale }} className="w-full h-full relative will-change-transform">
            {heroImages.length > 0 ? (
              <AnimatePresence mode="popLayout" initial={false} custom={heroDirection}>
                <motion.img 
                  key={heroIdx}
                  src={heroImages[heroIdx]} 
                  custom={heroDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginateHero(1);
                    else if (swipe > swipeConfidenceThreshold) paginateHero(-1);
                  }}
                  alt="Showcase" 
                  fetchpriority="high"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 cursor-grab active:cursor-grabbing transform-gpu will-change-transform"
                />
              </AnimatePresence>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-12">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">Content required</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-10" />
            {heroImages.length > 1 && (
              <div className="absolute bottom-10 left-10 flex space-x-3 z-30">
                {heroImages.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setHeroPage([i, i > heroIdx ? 1 : -1])}
                    className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${i === heroIdx ? 'w-12 bg-accent' : 'w-4 bg-white/30 hover:bg-white/50'}`} 
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <div className="w-full md:w-[50%] p-6 sm:p-14 md:p-16 lg:px-24 flex flex-col justify-center relative z-20 bg-white order-2 md:order-1 min-h-[40vh]">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -left-12 top-0 h-full hidden xl:flex flex-col justify-between py-4 border-l border-gray-100 pl-4">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] text-gray-300">EST. 2024</span>
              <div className="w-px h-12 bg-gray-100 self-center" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] text-accent">VERIFIED CREATOR</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-10">
              <span className="inline-flex items-center gap-2 bg-dark text-accent px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] mb-8">
                <Zap size={10} fill="currentColor" /> Vertical Storytelling Pro
              </span>
              <h1 className="text-[15vw] md:text-[10vw] font-display font-black uppercase tracking-tighter leading-[0.8] italic mb-0 break-words">
                {home.heroTitle.split(' ')[0]} <br/>
                <span className="text-accent underline decoration-4 underline-offset-[10px] md:underline-offset-[15px]">{home.heroSubTitle}</span>
              </h1>
            </div>
            <p className="text-gray-500 max-w-sm mx-auto md:mx-0 mb-10 text-sm md:text-base leading-relaxed font-medium tracking-tight">
              {home.heroDescription}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
              <Link to="/contact" className="bg-dark text-white px-10 py-5 rounded-sm font-black uppercase tracking-[0.2em] text-xs hover:bg-accent hover:text-dark transition-all transform hover:scale-105 shadow-xl w-full md:w-auto text-center">Let's Connect</Link>
              <div className="flex space-x-6 items-center">
                <motion.a href={branding.socialLinks.tiktok} target="_blank" whileHover={{ y: -3 }} className="text-dark"><TikTokIcon size={20}/></motion.a>
                <motion.a href={branding.socialLinks.instagram} target="_blank" whileHover={{ y: -3 }} className="text-dark"><Instagram size={20}/></motion.a>
                <motion.a href={branding.socialLinks.youtube} target="_blank" whileHover={{ y: -3 }} className="text-dark"><Youtube size={20}/></motion.a>
                <motion.a href={branding.socialLinks.linkedin} target="_blank" whileHover={{ y: -3 }} className="text-dark"><Linkedin size={20}/></motion.a>
              </div>
            </div>
          </motion.div>
          <div className="absolute bottom-4 left-8 md:left-24 overflow-hidden hidden md:block opacity-[0.05] pointer-events-none select-none">
             <motion.h2 style={{ x: heroBgTextX }} className="text-[12vw] font-display font-black uppercase leading-none tracking-tighter text-black whitespace-nowrap will-change-transform">
              {home.heroWatermark}
             </motion.h2>
          </div>
        </div>
      </section>

      {home.clients && home.clients.length > 0 && (
        <section className="py-8 border-b border-gray-100 bg-gray-50 overflow-hidden hidden md:block">
          <div className="max-w-7xl mx-auto px-6 flex justify-around items-center grayscale opacity-40">
             {home.clients.slice(0, 5).map((client, i) => (
               <div key={i} className="flex items-center gap-3">
                 <span className="text-[10px] text-gray-400 font-black">0{i+1}</span>
                 <span className="font-display font-black uppercase tracking-[0.3em] text-lg">{client.name}</span>
               </div>
             ))}
          </div>
        </section>
      )}

      <section ref={philosophyRef} className="py-10 md:py-20 bg-dark text-white relative overflow-hidden flex items-center justify-center min-h-[40vh] gpu-accelerated">
        <motion.div style={{ x: kineticBgX }} className="absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-[0.03] select-none pointer-events-none will-change-transform">
          <span className="text-[35vw] md:text-[60vw] font-display font-black uppercase tracking-tighter italic">STORIES</span>
        </motion.div>
        <div className="relative z-10 w-full text-center flex flex-col items-center justify-center pointer-events-none">
          <motion.div style={{ x: kineticLine1X }} className="will-change-transform"><h2 className="text-[11vw] md:text-[9vw] font-display font-black uppercase tracking-tighter leading-none italic whitespace-nowrap">{home.philosophyLine1}</h2></motion.div>
          <motion.div style={{ x: kineticLine2X }} className="will-change-transform"><h2 className="text-[11vw] md:text-[9vw] font-display font-black uppercase tracking-tighter leading-none italic text-accent whitespace-nowrap md:-mt-4">{home.philosophyLine2}</h2></motion.div>
        </div>
      </section>

      <section className="py-10 md:py-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }} className="flex-1 relative group touch-none min-h-[40vh]">
          <div className="relative w-full aspect-[4/5] bg-black overflow-hidden shadow-2xl rounded-sm">
             {serviceImages.length > 0 ? (
               <AnimatePresence mode="popLayout" initial={false} custom={serviceDirection}>
                 <motion.img 
                   key={serviceIdx}
                   src={serviceImages[serviceIdx]} 
                   custom={serviceDirection}
                   variants={slideVariants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   drag="x"
                   dragConstraints={{ left: 0, right: 0 }}
                   dragElastic={0.1}
                   onDragEnd={(e, { offset, velocity }) => {
                     const swipe = swipePower(offset.x, velocity.x);
                     if (swipe < -swipeConfidenceThreshold) paginateService(1);
                     else if (swipe > swipeConfidenceThreshold) paginateService(-1);
                   }}
                   alt="Showcase" 
                   loading="lazy"
                   decoding="async"
                   className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 md:group-hover:grayscale-0 cursor-grab active:cursor-grabbing transform-gpu will-change-transform" 
                 />
               </AnimatePresence>
             ) : (
               <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">No content provided</span>
               </div>
             )}
             <motion.div initial={{ rotate: 5 }} whileInView={{ rotate: 0 }} viewport={{ once: true }} className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-accent text-dark p-10 flex flex-col justify-center shadow-2xl z-20 pointer-events-none">
                <span className="font-display font-black uppercase text-3xl italic leading-[0.8] mb-3 tracking-tighter">
                  {home.serviceCardTitle.split(' ')[0]} <br/> {home.serviceCardTitle.split(' ').slice(1).join(' ')}
                </span>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-50">{home.serviceCardLabel}</span>
             </motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} className="flex-1 space-y-8 lg:space-y-12 py-6">
          {home.services.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="max-w-md group">
              <motion.div whileInView={{ width: '80px' }} initial={{ width: 0 }} viewport={{ once: true }} className="h-1.5 bg-dark mb-6 origin-left" />
              <h3 className="text-lg font-black uppercase tracking-[0.3em] mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm md:text-base mb-6 leading-relaxed font-medium">{item.desc}</p>
              <Link to="/services" className="text-[10px] font-black uppercase tracking-[0.5em] border-b-2 border-gray-100 hover:border-dark pb-2 inline-flex items-center transition-all">
                EXPLORE <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-10 md:py-20 bg-white px-6 border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-1 flex flex-col justify-center order-1 lg:order-2">
             <motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6 md:mb-10 leading-[0.9]">{home.aboutTitle}</motion.h2>
             <div className="space-y-4 md:space-y-6 text-gray-500 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg font-medium">
               {home.aboutText.map((p, i) => <p key={i}>{p}</p>)}
             </div>
             <div className="grid grid-cols-3 gap-6 md:gap-12 border-t border-gray-100 pt-8 md:pt-12">
               {home.stats.map((stat, i) => (
                 <div key={i} className="group">
                    <span className="text-xl md:text-4xl font-display font-black tracking-tighter group-hover:text-accent transition-colors block mb-1">{stat.value}</span>
                    <span className="text-[8px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-400">{stat.label}</span>
                 </div>
               ))}
             </div>
          </div>
          <div className="flex-1 relative order-2 lg:order-1 min-h-[40vh]">
             <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="aspect-[4/5] bg-gray-50 overflow-hidden relative shadow-2xl rounded-sm">
               {home.aboutImage ? (
                 <img src={home.aboutImage} alt="About" loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-700 md:hover:scale-105 grayscale md:hover:grayscale-0" />
               ) : (
                 <div className="w-full h-full bg-gray-900 flex items-center justify-center p-12 text-center">
                   <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Database Portait Missing</span>
                 </div>
               )}
             </motion.div>
          </div>
        </div>
      </section>

      {home.clients && home.clients.filter(c => c.logo).length > 0 && (
        <section className="bg-white">
          <div className="w-full border-t border-b border-dark/10 py-10 md:py-20 text-center bg-gray-50/50">
            <h2 className="text-xl md:text-5xl font-display font-black uppercase tracking-[0.15em] text-dark leading-none italic px-4">I WORK WITH INCREDIBLE BRANDS</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 grayscale opacity-60">
            {home.clients.filter(c => c.logo).map((client, idx) => (
              <div key={idx} className="h-48 md:h-64 flex items-center justify-center p-8 md:p-12 border-dark/5 md:hover:grayscale-0 md:hover:opacity-100 transition-all border-l border-t last:border-r">
                <img src={client.logo} alt={client.name} loading="lazy" className="max-w-[120px] max-h-[120px] object-contain" />
              </div>
            ))}
          </div>
        </section>
      )}

      <Link to="/contact" className="block relative group overflow-hidden gpu-accelerated">
         <motion.div whileHover={{ backgroundColor: 'var(--accent-color)', color: '#000000' }} className="bg-dark text-white py-16 md:py-24 text-center transition-colors duration-500">
           <motion.div className="text-3xl md:text-7xl font-display font-black uppercase italic tracking-tighter inline-flex items-center italic px-4 transition-transform md:group-hover:translate-x-4">
             LET'S WORK TOGETHER <ArrowRight className="ml-6 md:ml-12 w-10 h-10 md:w-16 md:h-16" />
           </motion.div>
         </motion.div>
      </Link>
    </div>
  );
};

export default Home;
