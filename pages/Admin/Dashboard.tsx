
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import ReactQuill from 'react-quill';
import { 
  Save, Layout, ClipboardList, Palette, FileText, MoveUp, 
  Loader2, Database, Trash2, Activity, RefreshCw,
  Check, Terminal, XCircle, Copy, Upload, ArrowUp, ArrowDown, Plus, Image as ImageIcon,
  Star, Heart, Briefcase, Share2, Type, Globe, Shield, User, Building2
} from 'lucide-react';
import { BlogPost, NavLink, FavoriteItem, SEOConfig, ClientBrand } from '../../types';

const SQL_SCHEMA = `-- SUPABASE DATABASE SETUP SCRIPT (V4 - Slider Support)
-- Run this in your Supabase SQL Editor to prepare the database.

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS admin_key TEXT DEFAULT 'admin123';
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS seo_description TEXT;

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS favorites_seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS blogs_seo JSONB DEFAULT '{}'::jsonb;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS nav_links JSONB DEFAULT '[]'::jsonb;

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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    date TEXT,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
`;

// Quill Modules Configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

// FIX: Quill expects 'list' to handle bullets and numbers. Removed 'bullet' as it's an attribute of list.
const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 
  'link', 'image', 'video'
];

// Helper for Base64 conversion
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// UI COMPONENTS
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

const TextAreaField = ({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</label>
    <textarea 
      rows={rows} 
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
        label="Meta Title (Ideal: 50-60 chars)" 
        value={config?.metaTitle || ''} 
        onChange={(v) => onChange({ metaTitle: v, metaDescription: config?.metaDescription || '' })} 
      />
      <TextAreaField 
        label="Meta Description (Ideal: 150-160 chars)" 
        value={config?.metaDescription || ''} 
        onChange={(v) => onChange({ metaTitle: config?.metaTitle || '', metaDescription: v })} 
      />
    </div>
  </div>
);

const ImageUploadField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => {
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
    <div className="space-y-2">
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
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </div>
    </div>
  );
};

