
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';
import { ArrowRight, Calendar } from 'lucide-react';

const BlogList: React.FC = () => {
  const { content } = useSite();
  const blogs = content.blogs || [];

  return (
    <div className="pt-20 md:pt-28 pb-16 bg-white min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 pt-8 md:pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-none mb-6"
          >
            THE <span className="text-gray-200">JOURNAL</span>
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
            Insights on strategy, creativity, and the digital frontier. We share our blueprint for high-impact vertical storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {blogs.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group w-full"
            >
              <Link to={`/blog/${post.id}`} className="block overflow-hidden rounded-sm bg-gray-900 border border-gray-100 mb-6 aspect-video relative">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8 text-center">
                    <span className="text-[14px] font-display font-black uppercase italic tracking-tighter text-gray-700">Database Entry: 0{idx+1}</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white px-3 py-1.5 rounded-sm shadow-xl">
                  <Calendar className="w-3 h-3 text-accent" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{post.date}</span>
                </div>
              </Link>
              <div className="space-y-3">
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-3xl font-display font-black uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors break-words">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-base leading-relaxed line-clamp-2 whitespace-normal break-words">
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
          <div className="text-center py-24 bg-[#f8f8f8] rounded-sm border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px]">Journal entries will appear after database sync</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
