
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you within 24 hours.');
  };

  return (
    <div className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter mb-6">
            Let's <span className="text-accent">Connect</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Whether you want to book a strategy session or discuss a brand partnership, we're ready to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-white/5 p-8 md:p-12 rounded-[40px]"
          >
            <h2 className="text-3xl font-display font-black uppercase italic mb-8 tracking-tighter">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                    placeholder="hello@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors appearance-none"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="" disabled className="bg-dark">Select Inquiry Type</option>
                  <option value="Consulting" className="bg-dark">TikTok Consulting</option>
                  <option value="Partnership" className="bg-dark">Brand Partnership</option>
                  <option value="Speaker" className="bg-dark">Speaking / Media</option>
                  <option value="Other" className="bg-dark">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea 
                  rows={5}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Tell us about your goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-accent text-dark font-black uppercase tracking-widest py-5 rounded-xl flex items-center justify-center group hover:scale-[1.02] transition-transform"
              >
                Send Message <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Booking & Info */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-accent text-dark p-8 md:p-12 rounded-[40px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-4xl font-display font-black uppercase italic mb-4 tracking-tighter">Fast Track?</h2>
                <p className="text-lg font-bold mb-8">Skip the email and book a direct 1:1 strategy session on my calendar.</p>
              </div>
              <button className="bg-dark text-white px-8 py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center self-start">
                <Calendar className="mr-2" /> Book a Session
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-white/5 p-8 md:p-12 rounded-[40px] space-y-8"
            >
              <div className="flex items-start">
                <div className="bg-accent/10 p-4 rounded-xl text-accent mr-6">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-xs tracking-widest mb-1">Email Us</h3>
                  <p className="text-gray-400 text-lg">contact@creatorpro.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/10 p-4 rounded-xl text-accent mr-6">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-xs tracking-widest mb-1">Call Us</h3>
                  <p className="text-gray-400 text-lg">+1 (888) CREATOR</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/10 p-4 rounded-xl text-accent mr-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-xs tracking-widest mb-1">HQ</h3>
                  <p className="text-gray-400 text-lg">Los Angeles, CA / Remote</p>
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