const MultiImageManager = ({ label, images, onChange }: { label: string; images: string[]; onChange: (imgs: string[]) => void }) => {
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

  const removeImage = (idx: number) => {
    const newImgs = [...images];
    newImgs.splice(idx, 1);
    onChange(newImgs);
  };

  const moveImg = (idx: number, dir: 'up' | 'down') => {
    const newImgs = [...images];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target >= 0 && target < newImgs.length) {
      [newImgs[idx], newImgs[target]] = [newImgs[target], newImgs[idx]];
      onChange(newImgs);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
         <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</label>
         <button 
           onClick={() => fileInputRef.current?.click()}
           className="bg-accent text-dark px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:brightness-110"
         >
           {loading ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />} Add Frame
         </button>
         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAddImage} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square bg-white/5 border border-white/10 rounded-sm group overflow-hidden">
             <img src={img} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all" />
             <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <div className="flex gap-2">
                  <button onClick={() => moveImg(idx, 'up')} disabled={idx === 0} className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-dark disabled:opacity-20"><ArrowUp size={14}/></button>
                  <button onClick={() => moveImg(idx, 'down')} disabled={idx === images.length - 1} className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-dark disabled:opacity-20"><ArrowDown size={14}/></button>
                </div>
                <button onClick={() => removeImage(idx)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={18} /></button>
             </div>
             <div className="absolute top-2 left-2 bg-dark/80 text-[8px] font-black px-2 py-1 rounded-sm border border-white/10">0{idx + 1}</div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-white/5 text-gray-700 font-black uppercase text-[10px] tracking-widest">
            Slider Empty. Add images to activate.
          </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { content, isAdmin, logout, isLoading: isGlobalLoading, updateContent } = useSite();
  const [activeTab, setActiveTab] = useState<'branding' | 'navigation' | 'home' | 'services' | 'endorsements' | 'blogs' | 'favorites' | 'system'>('branding');
  const [localContent, setLocalContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [syncLog, setSyncLog] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  useEffect(() => {
    const isActuallyAdmin = sessionStorage.getItem('is_admin') === 'true';
    if (!isAdmin && !isActuallyAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  if (isGlobalLoading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <Loader2 className="animate-spin text-accent" size={48} />
      <p className="text-white text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Initializing Console</p>
    </div>
  );

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setSyncLog(["Initializing secure sync..."]);
    try {
      await updateContent(localContent);
      setSyncLog(prev => [...prev, "✓ Settings Updated", "✓ Table Blogs Rebuilt", "✓ Table Favorites Rebuilt", "✓ CLOUD SYNC SUCCESSFUL"]);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 5000);
    } catch (e: any) {
      const errMsg = e.message || String(e);
      setSyncLog(prev => [...prev, `✖ CRITICAL ERROR: ${errMsg}`]);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSection = (section: keyof typeof localContent, updates: any) => {
    setLocalContent(prev => {
      const current = prev[section];
      let newValue;
      
      if (Array.isArray(current)) {
        newValue = updates;
      } else {
        newValue = { ...(current as any || {}), ...updates };
      }
      
      return {
        ...prev,
        [section]: newValue
      };
    });
  };

  const moveItem = (listKey: 'navLinks' | 'favorites', index: number, direction: 'up' | 'down') => {
    const newList = [...(localContent[listKey] || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newList.length) {
      [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
      updateSection(listKey, newList);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-44 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-display font-black uppercase italic tracking-tighter leading-none">
              COMMAND <span className="text-accent">CENTER</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">CMS ARCHITECTURE V11.7 (FULL HOME EDITOR)</p>
          </div>
          <div className="flex space-x-4 w-full md:w-auto">
            <button 
              onClick={handleSave} 
              disabled={isSaving} 
              className={`flex-1 md:flex-none px-12 py-5 rounded-sm font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-all hover:scale-[1.02] disabled:opacity-20 shadow-[0_0_30px_rgba(204,255,0,0.3)] ${saveStatus === 'success' ? 'bg-green-500 text-white' : 'bg-accent text-dark'}`}
            >
              {isSaving ? <Loader2 className="animate-spin mr-3" size={18} /> : saveStatus === 'success' ? <Check className="mr-3" size={18}/> : <Save className="mr-3 w-4 h-4" />} 
              {saveStatus === 'success' ? 'Cloud Updated' : 'Push to Cloud'}
            </button>
            <button onClick={logout} className="bg-white/5 hover:bg-white/10 px-8 py-5 text-xs font-black uppercase tracking-widest border border-white/5 transition-colors">Logout</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-72 space-y-2 flex-shrink-0">
            {[
              { id: 'branding', icon: Palette, label: 'Identity' },
              { id: 'navigation', icon: MoveUp, label: 'Navigation' },
              { id: 'home', icon: Layout, label: 'Home Page' },
              { id: 'services', icon: Briefcase, label: 'Services Page' },
              { id: 'endorsements', icon: Star, label: 'Endorsements' },
              { id: 'favorites', icon: Heart, label: 'Favorites' },
              { id: 'blogs', icon: FileText, label: 'Journal' },
              { id: 'system', icon: Database, label: 'Infrastructure' }
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center p-5 rounded-sm text-[10px] font-black uppercase tracking-[0.25em] text-left transition-all ${activeTab === tab.id ? 'bg-accent text-dark' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                <tab.icon className="mr-4 w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-grow bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-sm min-h-[700px] shadow-2xl overflow-hidden">
            
            {activeTab === 'branding' && (
              <div className="space-y-10">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Site Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Site Name" value={localContent.branding.siteName} onChange={(v) => updateSection('branding', { siteName: v })} />
                  <InputField label="Logo Text" value={localContent.branding.logoText} onChange={(v) => updateSection('branding', { logoText: v })} />
                  <InputField label="Logo Sub-text" value={localContent.branding.logoSubText} onChange={(v) => updateSection('branding', { logoSubText: v })} />
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Theme Accent</label>
                    <div className="flex gap-4">
                      <input type="color" className="w-14 h-14 bg-white/5 border border-white/10 p-2 cursor-pointer" value={localContent.branding.accentColor} onChange={(e) => updateSection('branding', { accentColor: e.target.value })} />
                      <input className="flex-grow bg-white/5 border border-white/10 px-4 font-mono text-sm uppercase text-white" value={localContent.branding.accentColor} onChange={(e) => updateSection('branding', { accentColor: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-white/5">
                   <div className="flex items-center gap-3 text-red-500 mb-8">
                      <Shield size={20} />
                      <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Security Protocol</h3>
                   </div>
                   <div className="max-w-md">
                      <InputField 
                        type="password"
                        label="Master Access Key" 
                        placeholder="Current access key"
                        value={localContent.branding.adminKey || ''} 
                        onChange={(v) => updateSection('branding', { adminKey: v })} 
                      />
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'navigation' && (
              <div className="space-y-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Site Navigation</h3>
                  <button onClick={() => updateSection('navLinks', [...(localContent.navLinks || []), { id: crypto.randomUUID(), name: 'New Link', path: '/', isExternal: false, isButton: false }])} className="bg-accent text-dark px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2"><Plus size={14} /> Add New Link</button>
                </div>
                <div className="space-y-4">
                  {(localContent.navLinks || []).map((link, idx) => (
                    <div key={link.id} className="bg-white/5 border border-white/5 p-6 rounded-sm flex flex-col md:flex-row gap-6 items-center group">
                      <div className="flex flex-col gap-2">
                        <button onClick={() => moveItem('navLinks', idx, 'up')} disabled={idx === 0} className="p-1 hover:text-accent disabled:opacity-20"><ArrowUp size={16} /></button>
                        <button onClick={() => moveItem('navLinks', idx, 'down')} disabled={idx === (localContent.navLinks || []).length - 1} className="p-1 hover:text-accent disabled:opacity-20"><ArrowDown size={16} /></button>
                      </div>
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <InputField label="Label" value={link.name} onChange={(v) => {
                          const n = [...localContent.navLinks]; n[idx].name = v; updateSection('navLinks', n);
                        }} />
                        <InputField label="Path" value={link.path} onChange={(v) => {
                          const n = [...localContent.navLinks]; n[idx].path = v; updateSection('navLinks', n);
                        }} />
                      </div>
                      <button onClick={() => {
                        const n = [...localContent.navLinks]; n[idx].isButton = !n[idx].isButton; updateSection('navLinks', n);
                      }} className={`text-[9px] font-black uppercase px-4 py-2 rounded-sm border ${link.isButton ? 'bg-accent text-dark' : 'border-white/10 text-gray-500'}`}>{link.isButton ? 'Button' : 'Default'}</button>
                      <button onClick={() => updateSection('navLinks', localContent.navLinks.filter(n => n.id !== link.id))} className="text-red-500 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'home' && (
              <div className="space-y-12">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Home Page</h3>
                <SEOEditor config={localContent.home.seo} onChange={(v) => updateSection('home', { seo: v })} />
                
                {/* Hero Headers */}
                <section className="space-y-8 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3 text-accent/60 mb-4">
                    <Layout size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Hero Configuration</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Headline Part 1" value={localContent.home.heroTitle} onChange={(v) => updateSection('home', { heroTitle: v })} />
                    <InputField label="Headline Part 2" value={localContent.home.heroSubTitle} onChange={(v) => updateSection('home', { heroSubTitle: v })} />
                    <div className="md:col-span-2">
                      <TextAreaField label="Description" value={localContent.home.heroDescription} onChange={(v) => updateSection('home', { heroDescription: v })} />
                    </div>
                    <InputField label="Status Badge" value={localContent.home.heroMood} onChange={(v) => updateSection('home', { heroMood: v })} />
                    
                    <div className="md:col-span-2 pt-8 space-y-12">
                      <MultiImageManager 
                        label="Hero Header Slider"
                        images={localContent.home.heroImages || [localContent.home.heroImage]} 
                        onChange={(v) => updateSection('home', { heroImages: v })} 
                      />
                      
                      <MultiImageManager 
                        label="Service Section Slider"
                        images={localContent.home.serviceImages || []} 
                        onChange={(v) => updateSection('home', { serviceImages: v })} 
                      />
                    </div>
                  </div>
                </section>

                {/* About Section Editor */}
                <section className="space-y-8 pt-12 border-t border-white/5">
                  <div className="flex items-center gap-3 text-accent/60 mb-4">
                    <User size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">About Section (The Man Behind)</h4>
                  </div>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputField label="About Title" value={localContent.home.aboutTitle} onChange={(v) => updateSection('home', { aboutTitle: v })} />
                      <ImageUploadField label="Profile Image" value={localContent.home.aboutImage} onChange={(v) => updateSection('home', { aboutImage: v })} />
                    </div>
                    
                    {/* Paragraphs Manager */}
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                         <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Narrative Paragraphs</label>
                         <button 
                           onClick={() => updateSection('home', { aboutText: [...(localContent.home.aboutText || []), "New paragraph..."] })}
                           className="text-[9px] font-black uppercase tracking-widest text-accent flex items-center gap-2"
                         >
                           <Plus size={12} /> Add Paragraph
                         </button>
                       </div>
                       {(localContent.home.aboutText || []).map((para, idx) => (
                         <div key={idx} className="flex gap-4 items-start group">
                            <TextAreaField label={`Paragraph ${idx+1}`} value={para} onChange={(v) => {
                               const newText = [...localContent.home.aboutText]; newText[idx] = v; updateSection('home', { aboutText: newText });
                            }} rows={4} />
                            <button 
                              onClick={() => {
                                const newText = localContent.home.aboutText.filter((_, i) => i !== idx);
                                updateSection('home', { aboutText: newText });
                              }}
                              className="mt-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/5 rounded-sm"
                            >
                              <Trash2 size={16} />
                            </button>
                         </div>
                       ))}
                    </div>

                    {/* Stats Manager */}
                    <div className="space-y-4 pt-8">
                       <div className="flex justify-between items-center">
                         <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Key Statistics</label>
                         <button 
                           onClick={() => updateSection('home', { stats: [...(localContent.home.stats || []), { label: "New Stat", value: "0" }] })}
                           className="text-[9px] font-black uppercase tracking-widest text-accent flex items-center gap-2"
                         >
                           <Plus size={12} /> Add Stat
                         </button>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(localContent.home.stats || []).map((stat, idx) => (
                            <div key={idx} className="bg-white/5 p-4 rounded-sm border border-white/5 relative group">
                               <button 
                                 onClick={() => {
                                   const newStats = localContent.home.stats.filter((_, i) => i !== idx);
                                   updateSection('home', { stats: newStats });
                                 }}
                                 className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                               >
                                 <XCircle size={14} />
                               </button>
                               <InputField label="Value (e.g. 1.6M)" value={stat.value} onChange={(v) => {
                                  const newStats = [...localContent.home.stats]; newStats[idx].value = v; updateSection('home', { stats: newStats });
                               }} />
                               <div className="mt-2">
                                  <InputField label="Label" value={stat.label} onChange={(v) => {
                                     const newStats = [...localContent.home.stats]; newStats[idx].label = v; updateSection('home', { stats: newStats });
                                  }} />
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </section>

                {/* Brands Manager */}
                <section className="space-y-8 pt-12 border-t border-white/5">
                   <div className="flex items-center gap-3 text-accent/60 mb-4">
                    <Building2 size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Global Brand Partners</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Client Portfolio</label>
                        <button 
                           onClick={() => updateSection('home', { clients: [...(localContent.home.clients || []), { name: "Brand Name", logo: "" }] })}
                           className="bg-white/5 text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2 hover:bg-white/10"
                        >
                           <Plus size={12} /> Add Brand
                        </button>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {(localContent.home.clients || []).map((client, idx) => (
                          <div key={idx} className="bg-white/5 p-6 rounded-sm border border-white/5 group relative">
                             <button 
                                onClick={() => {
                                  const newClients = localContent.home.clients.filter((_, i) => i !== idx);
                                  updateSection('home', { clients: newClients });
                                }}
                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <Trash2 size={14} />
                             </button>
                             <ImageUploadField label="Logo (SVG/PNG)" value={client.logo} onChange={(v) => {
                                const newClients = [...localContent.home.clients]; newClients[idx].logo = v; updateSection('home', { clients: newClients });
                             }} />
                             <div className="mt-4">
                                <InputField label="Brand Name" value={client.name} onChange={(v) => {
                                   const newClients = [...localContent.home.clients]; newClients[idx].name = v; updateSection('home', { clients: newClients });
                                }} />
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-12">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Services Page</h3>
                <SEOEditor config={localContent.services.seo} onChange={(v) => updateSection('services', { seo: v })} />
                <section className="space-y-8 pt-8 border-t border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Header Label" value={localContent.services.headerLabel} onChange={(v) => updateSection('services', { headerLabel: v })} />
                    <InputField label="Main Title" value={localContent.services.headerTitle} onChange={(v) => updateSection('services', { headerTitle: v })} />
                    <div className="md:col-span-2">
                      <TextAreaField label="Header Description" value={localContent.services.headerDescription} onChange={(v) => updateSection('services', { headerDescription: v })} />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'endorsements' && (
              <div className="space-y-12">
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Endorsements Page</h3>
                <SEOEditor config={localContent.endorsements.seo} onChange={(v) => updateSection('endorsements', { seo: v })} />
                <section className="space-y-8 pt-8 border-t border-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Title" value={localContent.endorsements.headerTitle} onChange={(v) => updateSection('endorsements', { headerTitle: v })} />
                    <ImageUploadField label="Showcase Image" value={localContent.endorsements.mainImage} onChange={(v) => updateSection('endorsements', { mainImage: v })} />
                    <div className="md:col-span-2">
                      <TextAreaField label="Description" value={localContent.endorsements.headerDescription} onChange={(v) => updateSection('endorsements', { headerDescription: v })} />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">Favorites Page</h3>
                  <button onClick={() => updateSection('favorites', [...(localContent.favorites || []), { id: crypto.randomUUID(), name: 'New Item', desc: '', code: 'CODE', img: '' }])} className="bg-accent text-dark px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2"><Plus size={14} /> Add New Item</button>
                </div>
                <SEOEditor config={localContent.favorites_seo} onChange={(v) => setLocalContent(prev => ({ ...prev, favorites_seo: v }))} />
                <div className="space-y-6 pt-8 border-t border-white/5">
                  {(localContent.favorites || []).map((item, idx) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 p-6 rounded-sm flex flex-col md:flex-row gap-6 items-start group">
                      <div className="flex flex-col gap-2">
                        <button onClick={() => moveItem('favorites', idx, 'up')} disabled={idx === 0} className="p-1 hover:text-accent disabled:opacity-20"><ArrowUp size={16} /></button>
                        <button onClick={() => moveItem('favorites', idx, 'down')} disabled={idx === (localContent.favorites || []).length - 1} className="p-1 hover:text-accent disabled:opacity-20"><ArrowDown size={16} /></button>
                      </div>
                      <div className="w-full md:w-48 flex-shrink-0">
                         <ImageUploadField label="Product Image" value={item.img} onChange={(v) => {
                           const n = [...localContent.favorites]; n[idx].img = v; updateSection('favorites', n);
                         }} />
                      </div>
                      <div className="flex-grow grid grid-cols-1 gap-4 w-full">
                        <InputField label="Name" value={item.name} onChange={(v) => {
                          const n = [...localContent.favorites]; n[idx].name = v; updateSection('favorites', n);
                        }} />
                        <InputField label="Code" value={item.code} onChange={(v) => {
                          const n = [...localContent.favorites]; n[idx].code = v; updateSection('favorites', n);
                        }} />
                        <TextAreaField label="Description" value={item.desc} onChange={(v) => {
                          const n = [...localContent.favorites]; n[idx].desc = v; updateSection('favorites', n);
                        }} />
                      </div>
                      <button onClick={() => updateSection('favorites', localContent.favorites.filter(f => f.id !== item.id))} className="text-red-500 p-2"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">The Journal</h3>
                  <button onClick={() => updateSection('blogs', [{ id: crypto.randomUUID(), title: 'New Post', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', image: '' }, ...(localContent.blogs || [])])} className="bg-accent text-dark px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2"><Plus size={14} /> New Post</button>
                </div>
                <SEOEditor config={localContent.blogs_seo} onChange={(v) => setLocalContent(prev => ({ ...prev, blogs_seo: v }))} />
                <div className="space-y-10 pt-8 border-t border-white/5">
                  {(localContent.blogs || []).map((blog, i) => (
                    <div key={blog.id} className="bg-white/5 p-8 border border-white/10 rounded-sm space-y-8 group relative">
                      <button onClick={() => updateSection('blogs', localContent.blogs.filter(b => b.id !== blog.id))} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18} /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Post Title" value={blog.title} onChange={(v) => {
                          const n = [...localContent.blogs]; n[i].title = v; updateSection('blogs', n);
                        }} />
                        <InputField label="Date" value={blog.date} onChange={(v) => {
                          const n = [...localContent.blogs]; n[i].date = v; updateSection('blogs', n);
                        }} />
                      </div>
                      <ImageUploadField label="Featured Image" value={blog.image} onChange={(v) => {
                        const n = [...localContent.blogs]; n[i].image = v; updateSection('blogs', n);
                      }} />
                      <TextAreaField label="Excerpt" value={blog.excerpt} onChange={(v) => {
                        const n = [...localContent.blogs]; n[i].excerpt = v; updateSection('blogs', n);
                      }} />
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Full Content (Rich Text)</label>
                        <ReactQuill 
                          theme="snow" 
                          value={blog.content || ''} 
                          modules={quillModules}
                          formats={quillFormats}
                          onChange={(v) => {
                            const n = [...localContent.blogs]; n[i].content = v; updateSection('blogs', n);
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-12">
                <div className="bg-blue-500/5 border border-blue-500/10 p-8 rounded-sm">
                   <div className="flex items-center gap-4 text-blue-400 mb-6">
                      <Terminal size={28} />
                      <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Database Protocol</h3>
                   </div>
                   <p className="text-sm text-gray-400 mb-8 leading-relaxed">Execute this script in Supabase to sync the schema if needed.</p>
                   <div className="relative">
                      <button onClick={copySql} className="absolute top-4 right-4 bg-accent text-dark p-2 rounded-sm font-black uppercase text-[10px] flex items-center gap-2 hover:scale-105 transition-transform">
                        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy SQL"}
                      </button>
                      <pre className="bg-black border border-white/10 p-6 rounded-sm text-[10px] font-mono text-accent overflow-x-auto leading-relaxed max-h-[350px]">
                        {SQL_SCHEMA}
                      </pre>
                   </div>
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
