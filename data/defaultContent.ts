
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
    heroImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    heroImages: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop"
    ],
    serviceImages: [
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
    ],
    heroMood: "Viral Design Mode",
    heroWatermark: "@KOSTAGENARIS",
    heroBadge: "Vertical Storytelling Pro",
    heroMetadataCreator: "VERIFIED CREATOR",
    heroMetadataYear: "EST. 2024",
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
    aboutImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
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
    clients: [
      { name: "McDonald's", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg" },
      { name: "Australian Government", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Australian_Government_logo.svg" },
      { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
      { name: "Red Bull", logo: "https://upload.wikimedia.org/wikipedia/en/f/f5/Red_Bull_logo.svg" },
      { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
      { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg" },
      { name: "TikTok", logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
      { name: "Red Rooster", logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Red_Rooster_logo.svg" }
    ],
    socialProofBar: ["MCDONALD'S", "AUSTRALIAN GOVERNMENT", "NIKE", "RED BULL", "SAMSUNG"]
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
    mainImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
    options: [
      { title: "Spark Ads", desc: "Native-style TikTok ads that drive insane ROAS. We craft the creative and manage the spend." },
      { title: "Experiential Events", desc: "Live coverage of your product launches, pop-ups, and fan meetups." },
      { title: "Content Partnerships", desc: "Long-term brand ambassadorships designed for authenticity and trust." },
      { title: "UGC Whitelisting", desc: "Scale our highest performing content through your brand's ad account." }
    ],
    ctaTitle: "LET'S BUILD TOGETHER",
    ctaDescription: "Ready to get your brand in front of millions of highly engaged viewers? Request our full media kit and partnership deck."
  },
  favorites: [
    { id: "1", name: "Pro Camera Gear", desc: "The exact setup I use for every viral video. 4K quality with a small footprint.", code: "KOSTAPRO20", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop" },
    { id: "2", name: "Edit Master Suite", desc: "The only plugins you need to make your content pop. Essential for retention.", code: "VIRAL15", img: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop" },
    { id: "3", name: "Bio-Hacking Supps", desc: "Stay sharp during 12-hour content marathons. Clean energy, zero crash.", code: "CREATORFUEL", img: "https://images.unsplash.com/photo-1550572017-ed20015a0da6?q=80&w=2070&auto=format&fit=crop" }
  ],
  favorites_seo: { metaTitle: "Kosta's Favourite Things | Gear & Software", metaDescription: "The tools, gear, and software Kosta uses to run his creative empire." },
  blogs_seo: { metaTitle: "Journal & Insights | Kosta Genaris", metaDescription: "Deep dives into content strategy, creativity, and the digital frontier." },
  blogs: [
    {
      id: "1",
      title: "The Future of Vertical Content in 2025",
      date: "2024-05-15",
      excerpt: "Why the shift to vertical storytelling is just getting started and how you can stay ahead.",
      content: "The landscape of social media is shifting faster than ever. In this post, we explore why vertical video continues to dominate attention spans and how creators can leverage AI tools to scale their production without losing their unique voice. Engagement metrics show that raw, unfiltered storytelling often outperforms high-budget commercials...",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      seo_title: "The Future of Vertical Content 2025 | Kosta Genaris",
      seo_description: "Explore the 2025 vertical content landscape with Kosta Genaris."
    }
  ],
  contact: {
    email: "contact@creatorpro.com",
    phone: "+1 (888) CREATOR",
    address: "Los Angeles, CA / Remote",
    fastTrackTitle: "Fast Track?",
    fastTrackDescription: "Skip the email and book a direct 1:1 strategy session on my calendar.",
    notificationEmails: ["kostagenaris3@gmail.com"],
    senderEmail: "hello@kostagenaris.com",
    thankYouSubject: "Thank you for reaching out!",
    thankYouMessage: "We have received your message and our team will get back to you within 24 hours. We appreciate your interest!"
  },
  customScripts: {
    header: "",
    footer: "",
    css: ""
  }
};
