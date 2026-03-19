
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageSection, RichTextSection, HeroBannerSection, TextImageSection, HTMLSection, FAQSection, BlogPostsSection, GallerySection, VideoSection } from '../types';
import { ArrowRight, ChevronDown, Calendar } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

interface SectionRendererProps {
  sections?: PageSection[];
}

export const PageSections: React.FC<SectionRendererProps> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;
  const sorted = [...sections].sort((a, b) => a.order - b.order);
  return (
    <>
      {sorted.map((section) => {
        switch (section.type) {
          case 'rich-text':   return <RichTextSectionComponent   key={section.id} section={section as RichTextSection} />;
          case 'hero-banner': return <HeroBannerSectionComponent key={section.id} section={section as HeroBannerSection} />;
          case 'text-image':  return <TextImageSectionComponent  key={section.id} section={section as TextImageSection} />;
          case 'faq':         return <FAQSectionComponent        key={section.id} section={section as FAQSection} />;
          case 'blog-posts':  return <BlogPostsSectionComponent  key={section.id} section={section as BlogPostsSection} />;
          case 'gallery':     return <GallerySectionComponent     key={section.id} section={section as GallerySection} />;
          case 'video':       return <VideoSectionComponent       key={section.id} section={section as VideoSection} />;
          case 'html':        return <HTMLSectionComponent       key={section.id} section={section as HTMLSection} />;
          default:            return null;
        }
      })}
    </>
  );
};

/* ── Rich Text ── */
const RichTextSectionComponent: React.FC<{ section: RichTextSection }> = ({ section }) => (
  <section className="py-20 px-6">
    <div className="max-w-3xl mx-auto">
      <div
        className="ks-rich-text"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  </section>
);

