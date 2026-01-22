
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

const MetaHead: React.FC = () => {
  const { content } = useSite();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    let title = content.branding.siteName;
    let description = "Expert Content Strategy & Brand Growth.";

    const path = location.pathname;

    if (path === '/') {
      title = content.home.seo?.metaTitle || title;
      description = content.home.seo?.metaDescription || description;
    } else if (path === '/services') {
      title = content.services.seo?.metaTitle || `Services | ${title}`;
      description = content.services.seo?.metaDescription || description;
    } else if (path === '/endorsements') {
      title = content.endorsements.seo?.metaTitle || `Endorsements | ${title}`;
      description = content.endorsements.seo?.metaDescription || description;
    } else if (path === '/favorites') {
      title = content.favorites_seo?.metaTitle || `Favorites | ${title}`;
      description = content.favorites_seo?.metaDescription || description;
    } else if (path === '/blog') {
      title = content.blogs_seo?.metaTitle || `Journal | ${title}`;
      description = content.blogs_seo?.metaDescription || description;
    } else if (path === '/sitemap') {
      title = `Sitemap | ${title}`;
      description = "Full site index of CreatorBrand Pro.";
    } else if (path.startsWith('/blog/') && id) {
      const post = content.blogs.find(b => b.id === id);
      if (post) {
        title = post.seo_title || `${post.title} | ${title}`;
        description = post.seo_description || post.excerpt;
      }
    } else if (path.startsWith('/favorites/') && id) {
      const item = content.favorites.find(f => f.id === id);
      if (item) {
        title = `${item.name} | Recommended Gear`;
        description = item.desc;
      }
    }

    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [location, content, id]);

  return null;
};

export default MetaHead;
