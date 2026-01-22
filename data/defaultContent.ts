
import { SiteContent } from '../types';

export const defaultContent: SiteContent = {
  branding: {
    siteName: "SEVA MOZHAEV",
    accentColor: "#ccff00",
    logoText: "SEV'S",
    logoSubText: "PICS"
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
    seo: { metaTitle: "Seva Mozhaev | Content Strategy & Brand Growth", metaDescription: "Deep strategy and creative high-impact production for world-class creators." },
    heroTitle: "GET CONNECTED",
    heroSubTitle: "CONNECTED",
    heroDescription: "Deep strategy. Creative high-impact production. Follow Sev's Point of view™ on TikTok, Instagram, Facebook or LinkedIn.",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    heroImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop"
    ],
    serviceImages: [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop"
    ],
    heroMood: "Viral Design Mode",
    marqueeText: "DESIGN STORIES DESIGN STORIES DESIGN STORIES",
    aboutTitle: "THE MAN BEHIND THE PICS",
    aboutText: [
      "A Perth schoolteacher turned TikTok sensation, Seva Mozhaev redefined what it means to be a \"creator\" in the modern age. Standing at 6ft10, he's always stood out—but it's his viral vision that keeps people watching.",
      "Today, he runs a creative empire focused on amplifying people and brands through the power of vertical storytelling."
    ],
    aboutImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop",
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
    ]
  },
  services: {
    seo: { metaTitle: "Strategy & Creative Support | Seva Mozhaev", metaDescription: "TikTok strategy, account audits, viral scripting, and executive positioning." },
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
    seo: { metaTitle: "Brand Partnerships & Endorsements | Seva Mozhaev", metaDescription: "Native-style TikTok ads, experiential events, and long-term partnerships." },
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
    { id: "1", name: "Pro Camera Gear", desc: "The exact setup I use for every viral video. 4K quality with a small footprint.", code: "SEVPRO20", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop" },
    { id: "2", name: "Edit Master Suite", desc: "The only plugins you need to make your content pop. Essential for retention.", code: "VIRAL15", img: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop" },
    { id: "3", name: "Bio-Hacking Supps", desc: "Stay sharp during 12-hour content marathons. Clean energy, zero crash.", code: "CREATORFUEL", img: "https://images.unsplash.com/photo-1550572017-ed20015a0da6?q=80&w=2070&auto=format&fit=crop" }
  ],
  favorites_seo: { metaTitle: "Sev's Favourite Things | Gear & Software", metaDescription: "The tools, gear, and software Seva uses to run his creative empire." },
  blogs_seo: { metaTitle: "Journal & Insights | Seva Mozhaev", metaDescription: "Deep dives into content strategy, creativity, and the digital frontier." },
  blogs: [
    {
      id: "1",
      title: "The Future of Vertical Content in 2025",
      date: "2024-05-15",
      excerpt: "Why the shift to vertical storytelling is just getting started and how you can stay ahead.",
      content: "The landscape of social media is shifting faster than ever. In this post, we explore why vertical video continues to dominate attention spans and how creators can leverage AI tools to scale their production without losing their unique voice. Engagement metrics show that raw, unfiltered storytelling often outperforms high-budget commercials...",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      seo_title: "The Future of Vertical Content 2025 | Seva Mozhaev",
      seo_description: "Explore the 2025 vertical content landscape with Seva Mozhaev."
    }
  ]
};