/* ── Hero Banner ── */
const HeroBannerSectionComponent: React.FC<{ section: HeroBannerSection }> = ({ section }) => {
  if (section.bannerType === 'split') {
    return (
      <section className="relative min-h-[70vh] flex flex-col md:flex-row bg-white overflow-hidden">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-white order-2 md:order-1">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center md:items-start text-center md:text-left">
            {section.subtitle && (
              <span className="inline-flex items-center gap-2 bg-dark text-accent px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] mb-8">
                {section.subtitle}
              </span>
            )}
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-6">
              {section.title}
            </h2>
            {section.description && (
              <p className="text-gray-500 max-w-sm mb-10 text-base md:text-lg leading-relaxed font-medium">
                {section.description}
              </p>
            )}
            {section.ctaText && (
              <a href={section.ctaLink || '#'} className="bg-dark text-white px-10 py-5 rounded-sm font-black uppercase tracking-[0.25em] text-xs hover:bg-accent hover:text-dark transition-all transform hover:scale-105 shadow-xl inline-block">
                {section.ctaText}
              </a>
            )}
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative order-1 md:order-2 bg-gray-100">
          {section.image && <img src={section.image} alt={section.title} className="w-full h-full object-cover" />}
        </div>
      </section>
    );
  }
  /* full-width dark */
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden bg-dark">
      {section.image && (
        <div className="absolute inset-0 z-0">
          <img src={section.image} alt={section.title} className="w-full h-full object-cover opacity-40" />
        </div>
      )}
      <div className="relative z-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          {section.subtitle && (
            <span className="text-accent text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mb-6 block">
              {section.subtitle}
            </span>
          )}
          <h2 className="text-4xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none text-white italic mb-8">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-sm md:text-xl leading-relaxed">
              {section.description}
            </p>
          )}
          {section.ctaText && (
            <a href={section.ctaLink || '#'} className="inline-block bg-accent text-dark px-12 py-5 rounded-sm font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all transform hover:scale-105">
              {section.ctaText}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ── Text + Image ── */
const TextImageSectionComponent: React.FC<{ section: TextImageSection }> = ({ section }) => (
  <section className="py-24 bg-white px-6">
    <div className={`max-w-7xl mx-auto flex flex-col ${section.layout === 'text-right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-32`}>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, x: section.layout === 'text-right' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/5] bg-gray-50 overflow-hidden relative shadow-2xl"
        >
          {section.image ? (
            <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300 text-sm font-bold uppercase tracking-widest">No Image</div>
          )}
        </motion.div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: section.layout === 'text-right' ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            {section.title}
          </h2>
          <div className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-medium">
            {section.content}
          </div>
          {section.ctaText && (
            <a href={section.ctaLink || '#'} className="text-[10px] font-black uppercase tracking-[0.5em] border-b-2 border-gray-100 hover:border-dark pb-3 inline-flex items-center transition-all group">
              {section.ctaText} <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── FAQ ── */
const FAQSectionComponent: React.FC<{ section: FAQSection }> = ({ section }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {section.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-16 leading-none"
          >
            {section.title}
          </motion.h2>
        )}
        <div className="divide-y divide-gray-100">
          {(section.items || []).map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex justify-between items-center py-6 text-left group"
              >
                <span className="text-lg font-black uppercase tracking-tight pr-6 group-hover:text-accent transition-colors">
                  {item.question}
                </span>
                <ChevronDown className={`flex-shrink-0 w-5 h-5 text-accent transition-transform duration-300 ${open === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-gray-500 leading-relaxed font-medium">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Blog Posts ── */
const BlogPostsSectionComponent: React.FC<{ section: BlogPostsSection }> = ({ section }) => {
  const { content } = useSite();
  const postIds = (section.postIds || []).filter(id => id && id !== '__empty__');
  const posts = postIds
    .map(id => content.blogs.find(b => String(b.id) === String(id)))
    .filter(Boolean) as typeof content.blogs;

  if (posts.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {section.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-16 leading-none"
          >
            {section.title}
          </motion.h2>
        )}
        <div className={`grid gap-10 ${posts.length === 1 ? 'grid-cols-1 max-w-lg' : posts.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group w-full"
            >
              <Link to={`/blog/${post.id}`} className="block overflow-hidden rounded-sm bg-[#f8f8f8] border border-gray-100 mb-5 aspect-video relative">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200 italic font-black text-2xl">NO IMAGE</div>
                )}
                <div className="absolute top-3 left-3 flex items-center space-x-2 bg-white px-3 py-1.5 rounded-sm shadow-md">
                  <Calendar className="w-3 h-3 text-accent" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{post.date}</span>
                </div>
              </Link>
              <div className="space-y-2">
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xl font-display font-black uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors break-words">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 break-words">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] group/btn mt-1">
                  Read Article <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Gallery ── */
const GallerySectionComponent: React.FC<{ section: GallerySection }> = ({ section }) => {
  const images = section.images || [];
  if (images.length === 0) return null;

  const colClass: Record<number, string> = { 2: 'grid-cols-2', 3: 'grid-cols-2 md:grid-cols-3', 4: 'grid-cols-2 md:grid-cols-4' };
  const cols = section.columns || 3;

  const SectionTitle = () => section.title ? (
    <motion.h2
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-16 leading-none"
    >{section.title}</motion.h2>
  ) : null;

  /* ── Grid ── */
  if (section.layout === 'grid') {
    return (
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle />
          <div className={`grid ${colClass[cols]} gap-3 md:gap-4`}>
            {images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="aspect-square overflow-hidden bg-gray-100 group cursor-zoom-in"
              >
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Masonry (CSS columns) ── */
  if (section.layout === 'masonry') {
    return (
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle />
          <div
            className="gap-3 md:gap-4"
            style={{ columnCount: cols, columnGap: '1rem' }}
          >
            {images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="mb-3 md:mb-4 overflow-hidden bg-gray-100 break-inside-avoid group cursor-zoom-in"
              >
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Featured (first image large, rest in row) ── */
  if (section.layout === 'featured') {
    const [hero, ...rest] = images;
    return (
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle />
          <div className="space-y-3 md:space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full aspect-[21/9] overflow-hidden bg-gray-100 group cursor-zoom-in"
            >
              <img src={hero} alt="Featured" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
            </motion.div>
            {rest.length > 0 && (
              <div className={`grid ${colClass[cols]} gap-3 md:gap-4`}>
                {rest.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="aspect-square overflow-hidden bg-gray-100 group cursor-zoom-in"
                  >
                    <img src={src} alt={`Gallery ${i + 2}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* ── Strip (horizontal scroll) ── */
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle />
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 px-6 snap-x snap-mandatory scrollbar-hide">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex-shrink-0 snap-center w-[70vw] md:w-[45vw] lg:w-[30vw] aspect-[4/3] overflow-hidden bg-gray-100 group cursor-zoom-in"
          >
            <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ── Video helpers ── */
const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
};
const getTikTokId = (url: string): string | null => {
  const m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  return m ? m[1] : null;
};
const getVimeoId = (url: string): string | null => {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
};
type VideoPlatform = 'youtube' | 'tiktok' | 'vimeo' | 'unknown';
const detectPlatform = (url: string): VideoPlatform => {
  if (!url) return 'unknown';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('vimeo.com')) return 'vimeo';
  return 'unknown';
};
const getEmbedSrc = (url: string): string | null => {
  const platform = detectPlatform(url);
  if (platform === 'youtube') {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : null;
  }
  if (platform === 'tiktok') {
    const id = getTikTokId(url);
    return id ? `https://www.tiktok.com/embed/v2/${id}` : null;
  }
  if (platform === 'vimeo') {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0` : null;
  }
  return null;
};
/* ── Video Section ── */
const VideoSectionComponent: React.FC<{ section: VideoSection }> = ({ section }) => {
  const videos = (section.videos || []).filter(v => v.url?.trim());
  if (videos.length === 0) return null;

  const maxW = section.layout === 'full' ? 'max-w-7xl' : 'max-w-5xl';

  // Per-video helper: returns the right container + iframe classes
  const getVideoContainer = (url: string) => {
    if (detectPlatform(url) === 'tiktok') {
      return {
        wrapper: 'mx-auto w-full max-w-[300px] h-[580px] overflow-hidden rounded-sm shadow-xl bg-black flex-shrink-0',
        iframe: 'w-full h-full border-0',
        absolute: false,
        extraIframeProps: { scrolling: 'no' as const, style: { display: 'block', overflowY: 'hidden' as const } },
      };
    }
    return {
      wrapper: 'relative w-full aspect-video overflow-hidden rounded-sm shadow-xl bg-black',
      iframe: 'absolute inset-0 w-full h-full border-0',
      absolute: true,
      extraIframeProps: {},
    };
  };

  // Column class based on video count
  const colClass =
    videos.length === 1 ? 'grid-cols-1'
    : videos.length === 2 ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1 md:grid-cols-3';

  return (
    <section className="py-24 px-6 bg-white">
      <div className={`${maxW} mx-auto`}>

        {/* Section-level heading */}
        {section.sectionTitle && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none mb-12"
          >{section.sectionTitle}</motion.h2>
        )}

        {/* All videos in a row */}
        <div className={`grid ${colClass} gap-6 ${videos.length === 1 ? 'justify-items-center' : ''}`}>
          {videos.map((v, i) => {
            const embedSrc = getEmbedSrc(v.url);
            const { wrapper, iframe: iframeCls, absolute, extraIframeProps } = getVideoContainer(v.url);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col gap-3"
              >
                {/* Video embed */}
                <div className={wrapper}>
                  {embedSrc ? (
                    <iframe
                      key={v.url}
                      src={embedSrc}
                      title={v.title || `Video ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className={iframeCls}
                      {...extraIframeProps}
                    />
                  ) : (
                    <div className={`${absolute ? 'absolute inset-0 ' : ''}flex items-center justify-center`}>
                      <p className="text-gray-500 text-xs font-medium">⚠ Invalid URL</p>
                    </div>
                  )}
                </div>

                {/* Per-video title + caption */}
                {(v.title || v.caption) && (
                  <div className="space-y-1">
                    {v.title   && <p className="text-sm font-black uppercase tracking-tight">{v.title}</p>}
                    {v.caption && <p className="text-xs text-gray-500 font-medium leading-relaxed">{v.caption}</p>}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const HTMLSectionComponent: React.FC<{ section: HTMLSection }> = ({ section }) => (
  <section className="custom-html-section" dangerouslySetInnerHTML={{ __html: section.code }} />
);
