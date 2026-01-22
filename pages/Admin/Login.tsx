
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import { motion } from 'framer-motion';
import { Lock, Loader2, ShieldAlert } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isAdmin } = useSite();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!password) {
      setError("Please enter the access key.");
      return;
    }
    
    setIsChecking(true);
    
    // Small timeout to allow UI to breathe and ensure state consistency
    setTimeout(() => {
      const success = login(password);
      
      if (success) {
        // Force immediate navigation on success to bypass potential useEffect delays
        navigate('/admin/dashboard');
      } else {
        setIsChecking(false);
        setError("Invalid Access Key. Please try again.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0A0A0A] w-full max-w-md p-10 md:p-12 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-10 relative z-10">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(204,255,0,0.25)]">
            <Lock className="text-dark" size={32} />
          </div>
          <h1 className="text-white text-4xl font-display font-black uppercase tracking-tighter italic leading-none">
            CORE <span className="text-accent">AUTH</span>
          </h1>
          <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em] mt-4">Security Level 01 Access</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="block text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1">Master Access Key</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isChecking}
              className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} p-5 rounded-sm text-white focus:outline-none focus:border-accent transition-all text-sm font-mono tracking-widest placeholder:text-gray-800`}
              placeholder="••••••••"
              autoFocus
            />
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2 px-1"
              >
                <ShieldAlert size={12} /> {error}
              </motion.div>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={isChecking}
            className="w-full bg-accent text-dark p-5 rounded-sm font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 shadow-[0_0_30px_rgba(204,255,0,0.15)]"
          >
            {isChecking ? (
              <>
                <Loader2 className="animate-spin mr-3" size={18} />
                Verifying...
              </>
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center opacity-40">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">
            Encrypted Session Gateway • Build 2.1.4
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
