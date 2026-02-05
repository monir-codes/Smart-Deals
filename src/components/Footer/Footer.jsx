import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, Rocket, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: ['About Us', 'Careers', 'Partners', 'Blog'],
    Support: ['Help Center', 'Safety Rules', 'Privacy Policy', 'Terms of Service'],
    Services: ['Promote Product', 'Membership', 'Verified Badge', 'Smart Ads'],
  };

  return (
    <footer className="relative bg-[#030014] pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* --- Background Glow --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-violet-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* --- Brand Section --- */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-max">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
                <Rocket size={20} className="text-white" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter">
                Smart<span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Deals</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              The world's most trusted AI-powered marketplace. Buy, sell, and trade with confidence in a next-generation ecosystem.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all shadow-xl"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- Navigation Links --- */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-white font-bold text-lg tracking-wider uppercase text-xs">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 hover:text-violet-400 text-sm transition-colors flex items-center group">
                      <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-violet-400 mr-0 group-hover:mr-2"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* --- Contact / Newsletter --- */}
          <div className="space-y-6 lg:col-span-1">
            <h4 className="text-white font-bold text-lg tracking-wider uppercase text-xs">Stay Connected</h4>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Mail size={16} className="text-violet-500" />
              <span>hello@smartdeals.com</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <MapPin size={16} className="text-violet-500" />
              <span>Silicon Valley, CA</span>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-xs text-slate-500 font-medium mb-4 uppercase tracking-tighter">Get exclusive deals</p>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-violet-500 w-full transition-all"
                    />
                    <button className="bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-lg transition-all shadow-lg shadow-violet-600/20">
                        <Rocket size={16} />
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {currentYear} <span className="text-slate-300 font-bold">SmartDeals Inc.</span> All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* --- Decorative Gradient Line --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;