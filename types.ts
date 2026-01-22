
export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
}

export interface NavLink {
  id: string;
  name: string;
  path: string;
  isExternal: boolean;
  isButton: boolean;
}

export interface TypographyConfig {
  nav: number;
  small: number;
  body: number;
  h1: number;
  h2: number;
}

export interface SocialLinks {
  instagram: string;
  youtube: string;
  twitter: string;
  linkedin: string;
  facebook: string;
}

export interface BrandingContent {
  siteName: string;
  accentColor: string;
  logoText: string;
  logoSubText: string;
  adminKey?: string;
  socialLinks: SocialLinks;
}

export interface ClientBrand {
  name: string;
  logo: string;
}

export interface HomeContent {
  seo?: SEOConfig;
  heroTitle: string;
  heroSubTitle: string;
  heroDescription: string;
  heroImage: string;
  heroImages: string[];
  serviceImages: string[];
  heroMood: string;
  heroWatermark: string;
  philosophyLine1: string;
  philosophyLine2: string;
  serviceCardTitle: string;
  serviceCardLabel: string;
  marqueeText: string;
  aboutTitle: string;
  aboutText: string[];
  aboutImage: string;
  stats: { label: string; value: string }[];
  services: { title: string; desc: string }[];
  clients: ClientBrand[];
}

export interface ServiceItem {
  title: string;
  items: string[];
}

export interface ServicesContent {
  seo?: SEOConfig;
  headerLabel: string;
  headerTitle: string;
  headerDescription: string;
  serviceBlocks: ServiceItem[];
  processes: { title: string; desc: string }[];
  ctaTitle: string;
}

export interface EndorsementOption {
  title: string;
  desc: string;
}

export interface EndorsementsContent {
  seo?: SEOConfig;
  headerTitle: string;
  headerDescription: string;
  mainImage: string;
  options: EndorsementOption[];
  ctaTitle: string;
  ctaDescription: string;
}

export interface FavoriteItem {
  id: string;
  name: string;
  desc: string;
  code: string;
  img: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  seo_title?: string;
  seo_description?: string;
}

export interface SiteContent {
  branding: BrandingContent;
  typography: TypographyConfig;
  home: HomeContent;
  services: ServicesContent;
  endorsements: EndorsementsContent;
  favorites: FavoriteItem[];
  favorites_seo?: SEOConfig;
  blogs: BlogPost[];
  blogs_seo?: SEOConfig;
  navLinks: NavLink[];
}
