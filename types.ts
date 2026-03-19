
export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
}

export type SectionType = 'rich-text' | 'hero-banner' | 'text-image' | 'html' | 'faq' | 'blog-posts' | 'gallery' | 'video';

export interface BaseSection {
  id: string;
  type: SectionType;
  order: number;
}

export interface RichTextSection extends BaseSection {
  type: 'rich-text';
  content: string;
}

export interface HeroBannerSection extends BaseSection {
  type: 'hero-banner';
  bannerType: 'split' | 'full' | 'video'; // Example hero types
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface TextImageSection extends BaseSection {
  type: 'text-image';
  layout: 'text-left' | 'text-right';
  title: string;
  content: string;
  ctaText?: string;
  ctaLink?: string;
  image: string;
}

export interface HTMLSection extends BaseSection {
  type: 'html';
  code: string;
}

export interface FAQSection extends BaseSection {
  type: 'faq';
  title?: string;
  items: { question: string; answer: string }[];
}

export interface BlogPostsSection extends BaseSection {
  type: 'blog-posts';
  title?: string;
  postIds: string[]; // max 3
}

export interface GallerySection extends BaseSection {
  type: 'gallery';
  title?: string;
  images: string[];
  layout: 'grid' | 'masonry' | 'featured' | 'strip';
  columns: 2 | 3 | 4;
}

export interface VideoEntry {
  url: string;
  title?: string;
  caption?: string;
}

export interface VideoSection extends BaseSection {
  type: 'video';
  sectionTitle?: string;
  videos: VideoEntry[];
  layout: 'centered' | 'full';
}

export type PageSection = RichTextSection | HeroBannerSection | TextImageSection | HTMLSection | FAQSection | BlogPostsSection | GallerySection | VideoSection;

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
  displayFont?: string;
  sansFont?: string;
}

export interface SocialLinks {
  instagram: string;
  youtube: string;
  twitter: string;
  linkedin: string;
  facebook: string;
  tiktok: string;
}

export interface BrandingContent {
  siteName: string;
  accentColor: string;
  logoText: string;
  logoSubText: string;
  favicon?: string;
  adminKey?: string;
  socialLinks: SocialLinks;
  isUnderConstruction?: boolean;
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
  heroBadge?: string;
  heroMetadataCreator?: string;
  heroMetadataYear?: string;
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
  socialProofBar?: string[];
  sections?: PageSection[];
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
  sections?: PageSection[];
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
  sections?: PageSection[];
}

export interface FavoriteItem {
  id: string;
  name: string;
  desc: string;
  code: string;
  img: string;
  sections?: PageSection[];
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
  sections?: PageSection[];
}

export interface ContactContent {
  seo?: SEOConfig;
  email: string;
  phone: string;
  address: string;
  fastTrackTitle: string;
  fastTrackDescription: string;
  notificationEmails?: string[];
  senderEmail?: string;
  thankYouSubject?: string;
  thankYouMessage?: string;
  sections?: PageSection[];
}

export interface CustomScripts {
  header: string;
  footer: string;
  css: string;
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
  blog_page_sections?: PageSection[];
  favorites_page_sections?: PageSection[];
  navLinks: NavLink[];
  contact: ContactContent;
  customScripts?: CustomScripts;
}
