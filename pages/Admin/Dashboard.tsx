
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import ReactQuill from 'react-quill-new';
import { createClient } from '@supabase/supabase-js';
import { 
  Save, Layout, Palette, FileText, MoveUp, 
  Loader2, Database, Trash2, RefreshCw,
  Check, Terminal, Copy, Upload, ArrowUp, ArrowDown, Plus, Image as ImageIcon,
  Star, Heart, Briefcase, Share2, Type, Globe, Shield, 
  Mail, MessageSquare, ChevronLeft, Edit3,
  Instagram, Youtube, Twitter, Linkedin, Facebook, User,
  Zap, Info, BarChart3, Phone, MapPin, Calendar, Code, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost, FavoriteItem, SEOConfig, NavLink, ServiceItem, EndorsementOption, ClientBrand, CustomScripts } from '../../types';

// Custom TikTok Icon
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.944 4.944 0 0 1-3.218-1.182V13.38c0 3.123-2.532 5.655-5.655 5.655-3.123 0-5.655-2.532-5.655-5.655 0-3.122 2.532-5.655 5.655-5.655.154 0 .305.01.455.03v2.869c-.149-.03-.302-.047-.455-.047-1.531 0-2.771 1.24-2.771 2.771 0 1.53 1.24 2.771 2.771 2.771 1.53 0 2.771-1.24 2.771-2.771V2.606h2.883a4.947 4.947 0 0 0 4.944 4.944v2.883a7.803 7.803 0 0 1-1.455-.133v-3.614z" />
  </svg>
);

const SQL_SCHEMA = `-- SUPABASE DATABASE SETUP SCRIPT (V9 - Custom Scripts)
CREATE TABLE IF NOT EXISTS site_settings (
    id BIGINT PRIMARY KEY,
    branding JSONB DEFAULT '{}'::jsonb,
    admin_key TEXT DEFAULT 'admin123',
    home_data JSONB DEFAULT '{}'::jsonb,
    services_data JSONB DEFAULT '{}'::jsonb,
    endorsements_data JSONB DEFAULT '{}'::jsonb,
    nav_links JSONB DEFAULT '[]'::jsonb,
    favorites_seo JSONB DEFAULT '{}'::jsonb,
    blogs_seo JSONB DEFAULT '{}'::jsonb,
    typography_data JSONB DEFAULT '{}'::jsonb,
    contact_data JSONB DEFAULT '{}'::jsonb,
    custom_scripts JSONB DEFAULT '{"header": "", "footer": "", "css": ""}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
`;

