
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Calendar, Mail, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useSite } from '../contexts/SiteContext';

const Contact: React.FC = () => {
  const { dbConfig } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const supabase = createClient(dbConfig.url, dbConfig.key);
      const { error } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="pt-40 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-6">
            Let's <span className="text-accent text-hollow">Connect</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl font-medium">
            Whether you want to book a strategy session or discuss a brand partnership, we're ready to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0A0A0A] text-white p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                  <CheckCircle size={80} className="text-accent" />
                  <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">Message Received</h2>
                  <p className="text-gray-400 font-medium">We'll review your inquiry and get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-accent text-xs font-black uppercase tracking-widest border-b border-accent pb-1"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <h2 className="text-3xl font-display font-black uppercase italic mb-8 tracking-tighter">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Email</label>
                        <input 
                          type="email" 
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                          placeholder="hello@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                      <select 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 focus:outline-none focus:border-accent transition-colors appearance-none"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="" disabled className="bg-dark">Select Inquiry Type</option>
                        <option value="Consulting" className="bg-dark text-white">TikTok Consulting</option>
                        <option value="Partnership" className="bg-dark text-white">Brand Partnership</option>
                        <option value="Speaker" className="bg-dark text-white">Speaking / Media</option>
                        <option value="Other" className="bg-dark text-white">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Message</label>
                      <textarea 
                        rows={5}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 focus:outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Tell us about your goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-accent text-dark font-black uppercase tracking-widest py-5 rounded-sm flex items-center justify-center group hover:scale-[1.02] transition-transform disabled:opacity-50"
                    >
                      {status === 'loading' ? <Loader2 className="animate-spin" /> : (
                        <>Send Message <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                      )}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-[10px] font-black uppercase text-center">Submission failed. Try again.</p>}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Booking & Info */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-accent text-dark p-8 md:p-12 rounded-sm flex flex-col justify-between shadow-xl"
            >
              <div>
                <h2 className="text-4xl font-display font-black uppercase italic mb-4 tracking-tighter">Fast Track?</h2>
                <p className="text-lg font-bold mb-8">Skip the email and book a direct 1:1 strategy session on my calendar.</p>
              </div>
              <button className="bg-dark text-white px-8 py-5 rounded-sm font-black uppercase tracking-widest text-xs flex items-center justify-center self-start hover:bg-white hover:text-dark transition-colors">
                <Calendar className="mr-2" /> Book a Session
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-100 p-8 md:p-12 rounded-sm space-y-8 shadow-sm"
            >
              <div className="flex items-start">
                <div className="bg-dark text-accent p-4 rounded-sm mr-6 shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-1">Email Us</h3>
                  <p className="text-dark font-bold text-lg">contact@creatorpro.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-dark text-accent p-4 rounded-sm mr-6 shadow-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-1">Call Us</h3>
                  <p className="text-dark font-bold text-lg">+1 (888) CREATOR</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-dark text-accent p-4 rounded-sm mr-6 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-1">HQ</h3>
                  <p className="text-dark font-bold text-lg">Los Angeles, CA / Remote</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
