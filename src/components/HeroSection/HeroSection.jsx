import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';
import { Search, ArrowRight, Zap, ShieldCheck, Sparkles } from 'lucide-react';

// Swiper CSS Import korte hobe:
// npm install swiper framer-motion lucide-react
import 'swiper/css';
import 'swiper/css/effect-cards';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[100vh] w-full bg-[#030014] overflow-hidden flex items-center">
      
      {/* --- Animated Cosmic Background --- */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/20 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* --- Left Side: Content --- */}
          <div className="flex-1 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-xs font-bold tracking-[0.2em] text-cyan-100 uppercase">Revolutionizing Trade</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
            >
              DEAL <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent italic">
                PRODUCTS
              </span> <br />
              SMARTLY.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed border-l-2 border-violet-500/50 pl-6"
            >
              SmartDeals is the world’s first AI-integrated marketplace for secure, fast, and local trading.
            </motion.p>

            {/* --- Interactive Search --- */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 max-w-md relative group"
            >
              <div className="flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl group-focus-within:border-cyan-500/50 transition-all shadow-2xl">
                <input 
                  type="text" 
                  placeholder="Search 'iPhone 15 Pro'..." 
                  className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder:text-slate-500"
                />
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-xl transition-transform active:scale-90">
                  <Search size={22} strokeWidth={3} />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex gap-6 items-center"
            >
              <button className="relative px-8 py-4 bg-white text-black font-black rounded-full overflow-hidden group">
                <span className="relative z-10">EXPLORE NOW</span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button className="text-white font-bold border-b-2 border-cyan-500/0 hover:border-cyan-500 transition-all flex items-center gap-2">
                Learn More <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>

          {/* --- Right Side: 3D Swiper Slider --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="flex-1 w-full max-w-[400px] relative"
          >
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 3000 }}
              className="h-[500px] w-full"
            >
              {[1, 2, 3, 4].map((num) => (
                <SwiperSlide key={num} className="rounded-[2.5rem] bg-[#1a1a2e] border border-white/10 p-8 flex flex-col justify-between shadow-2xl shadow-purple-500/20">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                       <Zap className="text-yellow-400 fill-yellow-400" size={24} />
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-lg border border-green-500/30">TRENDING</span>
                  </div>
                  
                  <div className="py-10">
                    <div className="text-4xl font-black text-white">TECH <br/> GEAR 0{num}</div>
                    <div className="mt-4 flex items-center gap-2 text-cyan-400">
                      <ShieldCheck size={18} />
                      <span className="text-sm font-medium tracking-wide">Verified Product</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-6">
                    <div>
                      <p className="text-slate-500 text-xs">Starting from</p>
                      <p className="text-2xl font-mono font-bold text-white">$499.00</p>
                    </div>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                      <ArrowRight />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* --- Floating Badges --- */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xl">
                  ★
                </div>
                <div>
                  <p className="text-white font-bold text-sm">4.9/5 Rating</p>
                  <p className="text-slate-400 text-[10px]">Trusted by 20k+ Users</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* --- Aesthetic Bottom Line --- */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default HeroSection;