import React from "react";
import { useLoaderData, Link } from "react-router"; 
import { motion } from "framer-motion";
import { 
  MapPin, Tag, ShieldCheck, 
  ArrowLeft, Clock, MessageCircle, Share2, Heart 
} from "lucide-react";

const ProductDetails = () => {
  const product = useLoaderData(); 

  if (!product || product.message) {
    return (
      <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center text-white px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl"
        >
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Listing Expired or Not Found!
          </h2>
          <p className="text-slate-400 mb-8 max-w-sm mx-auto">
            The product you're looking for might have been sold or removed by the seller.
          </p>
          <Link to="/all-products" className="inline-flex items-center gap-2 bg-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40">
            <ArrowLeft size={18} /> Back to Marketplace
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white py-24 px-6 relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full animate-pulse" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/allProducts" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-black tracking-widest text-[10px] uppercase hidden sm:block">Return to back</span>
          </Link>

          <div className="flex gap-3">
            <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-white transition-all">
              <Share2 size={18} />
            </button>
            <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-slate-400 hover:text-pink-500 transition-all">
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* --- Left Column: Visuals --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white/5">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <span className="bg-blue-600/90 backdrop-blur-xl px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  {product.category}
                </span>
                {product.status && (
                   <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl shadow-xl ${product.status === 'sold' ? 'bg-red-500/80' : 'bg-emerald-500/80'}`}>
                    {product.status}
                  </span>
                )}
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:border-blue-500/30 transition-colors">
              <div className="relative">
                <img src={product.seller_image} className="w-16 h-16 rounded-[1.25rem] object-cover border-2 border-white/10 group-hover:border-blue-500/50 transition-colors" alt="Seller" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-[#030014] flex items-center justify-center">
                  <ShieldCheck size={10} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-black text-xl mb-1">{product.seller_name}</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Highly Responsive
                </p>
              </div>
              <button className="p-4 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-[1.5rem] transition-all border border-blue-500/20">
                <MessageCircle size={24} />
              </button>
            </div>
          </motion.div>

          {/* --- Right Column: Details --- */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col pt-4"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              {product.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <MapPin size={14} className="text-blue-400" />
                {product.location}
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <Clock size={14} className="text-violet-400" />
                {product.usage}
              </div>
            </div>

            <div className="relative mb-10">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full" />
              <p className="text-slate-400 leading-relaxed text-lg pl-8 italic">
                "{product.description}"
              </p>
            </div>

            {/* Pricing Section */}
            <div className="bg-gradient-to-br from-blue-600/15 via-white/5 to-transparent border border-white/10 p-10 rounded-[3rem] mb-10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Tag size={200} />
              </div>
              
              <div className="relative z-10">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">Estimate Value</p>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-6xl font-black tracking-tighter">${product.price_min}</span>
                  <span className="text-slate-700 font-light text-4xl">/</span>
                  <span className="text-6xl font-black tracking-tighter text-slate-400">${product.price_max}</span>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-[#030014] font-black py-5 rounded-[2rem] shadow-[0_20px_40px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 uppercase tracking-widest text-xs hover:bg-blue-50 transition-colors"
                >
                  Confirm Purchase Interest <ArrowLeft size={18} className="rotate-180" />
                </motion.button>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] group hover:bg-white/[0.08] transition-all">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Item Condition</p>
                <p className="font-black text-lg text-white capitalize">{product.condition}</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] group hover:bg-white/[0.08] transition-all">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Authenticated On</p>
                <p className="font-black text-lg text-white">
                  {new Date(product.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;