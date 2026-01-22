
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SiteContent, BlogPost, FavoriteItem, TypographyConfig } from '../types';
import { defaultContent } from '../data/defaultContent';

const defaultUrl = 'https://sb.kostagenaris.com';
const defaultKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2ODM5NzI4MCwiZXhwIjo0OTI0MDcwODgwLCJyb2xlIjoiYW5vbiJ9.j0rfGMGqGBC8VtwTR3Jq42Q8K8wuFZUTt6rf2YBhPa8';

export const rawHost = 'sb.kostagenaris.com';
const CONTENT_CACHE_KEY = 'creatorpro_site_content_v4';

interface TestResult {
  success: boolean;
  message: string;
  url: string;
}

interface SiteContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => Promise<void>;
  isAdmin: boolean;
  isLoading: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  isCloudConnected: boolean;
  refreshData: () => Promise<void>;
  testConnection: () => Promise<TestResult>;
  dbConfig: { url: string; key: string };
  setDbConfig: (config: { url: string; key: string }) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dbConfig, setDbConfigState] = useState(() => ({
    url: localStorage.getItem('db_url') || defaultUrl,
    key: localStorage.getItem('db_key') || defaultKey
  }));

  const supabase = useMemo(() => createClient(dbConfig.url, dbConfig.key), [dbConfig]);

  const [content, setContent] = useState<SiteContent>(() => {
    const cached = localStorage.getItem(CONTENT_CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return defaultContent;
      }
    }
    return defaultContent;
  });

  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('is_admin') === 'true');
  const [isLoading, setIsLoading] = useState(true);

  const setDbConfig = (config: { url: string; key: string }) => {
    localStorage.setItem('db_url', config.url);
    localStorage.setItem('db_key', config.key);
    localStorage.removeItem(CONTENT_CACHE_KEY);
    setDbConfigState(config);
    window.location.reload(); 
  };

  const fetchData = async () => {
    try {
      const hasCache = localStorage.getItem(CONTENT_CACHE_KEY) !== null;
      if (!hasCache) setIsLoading(true);

      const [settingsRes, blogsRes, favsRes] = await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
        supabase.from('blogs').select('*').order('date', { ascending: false }),
        supabase.from('favorites').select('*').order('order_index', { ascending: true })
      ]);

      const settings = settingsRes.data;
      const blogs = blogsRes.data || [];
      const favs = favsRes.data || [];

      const updatedContent: SiteContent = {
        branding: { 
          ...defaultContent.branding, 
          ...(settings?.branding || {}),
          adminKey: settings?.admin_key || 'admin123'
        },
        typography: settings?.typography_data || (defaultContent as any).typography || {
          nav: 15,
          small: 13.5,
          body: 21,
          h1: 120,
          h2: 80
        },
        home: { ...defaultContent.home, ...(settings?.home_data || {}) },
        services: { ...defaultContent.services, ...(settings?.services_data || {}) },
        endorsements: { ...defaultContent.endorsements, ...(settings?.endorsements_data || {}) },
        favorites_seo: settings?.favorites_seo || defaultContent.favorites_seo,
        blogs_seo: settings?.blogs_seo || defaultContent.blogs_seo,
        navLinks: (settings?.nav_links && settings.nav_links.length > 0) ? settings.nav_links : defaultContent.navLinks,
        blogs: (blogs.length > 0) ? blogs : (settingsRes.data ? [] : defaultContent.blogs),
        favorites: (favs.length > 0) ? favs : (settingsRes.data ? [] : defaultContent.favorites)
      };

      setContent(updatedContent);
      localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(updatedContent));
    } catch (err: any) {
      console.error('❌ Data Sync Failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dbConfig]);

  useEffect(() => {
    if (content.branding?.accentColor) {
      document.documentElement.style.setProperty('--accent-color', content.branding.accentColor);
    }
    
    const ty = content.typography;
    if (ty) {
      document.documentElement.style.setProperty('--font-nav', `${ty.nav}px`);
      document.documentElement.style.setProperty('--font-small', `${ty.small}px`);
      document.documentElement.style.setProperty('--font-body', `${ty.body}px`);
      document.documentElement.style.setProperty('--font-h1', `${ty.h1}px`);
      document.documentElement.style.setProperty('--font-h2', `${ty.h2}px`);
    }
  }, [content.branding, content.typography]);

  const testConnection = async (): Promise<TestResult> => {
    const probeUrl = `${dbConfig.url}/rest/v1/`;
    try {
      const response = await fetch(`${probeUrl}site_settings?select=id&limit=1`, {
        method: 'GET',
        headers: {
          'apikey': dbConfig.key,
          'Authorization': `Bearer ${dbConfig.key}`
        }
      });
      if (response.ok) return { success: true, message: 'SUCCESS: Database pipeline active.', url: dbConfig.url };
      return { success: false, message: 'SERVER ERROR: Check Supabase URL or Key.', url: dbConfig.url };
    } catch (err: any) {
      return { success: false, message: 'CONNECTION FAILED: Check URL or CORS settings.', url: dbConfig.url };
    }
  };

  const updateContent = async (newContent: SiteContent) => {
    const { error: sErr } = await supabase.from('site_settings').upsert({
      id: 1,
      branding: {
        siteName: newContent.branding.siteName,
        accentColor: newContent.branding.accentColor,
        logoText: newContent.branding.logoText,
        logoSubText: newContent.branding.logoSubText
      },
      typography_data: newContent.typography,
      admin_key: newContent.branding.adminKey || 'admin123',
      home_data: newContent.home,
      services_data: newContent.services,
      endorsements_data: newContent.endorsements,
      favorites_seo: newContent.favorites_seo,
      blogs_seo: newContent.blogs_seo,
      nav_links: newContent.navLinks
    }, { onConflict: 'id' });
    
    if (sErr) throw new Error(`[Settings Save Failed] ${sErr.message}`);

    const { error: bDelErr } = await supabase.from('blogs').delete().filter('id', 'not.is', null);
    if (bDelErr) throw new Error(`[Blogs Clean Failed] ${bDelErr.message}`);

    const blogsToInsert = (newContent.blogs || []).map(b => ({
      title: b.title,
      date: b.date,
      excerpt: b.excerpt,
      content: b.content,
      image: b.image,
      seo_title: b.seo_title || '',
      seo_description: b.seo_description || ''
    }));

    if (blogsToInsert.length > 0) {
      const { error: bInsErr } = await supabase.from('blogs').insert(blogsToInsert);
      if (bInsErr) throw new Error(`[Blogs Save Failed] ${bInsErr.message}`);
    }

    const { error: fDelErr } = await supabase.from('favorites').delete().filter('id', 'not.is', null);
    if (fDelErr) throw new Error(`[Favorites Clean Failed] ${fDelErr.message}`);

    const favsToInsert = (newContent.favorites || []).map((f, i) => ({
      name: f.name,
      desc: f.desc,
      code: f.code,
      img: f.img,
      order_index: i
    }));

    if (favsToInsert.length > 0) {
      const { error: fInsErr } = await supabase.from('favorites').insert(favsToInsert);
      if (fInsErr) throw new Error(`[Favorites Save Failed] ${fInsErr.message}`);
    }

    localStorage.removeItem(CONTENT_CACHE_KEY);
    await fetchData();
  };

  const login = (pass: string) => {
    const validKey = content.branding.adminKey || 'admin123';
    if (pass === validKey) { 
      sessionStorage.setItem('is_admin', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('is_admin');
    setIsAdmin(false);
  };

  return (
    <SiteContext.Provider value={{ 
      content, updateContent, isAdmin, isLoading, login, logout,
      isCloudConnected: true, refreshData: fetchData, testConnection,
      dbConfig, setDbConfig
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