const FONT_OPTIONS = {
  display: [
    'Montserrat', 'Playfair Display', 'Oswald', 'Bebas Neue', 'Syncopate', 
    'Archivo Black', 'Unbounded', 'Syne', 'Righteous', 'Space Grotesk', 'Anton'
  ],
  sans: [
    'Inter', 'Roboto', 'Poppins', 'Lato', 'Open Sans', 'Work Sans', 
    'DM Sans', 'Plus Jakarta Sans', 'Manrope', 'Sora', 'Quicksand'
  ]
};

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const InputField = ({ label, value, onChange, placeholder = "", type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</label>
    <input 
      type={type}
      className="w-full bg-white/5 border border-white/10 p-4 rounded-sm text-sm focus:border-accent outline-none text-white font-medium" 
      value={value || ''} 
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

const FontSelectField = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 p-4 rounded-sm text-sm focus:border-accent outline-none text-white font-medium flex justify-between items-center group"
      >
        <span style={{ fontFamily: `'${value}', sans-serif` }}>{value}</span>
        <ChevronDown size={14} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-full mt-2 bg-[#0F0F0F] border border-white/10 rounded-sm shadow-2xl max-h-60 overflow-y-auto"
          >
            {options.map((font) => (
              <button
                key={font}
                onClick={() => {
                  onChange(font);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-4 hover:bg-accent hover:text-dark transition-colors border-b border-white/5 last:border-0 ${value === font ? 'bg-accent/10 text-accent' : 'text-gray-300'}`}
                style={{ fontFamily: `'${font}', sans-serif` }}
              >
                {font}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TextAreaField = ({ label, value, onChange, rows = 3, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</label>
    <textarea 
      rows={rows} 
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 p-4 rounded-sm text-sm focus:border-accent outline-none text-white font-medium resize-none" 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

const SEOEditor = ({ config, onChange }: { config: SEOConfig | undefined; onChange: (updated: SEOConfig) => void }) => (
  <div className="bg-accent/5 border border-accent/20 p-8 rounded-sm space-y-6 mb-8">
    <div className="flex items-center gap-3 text-accent mb-4">
      <Globe size={18} />
      <h4 className="text-[10px] font-black uppercase tracking-widest">SEO Optimization</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField 
        label="Meta Title" 
        value={config?.metaTitle || ''} 
        onChange={(v) => onChange({ metaTitle: v, metaDescription: config?.metaDescription || '' })} 
      />
      <TextAreaField 
        label="Meta Description" 
        value={config?.metaDescription || ''} 
        onChange={(v) => onChange({ metaTitle: config?.metaTitle || '', metaDescription: v })} 
      />
    </div>
  </div>
);

const ImageUploadField = ({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (v: string) => void; className?: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const base64 = await fileToBase64(file);
        onChange(base64);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative aspect-video w-full bg-white/5 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors overflow-hidden group"
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <Upload className="text-white mb-2" size={24} />
               <span className="text-[10px] font-black uppercase tracking-widest">Change Image</span>
            </div>
          </>
        ) : (
          <>
            {loading ? <Loader2 className="animate-spin text-accent" /> : <ImageIcon className="text-gray-600 mb-2" size={32} />}
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Click to Upload</span>
          </>
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );
};

const MultiImageManager = ({ label, images = [], onChange }: { label: string; images: string[]; onChange: (imgs: string[]) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const base64 = await fileToBase64(file);
        onChange([...images, base64]);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
         <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</label>
         <button onClick={() => fileInputRef.current?.click()} className="bg-accent text-dark px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
           {loading ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />} Add Frame
         </button>
         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAddImage} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square bg-white/5 border border-white/10 rounded-sm group overflow-hidden">
             <img src={img} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all" />
             <div className="absolute inset-0 flex items-center justify-center bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { const n = [...images]; n.splice(idx, 1); onChange(n); }} className="text-red-500"><Trash2 size={18} /></button>
             </div>
             <div className="absolute top-2 left-2 bg-dark/80 text-[8px] font-black px-2 py-1 rounded-sm">0{idx + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GenericList = <T extends any>({ label, items = [], onAdd, onRemove, onUpdate, renderItem }: { label: string; items?: T[]; onAdd: () => void; onRemove: (idx: number) => void; onUpdate: (idx: number, data: T) => void; renderItem: (item: T, idx: number) => React.ReactNode; }) => (
  <div className="space-y-4 pt-6 border-t border-white/5">
    <div className="flex justify-between items-center">
      <label className="text-[9px] font-black uppercase tracking-widest text-accent">{label}</label>
      <button onClick={onAdd} className="bg-white/5 hover:bg-white/10 p-2 rounded-sm text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
        <Plus size={12} /> Add Item
      </button>
    </div>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white/5 p-6 rounded-sm relative group">
          <button onClick={() => onRemove(idx)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={16} />
          </button>
          {renderItem(item, idx)}
        </div>
      ))}
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { content, isAdmin, logout, isLoading: isGlobalLoading, updateContent, dbConfig } = useSite();
  const [activeTab, setActiveTab] = useState<'branding' | 'navigation' | 'home' | 'services' | 'endorsements' | 'favorites' | 'blogs' | 'contact' | 'inquiries' | 'subscribers' | 'scripts' | 'system'>('branding');
  const [localContent, setLocalContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isDataFetching, setIsDataFetching] = useState(false);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  // Load fonts for preview in dropdowns
  useEffect(() => {
    const allFonts = [...FONT_OPTIONS.display, ...FONT_OPTIONS.sans];
    const familyParam = allFonts.map(f => `family=${f.replace(/\s+/g, '+')}:wght@400;700;800;900`).join('&');
    const fontUrl = `https://fonts.googleapis.com/css2?${familyParam}&display=swap`;
    
    let linkTag = document.getElementById('admin-preview-fonts') as HTMLLinkElement;
    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.id = 'admin-preview-fonts';
      linkTag.rel = 'stylesheet';
      document.head.appendChild(linkTag);
    }
    linkTag.href = fontUrl;
  }, []);

  useEffect(() => {
    if (!isAdmin && sessionStorage.getItem('is_admin') !== 'true') navigate('/admin');
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (activeTab === 'inquiries' || activeTab === 'subscribers') fetchLeads();
  }, [activeTab]);

  const fetchLeads = async () => {
    setIsDataFetching(true);
    try {
      const supabase = createClient(dbConfig.url, dbConfig.key);
      if (activeTab === 'inquiries') {
        const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
        setInquiries(data || []);
      } else {
        const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
        setSubscribers(data || []);
      }
    } catch (e) { console.error(e); } finally { setIsDataFetching(false); }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContent(localContent);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) { 
      setSaveStatus('error'); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const updateSection = (section: keyof typeof localContent, updates: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) ? updates : { ...(prev[section] as any || {}), ...updates }
    }));
  };

  if (isGlobalLoading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-accent mb-4" size={48} />
      <p className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Syncing...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-44 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-display font-black uppercase italic tracking-tighter leading-none">
              COMMAND <span className="text-accent">CENTER</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">CMS ARCHITECTURE V12.0</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleSave} 
              disabled={isSaving} 
              className={`px-12 py-5 rounded-sm font-black text-xs uppercase tracking-[0.2em] flex items-center min-w-[240px] justify-center transition-all ${saveStatus === 'success' ? 'bg-green-500 text-white' : 'bg-accent text-dark'}`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin mr-3" size={18} />
                  Saving on database...
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <Check className="mr-3" size={18}/>
                  Cloud Updated
                </>
              ) : (
                <>
                  <Save className="mr-3 w-4 h-4" />
                  Push to Cloud
                </>
              )}
            </button>
            <button onClick={logout} className="bg-white/5 px-8 py-5 text-xs font-black uppercase tracking-widest border border-white/5">Logout</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-72 space-y-2">
            {[
              { id: 'branding', icon: Palette, label: 'Identity' },
              { id: 'navigation', icon: MoveUp, label: 'Navigation' },
              { id: 'home', icon: Layout, label: 'Home Page' },
              { id: 'services', icon: Briefcase, label: 'Services Page' },
              { id: 'endorsements', icon: Star, label: 'Endorsements' },
              { id: 'favorites', icon: Heart, label: 'Favorites' },
              { id: 'blogs', icon: FileText, label: 'Journal' },
              { id: 'contact', icon: Phone, label: 'Contact Info' },
              { id: 'inquiries', icon: MessageSquare, label: 'Inquiries' },
              { id: 'subscribers', icon: Mail, label: 'Subscribers' },
              { id: 'scripts', icon: Code, label: 'Scripts' },
              { id: 'system', icon: Database, label: 'Infrastructure' }
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center p-5 rounded-sm text-[10px] font-black uppercase tracking-[0.25em] text-left transition-all ${activeTab === tab.id ? 'bg-accent text-dark' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                <tab.icon className="mr-4 w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-grow bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-sm min-h-[700px] shadow-2xl overflow-y-auto">
            {activeTab === 'branding' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Site Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Site Name" value={localContent.branding.siteName} onChange={(v) => updateSection('branding', { siteName: v })} />
                  <InputField label="Logo Text" value={localContent.branding.logoText} onChange={(v) => updateSection('branding', { logoText: v })} />
                  <InputField label="Logo Sub-text" value={localContent.branding.logoSubText} onChange={(v) => updateSection('branding', { logoSubText: v })} />
                  <InputField label="Accent HEX" value={localContent.branding.accentColor} onChange={(v) => updateSection('branding', { accentColor: v })} />
                  <InputField label="Admin Access Key" value={localContent.branding.adminKey || ''} onChange={(v) => updateSection('branding', { adminKey: v })} />
                  <ImageUploadField label="Site Favicon (1:1)" value={localContent.branding.favicon || ''} onChange={(v) => updateSection('branding', { favicon: v })} />
                </div>

                <div className="pt-10 border-t border-white/5">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-6">Typography System</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FontSelectField 
                        label="Display Font Family (Headings)" 
                        value={localContent.typography.displayFont || 'Montserrat'} 
                        options={FONT_OPTIONS.display}
                        onChange={(v) => updateSection('typography', { displayFont: v })} 
                      />
                      <FontSelectField 
                        label="Sans Font Family (Body & UI)" 
                        value={localContent.typography.sansFont || 'Inter'} 
                        options={FONT_OPTIONS.sans}
                        onChange={(v) => updateSection('typography', { sansFont: v })} 
                      />
                   </div>
                   <p className="text-[9px] text-gray-600 mt-4 uppercase tracking-widest font-bold">Note: The dropdown previews each font in its actual style.</p>
                </div>

                <div className="pt-10 border-t border-white/5">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-6">Social Link Engine</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="TikTok" value={localContent.branding.socialLinks.tiktok} onChange={(v) => updateSection('branding', { socialLinks: { ...localContent.branding.socialLinks, tiktok: v } })} />
                      <InputField label="Instagram" value={localContent.branding.socialLinks.instagram} onChange={(v) => updateSection('branding', { socialLinks: { ...localContent.branding.socialLinks, instagram: v } })} />
                      <InputField label="Facebook" value={localContent.branding.socialLinks.facebook} onChange={(v) => updateSection('branding', { socialLinks: { ...localContent.branding.socialLinks, facebook: v } })} />
                      <InputField label="YouTube" value={localContent.branding.socialLinks.youtube} onChange={(v) => updateSection('branding', { socialLinks: { ...localContent.branding.socialLinks, youtube: v } })} />
                      <InputField label="LinkedIn" value={localContent.branding.socialLinks.linkedin} onChange={(v) => updateSection('branding', { socialLinks: { ...localContent.branding.socialLinks, linkedin: v } })} />
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'navigation' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Navigation</h3>
                <GenericList<NavLink>
                  label="Nav Links"
                  items={localContent.navLinks}
                  onAdd={() => updateSection('navLinks', [...localContent.navLinks, { id: Date.now().toString(), name: 'New Link', path: '/', isExternal: false, isButton: false }])}
                  onRemove={(idx) => { const n = [...localContent.navLinks]; n.splice(idx, 1); updateSection('navLinks', n); }}
                  onUpdate={() => {}}
                  renderItem={(item, idx) => (
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Label" value={item.name} onChange={(v) => { const n = [...localContent.navLinks]; n[idx].name = v; updateSection('navLinks', n); }} />
                      <InputField label="Path" value={item.path} onChange={(v) => { const n = [...localContent.navLinks]; n[idx].path = v; updateSection('navLinks', n); }} />
                    </div>
                  )}
                />
              </div>
            )}

            {activeTab === 'home' && (
              <div className="space-y-12">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Home Page Architecture</h3>
                <SEOEditor config={localContent.home.seo} onChange={(v) => updateSection('home', { seo: v })} />
                
                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Zap size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Hero Visuals & Text</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Hero Headline" value={localContent.home.heroTitle} onChange={(v) => updateSection('home', { heroTitle: v })} />
                    <InputField label="Hero Accent" value={localContent.home.heroSubTitle} onChange={(v) => updateSection('home', { heroSubTitle: v })} />
                    <InputField label="Mood Tag" value={localContent.home.heroMood} onChange={(v) => updateSection('home', { heroMood: v })} />
                    <InputField label="Background Watermark" value={localContent.home.heroWatermark} onChange={(v) => updateSection('home', { heroWatermark: v })} />
                    <InputField label="Banner Badge Text" value={localContent.home.heroBadge || ''} placeholder="e.g. Vertical Storytelling Pro" onChange={(v) => updateSection('home', { heroBadge: v })} />
                    <InputField label="Metadata Creator" value={localContent.home.heroMetadataCreator || ''} placeholder="e.g. VERIFIED CREATOR" onChange={(v) => updateSection('home', { heroMetadataCreator: v })} />
                    <InputField label="Metadata Year" value={localContent.home.heroMetadataYear || ''} placeholder="e.g. EST. 2024" onChange={(v) => updateSection('home', { heroMetadataYear: v })} />
                  </div>
                  <TextAreaField label="Hero Description" value={localContent.home.heroDescription} onChange={(v) => updateSection('home', { heroDescription: v })} />
                  <MultiImageManager label="Hero Slider Images" images={localContent.home.heroImages} onChange={(v) => updateSection('home', { heroImages: v })} />
                </section>

                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Share2 size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Social Proof Bar (Key Partners)</h4>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Manage the brand names appearing in the horizontal numbered bar.</p>
                    <GenericList<string>
                      label="Partner Names"
                      items={localContent.home.socialProofBar}
                      onAdd={() => updateSection('home', { socialProofBar: [...(localContent.home.socialProofBar || []), 'NEW PARTNER'] })}
                      onRemove={(idx) => { 
                        const s = [...(localContent.home.socialProofBar || [])]; 
                        s.splice(idx, 1); 
                        updateSection('home', { socialProofBar: s }); 
                      }}
                      onUpdate={() => {}}
                      renderItem={(item, idx) => (
                        <InputField 
                          label={`Partner 0${idx + 1}`} 
                          value={item} 
                          onChange={(v) => { 
                            const s = [...(localContent.home.socialProofBar || [])]; 
                            s[idx] = v; 
                            updateSection('home', { socialProofBar: s }); 
                          }} 
                        />
                      )}
                    />
                  </div>
                </section>

                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Type size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Kinetic Philosophy</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Philosophy Line 1" value={localContent.home.philosophyLine1} onChange={(v) => updateSection('home', { philosophyLine1: v })} />
                    <InputField label="Philosophy Line 2 (Accent)" value={localContent.home.philosophyLine2} onChange={(v) => updateSection('home', { philosophyLine2: v })} />
                  </div>
                </section>

                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Briefcase size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Service Teasers</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Service Card Title" value={localContent.home.serviceCardTitle} onChange={(v) => updateSection('home', { serviceCardTitle: v })} />
                    <InputField label="Service Card Label" value={localContent.home.serviceCardLabel} onChange={(v) => updateSection('home', { serviceCardLabel: v })} />
                  </div>
                  <InputField label="Marquee Running Text" value={localContent.home.marqueeText} onChange={(v) => updateSection('home', { marqueeText: v })} />
                  <MultiImageManager label="Service Reel Images" images={localContent.home.serviceImages} onChange={(v) => updateSection('home', { serviceImages: v })} />
                  <GenericList<{ title: string; desc: string }>
                    label="Services List (Cards)"
                    items={localContent.home.services}
                    onAdd={() => updateSection('home', { services: [...localContent.home.services, { title: 'New Service', desc: '' }] })}
                    onRemove={(idx) => { const s = [...localContent.home.services]; s.splice(idx, 1); updateSection('home', { services: s }); }}
                    onUpdate={() => {}}
                    renderItem={(item, idx) => (
                      <div className="grid grid-cols-1 gap-4">
                        <InputField label="Title" value={item.title} onChange={(v) => { const s = [...localContent.home.services]; s[idx].title = v; updateSection('home', { services: s }); }} />
                        <TextAreaField label="Description" value={item.desc} onChange={(v) => { const s = [...localContent.home.services]; s[idx].desc = v; updateSection('home', { services: s }); }} />
                      </div>
                    )}
                  />
                </section>

                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <User size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">About / Profile</h4>
                  </div>
                  <InputField label="About Section Title" value={localContent.home.aboutTitle} onChange={(v) => updateSection('home', { aboutTitle: v })} />
                  <TextAreaField label="Bio Paragraphs (Line Separated)" value={localContent.home.aboutText.join('\n')} onChange={(v) => updateSection('home', { aboutText: v.split('\n') })} />
                  <ImageUploadField label="Profile Image" value={localContent.home.aboutImage} onChange={(v) => updateSection('home', { aboutImage: v })} />
                  
                  <GenericList<{ label: string; value: string }>
                    label="Key Stats"
                    items={localContent.home.stats}
                    onAdd={() => updateSection('home', { stats: [...localContent.home.stats, { label: 'Stat Name', value: '0' }] })}
                    onRemove={(idx) => { const s = [...localContent.home.stats]; s.splice(idx, 1); updateSection('home', { stats: s }); }}
                    onUpdate={() => {}}
                    renderItem={(item, idx) => (
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Stat Label" value={item.label} onChange={(v) => { const s = [...localContent.home.stats]; s[idx].label = v; updateSection('home', { stats: s }); }} />
                        <InputField label="Value (e.g. 1.6M)" value={item.value} onChange={(v) => { const s = [...localContent.home.stats]; s[idx].value = v; updateSection('home', { stats: s }); }} />
                      </div>
                    )}
                  />
                </section>

                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <BarChart3 size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Brand Partners</h4>
                  </div>
                  <GenericList<ClientBrand>
                    label="Client Logos"
                    items={localContent.home.clients}
                    onAdd={() => updateSection('home', { clients: [...localContent.home.clients, { name: 'Brand Name', logo: '' }] })}
                    onRemove={(idx) => { const c = [...localContent.home.clients]; c.splice(idx, 1); updateSection('home', { clients: c }); }}
                    onUpdate={() => {}}
                    renderItem={(item, idx) => (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <InputField label="Brand Name" value={item.name} onChange={(v) => { const c = [...localContent.home.clients]; c[idx].name = v; updateSection('home', { clients: c }); }} />
                        <ImageUploadField label="Logo (SVG/PNG preferred)" value={item.logo} onChange={(v) => { const c = [...localContent.home.clients]; c[idx].logo = v; updateSection('home', { clients: c }); }} />
                      </div>
                    )}
                  />
                </section>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-12">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Services Module</h3>
                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Header Label" value={localContent.services.headerLabel} onChange={(v) => updateSection('services', { headerLabel: v })} />
                    <InputField label="Header Title" value={localContent.services.headerTitle} onChange={(v) => updateSection('services', { headerTitle: v })} />
                    <TextAreaField label="Description" value={localContent.services.headerDescription} onChange={(v) => updateSection('services', { headerDescription: v })} />
                  </div>
                </section>
                <GenericList<ServiceItem>
                  label="Service Blocks"
                  items={localContent.services.serviceBlocks}
                  onAdd={() => updateSection('services', { serviceBlocks: [...localContent.services.serviceBlocks, { title: 'New Service', items: [] }] })}
                  onRemove={(idx) => { const b = [...localContent.services.serviceBlocks]; b.splice(idx, 1); updateSection('services', { serviceBlocks: b }); }}
                  onUpdate={() => {}}
                  renderItem={(item, idx) => (
                    <div className="space-y-4">
                      <InputField label="Title" value={item.title} onChange={(v) => { const b = [...localContent.services.serviceBlocks]; b[idx].title = v; updateSection('services', { serviceBlocks: b }); }} />
                      <InputField label="Bullets (Comma Separated)" value={item.items.join(', ')} onChange={(v) => { const b = [...localContent.services.serviceBlocks]; b[idx].items = v.split(',').map(i => i.trim()); updateSection('services', { serviceBlocks: b }); }} />
                    </div>
                  )}
                />
              </div>
            )}

            {activeTab === 'endorsements' && (
              <div className="space-y-12">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Endorsements</h3>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Headline" value={localContent.endorsements.headerTitle} onChange={(v) => updateSection('endorsements', { headerTitle: v })} />
                  <TextAreaField label="Description" value={localContent.endorsements.headerDescription} onChange={(v) => updateSection('endorsements', { headerDescription: v })} />
                  <ImageUploadField label="Main Image" value={localContent.endorsements.mainImage} onChange={(v) => updateSection('endorsements', { mainImage: v })} />
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Favorites</h3>
                <GenericList<FavoriteItem>
                  label="Gear Items"
                  items={localContent.favorites}
                  onAdd={() => updateSection('favorites', [...localContent.favorites, { id: Date.now().toString(), name: 'New Item', desc: '', code: 'DEAL', img: '' }])}
                  onRemove={(idx) => { const f = [...localContent.favorites]; f.splice(idx, 1); updateSection('favorites', f); }}
                  onUpdate={() => {}}
                  renderItem={(item, idx) => (
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Name" value={item.name} onChange={(v) => { const f = [...localContent.favorites]; f[idx].name = v; updateSection('favorites', f); }} />
                      <ImageUploadField label="Image" value={item.img} onChange={(v) => { const f = [...localContent.favorites]; f[idx].img = v; updateSection('favorites', f); }} />
                    </div>
                  )}
                />
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Journal</h3>
                <GenericList<BlogPost>
                  label="Articles"
                  items={localContent.blogs}
                  onAdd={() => updateSection('blogs', [...localContent.blogs, { id: Date.now().toString(), title: 'Draft', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', image: '' }])}
                  onRemove={(idx) => { const b = [...localContent.blogs]; b.splice(idx, 1); updateSection('blogs', b); }}
                  onUpdate={() => {}}
                  renderItem={(item, idx) => (
                    <div className="space-y-4">
                      <InputField label="Title" value={item.title} onChange={(v) => { const b = [...localContent.blogs]; b[idx].title = v; updateSection('blogs', b); }} />
                      <TextAreaField label="Excerpt" value={item.excerpt} onChange={(v) => { const b = [...localContent.blogs]; b[idx].excerpt = v; updateSection('blogs', b); }} />
                      <div className="space-y-2">
                         <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Rich Content</label>
                         <ReactQuill theme="snow" value={item.content} onChange={(v) => { const b = [...localContent.blogs]; b[idx].content = v; updateSection('blogs', b); }} />
                      </div>
                    </div>
                  )}
                />
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Contact Us Page Details</h3>
                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Info size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">General Info</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Email Address" value={localContent.contact.email} onChange={(v) => updateSection('contact', { email: v })} />
                    <InputField label="Phone Number" value={localContent.contact.phone} onChange={(v) => updateSection('contact', { phone: v })} />
                    <InputField label="HQ / Location" value={localContent.contact.address} onChange={(v) => updateSection('contact', { address: v })} />
                  </div>
                </section>

                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Mail size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Email Notifications & Auto-Reply</h4>
                  </div>
                  <div className="space-y-6">
                    <InputField 
                      label="Sender Address (Domain must be verified in Resend)" 
                      value={localContent.contact.senderEmail || 'hello@kostagenaris.com'} 
                      placeholder="hello@kostagenaris.com"
                      onChange={(v) => updateSection('contact', { senderEmail: v })} 
                    />
                    <InputField 
                      label="Notification Recipients (Comma Separated Emails)" 
                      value={localContent.contact.notificationEmails?.join(', ') || ''} 
                      placeholder="email1@example.com, email2@example.com"
                      onChange={(v) => updateSection('contact', { notificationEmails: v.split(',').map(e => e.trim()).filter(Boolean) })} 
                    />
                    <div className="border-t border-white/5 pt-6">
                      <InputField 
                        label="Customer Thank-You Subject" 
                        value={localContent.contact.thankYouSubject || ''} 
                        onChange={(v) => updateSection('contact', { thankYouSubject: v })} 
                      />
                      <TextAreaField 
                        label="Customer Thank-You Message" 
                        value={localContent.contact.thankYouMessage || ''} 
                        rows={4}
                        onChange={(v) => updateSection('contact', { thankYouMessage: v })} 
                      />
                    </div>
                  </div>
                </section>

                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Calendar size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Fast Track Section</h4>
                  </div>
                  <div className="space-y-6">
                    <InputField label="Section Title" value={localContent.contact.fastTrackTitle} onChange={(v) => updateSection('contact', { fastTrackTitle: v })} />
                    <TextAreaField label="Section Description" value={localContent.contact.fastTrackDescription} onChange={(v) => updateSection('contact', { fastTrackDescription: v })} />
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'scripts' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Scripts & Integration</h3>
                <section className="bg-white/5 p-8 rounded-sm space-y-8">
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Code size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Global Injections</h4>
                  </div>
                  <div className="space-y-8">
                    <TextAreaField 
                      label="Header Scripts (Inside <head>)" 
                      value={localContent.customScripts?.header || ''} 
                      rows={6}
                      placeholder="<!-- Paste Google Analytics or GTM code here -->"
                      onChange={(v) => updateSection('customScripts', { header: v })} 
                    />
                    <TextAreaField 
                      label="Footer Scripts (Before </body>)" 
                      value={localContent.customScripts?.footer || ''} 
                      rows={6}
                      placeholder="<!-- Paste tracking or widget scripts here -->"
                      onChange={(v) => updateSection('customScripts', { footer: v })} 
                    />
                    <TextAreaField 
                      label="Custom CSS" 
                      value={localContent.customScripts?.css || ''} 
                      rows={6}
                      placeholder="/* Add global CSS overrides here */"
                      onChange={(v) => updateSection('customScripts', { css: v })} 
                    />
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="space-y-10">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Inquiries</h3>
                   <button onClick={fetchLeads} className="p-2"><RefreshCw size={18} className={isDataFetching ? 'animate-spin' : ''}/></button>
                </div>
                {inquiries.map(inq => (
                  <div key={inq.id} className="bg-white/5 p-6 rounded-sm border border-white/5">
                    <h4 className="font-bold text-accent uppercase tracking-widest text-xs mb-2">{inq.subject}</h4>
                    <p className="text-sm mb-4"><strong>{inq.name}</strong> ({inq.email})</p>
                    <p className="text-gray-400 italic">"{inq.message}"</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'subscribers' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Newsletter</h3>
                <div className="grid grid-cols-1 gap-2">
                  {subscribers.map(sub => <div key={sub.id} className="p-4 bg-white/5 border border-white/5">{sub.email}</div>)}
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Infrastructure</h3>
                <div className="relative">
                  <pre className="bg-black p-6 border border-white/10 text-[10px] font-mono text-accent max-h-64 overflow-auto">
                    {SQL_SCHEMA}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
