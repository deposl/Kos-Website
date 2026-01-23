
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSite } from '../contexts/SiteContext';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useSite();
  const post = content.blogs.find((b) => b.id === id);

  if (!post) {
    return (
      <div className="pt-24 md:pt-36 pb-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-accent bg-dark px-8 py-3 rounded-sm font-black uppercase tracking-widest text-xs inline-block">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-36 pb-20 bg-white min-h-screen overflow-x-hidden">
      <article className="max-w-4xl mx-auto px-6 pt-12 md:pt-16 w-full">
        <Link to="/blog" className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] mb-12 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Journal
        </Link>

        <header className="mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-8"
          >
            <div className="flex items-center space-x-2 text-accent">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">{post.date}</span>
            </div>
            <span className="text-gray-200">/</span>
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Strategy</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-[0.9] mb-12 break-words"
          >
            {post.title}
          </motion.h1>
          {post.image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-video w-full overflow-hidden rounded-sm bg-gray-100 mb-12"
            >
              <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
          )}
        </header>

        {/* Render HTML content with responsive typography and forced wrapping */}
        <div 
          className="prose prose-stone max-w-none text-gray-700 font-medium leading-relaxed w-full break-words
          prose-sm sm:prose-base md:prose-lg lg:prose-xl
          prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:italic
          prose-img:rounded-sm prose-img:shadow-2xl prose-a:text-accent"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-20 pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex space-x-6">
             <button className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">
               <Share2 className="w-4 h-4" /> <span>Share Article</span>
             </button>
          </div>
          <Link to="/blog" className="text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-8 decoration-accent">
            View All Posts
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
