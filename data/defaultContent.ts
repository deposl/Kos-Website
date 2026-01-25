
import { SiteContent } from '../types';

export const defaultContent: SiteContent = {
  branding: {
    siteName: "KOSTA GENARIS",
    accentColor: "#ccff00",
    logoText: "KOSTA",
    logoSubText: "GENARIS",
    socialLinks: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      tiktok: "https://tiktok.com"
    }
  },
  typography: {
    nav: 15,
    small: 13.5,
    body: 21,
    h1: 120,
    h2: 80
  },
  navLinks: [
    { id: '1', name: 'Consulting', path: '/services', isExternal: false, isButton: false },
    { id: '2', name: 'Endorsements', path: '/endorsements', isExternal: false, isButton: false },
    { id: '3', name: 'Blog', path: '/blog', isExternal: false, isButton: false },
    { id: '4', name: 'Favourite Things', path: '/favorites', isExternal: false, isButton: false },
    { id: '5', name: 'Contact', path: '/contact', isExternal: false, isButton: true },
  ],
  home: {
    seo: { metaTitle: "Kosta Genaris | Content Strategy & Brand Growth", metaDescription: "Deep strategy and creative high-impact production for world-class creators." },
    heroTitle: "GET CONNECTED",
    heroSubTitle: "CONNECTED",
    heroDescription: "Deep strategy. Creative high-impact production. Follow Kosta's Point of view™ on TikTok, Instagram, Facebook or LinkedIn.",
    heroImage: "",
    heroImages: [],
    serviceImages: [],
    heroMood: "Viral Design Mode",
    heroWatermark: "@KOSTAGENARIS",
    philosophyLine1: "I DON'T MAKE ADS.",
    philosophyLine2: "I DESIGN STORIES.",
    serviceCardTitle: "THE NEXUS",
    serviceCardLabel: "Apply Now",
    marqueeText: "DESIGN STORIES DESIGN STORIES DESIGN STORIES",
    aboutTitle: "THE MAN BEHIND THE CONTENT",
    aboutText: [
      "Kosta Genaris redefined what it means to be a \"creator\" in the modern age through viral vision and vertical storytelling.",
      "Today, he runs a creative empire focused on amplifying people and brands through the power of high-impact content strategy."
    ],
    aboutImage: "",
    stats: [
      { label: "Followers", value: "1.6M" },
      { label: "Likes", value: "42.7M" },
      { label: "IG Reach", value: "22.7K" }
    ],
    services: [
      { title: "Consulting", desc: "TikTok strategies that boost brand visibility, create communities and generate qualified leads. I don't follow the algorithm, I lead it." },
      { title: "Endorsements", desc: "Unique brand endorsements, adding credibility to your product or service and skyrocketing reach, awareness and trust." },
      { title: "Creative", desc: "With a background in photography and videography, I know a thing or two about capturing moments and shaping emotional connections through imagery." }
    ],
    clients: []
  },
  services: {
    seo: { metaTitle: "Strategy & Creative Support | Kosta Genaris", metaDescription: "TikTok strategy, account audits, viral scripting, and executive positioning." },
    headerLabel: "Elite Solutions",
    headerTitle: "BUILDING THE FUTURE",
    headerDescription: "From viral blueprinting to executive brand positioning, we build the infrastructure required for world-class content creators to scale infinitely.",
    serviceBlocks: [
      { 
        title: "TikTok Strategy", 
        items: ["Account Audit & Niche ID", "Viral Scripting Frameworks", "Monetization Pipeline Setup"]
      },
      { 
        title: "Creative Support", 
        items: ["Executive Positioning", "High-End Production", "Multi-Platform Expansion"]
      }
    ],
    processes: [
      { title: "Discovery", desc: "Deep audit of your brand DNA and market opportunity." },
      { title: "Strategy", desc: "Custom-tailored roadmap for high-retention growth." },
      { title: "Production", desc: "Elite cinema-grade assets built for the vertical feed." },
      { title: "Scale", desc: "Optimizing pipelines for maximum impact and ROI." }
    ],
    ctaTitle: "READY TO DOMINATE?"
  },
  endorsements: {
    seo: { metaTitle: "Brand Partnerships & Endorsements | Kosta Genaris", metaDescription: "Native-style TikTok ads, experiential events, and long-term partnerships." },
    headerTitle: "BRAND PARTNERS",
    headerDescription: "We work with brands that want to stop interrupting and start entertaining. Our partnerships are data-driven, authentic, and ROI-focused.",
    mainImage: "",
    options: [
      { title: "Spark Ads", desc: "Native-style TikTok ads that drive insane ROAS. We craft the creative and manage the spend." },
      { title: "Experiential Events", desc: "Live coverage of your product launches, pop-ups, and fan meetups." },
      { title: "Content Partnerships", desc: "Long-term brand ambassadorships designed for authenticity and trust." },
      { title: "UGC Whitelisting", desc: "Scale our highest performing content through your brand's ad account." }
    ],
    ctaTitle: "LET'S BUILD TOGETHER",
    ctaDescription: "Ready to get your brand in front of millions of highly engaged viewers? Request our full media kit and partnership deck."
  },
  favorites: [],
  favorites_seo: { metaTitle: "Kosta's Favourite Things | Gear & Software", metaDescription: "The tools, gear, and software Kosta uses to run his creative empire." },
  blogs_seo: { metaTitle: "Journal & Insights | Kosta Genaris", metaDescription: "Deep dives into content strategy, creativity, and the digital frontier." },
  blogs: []
};
