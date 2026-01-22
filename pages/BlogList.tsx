
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';
import { ArrowRight, Calendar } from 'lucide-react';

const BlogList: React.FC = () => {
  const { content } = useSite();
  const blogs = content.blogs || [];

  return (
    <div className="pt-24 md:pt-36 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 pt-12 md:pt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-none mb-8"
          >
            THE <span className="text-gray-200">JOURNAL</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
            Insights on strategy, creativity, and the digital frontier. We share our blueprint for high-impact vertical storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogs.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`} className="block overflow-hidden rounded-sm bg-[#f8f8f8] border border-gray-100 mb-8 aspect-video relative">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200 italic font-black text-4xl">NO IMAGE</div>
                )}
                <div className="absolute top-6 left-6 flex items-center space-x-2 bg-white px-4 py-2 rounded-sm shadow-xl">
                  <Calendar className="w-3 h-3 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{post.date}</span>
                </div>
              </Link>
              <div className="space-y-4">
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-3xl font-display font-black uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-base leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] group/btn">
                  Read Full Article <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-20 bg-[#f8f8f8] rounded-sm border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold uppercase tracking-widest">No articles found. Check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
